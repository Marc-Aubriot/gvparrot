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

    const handleClick = () => {
        props.closeMenu();
        window.scrollTo(0, 0);
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
                <li><Link to={'accueil'} onClick={handleClick}>Accueil</Link></li>
                <li><Link to={'carrosserie'} onClick={handleClick}>Carrosserie</Link></li>
                <li><Link to={'mecanique'} onClick={handleClick}>Mécanique</Link></li>
                <li><Link to={'entretien'} onClick={handleClick}>Entretien</Link></li>
                <li><Link to={'occasions'} onClick={handleClick}>Occasions</Link></li>
                <li><Link to={'contact'} onClick={handleClick}>Contact</Link></li>
                <li><Link to={'espacepro'} onClick={handleClick}>Espace Pro</Link></li>
            </ul>

        </nav>
    )
}

export default Navbar;