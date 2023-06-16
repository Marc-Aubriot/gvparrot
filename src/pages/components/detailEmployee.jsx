/* dependencies */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Spinner from "./Spinner";

/* styles */
import './styles/ListEmployee.css';
import './styles/AddEmployee.css';

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

const DetailEmployee = () => {
    /* url parameter loader*/
    const { params } = useLoaderData();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState();
    const [userDeleted, setUserDeleted] = useState(false);
  
    //  
    useEffect( ()=> {
        const getUser = () => {
            /* axios payload */
            const inputs = `action=detailEmployee&id=${params.employeeid}`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data;

                const data = rawdata.split(',');

                setUser(data);
                setIsLoading(false);
            })
        }
        getUser();

    }, [])

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('prenom', e.target[1].value);
        formData.append('email', e.target[2].value);
        formData.append('mdp1', e.target[3].value);
        formData.append('mdp2', e.target[4].value);
        formData.append('id', params.employeeid);
        formData.append('action', 'modifyEmployee');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            const data = response.data;
            setResponse(data);
        });
    }

    const deleteUser = (e) => {
        e.preventDefault();
        /* axios payload */
        const inputs = `action=deleteEmployee&id=${params.employeeid}`;
        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {

            const data = response.data;
            setResponse(data);
            setUserDeleted(true);
        });
    }
    return (
        <div className="listEmployeePage">

            {
                isLoading ?
                <Spinner />
                :
                <div className='addEmployeePageFormWrapper'>
                     <h3 className='instruction'>Veuillez renseigner les informations pour la création d'un nouvel employé</h3>

                    <form onSubmit={sendForm} className={ userDeleted ? 'hideForm' : '' }>
                        
                        <div className="field">
                            <label htmlFor="nom">Nom</label>
                            <br />
                            <input name="nom" type='text' className='inputField' defaultValue={user[1]}></input>
                        </div>
                    
                        <div className="field">
                            <label htmlFor="prenom">Prénom</label>
                            <br />
                            <input name='prenom' type='text' className='inputField' defaultValue={user[2]}></input>
                        </div>

                        <div className="field">
                            <label htmlFor='email'>Email</label>
                            <br />
                            <input name='email' type='email' className='inputField' defaultValue={user[3]}></input>
                        </div>

                        <div className="field">
                            <label htmlFor='mdp1'>Mot de passe</label>
                            <br />
                            <input name='mdp1' type='password' className='inputField' defaultValue={user[4]}></input>
                        </div>

                        <div className="field">
                            <label htmlFor='mdp2'>Vérifier le mot de passe</label>
                            <br />
                            <input name='mdp2' type='password' className='inputField' defaultValue={user[4]}></input>
                        </div>

                        <div className="fieldBTN">
                            <button type='submit' className='submitBtn'>Enregistrer les modifications</button>
                        </div>

                    </form>

                    <div className={ userDeleted ? 'hideForm' : 'fieldBTN' }>
                        <button type="button" onClick={deleteUser} className="submitBtn">Supprimer employé</button>
                    </div>

                    <p className="responseText">{response}</p>
                </div>
            }

        </div>
    )
}

export default DetailEmployee;