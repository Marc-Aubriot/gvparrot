/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* styles */
import './styles/AddCar.css';

const AddCar = () => {
    const [carList, setCarList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();

    useEffect( () => {

        const getCarListAndEquipements = () => {
            const inputs = `action=getCarList`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('&'); 

                let data = [];

                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });

                data.pop();

                setCarList(data);

                setIsLoading(false);
            });
        }

        getCarListAndEquipements();

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
    const equips = [
        "Régulateur", "Limiteur de vitesse", "Radar de recul", "Sellerie en cuir", "Régulateur adaptatif", "Radar avant", "Avertisseurs d'angle mort",
        "Sigèe chauffant", "Afficage tête haute", "Attelage", "Connexion bluetooth"
    ];
    
    return (
        <div>

            <form>

                <h3>Informations générales</h3>
                <div>
                    <label htmlFor="titre">Titre</label>
                    <input type="text" name="titre"/>
                </div>

                <div>
                    <label htmlFor="descript">Modèle</label>
                    <input type="text" name="descript"/>
                </div>

                <div>
                    <label htmlFor="boite">Boîte</label>
                    <select name="boiteSelector" id="boiteSelector">
                        <option value="manuelle">Manuelle</option>
                        <option value="automatique">Automatique</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="carburant">Carburant</label>
                    <select name="carburantSelector" id="carburantSelector">
                        <option value="essence">Essence</option>
                        <option value="disele">Diesel</option>
                        <option value="electrique">Electrique</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="kilometrage">Kilométrage</label>
                    <input type="text" name="kilometrage"/>
                </div>

                <div>
                    <label htmlFor="annee">Année</label>
                    <input type="text" name="annee"/>
                </div>

                <div>
                    <label htmlFor="prix">Prix</label>
                    <input type="text" name="prix"/>
                </div>

                <h3>Les plus</h3>
                <h3>Equipements</h3>
                {
                    equips.map( (e,i) => {
                        return (
                            <div>
                                <input type="checkbox" id={e} name={e} key={i}/>
                                <label htmlFor={"e"}>{e}</label>
                            </div>
                        )
                    })
                }

                <div>
                    <label htmlFor="autres">Autres</label>
                    <input type="text"name="autres" />
                </div>

                <h3>Détails</h3>
                <div>
                    <label htmlFor="couleur">Couleur</label>
                    <input type="text" name="couleur"/>
                </div>

                <div>
                    <label htmlFor="puissancefiscale">Puissance fiscale</label>
                    <input type="text" name="puissancefiscale"/>
                </div>

                <div>
                    <label htmlFor="puissancereelle">Puissance réelle</label>
                    <input type="text" name="puissancereelle"/>    
                </div>

                <div>
                    <label htmlFor="rapports">Rapports</label>
                    <input type="text" name="rapports"/>
                </div>

                <div>
                    <label htmlFor="places">Places</label>
                    <select name="places" id="places">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="portes">Portes</label>
                    <select name="portes" id="portes">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="garantie">Garantie</label>
                    <input type="text" name="garantie"/>
                </div>

                <div>
                    <label htmlFor="critair">Crit'Air</label>
                    <select name="critair" id="critair">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default AddCar;