/* dependencies */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/SeeCarList.css';

const SeeCarList = () => {  
    // navigation
    const navigate = useNavigate();

    // hooks
    const [carList, setCarList] = useState([]);
    const [equipementList, setEquipementList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [response, setResponse] = useState();
    const [toggleDetails, setToggleDetails] = useState(false);

    useEffect( () => {

        const getCarListAndEquipements = () => {
            const inputs = `action=getCarListAndEquipements`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('#'); 

                // on récupère d'abord la liste des véhicules sous forme de string
                const cars = rawdata[0].split('&');

                let data0 = [];

                cars.forEach(element => {
                    data0.push(element.split(','));
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

    const modifyCar = (e) => {
        e.preventDefault();
        const ref = e.target.getAttribute('data-ref');

        navigate(`${ref}`);
    }

    const deleteCar = (e) => {
        const id = e.target.id;
        const inputs = `action=deleteCar&id=${id}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const data = response.data; 

                setResponse(data);

                setIsLoading(false);

                setReload(true);
            });
    }
    
    const toggleHandler = () => {
        setToggleDetails( prev => !prev );
    }

    return (
        <div className="modifyCarPage">
            <h2 className="modifyCarPageTitle">Cliquer sur un véhicule de la liste pour le modifier ou le supprimer (Attention! La suppression est irréversible</h2>

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
                <div className="modifyCarPageCarListWrapper">
                    {
                        carList.map( (e,i) => {
                            const imgs = e[1].split('+');
                            const lesPlus = e[9].split('+');
                            const equipements = e[10].split('+');
                            const details = e[11].split('+');

                            return (
                                <div className="modifyCarPageCarCardWrapper" key={i}>

                                    <div className="modifyCarPageCarCardTopBox">
                                        <div className="modifyCarPageCarCardTopLeftBox">
                                            <img src={imgs[0]} alt='voiture' className="modifyCarPageCarCardImg" />
                                        </div>
                                        
                                        <div className="modifyCarPageCarCardTopRightBox">
                                            <h3>{e[2]}</h3>
                                            <h4>{e[3]}</h4>
                                        </div>
                                    </div>
                                   
                                    <div className="modifyCarPageCarCardBotBox">

                                        <div className="modifyCarPageCarCardBotLeftBox">
                                            <p><b>Boîte:</b> {e[4]}</p>
                                            <p><b>Carburant:</b> {e[5]}</p>
                                            <p><b>Kilométrage:</b> {e[6]}Km</p>
                                            <p><b>Année:</b> {e[7]}</p>
                                            <p><b>Prix:</b> {e[8]}€</p>
                                        </div>

                                        <div className="modifyCarPageCarCardBotRightBox">
                                            <div className="modifyCarPageCarCardBtnWrapper">
                                                <button id={e[0]} onClick={toggleHandler} className="modifyCarPageCarCarBtn">Voir détails</button>
                                            </div>
                                            
                                            <div className="modifyCarPageCarCardBtnWrapper">
                                                <button id={e[0]} data-ref={e[12]} onClick={modifyCar} className="modifyCarPageCarCarBtn">Modifier</button>
                                            </div>
                                            
                                            <div className="modifyCarPageCarCardBtnWrapper">
                                                <button id={e[0]} onClick={deleteCar} className="modifyCarPageCarCarBtn BtnDelete">Supprimer</button>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    
                                    {
                                        toggleDetails ?
                                        <div className="detailsBoxWrapper">

                                            <div>
                                                <h5 className="infoSuppTitle">Les plus</h5>
                                                <div className="infoSuppContainer">
                                                    {
                                                        lesPlus.map( (e,i) => {
                                                            
                                                            return (
                                                                <p key={i}>{e}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>

                                            <div>
                                                <h5 className="infoSuppTitle">Equipements</h5>
                                                <div className="infoSuppContainer">
                                                    {
                                                        equipements.map( (e,i) => {
                                                            
                                                            return (
                                                                <p key={i}>{e}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h5 className="infoSuppTitle">Détails</h5>
                                                <div className="infoSuppContainer">
                                                    <p>Couleur: {details[0]}</p>
                                                    <p>Puissance fiscale: {details[1]}</p>
                                                    <p>Portes: {details[2]}</p>
                                                    <p>Places: {details[3]}</p>
                                                    <p>Garantie: {details[4]}</p>
                                                    <p>Crit'Air: {details[5]}</p>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        ""
                                    }
                                   
                                </div>
                            )
                        })
                    }
                </div>
            }
           
        </div>
    )
}

export default SeeCarList;