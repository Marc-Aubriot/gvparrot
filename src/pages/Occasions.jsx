/* dependencies */
import { useState } from "react";

/* components */
import CarCard from './components/CarCard';

/* styles */
import './styles/Occasions.css';

const Occasions = () => {
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
    const closeMenu = () => { setFilterPanelOpen(false) }

    return (

        <main className="pageOccasion">

            <div className={`filterPanel ${filterPanelOpen ? " showMenu" : ""}`}>
                
            </div>

            <section className='galerie'>
                
                    <CarCard 
                        id={cardata.id} 
                        image={cardata.image} 
                        titre={cardata.titre} 
                        description={cardata.description} 
                        informations={cardata.informations} 
                        prix={cardata.prix} 
                    />

                    <CarCard 
                        id={cardata.id} 
                        image={cardata.image} 
                        titre={cardata.titre} 
                        description={cardata.description} 
                        informations={cardata.informations} 
                        prix={cardata.prix} 
                    />

                

                    <CarCard 
                        id={cardata.id} 
                        image={cardata.image} 
                        titre={cardata.titre} 
                        description={cardata.description} 
                        informations={cardata.informations} 
                        prix={cardata.prix} 
                    />

                    <CarCard 
                        id={cardata.id} 
                        image={cardata.image} 
                        titre={cardata.titre} 
                        description={cardata.description} 
                        informations={cardata.informations} 
                        prix={cardata.prix} 
                    />

                
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