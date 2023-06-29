/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* styles */
import "./styles/ContactForm.css";

// component un formulaire de contact
const ContactForm = () => {
    // hook envoit du formulaire
    const [formSentTrue, setFormSentTrue] = useState([]);
    const [response, setResponse] = useState([]);

    // envoit les informations en BDD
    const sendForm = (e) => {
        e.preventDefault();
        setFormSentTrue();

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('prenom', e.target[1].value);
        formData.append('telephone', e.target[2].value);
        formData.append('email', e.target[3].value);
        formData.append('sujet', e.target[4].value);
        formData.append('content', e.target[5].value);
        formData.append('action', 'sendMessage');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    // render le formulaire de contact
    return (
        <div className="ContactForm">
            {
                response ?
                <p className='responseText'>{response}</p>
                :
                ""
            }


            <form onSubmit={sendForm}>

                <div className="field">
                    <label for="nom">Nom</label>
                    <br />
                    <input type="text" id="nom" name="nom" placeholder='Nom' className='formInput'></input>
                </div>

                <div className="field">
                    <label for="prenom">Prénom</label>
                    <br />
                    <input type="text" id="prenom" name="prenom" placeholder='Prenom' className='formInput'></input>
                </div>

                <div className="field">
                    <label for="tel">Téléphone</label>
                    <br />
                    <input type="text" id="tel" name="tel" placeholder='Telephone' className='formInput'></input>
                </div>

                <div className="field">
                    <label for="mail">Email</label>
                    <br />
                    <input type="email" id="mail" name="mail" placeholder='Email' className='formInput'></input>
                </div>
                
                <div className="field">
                    <label for="sujet">Sujet</label>
                    <br />
                    <input 
                        type="text" 
                        id="sujet" 
                        name="sujet" 
                        placeholder="Sujet"
                        className='formInput'
                    ></input>
                </div>

                <div className="field">
                    <label for="message">Message</label>
                    <br />
                    <textarea id="message" name="message" type='textarea' placeholder='Message' className='formInput'></textarea>
                </div>

                {
                    formSentTrue ?
                    ""
                    :
                    <div className="fieldBtn">
                        <button type="submit" className='btnEnvoyer'>Envoyer</button>
                    </div>
                }

            </form>
      
        </div>
    )
}

export default ContactForm;