/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/ModifyHoraires.css';

const ModifyHoraires = () => {

    const [formSendTrue, setFormSendTrue] = useState(false);
    const [response, setResponse] = useState();
    const [horaires, setHoraires] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        const getHoraires = () => {
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
                setIsLoading(false);
            });
        }
        getHoraires();
    }, []);

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault();
        setFormSendTrue(true);

        const formData = new FormData();

        // LUNDI
        formData.append('lundi-0', e.target[0].value);
        formData.append('lundi-1', e.target[1].value);
        formData.append('lundi-2', e.target[2].value);
        formData.append('lundi-3', e.target[3].value);

        // MARDI
        formData.append('mardi-0', e.target[4].value);
        formData.append('mardi-1', e.target[5].value);
        formData.append('mardi-2', e.target[6].value);
        formData.append('mardi-3', e.target[7].value);

        // MERCREDI
        formData.append('mercredi-0', e.target[8].value);
        formData.append('mercredi-1', e.target[9].value);
        formData.append('mercredi-2', e.target[10].value);
        formData.append('mercredi-3', e.target[11].value);

        // JEUDI
        formData.append('jeudi-0', e.target[12].value);
        formData.append('jeudi-1', e.target[13].value);
        formData.append('jeudi-2', e.target[14].value);
        formData.append('jeudi-3', e.target[15].value);

        // VENDREDI
        formData.append('vendredi-0', e.target[16].value);
        formData.append('vendredi-1', e.target[17].value);
        formData.append('vendredi-2', e.target[18].value);
        formData.append('vendredi-3', e.target[19].value);

        // SAMEDI
        formData.append('samedi-0', e.target[20].value);
        formData.append('samedi-1', e.target[21].value);
        formData.append('samedi-2', e.target[22].value);
        formData.append('samedi-3', e.target[23].value);

        // DIMANCHE
        formData.append('dimanche-0', e.target[24].value);
        formData.append('dimanche-1', e.target[25].value);
        formData.append('dimanche-2', e.target[26].value);
        formData.append('dimanche-3', e.target[27].value);

        formData.append('action', 'modifyHoraires');

        axios.post(`http://localhost:3000/gvparrot/back/public_html/`, formData).then(function(response) {

            /* retourne un string qu'on va transformer en tableau contenant un message et un résultat logique */
            const rawdata = response.data;
            const data = rawdata.split('+');
            setResponse(data);
        });
    }

    return (
        <div className='modifyHorairePageWrapper'>

            <h2 className="modifyHoraireTitle">Veuillez renseigner les champs ce données pour modifier les horaires d'ouverture</h2>

            {
                isLoading ?
                <Spinner />
                :
            
                <form onSubmit={sendForm} className='modifyHoraireForm'>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Lundi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[0][0]} placeholder='Heure début' name='lundi-0'></input>
                                <p> - </p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[0][1]} placeholder='Heure fin' name='lundi-1'></input>
                            </div>
                            <p>/</p>
                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[0][2]} placeholder='Heure début' name='lundi-2'></input>
                                <p> - </p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[0][3]} placeholder='Heure fin' name='lundi-3'></input>
                            </div>
                        </div>
                        
                       
                    </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Mardi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[1][0]} placeholder='Heure début' name='mardi-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[1][1]} placeholder='Heure fin' name='mardi-1'></input>
                            </div>
                            
                            <p>/</p>

                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[1][2]} placeholder='Heure début' name='mardi-2'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[1][3]} placeholder='Heure fin' name='mardi-3'></input>
                            </div>
                        </div>
                       
                    </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Mercredi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[2][0]} placeholder='Heure début' name='mercredi-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[2][1]} placeholder='Heure fin' name='mercredi-1'></input>
                            </div>

                            <p>/</p>

                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[2][2]} placeholder='Heure début' name='mercredi-2'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[2][3]} placeholder='Heure fin' name='mercredi-3'></input>
                            </div>
                        </div>

                       </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Jeudi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[3][0]} placeholder='Heure début' name='jeudi-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[3][1]} placeholder='Heure fin' name='jeudi-1'></input>
                            </div>
                            <p>/</p>

                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[3][2]} placeholder='Heure début' name='jeudi-2'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[3][3]} placeholder='Heure fin' name='jeudi-3'></input>
                            </div>
                        </div>

                      </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Vendredi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[4][0]} placeholder='Heure début' name='vendredi-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[4][1]} placeholder='Heure fin' name='vendredi-1'></input>
                            </div>

                            <p>/</p>

                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[4][2]} placeholder='Heure début' name='vendredi-2'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[4][3]} placeholder='Heure fin' name='vendredi-3'></input>
                            </div>
                        </div>

                     </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Samedi</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[5][0]} placeholder='Heure début' name='samedi-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[5][1]} placeholder='Heure fin' name='samedi-1'></input>
                            </div>

                            <p>/</p>

                                <div className='modifyHoraireSubField2'>
                                    <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[5][2]} placeholder='Heure début' name='samedi-2'></input>
                                    <p>-</p>
                                    <input type="text" className='modifyHoraireFieldInput' defaultValue={horaires[5][3]} placeholder='Heure fin' name='samedi-3'></input>
                                </div>
                            </div>
                        </div>

                    <div className='modifyHoraireField'>
                        <p className='modifyHoraireFieldName'>Dimanche</p>

                        <div className='modifyHoraireInputWrapper'>
                            <div className='modifyHoraireSubField1'>
                                <input type="text" className='modifyHoraireFieldInput'defaultValue={horaires[6][0]} placeholder='Heure début' name='dimanche-0'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput'defaultValue={horaires[6][1]} placeholder='Heure fin' name='dimanche-1'></input>
                            </div>

                            <p>/</p>

                            <div className='modifyHoraireSubField2'>
                                <input type="text" className='modifyHoraireFieldInput'defaultValue={horaires[6][2]} placeholder='Heure début' name='dimanche-2'></input>
                                <p>-</p>
                                <input type="text" className='modifyHoraireFieldInput'defaultValue={horaires[6][3]} placeholder='Heure fin' name='dimanche-3'></input>
                            </div>
                            </div>

                    </div>

                    <div className='modifyHoraireBtnField'>
                        <button type='submit' className='modifyHoraireSubmitBtn'>Enregistrer</button>
                    </div>
                </form>
            }

            {
                formSendTrue ?
                ''
                :
                <p className='modifyHoraireResponseText'>{response}</p>
            }
        </div>
        
    )
}

export default ModifyHoraires;