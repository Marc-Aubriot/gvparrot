/* dependencies */
import { Link } from "react-router-dom";

/* styles */
import "./styles/Bouton.css"

const Bouton = (props) => {
    return (
        <Link to={props.linkstring}>
            <button className="btnComponent" type={props.type}>{props.text}</button>
        </Link>
        
    )
}

export default Bouton;