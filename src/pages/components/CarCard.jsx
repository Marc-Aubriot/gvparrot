/* styles */
import './styles/CarCard.css';
import pic from '../../ressources/images/gallerie/renault.jpg';

const CarCard = (props) => {
    return (
        <div className='carCardBox'>
            <div className='cardTop'>
                <img src={props.image} alt={'voiture'} className='cardImage'></img>
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