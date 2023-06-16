/* components */
import Logo from "./Logo";
import Navbar from "./Navbar";

/* styles */
import "./styles/BackofficeHeader.css";

const BackofficeHeader = () => {
    return (
        <>
        <header className="headerStyle">
            <Logo />
            <Navbar />
        </header>
        </>
        
        
    )
}

export default BackofficeHeader;