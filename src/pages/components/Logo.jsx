/* ressources */
import LogoImg from "../../ressources/images/front/logo200px.png";

/* styles */
import "./styles/Logo.css";

// component le logo du site
const Logo = (props) => {

    const handleClick = () => {
        if(props.backofficeView) {
            window.scrollTo(0, 0);
        } else {
            props.closeMenu();
            window.scrollTo(0, 0);
        }

    }

    return (
        <div className="logoContainer">
            <img src={LogoImg} alt="Logo du site" className="logo" onClick={handleClick}></img>
        </div>
    )
}

export default Logo;