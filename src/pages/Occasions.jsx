/* dependencies */
import { useState, useEffect } from "react";
import axios from 'axios';

/* components */
import CarCard from './components/CarCard';
import Spinner from './components/Spinner';
import InputRange from "./components/InputRange";

/* styles */
import './styles/Occasions.css';

// page contenant les véhicules d'occasions
const Occasions = () => {
    // hooks liste des véhicules
    const [carList, setCarList] = useState([]);
    const [refinedCarList, setRefinedCarList] = useState([]);
    const [TrierPar, setTrierpar] = useState("prixcroissant");

    // hook pour les filtres
    const [valueKm, setValueKm] = useState({ min: 0, max: 200000 });
    const [valuePrix, setValuePrix] = useState({ min: 0, max: 30000 });
    const yearNow = new Date().getFullYear();
    const [valueAnnee, setValueAnnee] = useState({ min: yearNow-30, max: yearNow })

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);

    // récupère la liste des véhicules dans la BDD et la tri
    useEffect( ()=> {
        const getCarList = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getCarListWithBasicFilter&q=${valueKm.min},${valueKm.max},${valueAnnee.min},${valueAnnee.max},${valuePrix.min},${valuePrix.max}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split(','));
                });

                data.pop();

                // on pourrait simplifier la fonction de tri en passant un argument sort/reverse, et un argument pour la value à return
                // dans les values des options du selecteur html pour obtenir une fonction à deux conditions seulement
                // mais pour le moment on a pas beaucoup de "filtre" possible donc pas besoin de simplifier
                //
                // if ( TrierPar === 'sort-value') { setCarList(data.sort( function (a,b) { return a[value] - b[value]}));
                //  else if ( TrierPar === 'reverse-value') { setCarList(data.sort( function (a,b) { return b[value] - a[value] }))}};
                //
                if ( TrierPar === "prixcroissant" ) {
                    setCarList(data.sort( function(a,b) { return a[8] - b[8] }));
                } else if ( TrierPar === "prixdecroissant" ) {
                    setCarList(data.sort( function(a,b) { return b[8] - a[8] }));
                } else if ( TrierPar === "kmcroissant" ) {
                    setCarList(data.sort( function(a,b) { return a[6] - b[6] }));
                } else if ( TrierPar === "kmdecroissant" ) {
                    setCarList(data.sort( function(a,b) { return b[6] - a[6] }));
                } else if ( TrierPar === "anneecroissante" ) {
                    setCarList(data.sort( function(a,b) { return a[7] - b[7] }));
                } else if ( TrierPar === "anneedecroissante" ) {
                    setCarList(data.sort( function(a,b) { return b[7] - a[7] }));
                } else {
                    console.log('erreur sur la fonction de tri, aucun filtre reconnu');
                }

                setIsloading(false);
            })
        }
        getCarList();
    }, [valueKm, valueAnnee, valuePrix, TrierPar]);

    // hooks le panneau des filtres est ouvert ou non, et son toggle
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const handleToggleFilter = () => { setFilterPanelOpen(prev => !prev) }

    // hooks pour le panneau de tri en mobile
    const [trierPanelOpen, setTrierPanelOpen] = useState(false);
    const handdleToggleTri = () => { setTrierPanelOpen(prev => !prev) }

    // set le hook de tri
    const selectHandler = e => {
        e.preventDefault();
        setTrierpar(e.target.value);
    }

    // render la galerie de véhicules, une zone de filtres et une navigation interne
    return (

        <main className="pageOccasion">

            <div className={`filterPanel ${filterPanelOpen ? " showMenu" : ""}`}>
                
                <h2 className="pageOccasionFilterSectionTitle">Filtres</h2>

                <InputRange
                    label={'Kilométrage'}
                    unit={'Km'}
                    min={0}
                    max={200000}
                    step={1000}
                    value={valueKm}
                    onChange={setValueKm}
                />

                <InputRange 
                    label={'Prix'}
                    unit={'€'}
                    min={0} 
                    max={30000} 
                    step={100} 
                    value={valuePrix} 
                    onChange={setValuePrix} 
                />
                
                <InputRange
                    label={'Année'}
                    unit={''}
                    min={yearNow-30}
                    max={yearNow}
                    step={1}
                    value={valueAnnee}
                    onChange={setValueAnnee}
                />

            </div>

            <div className={`trierPanel ${trierPanelOpen ? " showMenu" : ""}`}>
                <select defaultValue={0} className="galerieSelectTrier" onChange={selectHandler}>
                    <option value={0} disabled>Trier par</option>
                    <option value={"prixcroissant"}>Prix croissant</option>
                    <option value={"prixdecroissant"}>Prix décroissant</option>
                    <option value={"kmcroissant"}>Kilométrage croissant</option>
                    <option value={"kmdecroissant"}>Kilométrage décroissant</option>
                    <option value={"anneecroissante"}>Année croissante</option>
                    <option value={"anneedecroissante"}>Année décroissante</option>
                </select>
            </div>

            <section className='galerie'>
                
                

                <div className="galerieTable">
                    {
                        isLoading ?
                        <  Spinner />
                        :
                        carList.map( (e,i) => {

                            return (
                                <CarCard 
                                    id={e[0]} 
                                    image={e[1]} 
                                    titre={e[2]} 
                                    description={e[3]} 
                                    informations={`${e[5]} - ${e[6]} km - ${e[7]} - ${e[4]}`} 
                                    prix={e[8]} 
                                    reference={e[0]}
                                    key={i}
                                />
                            )
                        })

                    }
                </div>
                
            </section>

            <nav className='navBarOccasions'>

                <div className='navBarOccasionsLeftBTN'>
                    <button onClick={handleToggleFilter}>Filtrer</button>
                </div>

                <div className='navBarOccasionsRightBTN'>
                    <button onClick={handdleToggleTri}>Trier</button>
                </div>

            </nav>
        </main>
    )
}

export default Occasions;