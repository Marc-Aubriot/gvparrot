/* dependencies */
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

/* styles */
import './styles/Accueil.css';

/* components */
import Bouton from './components/Bouton';
import CommentCard from './components/CommentCard';
import CommentForm from './components/CommentForm';
import Spinner from './components/Spinner';

/* ressources */
import heroImg from '../ressources/images/front/herobanner.jpg';
import img1 from '../ressources/images/front/article1.jpg';
import img2 from '../ressources/images/front/article2.jpg';
import img3 from '../ressources/images/front/article3.jpg';
import img4 from '../ressources/images/front/article4.jpg';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';

// Page accueil contenant une description rapide des services proposés et un retour client
const Accueil = () => {
    window.scrollTo(0, 0);

    // hooks commenaitres et numéro d'index pour la galerie de commentaires
    const [comments, setComments] = useState([]);
    const [index, setIndex ] = useState(0);

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);

    // gère le clic sur le bouton précèdent dans la galerie de commentaires
    const precedentBtn = () => {
        setIndex( index => index - 1);
    }

    // gère le clic sur le bouton  suivant dans la galerie de commentaires
    const suivantBtn = () => {
        setIndex( index => index + 1);
    }

    // récupère les commentaires dans la BDD
    useEffect( ()=> {
        const getComments = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getComments&q=validated`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });

                data.pop();

                // hooks les commentaires et set l'index à 0 pour la galerie
                setComments(data);
                setIndex(0);

                setIsloading(false);
            });
        }
        getComments();
    }, []);

    // hook si le modal est open et son toggle
    const [avisFormOpen, setAvisFormOpen] = useState(false);
    const handleToggle = () => { setAvisFormOpen(prev => !prev) }

    // style
    const style = {
        width: "30px", height: "30px"
    }

    // render la page principale, avec une présentation des services et une galerie de retour client, ainsi qu'un formulaire modal
    return (
        <main >
            <div>
                <h1 className='heroTitle' id='accueilHeroTitle'>Vos véhicules se détendent enfin</h1>
                <img src={heroImg} alt="hero banner" className='heroBanner'/>
            </div>
            

            <section className='serviceContainer service1 largeScreenContainer'>

                <div className='float-l imageWrapper'>
                    <img src={img1} alt="une voiture neuve" /> 
                </div>

                <div>
                    <h2 className='text-start'>Réparation de la carrosserie</h2>

                    <div className='textwrapper'>
                    <p>Comme son nom l'indique, une réparation de carrosserie consiste à rénover votre voiture et plus exactement à remettre en état sa carrosserie, c'est-à-dire l'ensemble des tôles qui recouvre votre voiture. La carrosserie a à la fois un rôle de sécurité, puisqu'elle protège l'habitacle du véhicule, et esthétique.</p>
                    </div>

                    <div className='linkwrapper text-start'>
                        <Link to={'/carrosserie'} className='sectionLink'>Voir tous les services de carrosserie</Link>
                    </div>
                </div>  
          
            </section>

            <section className='serviceContainer service2 largeScreenContainer'>

                <div className='float-r imageWrapper'>
                    <img src={img2} alt="mécanique d'une voiture"/>
                </div>

                <div>
                    <h2 className='text-end'>Mécanique de votre automobile</h2>

                    <div className='textwrapper text-start'>
                        <p>La réparation de la mécanique de votre automobile consiste en à changer les pièces défaillantes. C’est par exemple le moteur, l’embrayage, la culasse, le démarreur, le turbo, l’injecteur, le filtre à air, la bougie ou encore le filtre à carburant.</p>
                    </div>

                    <div className='linkwrapper text-end'>
                        <Link to={'/mecanique'} className='sectionLink'>Voir tous les services de mécanique</Link>
                    </div>
                </div>    

            </section>

            <section className='serviceContainer service3 largeScreenContainer'>

                <div className='float-l imageWrapper'>
                    <img src={img3} alt="entretien d'une voiture"/>
                </div>

                <div>
                    <h2 className='text-start'>Entretien de vos véhicules</h2>

                    <div className='textwrapper'>
                        <p>Il est également important de se rappeler que des révisions régulières du véhicules ainsi qu’une vidange à temps permettent d’éviter nombreuses réparation. Comme dit le dicton: « mieux vaut prévenir que guérir »!</p>
                    </div>

                    <div className='linkwrapper text-start'>
                        <Link to={'/entretien'} className='sectionLink'>Voir tous les services d'entretien'</Link>
                    </div>
                </div>

            </section>

            <section className='bandSection'>

                <div className='largeScreenContainer bandSection'> 

                    <h3>Découvrez nos voitures d'occasions</h3>

                    <div className="bandSectionBtn">
                        <Bouton text="Voitures d'occasions" linkstring="/occasions"></Bouton>
                    </div>

                </div>

            </section>

            <section className='serviceContainer service4 largeScreenContainer'>

                <div className='imageWrapper float-r'>
                    <img src={img4} alt="staff & client"/>
                </div>

                <h2>Nos équipes de spécialistes</h2>

                <div className='textwrapper'>
                    <p>Fort de 15 ans d'expertise, le garage Vincent Parrot et ses équipes de spécialités et expert en automobile, prendrons en charge vos véhicules et vous apporterons un service de qualité tout au long de la vie de votre automobile.</p>
                </div>
                
            </section>

            {
                isLoading ?
                <Spinner />
                :
            
                <section className='service5 largeScreenContainer'>
        
                    <h2>Ce qu'ils en ont pensé</h2>

                    <div className='boxWrapper'>

                        {   
                            avisFormOpen ? 
                            <CommentForm toggle={handleToggle} /> 
                            : 
                            <>
                                <div className='cardWrapper'>
                                    
                                    { comments[index] ? <CommentCard lsOnly="false" nom={comments[index][1]} rating={comments[index][3]} comment={comments[index][2]} /> : '' }
                                    { comments[index+1] ? <CommentCard lsOnly="true" nom={comments[index+1][1]} rating={comments[index+1][3]} comment={comments[index+1][2]} /> : '' }
                                    { comments[index+2] ? <CommentCard lsOnly="true" nom={comments[index+2][1]} rating={comments[index+2][3]} comment={comments[index+2][2]} /> : ''}

                                </div>

                                <div className='cardBtnWrapper'>
                                    <div className='btnPrecedentAvis'>
                                        {
                                            index === 0 ? ''
                                            :
                                            <button id='btnPrecedentAvis' onClick={precedentBtn}><BsChevronDoubleLeft style={style}/></button>

                                        }
                                    </div>

                                    <div className='btnSuivantAvis'>
                                        {                               
                                            index === comments.length - 1 ? ''
                                            :
                                            <button id='btnSuivantAvis' onClick={suivantBtn}><BsChevronDoubleRight style={style}/></button>

                                        }
                                    </div>

                                    <div className='btnSuivantAvis2'>
                                        {                               
                                            index === comments.length - 3 ? ''
                                            :
                                            <button id='btnSuivantAvis' onClick={suivantBtn}><BsChevronDoubleRight style={style}/></button>

                                        }
                                    </div>

                                </div>
                            </>
                        } 
                            
                    </div>

                    {
                        avisFormOpen ?
                        ""
                        :
                        <div className='avisBtnBox'>
                            <div className='avisBtn'>
                                <Bouton text="Laisser un avis" className="avisBtn" onClick={handleToggle}></Bouton>
                            </div>
                        </div> 
                    }

                </section>
            }

        </main>
    )
}

export default Accueil;