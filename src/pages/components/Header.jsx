/* dependencies */
import { Link } from 'react-router-dom';

/* components */
import Logo from "./Logo";
import Navbar from "./Navbar";

/* styles */
import "./styles/Header.css";

// component le header du site, contenant le logo et la navbar
const Header = () => {
    return (
        <>
        <header className="headerStyle">
            <Link to={'/accueil'}>
                <Logo />
            </Link>
            
            <Navbar />
        </header>
        </>
        
        
    )
}

export default Header;