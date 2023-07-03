/* dependencies */
import { useLoaderData, useNavigate  } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from "react-cookie";

/* components */
import Spinner from "./Spinner";

/* styles */

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

// page de Logout, efface les cookies de sessions
const Logout = () => {
    // url parameter loader, récupère les informations de l'utilisateur et son id 
    const { params } = useLoaderData();
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies();

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);
  
    // envoit une requête pour effacer les infos de sessions côté serveur 
    useEffect( ()=> {
        const removeSessionUser = () => {
            const id = params.id;
            const token = cookie.userToken;
            const inputs = `action=deleteUserSession&id=${id}&token=${token}`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                const data = response.data; 

                // à la confirmation de la suppression de la session, on supprime localement les cookies
                removeCookie('userToken', { path: '/' });

                setIsloading(false);

            })
        }
        removeSessionUser();

    }, [params])

    return (
        <div>
            {
                isLoading ?
                <Spinner />
                :
                <div>
                    <p className="responseText">Vous êtes déconnecté.</p>
                </div>
            }
        </div>
    )
}

export default Logout;