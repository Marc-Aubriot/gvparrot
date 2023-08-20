/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLoaderData  } from "react-router-dom";

/* styles */
import './styles/Contact.css';

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

// Page de contact avec un formulaire pré rempli si l'user vient des products pages
const Contact = () => {
    // url parameter loader
    const { params } = useLoaderData();

    // hooks si le commentaire est envoyé et la référence du produit
    const [formSent, setFormSent] = useState(false);
    const [product, setRef] = useState();

    // hook de fonctionnement de page
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);

    useEffect( ()=> {
        setRef(params.product);
        setLoading(true);
    }, [params])

    // formulaire de contact
    const sendForm = (e) => {
        e.preventDefault();
        setFormSent(true);

        const formData = new FormData();
        formData.append('apikey', process.env.REACT_APP_APIKEY);
        formData.append('nom', e.target[0].value);
        formData.append('prenom', e.target[1].value);
        formData.append('telephone', e.target[2].value);
        formData.append('email', e.target[3].value);
        formData.append('sujet', e.target[4].value);
        formData.append('content', e.target[5].value);
        formData.append('voitureRef', product);
        formData.append('action', 'sendMessage');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    // render la page de contact préremplie
    return (
        <section className="contactPage">
            <h1>CONTACT PAGE</h1>
            <div className="ContactForm">

            {
                response ?
                <p className='responseText'>{response}</p>
                :
                ""
            }
            
            <form onSubmit={sendForm}>

                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <br />
                    <input type="text" id="nom" name="nom" placeholder='Nom' className='formInput' required></input>
                </div>

                <div className="field">
                    <label htmlFor="prenom">Prénom</label>
                    <br />
                    <input type="text" id="prenom" name="prenom" placeholder='Prenom' className='formInput' required></input>
                </div>

                <div className="field">
                    <label htmlFor="tel">Téléphone</label>
                    <br />
                    <input type="text" id="tel" name="tel" placeholder='Telephone' className='formInput' required></input>
                </div>

                <div className="field">
                    <label htmlFor="mail">Email</label>
                    <br />
                    <input type="email" id="mail" name="mail" placeholder='Email' className='formInput' required></input>
                </div>
                
                <div className="field">
                    <label htmlFor="sujet">Sujet</label>
                    <br />
                    <input 
                        type="text" 
                        id="sujet" 
                        name="sujet" 
                        placeholder="Sujet"
                        defaultValue=
                        {
                            loading ?
                            `Reférence du véhicule: ${product}`
                            :
                            ""
                        } 
                        className='formInput'
                        readOnly
                        required
                    ></input>
                </div>

                <div className="field">
                    <label htmlFor="message">Message</label>
                    <br />
                    <textarea id="message" name="message" type='textarea' defaultValue='Je suis intéressé par ce véhicule, merci de me contacter.' className='formInput' required></textarea>
                </div>

                {
                    formSent ?
                    ""
                    :
                    <div className="fieldBtn">
                        <button type="submit" className='btnEnvoyer'>Envoyer</button>
                    </div>
                }
                
            </form>

        </div>
        </section>
    )
}

export default Contact;