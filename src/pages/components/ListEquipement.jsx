/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* components */
import Spinner from "./Spinner";

/* */
import './styles/ListEquipement.css';

const ListEquipement = () => {
    const [equipements, setEquipements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();

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