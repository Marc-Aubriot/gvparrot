/* dependencies */
import axios from 'axios';
import { useState } from 'react';

/* components */
import PasswordStrength from './PasswordStrength';

/* style */
import './styles/AddEmployee.css';

// fonctionnalité pour ajouté un employé
const AddEmployee = () => {
    // hook envoit du formulaire
    const [formSentTrue, setFormSentTrue] = useState(false);
    const [response, setResponse] = useState([]);
    const [password, setPassword] = useState('');

    // ajoute l'employé en BDD
    const sendForm = (e) => {
        e.preventDefault();
        setFormSentTrue(true);

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('prenom', e.target[1].value);
        formData.append('email', e.target[2].value);
        formData.append('mdp1', e.target[3].value);
        formData.append('mdp2', e.target[4].value);
        formData.append('action', 'addEmployee');
        formData.append('apikey', process.env.REACT_APP_APIKEY);

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    // check la force du password au moment de l'input
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    // render un formulaire contenant les informations à ajouter en BDD
    return (
        <div className='addEmployeePage'>

            {
                response ? 
                <p className='responseText'>{response}</p>
                :
                ""
                
            }

            <div className='addEmployeePageFormWrapper'>
                    <h3 className='instruction'>Veuillez renseigner les informations pour la création d'un nouvel employé</h3>

                <form onSubmit={sendForm}>
                    
                    <div className="field">
                        <label htmlFor="nom">Nom</label>
                        <br />
                        <input name="nom" type='text' className='inputField' />
                    </div>
                
                    <div className="field">
                        <label htmlFor="prenom">Prénom</label>
                        <br />
                        <input name='prenom' type='text' className='inputField' />
                    </div>

                    <div className="field">
                        <label htmlFor='email'>Email</label>
                        <br />
                        <input name='email' type='email' className='inputField' />
                    </div>

                    <div className="field">
                        <label htmlFor='mdp1'>Mot de passe</label>
                        <br />
                        <input name='mdp1' type='password' className='inputField' onChange={passwordChangeHandler} />
                    </div>
                    <PasswordStrength password={password} />

                    <div className="field">
                        <label htmlFor='mdp2'>Vérifier le mot de passe</label>
                        <br />
                        <input name='mdp2' type='password' className='inputField' />
                    </div>

                    {
                        formSentTrue ?
                        ""
                        :
                        <div className="fieldBTN">
                            <button type='submit' className='submitBtn'>Enregistrer</button>
                        </div>
                    }
    
                </form>
            </div>
            

        </div>
    )
}

export default AddEmployee;