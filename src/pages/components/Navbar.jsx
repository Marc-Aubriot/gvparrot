/* dependencies */
import { useState } from "react";

/* styles */
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => { setNavbarOpen(prev => !prev) }
    const closeMenu = () => { setNavbarOpen(false) }

    return (
        <>
        <nav>
            <button className="hamburgerBtn" onClick={handleToggle}>
                {navbarOpen ? 
                ( 
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                ) : (
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                )}
            </button>
            
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <li><Link to={'accueil'} onClick={closeMenu}>Accueil</Link></li>
                <li><Link to={'carrosserie'} onClick={closeMenu}>Carrosserie</Link></li>
                <li><Link to={'mecanique'} onClick={closeMenu}>Mécanique</Link></li>
                <li><Link to={'entretien'} onClick={closeMenu}>Entretien</Link></li>
                <li><Link to={'occasions'} onClick={closeMenu}>Occasions</Link></li>
                <li><Link to={'contact'} onClick={closeMenu}>Contact</Link></li>
                <li><Link to={'espacepro'} onClick={closeMenu}>Espace Pro</Link></li>
            </ul>

        </nav>
        </>
    )
}

export default Navbar;