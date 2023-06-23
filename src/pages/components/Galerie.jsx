/* styles */
import './styles/Galerie.css';

const Galerie = (props) => {;

    /* on click, switch target image & active image */
    const handleClick = (e) => {
        let activeImg = document.getElementById('img-0');
        let activeImgPath = activeImg.src;

        let targetImg = document.getElementById(e.target.id);
        let targetImgPath = targetImg.src;

        if ( activeImg.src === targetImgPath ) {  
            return;
        } else {            
            activeImg.src = targetImgPath;
            targetImg.src = activeImgPath;
        };
    };
    
    return (
        <div className='galerieContainer'>
        {props.imgset.map((img, i )=> {
            return (
                <img key={i} src={img} id={`img-${i}`} className={ i ? "galerieImg" : "activeGalerieImg" } onClick={handleClick} alt='voiture'></img>
            )
        }
        )
        }
        
        </div>
    )
}

export default Galerie;