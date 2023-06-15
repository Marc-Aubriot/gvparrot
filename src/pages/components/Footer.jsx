/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* styles */
import './styles/Footer.css';
import Spinner from './Spinner';

const Footer = () => {
    const [horaires, setHoraires] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {


        const getHorairesList = () => {
            /* axios payload */
            const inputs = `action=getHoraires`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
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
        getHorairesList();
    }, []);

    return (
        <footer>
            
            <div className='footerContainer'>
            
                <div className='footerTopBox'>
                    <div className='addressePanel'>
                        <p>Où nous trouver?</p>
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
                                        <p>{element[0]}-{element[1]} / {element[2]}-{element[3]}</p>
                                    )
                                })
                            }
                           
                            
                        </div>
                    </div>
                </div>

            </div>
            <p>Copyright 2023 - Mentions légales - Charte de confidentialité</p>
        </footer>
    )
}

export default Footer;