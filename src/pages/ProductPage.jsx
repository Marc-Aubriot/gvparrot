/* dependencies */
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData  } from "react-router-dom";
import { Link } from "react-router-dom";

/* styles */
import './styles/ProductPage.css';

/* components */
import Galerie from "./components/Galerie";

/* data loader */
export async function loader(urlparams) {
  return urlparams;
}

const ProductPage = () => {
    /* url parameter loader*/
    const { params } = useLoaderData();

    /* hooks des datas fetch par axios */
    const [car, setCar] = useState([]);
    const [images, setImages] = useState([]);
    const [lesplus, setLesplus] = useState([]);
    const [equips, setEquips] = useState([]);
    const [details, setDetails] = useState([]);
    const [numberOfCar, setNumberOfCar] = useState([]);

    /* axios payload */
    const inputs = `action=getCarDetail&q=${params.id}`;

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        const getCar = () => {
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
            // transforme la réponse (string) en array
            const data = response.data.split(','); 
            // récupère les images
            const img = data[1].split('+'); 
            // récupère les plus
            const plus = data[9].split('+'); 
            // récupère les équipements
            const equipement = data[10].split('+'); 
            // récupère les détails 
            const detay = data[11].split('+'); 
            // récupère le nombre max d'annonces
            const max = data[12];

            // on accroche les datas récupérées aux différents hooks
            setCar(data);   
            setImages(img);
            setLesplus(plus);
            setEquips(equipement);
            setDetails(detay);
            setNumberOfCar(max);
            console.log(numberOfCar);
        });
        }
        getCar();
    }, [params, inputs]);

    //hook et handler pour menu équipements / détails
    const [equipementsDivOpen, setEquipementsDivOpen] = useState(true);
    const handleToggle = () => { setEquipementsDivOpen(prev => !prev) }

    return (

        <main className="mainPageProduct">

            <div className="navigationInterProduct">
      
                <Link to={`/occasions/${Number(params.id)-1}`} className="leftBtnWrapper">
                    <button disabled={ Number(params.id) === 1 ? true : false } className={ Number(params.id) === 1 ? "navigationInterProductBTN blocked" : "navigationInterProductBTN" }>Annonce précédente</button>
                </Link>


                <Link to={`/occasions`}className="middleBtnWrapper">
                    <button className="navigationInterProductBTN">Retour aux annonces</button>
                </Link>

                <Link to={`/occasions/${Number(params.id)+1}`} className="RightBtnWrapper">
                <button disabled={ Number(params.id) === Number(numberOfCar) ? true : false } className={ Number(params.id) === Number(numberOfCar) ? "navigationInterProductBTN blocked" : "navigationInterProductBTN" }>Annonce suivante</button>
                </Link>
            </div>
            
            <section className="productPage">

                <div className="topSection">

                
                    <Galerie imgset={images} />

                    <div className="carCard">

                        <div className="carCardHeader">
                            <h2 id="carTitle">{car[2]}</h2>
                            <p id="carDescription1">{car[3]}</p>
                            <p id="carRef">Réf.annonce: {car[0]}</p>
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
                            <button type="button" id="carProductContactBtn">Prendre contact</button>
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

                            <div className="lesplusWrapper">
                                <h3>Les +</h3>
                                {lesplus.map( (string, i) => {
                                    return (
                                        <li key={i}>{string}</li>
                                    )
                                })}
                            </div>
                        
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
                            <p>Puissance fiscale : {details[1]}</p>
                            <p>Portes: {details[2]}</p>
                            <p>Places: {details[3]}</p>

                            <h3>GARANTIE</h3>
                            <p>Garantie: {details[4]}</p>

                            <h3>Informations énergétiques</h3>
                            <p>Qualitéde l'air</p>
                            <p>Certificat Crit'Air {details[5]}</p>
                        </div>

                    </div>

                </div>

                

            
            </section>
        </main>
    )
}

export default ProductPage;