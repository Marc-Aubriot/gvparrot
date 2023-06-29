/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* styles */
import './styles/CommentForm.css';
import Bouton from './Bouton';

// component un formulaire de commentaire qui sera envoyé en BDD
const CommentForm = (props) => {
    // hooks envoit du formulaire
    const [commentSendTrue, setCommentSendTrue] = useState([]);
    const [response, setResponse] = useState([]);

    // envoit le commentaire en BDD
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue();

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('note', e.target[1].value);
        formData.append('message', e.target[2].value);
        formData.append('action', 'sendComment');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    // render le formulaire
    return(
        <div className='pageAccueilformWrapper'>
            {
                response ?
                <p className='responseText'>{response}</p>
                :
                ''
            }

            <form onSubmit={sendForm} className='pageAccueilForm'>

                <div className='commentFormField'>
                    <label for="nameField" className='formLabel'>Nom</label>
                    <br />
                    <input id='nameField' name='nameField' type='text' placeholder='Nom' className='formInput'></input>
                </div>
                
                <div className='commentFormField'>
                    <label for="noteField"  className='formLabel'>Note</label>
                    <br />
                    <input id='noteField' name='noteField' type='text' placeholder='Note de 1 à 5' className='formInput'></input>
                </div>

                <div className='commentFormField'>
                    <label for="messageField"  className='formLabel'>Message</label>
                    <br />
                    <input id='messageField' name='messageField' type='text' placeholder='Message' className='formInput'></input>
                </div>

                <div className='commentFormSubmitBtnWrapper'>
                    <button type='submit' className='commentFormSubmitBtn'>Envoyer</button>
                </div>
                
            </form> 

            {
                commentSendTrue ?
                ""
                :
                <div className='commentFormBtnWrapper'>
                    <Bouton type='button' text='retour aux avis' onClick={props.toggle}/>
                </div>
            }
            
        </div>
    )
};

export default CommentForm;