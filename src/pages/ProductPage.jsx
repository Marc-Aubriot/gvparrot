/* dependencies */
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

    return (
        <section className="productPage">
            <h2 id="carTitle">Renault clio IV</h2>
            <p id="carDescription1">Blue dci 100cv business</p>
            <p id="carDescription2">Diesel - 2018 - 45000 km - Manuelle</p>
            <p id="carPrice">14 500€</p>

            <Bouton text="Prendre contact" linkstring="/contact" type="button" />

            <Galerie />

            <h3 id="carInformationsGenerales">Informations générales</h3>
            <h3 id="carEquipmentsNOptions">Equipements & options</h3>
            <h3 id="carEntretiensNInfosTech">Entretiens & informations techniques</h3>
        </section>
    )
}

export default ProductPage;