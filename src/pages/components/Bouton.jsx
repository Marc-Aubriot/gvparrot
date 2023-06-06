import { Link } from "react-router-dom";
import "../styles/Bouton.css"

const Bouton = (props) => {
    return (
        <Link to={props.linkstring}>
            <button className="btnComponent">{props.text}</button>
        </Link>
        
    )
}

export default Bouton;