/* dependencies */
import { useState, useEffect } from "react";
import axios from 'axios';

/* components */
import CarCard from './components/CarCard';
import Spinner from './components/Spinner';

/* styles */
import './styles/Occasions.css';

const Occasions = () => {
    const [carList, setCarList] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        const getCarList = () => {
            /* axios payload */
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

    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const handleToggleFilter = () => { setFilterPanelOpen(prev => !prev) }

    return (

        <main className="pageOccasion">

            <div className={`filterPanel ${filterPanelOpen ? " showMenu" : ""}`}>
                
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