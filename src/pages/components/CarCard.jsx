/* dependencies */
import { Link } from 'react-router-dom';

/* styles */
import './styles/CarCard.css';

const CarCard = (props) => {
    return (
        <div className='carCardBox'>

            <div className='cardTop'>
                <Link to={props.id}> 
                    <img src={props.image} alt={'voiture'} className='cardImage'></img>
                </Link>
            </div>
            
            <div className='cardBotttom'>
                <p className='cardTitle'>{props.titre}</p>
                <p className='cardDescription'>{props.description}</p>
                <p className='cardInformation'>{props.informations}</p>

                <div className='priceBox'>
                    <p className='cardPrice'>{props.prix}</p>
                    <p className='cardTTC'>TTC</p>
                </div>
            </div>
            
        </div>
    )
}

export default CarCard;