/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* components */
import Spinner from "./Spinner";

/* styles */
import './styles/ListEquipement.css';

// fonctionnalité affichant la liste des équipements
const ListEquipement = () => {
    // hook liste des équipements
    const [equipements, setEquipements] = useState([]);

    // hook fonctionnels
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();

    // récupère la liste des équipements en BDD
    useEffect( () => {

        const getEquipementList = () => {
            const inputs = `action=getEquipementList`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('&'); 

                let data = [];

                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });

                data.pop();

                setEquipements(data);

                setIsLoading(false);
            });
        }

        getEquipementList();

        if (reload) { setReload(false); };

    }, [reload]);

    // ajouté un équipement en BDD
    const addEquipement = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', e.target[0].value);
        formData.append('action', 'addEquipement');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            
            const data = response.data; 

            setResponse(data);

            setIsLoading(false);

            setReload(true);
        });
    }

    // supprime un équipement de la BDD
    const deleteEquipement = (e) => {
        const id = e.target.id;
        const inputs = `action=deleteEquipement&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const data = response.data; 

                setResponse(data);

                setIsLoading(false);

                setReload(true);
            });
    }

    // retourne une liste des équipements, avec possiblité d'ajout ou de suppression d'équipement
    return (
        <div className="listEquipementPage">
            <h2 className="listEquipementPageTitle">Liste des équipements standard (lors de la création d'un nouveau véhicule)</h2>
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
                <div>
                    <ul className="ListEquipementUL">
                    {
                        equipements.map( (e,i) => {
                            return (
                                <li className="ListEquipementLI" key={i}>
                                    <p className="listEquipementP">{e[1]}</p>
                                    <button className="ListEquipementULBTN" id={e[0]} onClick={deleteEquipement}>Supprimer l'équipement</button>
                                </li>
                            )
                        })
                    }
                    </ul>
                    <form onSubmit={addEquipement}>
                        <label htmlFor="nom">Nouvel équipement</label>
                        <input className="listEquipementInput" type="text" name="nom" id="nom" />

                        <button className="ListEquipementULBTN" type="submit">Enregistrer</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default ListEquipement;