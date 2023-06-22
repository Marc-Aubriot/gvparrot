/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/BackofficeAccueil.css';

const MailBox = () => {
    const [response, setResponse] = useState();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [filter, setFilter] = useState('0');

    useEffect( () => {
        const getMessages = () => {

            const inputs = `action=getMessages&q=all`;
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

        getMessages();
        if (reload) { setReload(false); };
    }, [reload]);

    const checkAsViewed = (e) => {
        const id = e.target.id;

        const inputs = `action=verifyMessage&q=y&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const data = response.data; 

                setResponse(data);

                setReload(true);
            }
        );
    }
    const deleteMessage = (e) => {
        const id = e.target.id;

        const inputs = `action=deleteMessage&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const data = response.data; 

                setResponse(data);

                setReload(true);
            }
        );
    }

    const handleSelectorChange = (e) => {
        const selector = document.getElementById('viewOptionsSelector');
        setFilter(selector.value);
    }

    return (
        <div className="backofficeAccueilPageWrapper">

            <select id="viewOptionsSelector" onChange={handleSelectorChange}>
                <option value={'all'}>Tous les messages</option>
                <option value={'0'} selected='selected'>Messages Non lu</option>
                <option value={'1'} >Messages Lu</option>
            </select>

            <h2 className="backofficeAccueilPageTitle">{messages.length > 0 ? `Vous avez ${messages.length} nouveaux messages` : "Vous n'avez aucun nouveau message"}</h2>
            {
                response ? 
                <p className="responseText">{response}</p>
                :
                ''
            }
            
            {
                isLoading ?
                <Spinner />
                :
                messages.map( (e,i) => {           
                    if ( filter === e[7] || filter === 'all' ) {
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

                            { 
                                e[7] === '0' ?
                                <div className="backofficeAccueilPageMessageFieldBTN">
                                    <button id={e[0]} onClick={checkAsViewed}>Marqué comme lu</button>
                                </div>
                                : 
                                <div className="backofficeAccueilPageMessageFieldBTN">
                                    <button id={e[0]} onClick={deleteMessage}>Supprimer le message</button>
                                </div>
                            }

                        </div>

                    )}
                })
            }
        </div>
    )
}

export default MailBox;