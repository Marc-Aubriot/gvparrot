/* dependencies */
import { Link } from 'react-router-dom';
import { useState } from 'react';

/* components */
import Logo from "./Logo";
import Navbar from "./Navbar";

/* styles */
import "./styles/Header.css";

// component le header du site, contenant le logo et la navbar
const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => { setNavbarOpen(prev => !prev) }
    const closeMenu = () => { setNavbarOpen(false) }

    return (
        <>
        <header className="headerStyle">
            <Link to={'/accueil'}>
                <Logo closeMenu={closeMenu} />
            </Link>
            
            <Navbar handleToggle={handleToggle} navbarOpen={navbarOpen} closeMenu={closeMenu} />
        </header>
        </>
        
        
    )
}

export default Header;