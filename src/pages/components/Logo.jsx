/* ressources */
import LogoImg from "../../ressources/images/front/logo200px.png";

/* styles */
import "./styles/Logo.css";

// component le logo du site
const Logo = () => {
    return (
        <>
            <img src={LogoImg} alt="Logo du site" className="logo"></img>
        </>
    )
}

export default Logo;