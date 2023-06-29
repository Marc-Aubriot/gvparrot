/* styles */
import './styles/Spinner.css';

// component affichant un spinner pour affichage visuel de l'attente de données
const Spinner = () => {
    return (
        <>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default Spinner;