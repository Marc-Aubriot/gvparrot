/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* styles */
import './styles/AddCar.css';

const AddCar = () => {
    const [carList, setCarList] = useState([]);
    const [equipementList, setEquipementList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();

    useEffect( () => {

        const getCarListAndEquipements = () => {
            const inputs = `action=getCarListAndEquipements`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('#'); 

                // on récupère d'abord la liste des véhicules sous forme de string
                const cars = rawdata[0].split('&');

                let data0 = [];

                cars.forEach(element => {
                    data0.push(element.split('+'));
                });

                data0.pop();

                setCarList(data0);


                // on récupère ensuite la liste des équipements standard sous forme de string
                const equips = rawdata[1].split('&');

                let data1 = [];

                equips.forEach(element => {
                    data1.push(element.split('+'));
                })

                data1.pop();

                setEquipementList(data1);


                // si la requête prend du temps, pop le spinner
                setIsLoading(false);
            });
        }

        getCarListAndEquipements();

        if (reload) { setReload(false); };

    }, [reload]);

    const sendForm = (e) => {
        e.preventDefault();

        console.log(e.target[0]);

        const formData = new FormData();
        formData.append('images', e.target[0].value, e.target[0]);
        formData.append('titre', e.target[1].value);
        formData.append('descript', e.target[2].value);



        formData.append('action', 'test');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            
            const data = response.data; 

            setResponse(data);

            setIsLoading(false);

            setReload(true);
        });
    }
    
    return (
        <div>
            
            <h2>Remplir le formulaire pour ajouter une nouvelle voiture au catalogue</h2>
            <form onSubmit={sendForm}>

                <h3>Informations générales</h3>

                <div>
                    <label htmlFor="images">Images</label>
                    <input type="file" name="images" multiple />
                </div>

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
                    equipementList.map( (e,i) => {
                        return (
                            <div key={i}>
                                <input type="checkbox" id={e[1]} name={e[1]} key={i}/>
                                <label htmlFor={`${e[1]}`}>{e[1]}</label>
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

                <div>
                    <button type="submit">Ajouter le véhicule</button>
                </div>
            </form>
        </div>
    )
}

export default AddCar;