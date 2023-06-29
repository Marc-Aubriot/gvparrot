/* styles */
import './styles/HamburgerBtn.css';

// component bouton hamburger dans la barre de navigation, full css
const HamburgerBtn = () => {
    return (
        <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
        </div>
    )
}

export default HamburgerBtn;