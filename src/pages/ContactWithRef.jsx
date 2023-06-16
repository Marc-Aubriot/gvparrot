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

const Contact = () => {
    /* url parameter loader*/
    const { params } = useLoaderData();

    /* hooks des datas fetch par axios */
    const [commentSendTrue, setCommentSendTrue] = useState([]);
    const [product, setRef] = useState();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);

    useEffect( ()=> {
        setRef(params.product);
        setLoading(true);
        
    }, [])

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue();

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

    return (
        <section className="contactPage">
            <h1>CONTACT PAGE</h1>
            <div className="ContactForm">
            {
                commentSendTrue ? 
            
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
                            defaultValue=
                            {
                                loading ?
                                `Reférence du véhicule: ${product}`
                                :
                                ""
                            } 
                            className='formInput'
                            readOnly
                        ></input>
                    </div>

                    <div className="field">
                        <label for="message">Message</label>
                        <br />
                        <textarea id="message" name="message" type='textarea' defaultValue='Je suis intéressé par ce véhicule, merci de me contacter.' className='formInput'></textarea>
                    </div>

                    <div className="fieldBtn">
                        <button type="submit" className='btnEnvoyer'>Envoyer</button>
                    </div>
                </form>
                :
                <p className='responseText'>{response}</p>
            }
        </div>
        </section>
    )
}

export default Contact;