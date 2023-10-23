/* styles */
import "./styles/Navbar.css";
import { Link } from 'react-router-dom';

/* components */
import HamburgerBtn from "./HamburgerBtn";
import { IoMdClose } from 'react-icons/io';

// la barre de navigation du site
const Navbar = (props) => {

    // style
    const style = {
        width: "50px", height: "50px", cursor: "pointer"
    }

    return (
        <nav className="navBar">
            <button className="hamburgerBtn" onClick={props.handleToggle}>
                {props.navbarOpen ? 
                ( 
                    <IoMdClose style={style} />
                ) : (
                    <HamburgerBtn />
                )}
            </button>
            
            <ul className={`menuNav ${props.navbarOpen ? " showMenu" : ""}`}>
                <li><Link to={'accueil'} onClick={props.closeMenu}>Accueil</Link></li>
                <li><Link to={'carrosserie'} onClick={props.closeMenu}>Carrosserie</Link></li>
                <li><Link to={'mecanique'} onClick={props.closeMenu}>Mécanique</Link></li>
                <li><Link to={'entretien'} onClick={props.closeMenu}>Entretien</Link></li>
                <li><Link to={'occasions'} onClick={props.closeMenu}>Occasions</Link></li>
                <li><Link to={'contact'} onClick={props.closeMenu}>Contact</Link></li>
                <li><Link to={'espacepro'} onClick={props.closeMenu}>Espace Pro</Link></li>
            </ul>

        </nav>
    )
}

export default Navbar;