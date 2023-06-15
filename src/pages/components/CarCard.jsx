/* dependencies */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* styles */
import './styles/CarCard.css';

const CarCard = (props) => {
    const [cardImage, setCardImage] = useState([]);

    useEffect( () => {
        const imgArray = props.image.split('+');
        setCardImage(imgArray[0]);
    }, [])

    return (
        <div className='carCardBox'>

            <div className='cardTop'>
                <Link to={props.id}> 
                    <img src={cardImage} alt={'voiture'} className='cardImage'></img>
                </Link>
            </div>
            
            <div className='cardBotttom'>
                <p className='cardTitle'>{props.titre}</p>
                <p className='cardDescription'>{props.description}</p>
                <p className='cardInformation'>{props.informations}</p>

                <div className='priceBox'>
                    <p className='cardPrice'>{props.prix} €</p>
                    <p className='cardTTC'>TTC</p>
                </div>
            </div>
            
        </div>
    )
}

export default CarCard;