/* dependencies */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* styles */
import "./styles/ConnexionForm.css";

// component un formulaire de connexion au back office
const ConnexionForm = (props) => {
    const navigate = useNavigate();

    // hook envoit du formulaire
    const [formSentTrue, setFormSetTrue] = useState([]);
    const [response, setResponse] = useState([]);

    // envoit le formulaire au serveur pour check les informations de connexion, et en fonction autorise la connexion
    const sendForm = (e) => {
        e.preventDefault();
        setFormSetTrue();

        const formData = new FormData();
        formData.append('email', e.target[0].value);
        formData.append('mot_de_passe', e.target[1].value);
        formData.append('action', 'checkCredentials');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            /* retourne un string qu'on va transformer en tableau contenant un message et un résultat logique */
            const rawdata = response.data;
            const data = rawdata.split('+');
            setResponse(data);

            if (data[0] === "ok mail et pass") { 
                navigate(`/backoffice/${data[1]}/accueil`); 
            }

        });
    }

    // render le formulaire de connexion
    return (
        <div className="ConnexionForm">
            {
                response ?
                <p className='responseText'>{response[0]}</p>
                :""
            }


            <form onSubmit={sendForm}>

                <div className="field">
                    <label>Email</label>
                    <br />
                    <input type="email" id="mail" name="mail"></input>
                </div>
                
                <div className="field">
                    <label>Password</label>
                    <br />
                    <input type="password" id="pass" name="pass"></input>
                </div>

                {
                    formSentTrue ?
                    ""
                    :
                    <div className="fieldBtn">
                        <button className="btnComponent" type="submit">Connexion</button>
                    </div>
                }
                
            </form>


        </div>
    )
}

export default ConnexionForm;