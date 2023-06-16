/* dependencies */
import { useState } from "react";

/* styles */
import "./styles/BackofficeNavbar.css";
import { Link } from 'react-router-dom';

/* components */
import HamburgerBtn from "./HamburgerBtn";

const BackofficeNavbar = (props) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => { setNavbarOpen(prev => !prev) }
    const closeMenu = () => { setNavbarOpen(false) }

    return (
        <nav className="navBar">
            <button className="hamburgerBtn" onClick={handleToggle}>
                {navbarOpen ? 
                    ( 
                        <HamburgerBtn />
                    ) : (
                        <HamburgerBtn />
                    )
                }
            </button>
            
            <ul className={`backofficemenuNav ${navbarOpen ? " showMenu" : ""}`}>
                <li><Link to={`${props.id}/addemployee`} onClick={closeMenu}>Ajouter un employé</Link></li>
                <li><Link to={`${props.id}/listemployee`} onClick={closeMenu}>Voir la liste des employés</Link></li>
                <li><Link to={'modifyhoraires'} onClick={closeMenu}>Définir les horaires d'ouverture</Link></li>
                <li><Link to={'modifyservices'} onClick={closeMenu}>Modifier les services</Link></li>
                <li className="deconnexionBTN"><Link to={'/contact'} onClick={closeMenu}>Déconnexion</Link></li>
            </ul>

        </nav>
    )
}

export default BackofficeNavbar;