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
                        <p>Où nous trouver ?</p>
                        <p>6, rue de Bruxelles</p>
                        <p>57370 PHALSBOURG</p>
                        <p>Zone industrielle</p>
                        <p>D46, 57370SCHALBACH</p>
                    </div>

                    <div className='contactPanel'>
                        <p>Nous contacter</p>
                        <p>Téléphone</p>
                        <p>Email</p>
                        <p>Contact en ligne</p>
                    </div>
                </div>

                <div className='footerBotBox'>
                    <p className='horaireTitle'>Horaires d'ouvertures</p>
                    
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
                                    return (
                                        <p key={i}>{element[0]}-{element[1]} / {element[2]}-{element[3]}</p>
                                    )
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