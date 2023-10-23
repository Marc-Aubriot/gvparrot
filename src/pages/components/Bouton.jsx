/* dependencies */
import { Link } from "react-router-dom";

/* styles */
import "./styles/Bouton.css"

// component bouton stylisé
const Bouton = (props) => {
    window.scrollTo(0, 0);
    
    return (
        <Link to={props.linkstring}>
            <button 
                className="btnComponent" 
                type={props.type} 
                onClick={props.onClick} 
                id={props.id}
            >{props.text}</button>
        </Link>
        
    )
}

export default Bouton;