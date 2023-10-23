/* ressources */
import LogoImg from "../../ressources/images/front/logo200px.png";

/* styles */
import "./styles/Logo.css";

// component le logo du site
const Logo = (props) => {
    return (
        <div className="logoContainer">
            <img src={LogoImg} alt="Logo du site" className="logo" onClick={props.closeMenu}></img>
        </div>
    )
}

export default Logo;