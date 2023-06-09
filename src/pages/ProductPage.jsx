/* dependencies */
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData  } from "react-router-dom";

/* styles */
import './styles/ProductPage.css';

/* components */
import Bouton from './components/Bouton';
import Galerie from "./components/Galerie";

/* data loader */
export async function loader(urlparams) {
  return urlparams;
}

const ProductPage = () => {
    /* url param loader*/
    const { params } = useLoaderData();

    /* hooks */
    const [car, setCar] = useState([]);
    const [images, setImages] = useState([]);
    const [lesplus, setLesplus] = useState([]);
    const [equips, setEquips] = useState([]);
    const [details, setDetails] = useState([]);

    /* axios payload */
    const inputs = `action=getCarDetail&q=${params.id}`;

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        getCar();
    });

    function getCar() {
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

            // on accroche les datas récupérées aux différents hooks
            setCar(data);   
            setImages(img);
            setLesplus(plus);
            setEquips(equipement);
            setDetails(detay);
        });
    }

    return (
        <section className="productPage">

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
                    <Bouton text="Prendre contact" linkstring="/contact" type="button" />
                </div>
            </div>

            <div className="sectionEquipement">
                <div className="equipDetail">
                    <h2>EQUIPEMENTS</h2>
                    <h2> / </h2>
                    <h2>DETAILS</h2>
                </div>
                
                <h3>Les +</h3>
                {lesplus.map( (string, i) => {
                    return (
                        <li>{string}</li>
                    )
                })}

                <h3>EQUIPEMENTS DE SERIE</h3>
                <ul>
                    {equips.map( (string, i) => {
                    return (
                        <li>{string}</li>
                    )
                })}
                </ul>
                
            </div>

            

           
        </section>
    )
}

export default ProductPage;