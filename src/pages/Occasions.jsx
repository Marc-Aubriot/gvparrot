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
    
    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);

    // récupère la liste des véhicules dans la BDD
    useEffect( ()=> {
        const getCarList = () => {
            const inputs = `action=getCarList`;
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
    }, []);

    // hooks le panneau des filtres est ouvert ou non, et son toggle
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const handleToggleFilter = () => { setFilterPanelOpen(prev => !prev) }

    // render la galerie de véhicules, une zone de filtres et une navigation interne
    return (

        <main className="pageOccasion">

            <div className={`filterPanel ${filterPanelOpen ? " showMenu" : ""}`}>
                
                <div>
                    <label htmlFor="kilometrage">Kilométrage</label>

                    <div>
                        <input type="text" name="kilometrage" placeholder="Km max"/>
                    </div>

                </div>

                <InputRange 
                    label={'Prix'}
                    min={'0'}
                    max={'30000'}
                    unit={'€'}
                    step={'100'}

                />

                <div>
                    <label htmlFor="annee">Année</label>

                    <div>
                        <input type="text" name="annee" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="marque">Marque</label>

                    <div>
                        <input type="text" name="marque" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="carburant">Carburant</label>

                    <div>
                        <input type="text" name="carburant" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="boite">Boîte</label>

                    <div>
                        <input type="text" name="boite" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="couleur">Couleur</label>

                    <div>
                        <input type="text" name="couleur" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="critair">Crit'Air</label>

                    <div>
                        <input type="text" name="critair" placeholder="Km max"/>
                    </div>

                </div>

                <div>
                    <label htmlFor="equipements">Equipements</label>

                    <div>
                        <input type="text" name="equipements" placeholder="Km max"/>
                    </div>

                </div>

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