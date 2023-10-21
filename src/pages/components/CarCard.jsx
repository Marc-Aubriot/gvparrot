/* dependencies */
import { useEffect, useState } from 'react';

/* styles */
import './styles/CarCard.css';

// component une card stylisé
const CarCard = (props) => {
    // hook contenant le path des images
    const [cardImage, setCardImage] = useState([]);

    // transforme les path d'images passés en prop en array au montage
    useEffect( () => {
        const imgArray = props.image.split('+');
        setCardImage(imgArray[0]);
    }, [props])

    const handler = () => {
        props.productPageHandler();
        props.carRefHandler(props.id);
    }

    // retourne la card
    return (
        <div className='carCardBox'>

            <div className='cardTop'>

                <img src={cardImage} alt={'voiture'} className='cardImage' onClick={handler}></img>

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