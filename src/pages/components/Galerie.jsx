/* styles */
import './styles/Galerie.css';

// component une galerie de photos dans la page product detail
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
    
    // render la galerie
    return (
        <div className='galerieContainer'>

            <div className='activeImgContainer'>
                <img src={props.imgset[0]} id={`img-0`} className={ "activeGalerieImg" } onClick={handleClick} alt='voiture' />
            </div>

            <div className='galerieBotRow'>
                {
                    props.imgset.map((img, i )=> {
                        if ( i !== 0 && i !== 5) {
                            return (
                                <img key={i} src={img} id={`img-${i+1}`} className={ "galerieImg" } onClick={handleClick} alt='voiture' />
                            )  
                        } else {
                            return ( '' )
                        }
                    })
                }
            </div>
            
        
        </div>
    )
}

export default Galerie;