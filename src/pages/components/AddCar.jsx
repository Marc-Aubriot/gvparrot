/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/AddCar.css';

// fonctionnalité pour ajouté un véhicule dans la BDD
const AddCar = () => {
    // hooks liste des véhicules et liste des équipements
    const [carList, setCarList] = useState([]);
    const [equipementList, setEquipementList] = useState([]);

    // hook de fonctionnement de page
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();

    // récupère la liste des véhicules et équipements dans la BDD
    useEffect( () => {

        const getCarListAndEquipements = () => {

            // requête au back end via axios
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getCarListAndEquipements`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('#'); 

                // on récupère d'abord la liste des véhicules sous forme de string qu'on convertit en array
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

                setIsLoading(false); // les données sont récupérées, on interrompt le spinner et on affiche les données
            });
        }

        getCarListAndEquipements();

        if (reload) { setReload(false); };

    }, [reload]);

    // envoit les données du formulaire au serveur qui va ensuite ajouté une nouvelle ligne en BDD à la table "voitures"
    const sendForm = (e) => {

        e.preventDefault();
        
        // on récupère les values des checkbox de la section équipement, qu'on transforme en un string
        const count = equipementList.length;
        let tempArray = [];

        for ( let i = 0; i < count; i++) {
            const checkbox = document.getElementById(`checkbox-${i}`);
            const check = checkbox.checked;

            if (check) {
                tempArray.push(checkbox.name);
            }
        }

        // data['a','b','c'] > data 'a,b,c > data 'a+b+c'
        let tempString = tempArray.toString('+'); 
        const equipements = tempString.replaceAll(',', '+'); 

        // on récupère les values des checkbox de la section les plus, qu'on transforme en un string
        const countlesplus = equipementList.length;
        let tempArrayLesplus = [];

        for ( let i = 0; i < countlesplus; i++) {
            const checkbox = document.getElementById(`lesplus-${i}`);
            const check = checkbox.checked;

            if (check) {
                tempArrayLesplus.push(checkbox.value);
            }
        }

        // data['a','b','c'] > data 'a,b,c > data 'a+b+c'
        let tempStringLesPlus = tempArrayLesplus.toString('+'); 
        const lesplusToAppend = tempStringLesPlus.replaceAll(',', '+'); 

        // on récupère les values des checkbox de la section détails, qu'on transforme en un string
        const details = `${e.target[8].value}+${e.target[9].value}+${e.target[10].value}+${e.target[11].value}+${e.target[12].value}+${e.target[13].value}+${e.target[14].value}`;


        // récupère les images uploadées
        const imgs = e.target[0].files;

        //const config = { headers: { 'Content-Type': 'multipart/form-data' } };


        // on prépare le formulaire
        const formData = new FormData();

        // on append chaque file uploadée
        for (let i=0; i<imgs.length; i++) {
            formData.append(`file-${i}`, imgs[i]);
        }

        // on envoit le nombre de files dans le formulaire pour le traitement
        formData.append(`file-count`, imgs.length);

        // on attache toutes les données et on l'envoit
        formData.append('titre', e.target[1].value);
        formData.append('descript', e.target[2].value);
        formData.append('boite', e.target[3].value);
        formData.append('carburant', e.target[4].value);
        formData.append('kilometrage', e.target[5].value);
        formData.append('annee', e.target[6].value);
        formData.append('prix', e.target[7].value);
        formData.append('lesplus', lesplusToAppend);
        formData.append('equipements', equipements);
        formData.append('details', details);
        formData.append('action', 'addCar');
        formData.append('apikey', process.env.REACT_APP_APIKEY);

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            
            const data = response.data; 

            setResponse(data); // affiche la réponse du serveur

            setIsLoading(false); // interrompt le spinner

            setReload(true); // reload le composant avec les nouvelles données reçues
        });
    }

    // UX: check la possiblité de téléversement des fichiers au moment de l'input
    const handleUpload = (e) => {
        // récupère les images uploadées
        const fileInput = document.getElementById('fileInput');
        const imgs = fileInput.files;

        //const config = { headers: { 'Content-Type': 'multipart/form-data' } };


        // on prépare le formulaire
        const formData = new FormData();

        // on append chaque file uploadée
        for (let i=0; i<imgs.length; i++) {
            formData.append(`file-${i}`, imgs[i]);
        }

        // on envoit le nombre de files dans le formulaire pour le traitement
        formData.append(`file-count`, imgs.length);

        // on attache toutes les données et on l'envoit
        formData.append('action', 'checkImg');
        formData.append('apikey', process.env.REACT_APP_APIKEY);

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            
            const data = response.data; 

            setResponse(data); // affiche la réponse du serveur

            setIsLoading(false); // interrompt le spinner

            setReload(true); // reload le composant avec les nouvelles données reçues
        });
    }

    // le composant render un formulaire dans l'espace backoffice > employé qui sert à ajouter une nouvelle voiture
    return (
        <div className="addCarPage">
            <h2 className="addCarPageTitle">Remplir le formulaire pour ajouter une nouvelle voiture au catalogue</h2>
            
            {
                response ?
                <p className="responseText">{response}</p>
                :
                ''
            }

            <form onSubmit={sendForm} id="FormVoiture">

                <div className="addCarFormContentWrapperTopBox">
                    <div className="addCarFormSectionWrapper">
                        <h3 className="AddCarFormTitle">Informations générales</h3>

                        <div className="addCarPageInputField">
                            <label htmlFor="images" className="addCarPageInputFieldLabel">Images</label>
                            <input type="file" id="fileInput" name="images" multiple onChange={handleUpload} className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="titre" className="addCarPageInputFieldLabel">Titre</label>
                            <input type="text" name="titre" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="descript" className="addCarPageInputFieldLabel">Modèle</label>
                            <input type="text" name="descript" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="boite" className="addCarPageInputFieldLabel">Boîte</label>
                            <select name="boiteSelector" id="boiteSelector" className="addCarPageInputFieldInput">
                                <option value="Manuelle">Manuelle</option>
                                <option value="Automatique">Automatique</option>
                            </select>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="carburant" className="addCarPageInputFieldLabel">Carburant</label>
                            <select name="carburantSelector" id="carburantSelector" className="addCarPageInputFieldInput">
                                <option value="Essence">Essence</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electrique">Electrique</option>
                            </select>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="kilometrage" className="addCarPageInputFieldLabel">Kilométrage (km)</label>
                            <input type="text" name="kilometrage" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="annee" className="addCarPageInputFieldLabel">Année</label>
                            <input type="text" name="annee" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="prix" className="addCarPageInputFieldLabel">Prix (€)</label>
                            <input type="text" name="prix" className="addCarPageInputFieldInput"/>
                        </div>
                    </div>

                    <div className="addCarFormSectionWrapper">
                        <h3 className="AddCarFormTitle">Détails</h3>
                        <div className="addCarPageInputField">
                            <label htmlFor="couleur" className="addCarPageInputFieldLabel">Couleur</label>
                            <input type="text" name="couleur" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="puissancefiscale" className="addCarPageInputFieldLabel">Puissance fiscale (cv)</label>
                            <input type="text" name="puissancefiscale" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="rapports" className="addCarPageInputFieldLabel">Rapports</label>
                            <input type="text" name="rapports" className="addCarPageInputFieldInput"/>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="places" className="addCarPageInputFieldLabel">Places</label>
                            <select name="places" id="places" className="addCarPageInputFieldInput">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="portes" className="addCarPageInputFieldLabel">Portes</label>
                            <select name="portes" id="portes" className="addCarPageInputFieldInput">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="garantie" className="addCarPageInputFieldLabel">Garantie (mois)</label>
                            <select name="garantie" className="addCarPageInputFieldInput" >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                            </select>
                        </div>

                        <div className="addCarPageInputField">
                            <label htmlFor="critair" className="addCarPageInputFieldLabel">Crit'Air</label>
                            <select name="critair" id="critair" className="addCarPageInputFieldInput">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    isLoading ?
                    <Spinner />
                    :
                    <>
                        <div className="addCarFormContentWrapperBotBox">
                            <div className="addCarFormSectionWrapper">
                                <h3 className="AddCarFormTitle">Equipements</h3>
                                {
                                    equipementList.map( (e,i) => {
                                        return (
                                            <div className="addCarPageInputField" key={i}>
                                                <input type="checkbox" id={`checkbox-${i}`} name={e[1]} className="addCarPageInputFieldInput" key={i} />
                                                <label htmlFor={`${e[1]}`}>{e[1]}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="addCarFormSectionWrapper">
                                <h3 className="AddCarFormTitle">Les plus</h3>
                                {
                                    equipementList.map( (e,i) => {  
                                    

                                        return (
                                            <div key={i}>
                                                
                                                <div className="addCarPageInputField" key={i}>
                                                    <input type="checkbox" id={`lesplus-${i}`} name={`lesplus-${e[1]}`} value={e[1]} className="addCarPageInputFieldInput" key={i} />
                                                    <label htmlFor={`lesplus-${e[1]}`}>{e[1]}</label>
                                                </div>
                                                    
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </>
                }

                <div className="addCarPageFormSubmitBtnWrapper">
                    <button type="submit" id="formSubmiter" className="addCarPageFormSubmitBtn">Ajouter le véhicule</button>
                </div>

            </form>

        </div>
    )
}

export default AddCar;