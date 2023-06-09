/* dependencies */
import { Outlet } from "react-router-dom";
import { useLoaderData, Link  } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

/* components */
import BackofficeNavbar from "./components/BackofficeNavbar";
import Logo from "./components/Logo";
import Spinner from './components/Spinner';

/* styles */
import "./styles/Backoffice.css";

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

// Layout de base pour les pages du back office
const Backoffice = () => {
    // url parameter loader, récupère les informations de l'utilisateur et son id 
    const { params } = useLoaderData();
    const [user, setUser] = useState([]);

    // hook de fonctionnement de page
    const [isLoading, setIsloading] = useState(true);
    const [response, setResponse] = useState(false);
  
    // récupère les datas de l'user dans la BDD avec Axios
    useEffect( ()=> {
        const getUserStatut = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getUserStatut&id=${params.id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                const statut = response.data; 
                setUser([statut, params.id]);

                setIsloading(false);

            })
        }
        getUserStatut();

        const checkToken = () => {
            const id = params.id;
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=checkCredentials&q=checkToken&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs, {withCredentials:true}).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                const data = response.data; 

                if ( data !== 'Token OK' ) {
                    setResponse(data);
                }

            })
        }
        checkToken();

    }, [params])

    // render la Navbar au top en version mobile, gauche en desktop; et l'espace de travail dans la zone restante
    return (
        <>
            {
                isLoading ?
                <Spinner />
                :
                <>
                    {
                        response ?
                        <div>
                            <p className="responseText">{response}</p>
                            <p className="responseText">Les fonctionnalités ont étées vérouillées</p>
                            <Link to={'/'}>
                                <p className="responseText">Retour page Accueil</p>
                            </Link>
                        </div>
                        :
                        <>
                            <header className="backofficeHEADER">
                                <Link to={`/backoffice/${params.id}/accueil`}>
                                    <Logo />
                                </Link>
                                
                                <BackofficeNavbar user={user[0]} id={user[1]} />
                            </header>

                            <Outlet context={[user, setUser]} />
                        </>
                    }
            
                </>
            }
            

            
        </>
    )
}

export default Backoffice;