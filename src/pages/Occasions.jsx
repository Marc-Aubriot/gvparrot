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
    
    // hook pour les filtres
    const [valueKm, setValueKm] = useState({ min: 0, max: 200000 });
    const [valuePrix, setValuePrix] = useState({ min: 0, max: 30000 });
    const yearNow = new Date().getFullYear();
    const [valueAnnee, setValueAnnee] = useState({ min: yearNow-30, max: yearNow })

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);

    // récupère la liste des véhicules dans la BDD
    useEffect( ()=> {
        const getCarList = () => {
            const inputs = `action=getCarListWithBasicFilter&q=${valueKm.min},${valueKm.max},${valueAnnee.min},${valueAnnee.max},${valuePrix.min},${valuePrix.max}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split(','));
                });

                data.pop();
                setCarList(data);
                setIsloading(false);
            })
        }
        getCarList();
    }, [valueKm, valueAnnee, valuePrix]);

    // hooks le panneau des filtres est ouvert ou non, et son toggle
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const handleToggleFilter = () => { setFilterPanelOpen(prev => !prev) }

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

            <section className='galerie'>
                
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
                                reference={e[12]}
                                key={i}
                            />
                        )
                    })

                }

                
            </section>

            <nav className='navBarOccasions'>

                <div className='navBarOccasionsLeftBTN'>
                    <button onClick={handleToggleFilter}>Filtrer</button>
                </div>

                <div className='navBarOccasionsRightBTN'>
                    <button>Trier</button>
                </div>

            </nav>
        </main>
    )
}

export default Occasions;