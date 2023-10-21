/* dependencies */
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData  } from "react-router-dom";
import { Link } from "react-router-dom";

/* styles */
import './styles/ProductPage.css';

/* components */
import Galerie from "./components/Galerie";
import Spinner from './components/Spinner';

/* data loader */
export async function loader(urlparams) {
  return urlparams;
}


// page d'un véhicule avec tous les détails et un lien pour une prise de contact
const ProductPage = () => {
    // url parameter loader
    const { params } = useLoaderData();

    // informations du véhicules, images du véhicules, section "lesplus", les équipements, les détails et le nombre max de véhicule disponible
    const [car, setCar] = useState([]);
    const [images, setImages] = useState([]);
    const [lesplus, setLesplus] = useState([]);
    const [equips, setEquips] = useState([]);
    const [details, setDetails] = useState([]);
    const [previousCarRef, setPreviousCarRef] = useState();
    const [nextCarRef, setNextCarRef] = useState();

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);

    // récupère les informations du véhicules dans la BDD et les segmentes, et les références précédentes et suivantes pour la navigation
    useEffect( ()=> {
        const getCar = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getCarDetail&q=${params.id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
                
                // transforme la réponse (string) en array
                const data = response.data.split(','); 
                //const data = response.data;

                // récupère les images
                const img = data[1].split('+'); 

                // récupère les plus
                const plus = data[9].split('+'); 

                // récupère les équipements
                const equipement = data[10].split('+'); 

                // récupère les détails 
                const detay = data[11].split('+'); 

                // on accroche les datas récupérées aux différents hooks
                setCar(data);   
                setImages(img);
                setLesplus(plus);
                setEquips(equipement);
                setDetails(detay);

                setIsloading(false);

                // récupère les références avant et après la référence actuelle en BDD
                getPreviousAndNextCarRef(data[0]);
            });
        }

        const getPreviousAndNextCarRef = (ref) => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getPrevAndNextCar&ref=${ref}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
                
                // transforme la réponse (string) en array
                const data = response.data.split('+'); 

                // récupère le previous car
                setPreviousCarRef(data[0]);

                // récupère le next car
                setNextCarRef(data[2]);

                setIsloading(false);
            });
        }

        getCar();

    }, [params]);

    // hook et handler pour les sections équipements et détails
    const [equipementsDivOpen, setEquipementsDivOpen] = useState(true);
    const handleToggle = () => { setEquipementsDivOpen(prev => !prev) }

    // render la page du produit ainsi qu'un lien vers un formulaire de conact, une page de navigation et une zone de filtre
    return (

        <main className="mainPageProduct">

            {
                isLoading ?
                <Spinner />
                :
                <>
                    <div className="navigationInterProduct">
            
                        <Link to={`/occasions/${previousCarRef}`} className="leftBtnWrapper">
                            <button disabled={ previousCarRef === 'null' ? true : false } className={ previousCarRef === 'null' ? "navigationInterProductBTN blocked" : "navigationInterProductBTN" }>Précédent</button>
                        </Link>

                        <Link to={`/occasions`}className="middleBtnWrapper">
                            <button className="navigationInterProductBTN">Retour</button>
                        </Link>

                        <Link to={`/occasions/${nextCarRef}`} className="RightBtnWrapper">
                        <button disabled={ nextCarRef === 'null' ? true : false } className={ nextCarRef === 'null' ? "navigationInterProductBTN blocked" : "navigationInterProductBTN" }>Suivant</button>
                        </Link>
                    </div>
                    
                    <section className="productPage">

                        <div className="topSection">

                        
                            <Galerie imgset={images} />

                            <div className="carCard">

                                <div className="carCardHeader">
                                    <h2 id="carTitle">{car[2]}</h2>
                                    <p id="carDescription1">{car[3]}</p>
                                    <p id="carRef">Réf.annonce: {car[12]}</p>
                                </div>
                                
                                <div className="carCardBody">
                                    <p>{car[6]} km</p>
                                    <p>{car[7]}</p>
                                    <p>{car[5]}</p>
                                    <p>{car[4]}</p>
                                    <hr />
                                    <p className="carPrice">Prix</p>
                                    <div className="priceBox">
                                        <p id="carPrice">{car[8]} €</p>
                                        <p className="carPriceTTC"> TTC</p>
                                    </div>
                                    
                                </div>

                                <div className="carCardFooter">
                                    <Link to={`/contact/${car[0]}`} >
                                        <button type="button" id="carProductContactBtn">Prendre contact</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="sectionEquipement">
                            <div className="equipDetail" onClick={handleToggle}>
                                <h2 className={ equipementsDivOpen ? "active" : "" }>EQUIPEMENTS</h2>
                                <h2 className={ equipementsDivOpen ? "" : "active" }>DETAILS</h2>
                            </div>
                            
                            <div className="equipementWrapper">

                                <div id="equipementsDiv" className={ equipementsDivOpen ? "showDiv" : "hiddenDiv" }>

                                    
                                {
                                        lesplus.length > 1 ? 
                                        <div className="lesplusWrapper">
                                            <h3>Les +</h3>
                                            {lesplus.map( (string, i) => {
                                                return (
                                                    <li key={i}>{string}</li>
                                                )
                                            })}
                                        </div>
                                        :
                                        ''
                                
                                    }
                                
                                    <div className="equipserieWrapper">
                                        <h3>EQUIPEMENTS DE SERIE</h3>
                                        <ul>
                                            {equips.map( (string, i) => {
                                            return (
                                                <li key={i}>{string}</li>
                                            )
                                        })}
                                        </ul>
                                    </div>
                                    

                                </div>
                            
                                <div id="detailsDiv" className={ equipementsDivOpen ? "hiddenDiv" : "showDiv" }>
                                    <h3>Informations du véhicule</h3>
                                    <p>Couleur : {details[0]} </p>
                                    <p>Puissance fiscale (cv): {details[1]}</p>
                                    <p>Rapports: {details[2]}</p>
                                    <p>Places: {details[3]}</p>
                                    <p>Portes: {details[4]}</p>

                                    <h3>GARANTIE</h3>
                                    <p>Garantie (mois): {details[5]}</p>

                                    <h3>Informations énergétiques</h3>
                                    <p>Qualité de l'air</p>
                                    <p>Certificat Crit'Air {details[6]}</p>
                                </div>

                            </div>

                        </div>
                
                    </section>
                </>
            }
        </main>
    )
}

export default ProductPage;