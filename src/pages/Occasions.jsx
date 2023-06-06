/* components */
import CarCard from './components/CarCard';

/* styles */
import './styles/Occasions.css';

const Occasions = () => {
    const cardata = {
        image: '../ressources/images/gallerie/renault.jpg',
        titre: 'Renault Clio IV',
        description: 'Blue dci 100cv business',
        informations: 'Diesel - 2018 - 45000 km - Manuelle',
        prix: '5 200€'
    }

    return (
        <section className='gallerie'>
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
            <CarCard image={cardata.image} titre={cardata.titre} description={cardata.description} informations={cardata.informations} prix={cardata.prix} />
        </section>
    )
}

export default Occasions;