/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* styles */
import './styles/Footer.css';
import Spinner from './Spinner';

// component le footer du site en front office
const Footer = () => {
    // hook les datas horaires
    const [horaires, setHoraires] = useState([]);

    // hook fonctionnel
    const [isLoading, setIsloading] = useState(true);

    // récupère les horaires en BDD
    useEffect( ()=> {

        const getHoraires = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getHoraires`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('+'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split(','));
                });

                setHoraires(data);
                setIsloading(false);
            })
        }
        getHoraires();
    }, []);

    return (
        <footer>
            
            <div className='footerContainer'>
            
                <div className='footerTopBox'>
                    <div className='addressePanel'>
                        <h5>Où nous trouver ?</h5>
                        <p> 67 Av. Jean JayJay</p>
                        <p> 31200 Toulouse</p>
                        <p>Zone industrielle</p>
                    </div>

                    <div className='contactPanel'>
                        <h5>Nous contacter</h5>
                        <p>01.50.55.xx.xx</p>
                        <p>garagegvparrot@outlook.fr</p>
                        <Link to={"/contact"}>
                            <p>Contact en ligne</p>
                        </Link>
                        
                    </div>
                </div>

                <div className='footerBotBox'>
                    <h5 className='horaireTitle'>Horaires d'ouvertures</h5>
                    
                    <div className='ouvertureBox'>
                        <div className='daynameBox'>
                            <p>Lundi</p>
                            <p>Mardi</p>
                            <p>Mercredi</p>
                            <p>Jeudi</p>
                            <p>Vendredi</p>
                            <p>Samedi</p>
                            <p>Dimanche</p>
                        </div>
                        
                        <div className='horairesBox'>
                            {
                                isLoading ? 
                                <Spinner />
                                :
                                horaires.map( (element, i) => {
                                    if ( (element[0] === '' || element[1] === '') && (element[2] !== '' || element[3] !== '') ) {
                                        return (
                                            <p key={i}>Fermé / {element[2]}-{element[3]}</p>
                                        );
                                    } else if ( (element[2] === '' || element[3] === '') && (element[0] !== '' || element[1] !== '') ) {
                                        return (
                                            <p key={i}>{element[0]}-{element[1]} / Fermé</p>
                                        );
                                    } else if ( (element[0] === '' || element[1] === '') && (element[2] === '' || element[3] === '') ) {
                                        return (
                                            <p key={i}>Fermé / Fermé</p>
                                        );
                                    };
                                    return (
                                        <p key={i}>{element[0]}-{element[1]} / {element[2]}-{element[3]}</p>
                                    );
                                })
                            }
                           
                            
                        </div>
                    </div>
                </div>

            </div>
            <p>Copyright 2023 - <Link to={'/cgu'}><span className='cgulink'>Mentions légales - Charte de confidentialité</span></Link></p>
        </footer>
    )
}

export default Footer;