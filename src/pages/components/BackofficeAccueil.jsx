/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/BackofficeAccueil.css';

// Contenu de la page d'accueil du Back office
const BackofficeAccueil = () => {
    // hooks data user, data messages
    const [user] = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);

    // récupère les messages dans la BDD via axios si l'utilisateur est un employé
    useEffect( () => {
        const getMessages = () => {

            const inputs = `action=getMessages&q=viewedfalse`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('&'); 

                let data = [];

                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });

                data.pop();

                setMessages(data);

                setIsLoading(false);
            });
        }

        if ( user[0] === "Employé" ) { 
            getMessages(); 
        } else if ( user[0] === "Administrateur" ) {
            setIsLoading(false);
        }
        if (reload) { setReload(false); };
    }, [reload, user]);

    // marque les messages comme lu dans la BDD
    const checkAsViewed = (e) => {
        const id = e.target.id;
        const inputs = `action=verifyMessage&q=y&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                //const data = response.data; 

                setReload(true);
            }
        );
    }

    // Load le contenu de l'espace de travail en fonction du statut de l'user ("Administrateur" ou "Employé")
    return (
        <div className="backofficeAccueilPageWrapper">
            {
                user[0] === "Employé" ? 
                <h2 className="backofficeAccueilPageTitle">{messages.length > 0 ? `Vous avez ${messages.length} ${messages.length === 1 ? 'nouveau message' : 'nouveaux messages'}` : "Vous n'avez aucun nouveau message"}</h2>
                :
                <h2 className="backofficeAccueilPageTitle">Espace de travail Administrateur</h2>
            }
            
            {
                isLoading ?
                <Spinner />
                :
                messages.map( (e,i) => {
                    
                    return (                
                        <div key={i} className="backofficeACcueilPageMessageWrapper">

                            <div className="backofficeAccueilPageMessageField">
                                <p className="backofficeAccueilPageMessageLabel"><b>Expéditeur:</b></p>
                                <p className="backofficeAccueilPageMessageContent">
                                    <a href={`mailto:${e[4]}?subject=${e[5]}&body=Réponse à votre message: ${e[6]}`}>{e[4]}</a>, {e[1]} {e[2]}, {e[3]}
                                </p>
                            </div>

                            <div className="backofficeAccueilPageMessageField">
                                <p className="backofficeAccueilPageMessageLabel"><b>Sujet:</b></p>
                                <p className="backofficeAccueilPageMessageContent">{e[5]}</p>
                            </div>

                            <div className="backofficeAccueilPageMessageField">
                                <p className="backofficeAccueilPageMessageLabel"><b>Message:</b></p>
                                <p className="backofficeAccueilPageMessageContent">{e[6]}</p>
                            </div>
                            
                            <div className="backofficeAccueilPageMessageFieldBTN">
                                <button id={e[0]} onClick={checkAsViewed}>Marqué comme lu</button>
                            </div>
                        </div>

                    )
                    
                })
            }
        </div>
    )
}

export default BackofficeAccueil;