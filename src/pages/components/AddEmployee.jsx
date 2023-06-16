/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* style */
import './styles/AddEmployee.css';

const AddEmployee = () => {
    /* hooks des datas fetch par axios */
    const [commentSendTrue, setCommentSendTrue] = useState(false);
    const [response, setResponse] = useState([]);
 

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue(true);

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('prenom', e.target[1].value);
        formData.append('email', e.target[2].value);
        formData.append('mdp1', e.target[3].value);
        formData.append('mdp2', e.target[4].value);
        formData.append('action', 'addEmployee');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }
    return (
        <div className='addEmployeePage'>

            {
                commentSendTrue ?
                <p className='responseText'>{response}</p>
                :
                <div className='addEmployeePageFormWrapper'>
                     <h3 className='instruction'>Veuillez renseigner les informations pour la création d'un nouvel employé</h3>

                    <form onSubmit={sendForm}>
                        
                        <div className="field">
                            <label htmlFor="nom">Nom</label>
                            <br />
                            <input name="nom" type='text' className='inputField'></input>
                        </div>
                    
                        <div className="field">
                            <label htmlFor="prenom">Prénom</label>
                            <br />
                            <input name='prenom' type='text' className='inputField'></input>
                        </div>

                        <div className="field">
                            <label htmlFor='email'>Email</label>
                            <br />
                            <input name='email' type='email' className='inputField'></input>
                        </div>

                        <div className="field">
                            <label htmlFor='mdp1'>Mot de passe</label>
                            <br />
                            <input name='mdp1' type='password' className='inputField'></input>
                        </div>

                        <div className="field">
                            <label htmlFor='mdp2'>Vérifier le mot de passe</label>
                            <br />
                            <input name='mdp2' type='password' className='inputField'></input>
                        </div>

                        <div className="fieldBTN">
                            <button type='submit' className='submitBtn'>Enregistrer</button>
                        </div>
                    </form>
                </div>
            }

        </div>
    )
}

export default AddEmployee;