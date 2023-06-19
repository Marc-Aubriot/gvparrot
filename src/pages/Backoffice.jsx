/* dependencies */
import { Outlet } from "react-router-dom";
import { useLoaderData  } from "react-router-dom";
import axios from 'axios';

import { useState, useEffect } from 'react';

/* components */
import BackofficeNavbar from "./components/BackofficeNavbar";
import Logo from "./components/Logo";

/* styles */
import "./styles/Backoffice.css";

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}

const Backoffice = () => {
    /* url parameter loader*/
    const { params } = useLoaderData();
    const [user, setUser] = useState([]);
  
    useEffect( ()=> {
        const getUserStatut = () => {
            /* axios payload */
            const inputs = `action=getUserStatut&id=${params.id}`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data; 
                setUser([rawdata, params.id]);

            })
        }
        getUserStatut();

    }, [])

    return (
        <>
            <header className="backofficeHEADER">
                <Logo />
                <BackofficeNavbar user={user[0]} id={user[1]} />
            </header>

            <Outlet context={[user, setUser]} />

            
        </>
    )
}

export default Backoffice;