/* dependencies */
import { Link, useLoaderData, useNavigate  } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";

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
    const [cookie, setCookie, removeCookie] = useCookies();

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);
  
    // envoit une requête pour effacer les infos de sessions côté serveur 
    useEffect( ()=> {
        const removeSessionUser = () => {
            const id = params.id;
            const token = cookie.userToken;
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=deleteUserSession&id=${id}&token=${token}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                //const data = response.data; 

                // à la confirmation de la suppression de la session, on supprime localement les cookies
                removeCookie('userToken', { path: '/' }); 
                navigate(`/espacepro`); 

                setIsloading(false);

            })
        }
        removeSessionUser();

    }, [params, cookie, setCookie, removeCookie, navigate])

    return (
        <div>
            {
                isLoading ?
                <Spinner />
                :
                <div>
                    <p className="responseText">Vous êtes déconnecté.</p>
                    <Link to={'/espacepro'}>
                        <p className="responseText">Retour page de connexion</p>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Logout;