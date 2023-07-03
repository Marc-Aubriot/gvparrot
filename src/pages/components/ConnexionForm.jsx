/* dependencies */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

/* styles */
import "./styles/ConnexionForm.css";

// component un formulaire de connexion au back office
const ConnexionForm = (props) => {
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(["userToken"]);
    const [password, setPassword] = useState('');

    // hook envoit du formulaire
    const [formSentTrue, setFormSetTrue] = useState(false);
    const [response, setResponse] = useState([]);

    // envoit le formulaire au serveur pour check les informations de connexion, et en fonction autorise la connexion
    const sendForm = (e) => {
        e.preventDefault();
        setFormSetTrue(true);

        const formData = new FormData();
        formData.append('email', e.target[0].value);
        formData.append('mot_de_passe', e.target[1].value);
        formData.append('action', 'checkCredentials');
        formData.append('apikey', process.env.REACT_APP_APIKEY);

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {

            // retourne un string qu'on passe en tableau, contenant l'accès ou le refus, et un token de connexion ou une id
            const rawdata = response.data;
            const data = rawdata.split('+'); // data[réponse, user id, token]
            setResponse(data);

            if (data[0] === "ok mail et pass") { 
                setCookie("userToken", data[2], { path: "/" });
                navigate(`/backoffice/${data[1]}/accueil`); 
            } else {
                setFormSetTrue(false);
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
                    <label htmlFor="mail">Email</label>
                    <br />
                    <input type="email" id="mail" name="mail" />
                </div>
                
                <div className="field">
                    <label htmlFor="pass">Password</label>
                    <br />
                    <input type="password" id="pass" name="pass" />
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