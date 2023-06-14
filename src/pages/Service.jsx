/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* styles */
import './styles/Service.css';

/* components */
import NavSnippet from './components/NavSnippet';

/* ressources */
import heroImg from '../ressources/images/front/article2.jpg';

const Service = (props) => {
    const [serviceList, setServiceList] = useState([]);
    const [activeService, setActiveService] = useState();

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
        const getServiceList = () => {
            /* axios payload */
            const inputs = `action=getServiceList`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });
 
                data.pop();
                setServiceList(data);
            });
        }
        getServiceList();
    }, []);


    return (
        <main>
            <div>
                <img src={heroImg} alt="mécanique" className='heroBanner'/>
                <h1 className='heroTitle ffrighteous' id="serviceHeroTitle">{props.title}</h1>
            </div>

            <NavSnippet serviceList={serviceList} serviceCategorie={props.title} activeService={activeService} activeServiceHook={setActiveService}/>

            <section className='servicesDescription largeScreenContainer'>
                {}
            </section>

        </main>
    )
}

export default Service;