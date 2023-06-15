/* dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

/* styles */
import './styles/Service.css';

/* ressources */
import heroImg from '../ressources/images/front/article2.jpg';

const Service = (props) => {
    const [serviceList, setServiceList] = useState([]);
    const [activeSubCat, setActiveSubCat] = useState([]);
    let array = [];

    const handleClick = (e) => {
        setActiveSubCat(e.target.innerText);
    }

    /* requête au montage et récupération de la réponse */
    useEffect( ()=> {
    
        const getServiceList = () => {
            /* axios payload */
            const inputs = `action=getServiceList&categorie=${props.title}`;
            axios.post(`http://localhost:3000/gvparrot/back/public_html/`, inputs).then(function(response) {
            
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

    return (
        <main>
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
                            } 
                            
                        })
                    }
                </ul>
            </nav>

            <section className='servicesDescription largeScreenContainer'>
                {
                    serviceList.map( (element,i)  => {

                        if (element[2] === activeSubCat ) {

                            return (
                                <>
                                    <h3 key={`h3-${i}`}>{element[3]}</h3>
                                    <p key={`p-${i}`}>{element[4]}</p>
                                </>
                                
                            )
                        }
                    })
                   
                }
            </section>

        </main>
    )
}

export default Service;