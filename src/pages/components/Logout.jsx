/* dependencies */
import { Link, useLoaderData, useNavigate  } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

/* components */
import Spinner from "./Spinner";

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

// page de Logout, efface les cookies de sessions
const Logout = () => {
    // url parameter loader, récupère les informations de l'utilisateur et son id 
    const navigate = useNavigate();
    const { params } = useLoaderData();

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);
    const [response, setResponse] = useState('');
  
    // envoit une requête pour effacer les infos de sessions côté serveur 
    useEffect( ()=> {
        const removeSessionUser = () => {
            const id = params.id;
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=deleteUserSession&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs, { withCredentials: true }).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                const data = response.data; 

                // à la confirmation de la suppression de la session, on supprime localement les cookies
                if ( data === 'Déconnexion OK') {
                    setResponse(data);
                    navigate(`/espacepro`); 
                } else {
                    setResponse(data);
                };

                setIsloading(false);

            })
        }

        removeSessionUser();

    }, [params, navigate])

    return (
        <div>
            {
                isLoading ?
                <Spinner />
                :
                <div>
                    <p className="responseText">{response}</p>
                    <Link to={'/espacepro'}>
                        <p className="responseText">Retour page de connexion</p>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Logout;