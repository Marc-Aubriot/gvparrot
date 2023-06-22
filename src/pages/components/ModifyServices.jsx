/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* components */
import Spinner from './Spinner';

/* styles */
import './styles/ModifyServices.css';

const ModifyServices = () => {

    const [formSend, setFormSend] = useState(false);
    const [response, setResponse] = useState();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [toggleForm, setToggleForm] = useState(false);

    useEffect( ()=> {
        const getServices = () => {

            const inputs = `action=getServiceList&categorie=all`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });

                data.pop();

                setServices(data);
                setIsLoading(false);
            });
        }

        getServices();
        if (reload) { setReload(false); };

    }, [reload]);

    const modifyValue = (e) => {
        const elementToModify = document.getElementById(e.target.id);

        const root = document.getElementById('root');
        const bgdiv = document.createElement('div');
        bgdiv.className = 'bgdiv-modal';
        root.appendChild(bgdiv);

        const div = document.createElement('div');
        div.className = 'modal';
        bgdiv.appendChild(div);

        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'modal-inputWrapper';
        div.appendChild(inputWrapper);

        const p = document.createElement('p');

        if ( e.target.id.charAt(0) === 'p' ) {
            p.textContent = 'Categorie';
        } else if ( e.target.id.charAt(0) === 'a' ) {
            p.textContent = 'Subcategorie';
        } else if ( e.target.id.charAt(0) === 'g' ) {
            p.textContent = 'Titre';
        } else if ( e.target.id.charAt(0) === 'e' ) {
            p.textContent = 'Description';
        };

        inputWrapper.appendChild(p);

        const input = document.createElement('input');
        input.id = 'newInput';
        input.defaultValue = e.target.textContent;
        input.className = 'modal-input';
        inputWrapper.appendChild(input);

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'modal-btnWrapper';
        div.appendChild(btnWrapper);

        const closeBtn = document.createElement('button');
        closeBtn.className = "modal-closeBtn";
        closeBtn.textContent = 'Fermer';
        closeBtn.addEventListener('click', () => {
            bgdiv.remove();
        });
        btnWrapper.appendChild(closeBtn);

        const btn = document.createElement('button');
        btn.textContent = 'Enregistrer';
        btn.id = `btn-${e.target.id}`;
        btn.className = "modal-btn";
        btn.addEventListener('click', () => {
            elementToModify.textContent = input.value;
            elementToModify.className = 'highlight';
            bgdiv.remove();
        });
        btnWrapper.appendChild(btn);
    }

    const deleteService = (e) => {
        e.preventDefault();

        const input = `action=deleteService&ID=${e.target.id}`;
        axios.post(process.env.REACT_APP_SERVEURHTTP, input).then(function(response) {

            const rawdata = response.data;
            setResponse(rawdata);
            setReload(true);
            setFormSend(true);
        });
    }

    /* envoi le formulaire avec axios et le built in FORMDATA class */
    const sendForm = (e) => {
        e.preventDefault(e);
        
        const element0 = document.getElementById(`p-${e.target.name}-0`);
        const element1 = document.getElementById(`a-${e.target.name}-1`);
        const element2 = document.getElementById(`g-${e.target.name}-2`);
        const element3 = document.getElementById(`e-${e.target.name}-3`);

        const formData = new FormData();

        formData.append('ID', e.target.id);
        formData.append('categorie', element0.textContent);
        formData.append('subcategorie', element1.textContent);
        formData.append('title', element2.textContent);
        formData.append('descript', element3.textContent);
        formData.append('action', 'modifyServices');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            const rawdata = response.data;
            setResponse(rawdata);
            setReload(true);
            setFormSend(true);
        });
    }

    const toggleHandler = () => {
        setToggleForm( prev => !prev );
    }

    const sendForm2 = (e) => {
        e.preventDefault(e);

        const formData = new FormData();

        formData.append('categorie', e.target[0].value);
        formData.append('subcategorie', e.target[1].value);
        formData.append('title', e.target[2].value);
        formData.append('descript', e.target[3].value);
        formData.append('action', 'addService');

        axios.post(process.env.REACT_APP_SERVEURHTTP, formData).then(function(response) {
            const rawdata = response.data;
            setResponse(rawdata);
            setReload(true);
            setFormSend(true);
        });
    }

    return (
        <div className='modifyServicesWrapper'>

            <h2 className="modifyServcesTitle">Ajouter, modifier ou supprimer un service. Cliquer sur le texte pour le modifier et ensuite valider les modifications.</h2>
            {
                formSend ?
                <p className='modifyServicesResponseText'>{response}</p>
                :
                ""
            }

            {
                toggleForm ?
                <div className='modifyServiceAddServiceFormWrapper'>
                    <form onSubmit={sendForm2} className='modifyServiceFormWrapper'>
                        <div className='modifyServiceAddServiceFormField'>
                            <label className='modifyServiceAddServiceLabel' htmlFor='categorie'><b>Categorie</b></label>
                            <input className='modifyServiceAddServiceInput' type="text" name='categorie'/>
                        </div>
                        
                        <div className='modifyServiceAddServiceFormField'>
                            <label className='modifyServiceAddServiceLabel' htmlFor="subcategorie"><b>Subcategorie</b></label>
                            <input className='modifyServiceAddServiceInput' type="text" name='subcategorie'/>
                        </div>

                        <div className='modifyServiceAddServiceFormField'>
                            <label className='modifyServiceAddServiceLabel' htmlFor="titre"><b>Titre</b></label>
                            <input className='modifyServiceAddServiceInput' type="text" name='titre'/>
                        </div>

                        <div className='modifyServiceAddServiceFormField'>
                            <label className='modifyServiceAddServiceLabel' htmlFor="description"><b>Description</b></label>
                            <input className='modifyServiceAddServiceInput' type="text" name='description'/>
                        </div>

                        <div className='modifyServiceAddServiceSubmitBtnWrapper'>
                            <button className='modifyServiceAddServiceSubmitBtn' type='submit'>Enregistrer</button>
                        </div>
                    </form>

                    <div className='modifyServiceCloseAddServiceFormBTNWrapper'>
                        <button  className='modifyServiceCloseAddServiceFormBTN' onClick={toggleHandler}>Fermer</button>
                    </div>
                    
                </div>
                :
                <button className='modifyServicePopAddServiceFormBTN' onClick={toggleHandler}>Ajouter un service</button>
            }

            {
                isLoading ?
                <Spinner />
                :
            
                <div>
                    {
                        services.map( (e,i) => {
                            return (
                                <div key={i} className='modifyServiceField' >

                                    <p onClick={modifyValue} id={`p-${i+1}-0`}>{e[1]}</p>
                                    <p onClick={modifyValue} id={`a-${i+1}-1`}>{e[2]}</p>
                                    <p onClick={modifyValue} id={`g-${i+1}-2`}>{e[3]}</p>
                                    <p onClick={modifyValue} id={`e-${i+1}-3`}>{e[4]}</p>
            
                                    <button id={e[0]} onClick={deleteService} className='modifyServiceDeleteBTN'>Supprimer</button>
                                    <button id={e[0]} name={i+1} onClick={sendForm} className='modifyServiceModifyBTN'>Valider les modifications</button>

                                </div>
                            )
                        })
                    }
                </div>
            }
        
        </div>
        
    )
}

export default ModifyServices;