/* dependencies */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* styles */
import "./styles/ConnexionForm.css";

const ConnexionForm = (props) => {
    const navigate = useNavigate();

    /* hooks des datas fetch par axios */
    const [commentSendTrue, setCommentSendTrue] = useState([]);
    const [response, setResponse] = useState([]);

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();
        setCommentSendTrue();

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
                console.log('HOOK');
                navigate(`/backoffice/${data[1]}`); 
            }

        });
    }

    return (
        <div className="ConnexionForm">
            {
                commentSendTrue ?
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

                        <div className="fieldBtn">
                            <button className="btnComponent" type="submit">Connexion</button>
                        </div>
                        
                    </form>
                :
                <p className='responseText'>{response[0]}</p>
            }

        </div>
    )
}

export default ConnexionForm;