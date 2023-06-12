/* components */
import ConnexionForm from "./components/ConnexionForm";

/* styles */
import './styles/EspacePro.css';

const Espacepro = () => {
    return (
        <section className="espaceProPage">

            <div className="formWrapper">

            
                <h1>Mon espace professionnel</h1>

                <ConnexionForm />
                
            </div>
           
        </section>
    )
}

export default Espacepro;