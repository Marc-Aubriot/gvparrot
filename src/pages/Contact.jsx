/* components */
import ContactForm from "./components/ContactForm";

/* styles */
import './styles/Contact.css';


// Page de contact avec un formulaire 
const Contact = () => {
    
    return (
        <section className="contactPage">
            <h1>CONTACT PAGE</h1>
            <ContactForm />
        </section>
    )
}

export default Contact;