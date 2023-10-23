/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* styles */
import './styles/Service.css';

/* ressources */
import heroImg from '../ressources/images/front/article2.jpg';

// Page Services (carrosserie, mécanique et entretien du véhicule)
const Service = (props) => {
    // hooks liste des services et catégorie active
    const [serviceList, setServiceList] = useState([]);
    const [activeSubCat, setActiveSubCat] = useState([]);
    let array = [];

    // set la catégorie cliquée comme la catégorie active
    const handleClick = (e) => {
        setActiveSubCat(e.target.innerText);
    }

    // récupère la liste des services dans la BDD
    useEffect( ()=> {

        const getServiceList = () => {
            const inputs = `apikey=${process.env.REACT_APP_APIKEY}&action=getServiceList&categorie=${props.title}`;
            axios.post(process.env.REACT_APP_SERVEURHTTP, inputs).then(function(response) {
            
                // transforme la réponse (string) en array
                const rawdata = response.data.split('&'); 

                let data = [];
                rawdata.forEach(element => {
                    data.push(element.split('+'));
                });
 
                data.pop();

                setServiceList(data);
                setActiveSubCat(data[0][2]);
            })
        }

        getServiceList();
    }, [props.title]);

    // render le contenu de la page (une navigation inter services et les services)
    return (
        <main className='servicesContainer'>
            <div>
                <img src={heroImg} alt="mécanique" className='heroBanner'/>
                <h1 className='heroTitle ffrighteous' id="serviceHeroTitle">{props.title}</h1>
            </div>

            <nav className='navSnippet largeScreenContainer'>
                <ul>
                    {
                        serviceList.map( (element, index) => {

                            if ( array.indexOf(element[2]) < 0 ) {

                                array.push(element[2]);

                                return (
                                    <li key={index} id={index} onClick={handleClick}>{element[2]}</li>
                                )
                            } else { return ('') }
                            
                        })
                    }
                </ul>
            </nav>

            <section className='servicesDescription largeScreenContainer'>
                {
                    serviceList.map( (element,i)  => {

                        if (element[2] === activeSubCat ) {

                            return (
                                <div className="textwrapper" key={i}>
                                    <h3 key={`h3-${i}`}>{element[3]}</h3>

                                    <div className='textwrapperContainer' key='subdiv-${i}'>
                                        <p key={`p-${i}`}>{element[4]}</p>
                                    </div>
                                    
                                </div>
                                
                            )
                        } else { return ('') }
                    })
                   
                }
            </section>

        </main>
    )
}

export default Service;