/* dependencies */
import { Outlet } from "react-router-dom";
import { useLoaderData  } from "react-router-dom";
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
  
    // récupère les datas de l'user dans la BDD avec Axios
    useEffect( ()=> {
        const getUserStatut = () => {
            /* axios payload */
            const inputs = `action=getUserStatut&id=${params.id}`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array [user statut, user id]
                const statut = response.data; 
                setUser([statut, params.id]);

                setIsloading(false);

            })
        }
        getUserStatut();

    }, [params])

    // render la Navbar au top en version mobile, gauche en desktop; et l'espace de travail dans la zone restante
    return (
        <>
            {
                isLoading ?
                <Spinner />
                :
                <>
                    <header className="backofficeHEADER">
                        <Logo />
                        <BackofficeNavbar user={user[0]} id={user[1]} />
                    </header>

                    <Outlet context={[user, setUser]} />
                </>
            }
            

            
        </>
    )
}

export default Backoffice;