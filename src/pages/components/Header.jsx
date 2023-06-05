import React from 'react';

/* components */
import Logo from "./Logo";
import Navbar from "./Navbar";

/* styles */
import "../styles/Header.css";

const Header = () => {
    return (
        <>
        <header className="headerStyle">
            <Logo />
            <Navbar />
        </header>
        </>
        
        
    )
}

export default Header;