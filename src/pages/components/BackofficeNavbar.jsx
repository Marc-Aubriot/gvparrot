/* dependencies */
import { useState } from "react";

/* styles */
import "./styles/BackofficeNavbar.css";
import { Link } from 'react-router-dom';

/* components */
import HamburgerBtn from "./HamburgerBtn";

// Layout de la barre de navigation du Back office
const BackofficeNavbar = (props) => {
    // toggle du menu en version mobile et tablette
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => { setNavbarOpen(prev => !prev) }
    const closeMenu = () => { setNavbarOpen(false) }

    // render le menu de navigation en fonction de son statut ("Administrateur" ou "Employé")
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
            
            {
                props.user === 'Administrateur' ?
            
                <ul className={`backofficemenuNav ${navbarOpen ? " showMenu" : ""}`}>
                    <li><Link to={`${props.id}/accueil`} onClick={closeMenu}>Accueil espace de travail</Link></li>
                    <li><Link to={`${props.id}/addemployee`} onClick={closeMenu}>Ajouter un employé</Link></li>
                    <li><Link to={`${props.id}/modifyhoraires`} onClick={closeMenu}>Définir les horaires d'ouverture</Link></li>
                    <li><Link to={`${props.id}/modifyservices`} onClick={closeMenu}>Modifier les services</Link></li>
                    <li><Link to={`${props.id}/listemployee`} onClick={closeMenu}>Voir la liste des employés</Link></li>
                    <li className="deconnexionBTN"><Link to={'/contact'} onClick={closeMenu}>Déconnexion</Link></li>
                </ul>

                :

                <ul className={`backofficemenuNav ${navbarOpen ? " showMenu" : ""}`}>
                    <li><Link to={`${props.id}/accueil`} onClick={closeMenu}>Accueil espace de travail</Link></li>
                    <li><Link to={`${props.id}/addcar`} onClick={closeMenu}>Ajouter une voiture au catalogue</Link></li>
                    <li><Link to={`${props.id}/equipmentlist`} onClick={closeMenu}>Gérer la liste des équipements</Link></li>
                    <li><Link to={`${props.id}/carlist`} onClick={closeMenu}>Gérer le catalogue de voitures</Link></li>
                    <li><Link to={`${props.id}/verifycomments`} onClick={closeMenu}>Modération de commentaires</Link></li>
                    <li><Link to={`${props.id}/mailbox`} onClick={closeMenu}>Voir tous les messages reçus</Link></li>
                    <li className="deconnexionBTN"><Link to={'/contact'} onClick={closeMenu}>Déconnexion</Link></li>
                </ul>
            }

        </nav>
    )
}

export default BackofficeNavbar;