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
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
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

    const cardata = {
        id: '1',
        image: '../ressources/images/gallerie/renault.jpg',
        titre: 'Renault Clio IV',
        description: 'Blue dci 100cv business',
        informations: 'Diesel - 2018 - 45000 km - Manuelle',
        prix: '5 200€'
    }

    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const handleToggleFilter = () => { setFilterPanelOpen(prev => !prev) }
    //const closeMenu = () => { setFilterPanelOpen(false) }

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