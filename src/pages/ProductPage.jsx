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
    const { params } = useLoaderData();
    const [car, setCar] = useState([]);
    const inputs = "action=test&q=1";

    useEffect( ()=> {
        getCar();
    }, []);

    
    function getCar() {
        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            setCar(response.data.split(','));
        });
    }

    return (
        <section className="productPage">
            <h2 id="carTitle">{car[2]}</h2>
            <p id="carDescription1">Blue dci 100cv business</p>
            <p id="carDescription2">Diesel - {car[6]} - {car[5]} km - Manuelle</p>
            <p id="carPrice">{car[4]} €</p>

            <Bouton text="Prendre contact" linkstring="/contact" type="button" />

            <Galerie />

            <h3 id="carInformationsGenerales">Informations générales</h3>
            <h3 id="carEquipmentsNOptions">Equipements & options</h3>
            <h3 id="carEntretiensNInfosTech">Entretiens & informations techniques</h3>
            <p>{car[2]}</p>
        </section>
    )
}

export default ProductPage;