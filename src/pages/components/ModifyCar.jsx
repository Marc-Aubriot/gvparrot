/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

/* styles */
import './styles/AddCar.css';

/* components */
import Spinner from './Spinner';

/* data loader */
export async function loader(urlparams) {
    return urlparams;
}


// fonctionnalité permettant de modifier les informations concernant une voiture, ou leurs suppression
const ModifyCar = () => {
    /* url parameter loader*/
    const { params } = useLoaderData();

    // hook informations du véhicule, détails, équipement, les plus, le path des images, le nom des images et une liste d'équipement standard et 
    const [car, setCar] = useState([]);
    const [details, setDetails] = useState([]);
    const [equipement, setEquipement] = useState([]);
    const [lesplus, setLesplus] = useState([]);
    const [rawImgPath, setRawImgPath] = useState();
    const [carImg, setCarImg] = useState([]);
    const [equipementList, setEquipementList] = useState([]);

    // hook fonctionnel
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();


    // récupère les informations du véhicule en BDD
    useEffect( () => {

        const getCarByRef = () => {

            // requête au back end via axios
            const inputs = `action=getCarByRefAndEquipements&ref=${params.carref}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('#'); 

                // on récupère d'abord les datas du véhicule
                const carData = rawdata[0].split(',');
                setCar(carData);

                // on récupère les images du véhicule, d'abord le path existant, et ensuite les noms de fichiers
                setRawImgPath(carData[1]);
                const carImgPath = carData[1].split('+');

                const carImgArray = [];
                carImgPath.forEach(img => {
                    const image = img.split('/');
                    carImgArray.push(image[image.length-1]);

                });
                if (carImgArray.length>1) {
                    setCarImg(carImgArray);
                }

                // on récupère les détails du véhicule
                const carDetail = carData[11].split('+');
                setDetails(carDetail);

                // on récupère les équipements du véhicule
                const carEquipement = carData[10].split('+');
                setEquipement(carEquipement);

                // on récupère les plus du véhicule
                const carPlus = carData[9].split('+');
                setLesplus(carPlus);

                // on récupère ensuite la liste des équipements standard sous forme de string
                const equips = rawdata[1].split('&');

                const data1 = [];

                equips.forEach(element => {
                    data1.push(element.split('+'));
                })

                data1.pop();

                setEquipementList(data1);

                setIsLoading(false); // les données sont récupérées, on interrompt le spinner et on affiche les données
            });
        }

        getCarByRef();

        if (reload) { setReload(false); };

    }, [reload,params]);

    // envoit les données modifiées du véhicule en BDD
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
        const details = `${e.target[9].value}+${e.target[10].value}+${e.target[11].value}+${e.target[12].value}+${e.target[13].value}+${e.target[14].value}+${e.target[15].value}`;


        // récupère les images uploadées
        const fileInput = document.getElementById('fileInput');
        const imgs = fileInput.files;

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };


        // on prépare le formulaire
        const formData = new FormData();

        // on append chaque file uploadée
        if (imgs) {
            for (let i=0; i<imgs.length; i++) {
                formData.append(`file-${i}`, imgs[i]);
            }
        }

        // on envoit le nombre de files dans le formulaire pour le traitement
        if (imgs) {
            formData.append(`file-count`, imgs.length);
        } else {
            formData.append(`file-count`, '0');
        }

        // on envoit le path des images déjà présentes
        if (rawImgPath) {
            formData.append('imgPath', rawImgPath);
            formData.append('imgPathTrue', 'true');
        } else { 
            formData.append('imgPathTrue', 'false');
        }
        
        // on attache toutes les données et on l'envoit
        formData.append('ref', params.carref);
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
        formData.append('action', 'modifyCar');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData, config).then(function(response) {
            
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

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            
            const data = response.data; 

            setResponse(data); // affiche la réponse du serveur

            setIsLoading(false); // interrompt le spinner

            setReload(true); // reload le composant avec les nouvelles données reçues
        });
    }

    // Efface la photo
    const deletePhoto = (e) => {
        e.preventDefault();
        const id = e.target.name;

        // enlève la photo de l'interface
        const removedImg = carImg.splice(id, 1);

        // modifie le path des images originales en enlevant la photo supprimée
        const newPathArray = rawImgPath.split('+');
        const removedPath = newPathArray.splice(id, 1);
        const rawNewStringPath = newPathArray.toString();

        // on update la BDD avec le nouveau string path
        const inputs = `action=deletePhoto&path=${rawNewStringPath}&ref=${params.carref}`;
        axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
            const data = response.data; 

            setResponse(data); // affiche la réponse du serveur

            setIsLoading(false); // interrompt le spinner

            setReload(true); // reload le composant avec les nouvelles données reçues
        });

    }

    // le composant render un formulaire dans l'espace backoffice > employé qui sert à ajouter une nouvelle voiture
    return (
        <div className="addCarPage">
            <h2 className="addCarPageTitle">Modifier les informations du véhicule, puis enregistrer</h2>
            
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
                <>
                    {
                        carImg ?
                        <div className="addCarFormPhotoDiv">
                            <p>Photos:</p>
                            {
                                carImg.map( (e,i) => {
                                    return (
                                        <div id={`div-span-${i}`} key={i} className="addCarFormPhotoDivContent">
                                            <span id={`span-${i}`}> {e}</span>
                                            <button name={i} id={`button-span-${i}`} onClick={deletePhoto}>suppr</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                                    <input type="text" name="titre" className="addCarPageInputFieldInput" defaultValue={car[2]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="descript" className="addCarPageInputFieldLabel">Modèle</label>
                                    <input type="text" name="descript" className="addCarPageInputFieldInput" defaultValue={car[3]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="boite" className="addCarPageInputFieldLabel">Boîte</label>
                                    <select name="boiteSelector" id="boiteSelector" className="addCarPageInputFieldInput" defaultValue={car[4]}>
                                        <option value="Manuelle">Manuelle</option>
                                        <option value="Automatique">Automatique</option>
                                    </select>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="carburant" className="addCarPageInputFieldLabel">Carburant</label>
                                    <select name="carburantSelector" id="carburantSelector" className="addCarPageInputFieldInput" defaultValue={car[5]}>
                                        <option value="Essence">Essence</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electrique">Electrique</option>
                                    </select>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="kilometrage" className="addCarPageInputFieldLabel">Kilométrage (km)</label>
                                    <input type="text" name="kilometrage" className="addCarPageInputFieldInput" defaultValue={car[6]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="annee" className="addCarPageInputFieldLabel">Année</label>
                                    <input type="text" name="annee" className="addCarPageInputFieldInput" defaultValue={car[7]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="prix" className="addCarPageInputFieldLabel">Prix (€)</label>
                                    <input type="text" name="prix" className="addCarPageInputFieldInput" defaultValue={car[8]}/>
                                </div>
                            </div>

                            <div className="addCarFormSectionWrapper">
                                <h3 className="AddCarFormTitle">Détails</h3>
                                <div className="addCarPageInputField">
                                    <label htmlFor="couleur" className="addCarPageInputFieldLabel">Couleur</label>
                                    <input type="text" name="couleur" className="addCarPageInputFieldInput" defaultValue={details[0]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="puissancefiscale" className="addCarPageInputFieldLabel">Puissance fiscale (cv)</label>
                                    <input type="text" name="puissancefiscale" className="addCarPageInputFieldInput" defaultValue={details[1]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="rapports" className="addCarPageInputFieldLabel">Rapports</label>
                                    <input type="text" name="rapports" className="addCarPageInputFieldInput"  defaultValue={details[2]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="places" className="addCarPageInputFieldLabel">Places</label>
                                    <select name="places" id="places" className="addCarPageInputFieldInput"  defaultValue={details[3]}>
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
                                    <select name="portes" id="portes" className="addCarPageInputFieldInput"  defaultValue={details[4]}>
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
                                    <input type="text" name="garantie" className="addCarPageInputFieldInput"  defaultValue={details[5]}/>
                                </div>

                                <div className="addCarPageInputField">
                                    <label htmlFor="critair" className="addCarPageInputFieldLabel">Crit'Air</label>
                                    <select name="critair" id="critair" className="addCarPageInputFieldInput"  defaultValue={details[6]}>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="addCarFormContentWrapperBotBox">

                            <div className="addCarFormSectionWrapper">
                                <h3 className="AddCarFormTitle">Equipements</h3>
                                {
                                    equipementList.map( (e,i) => {
                                        let checkedCheckbox = false;

                                        for ( let iteration = 0; iteration < equipement.length; iteration++ ) {
                                            if ( e[1] === equipement[iteration] ) {
                                                checkedCheckbox = true;
                                            };
                                        };
                                        
                                        return (
                                            <div key={i}>
                                                {
                                                    checkedCheckbox ?
                                                    <div className="addCarPageInputField" key={i}>
                                                        <input type="checkbox" id={`checkbox-${i}`} name={e[1]} className="addCarPageInputFieldInput" key={i} defaultChecked/>
                                                        <label htmlFor={`${e[1]}`}>{e[1]}</label>
                                                    </div>
                                                    :
                                                    <div className="addCarPageInputField" key={i}>
                                                        <input type="checkbox" id={`checkbox-${i}`} name={e[1]} className="addCarPageInputFieldInput" key={i} />
                                                        <label htmlFor={`${e[1]}`}>{e[1]}</label>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="addCarFormSectionWrapper">
                                <h3 className="AddCarFormTitle">Les plus</h3>
                                {
                                    equipementList.map( (e,i) => {  
                                        let checkedCheckbox = false;

                                        for ( let iteration = 0; iteration < lesplus.length; iteration++ ) {
                                            if ( e[1] === lesplus[iteration] ) {
                                                checkedCheckbox = true;
                                            };
                                        };

                                        return (
                                            <div key={i}>
                                                {
                                                    checkedCheckbox ?
                                                    <div className="addCarPageInputField" key={i}>
                                                        <input type="checkbox" id={`lesplus-${i}`} name={`lesplus-${e[1]}`} value={e[1]} className="addCarPageInputFieldInput" key={i} defaultChecked/>
                                                        <label htmlFor={`lesplus-${e[1]}`}>{e[1]}</label>
                                                    </div>
                                                    :
                                                    <div className="addCarPageInputField" key={i}>
                                                        <input type="checkbox" id={`lesplus-${i}`} name={`lesplus-${e[1]}`} value={e[1]} className="addCarPageInputFieldInput" key={i} />
                                                        <label htmlFor={`lesplus-${e[1]}`}>{e[1]}</label>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                             
                            </div>
                            
                        </div>

                        <div className="addCarPageFormSubmitBtnWrapper">
                            <button type="submit" id="formSubmiter" className="addCarPageFormSubmitBtn">Enregistrer</button>
                        </div>

                    </form>
                </>
                }


        </div>
    )
}

export default ModifyCar;