/* dependencies */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

/* styles */
import './styles/ListEmployee.css';

// fonctionnalité affichant une liste des employés
const ListEmployee = () => {
    // hook la liste des employés
    const [userList, setUserList] = useState([]);

    // hook fonctionnel
    const [isLoading, setIsLoading] = useState(true);
  
    // récupère la liste des employés en BDD
    useEffect( ()=> {
        const getUserList = () => {
            /* axios payload */
            const inputs = `action=listEmployee`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data;
                const data = rawdata.split('&');
                data.pop();
                let array = [];

                data.forEach(element => {
                    const row = element.split(',');
                    array.push(row);
                });

                setUserList(array);
                setIsLoading(false);
            })
        }
        getUserList();

    }, [])

    // render une liste des employés et affiche des informations non exhautives
    return (
        <div className="listEmployeePage">
            <h3>Cliquer sur un employé pour voir le détails et modifier ses informations</h3>
            {
                isLoading ?
                <Spinner />
                :
                <ul>
                    {
                        userList.map( (e, i) => {
                            return (
                                <div key={i}>
                                    <Link to={`${e[0]}`}>
                                        <li key={i}>Nom: {e[1]} / Prenom: {e[2]} / Email: {e[3]}</li>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </ul>
                
            }
        </div>
    )
}

export default ListEmployee;