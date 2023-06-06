/* dependencies */
import { Form } from "react-router-dom";

/* components */
import Bouton from "./Bouton";

/* styles */
import "./styles/ContactForm.css";

const ContactForm = (props) => {
    return (
        <div className="ContactForm">
            <Form method="post" action={props.action}>

                <div className="field">
                    <label for="nom">Nom</label>
                    <br />
                    <input type="text" id="nom" name="nom"></input>
                </div>

                <div className="field">
                    <label for="prenom">Prénom</label>
                    <br />
                    <input type="text" id="prenom" name="prenom"></input>
                </div>

                <div className="field">
                    <label for="tel">Téléphone</label>
                    <br />
                    <input type="text" id="tel" name="tel"></input>
                </div>

                <div className="field">
                    <label for="mail">Email</label>
                    <br />
                    <input type="email" id="mail" name="mail"></input>
                </div>
                
                <div className="field">
                    <label for="sujet">Sujet</label>
                    <br />
                    <input type="text" id="sujet" name="sujet"></input>
                </div>

                <div className="field">
                    <label for="message">Message</label>
                    <br />
                    <textarea id="message" name="message"></textarea>
                </div>

                <div className="fieldBtn">
                    <Bouton text="Envoyer" type="submit"></Bouton>
                </div>
                
            </Form>
        </div>
    )
}

export default ContactForm;