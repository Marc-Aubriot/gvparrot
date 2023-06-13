/* dependencies */
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

/* styles */
import './styles/Accueil.css';

/* components */
import Bouton from './components/Bouton';
import CommentCard from './components/CommentCard';

/* ressources */
import heroImg from '../ressources/images/front/herobanner.jpg';
import img1 from '../ressources/images/front/article1.jpg';
import img2 from '../ressources/images/front/article2.jpg';
import img3 from '../ressources/images/front/article3.jpg';
import img4 from '../ressources/images/front/article4.jpg';

const Accueil = () => {
    /* hooks des datas fetch par axios */
    const [comments, setComments] = useState([]);

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        const getComments = () => {
            /* axios payload */
            const inputs = `action=getComments`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
            // transforme la réponse (string) en array
            const rawdata = response.data.split('&'); 

            let data = [];
            rawdata.forEach(element => {
                data.push(element.split('+'));
            });

            data.pop();

            // on accroche les datas récupérées aux différents hooks
            setComments(data);
        });
        }
        getComments();
    }, []);

    return (
        <main >
            <div>
                <h1 className='heroTitle'>Vos véhicules se détendent enfin</h1>
                <img src={heroImg} alt="hero banner" className='heroBanner'/>
            </div>
            

            <section className='service1 largeScreenContainer'>

                <div className='float-l imageWrapper'>
                    <img src={img1} alt="une voiture neuve" /> 
                </div>

                <div>
                    <h2 className='text-start'>SECTION TITLE : SERVICE - CARROSSERIE</h2>

                    <div className='textwrapper'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                    </div>

                    <div className='linkwrapper text-start'>
                        <Link to={'/carrosserie'} className='sectionLink'>Voir tous les services de carrosserie</Link>
                    </div>
                </div>  
          
            </section>

            <section className='service2 largeScreenContainer'>

                <div className='float-r imageWrapper'>
                    <img src={img2} alt="mécanique d'une voiture"/>
                </div>

                <div>
                    <h2 className='text-end'>SECTION TITLE : SERVICE - MECANIQUE</h2>

                    <div className='textwrapper text-start'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                    </div>

                    <div className='linkwrapper text-end'>
                        <Link to={'/mecanique'} className='sectionLink'>Voir tous les services de mécanique</Link>
                    </div>
                </div>    

            </section>

            <section className='service3 largeScreenContainer'>

                <div className='float-l imageWrapper'>
                    <img src={img3} alt="entretien d'une voiture"/>
                </div>

                <div>
                    <h2 className='text-start'>SECTION TITLE : SERVICE - ENTRETIENS</h2>

                    <div className='textwrapper'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
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

            <section className='service4 largeScreenContainer'>

                <div className='imageWrapper float-r'>
                    <img src={img4} alt="staff & client"/>
                </div>

                <h2>SECTION TITLE : A PROPOS</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>
                
            </section>

            <section className='service5 largeScreenContainer'>
                <h2>SECTION TITLE : AVIS</h2>

                <div className='cardWrapper'>
                    { comments[0] ? <CommentCard lsOnly="false" nom={comments[0][1]} rating={comments[0][3]} comment={comments[0][2]} /> : '' }
                    { comments[1] ? <CommentCard lsOnly="true" nom={comments[1][1]} rating={comments[1][3]} comment={comments[1][2]} /> : '' }
                    { comments[2] ? <CommentCard lsOnly="true" nom={comments[2][1]} rating={comments[2][3]} comment={comments[2][2]} /> : ''}
                </div>
                
                
                <div className='avisBtnBox'>
                    <div className='avisBtn'>
                        <Bouton text="Laisser un avis" className="avisBtn"></Bouton>
                    </div>
                    <div className='avisBtn'>
                        <Bouton text="Voir tous les avis"></Bouton>
                    </div>
                </div>
                
            </section>
        </main>
    )
}

export default Accueil;