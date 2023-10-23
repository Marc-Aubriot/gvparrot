/* dependencies */
import { useState } from "react";

/* components */
import ProductPage from "./ProductPage";
import GalerieAuto from "./GalerieAuto";

/* styles */
import './styles/Occasions.css';

// page contenant les véhicules d'occasions
const Occasions = () => {
    window.scrollTo(0, 0);
    
    // hooks liste des véhicules
    const [carList, setCarList] = useState([]);
    const [carRef, setCarRef] = useState();
    const [productPageOpen, setProductPageOpen] = useState(false);

    // handler pour le hook productPageOpen
    const productPageOpenHandler = () => {
        setProductPageOpen(prev => !prev);
    }

    // handler pour le hook carList
    const carListHandler = (array) => {
        setCarList(array);
    }

    // handler pour le hook carRef
    const carRefHandler = (value) => {
        setCarRef(value);
    }

    // render la galerie de véhicules, une zone de filtres et une navigation interne
    return (

        <main className="pageOccasion">

            {
                productPageOpen ?

                <ProductPage
                    carList = {carList}
                    carRef = {carRef}
                    productPageOpenHandler = {productPageOpenHandler}
                />
                
                :

                <GalerieAuto 
                    carList = {carList}
                    carListHandler = {carListHandler}
                    productPageOpenHandler = {productPageOpenHandler}
                    carRefHandler = {carRefHandler}
                />
            }

        </main>
    )
}

export default Occasions;