/* dependencies */
import { Link } from 'react-router-dom';

/* styles */
import './styles/Service.css';

/* components */
import NavSnippet from './components/NavSnippet';

/* ressources */
import heroImg from '../ressources/images/front/article2.jpg';

const Service = (props) => {
    return (
        <>
            <div>
                <h1 className='heroTitle ffrighteous' id="serviceHeroTitle">{props.title}</h1>
                <img src={heroImg} alt="mécanique" className='heroBanner'/>
            </div>

            <NavSnippet />

            <section className='servicesDescription'>
                <h2>Freinage</h2>

                <h3>Plaquettes de frein</h3>
                <p>Le remplacement des plaquettes de frein est une opération essentielle de l'entretien des freins d'un véhicule. Les plaquettes de frein sont des composants clés qui créent la friction nécessaire pour ralentir et arrêter le véhicule lorsque vous appuyez sur la pédale de frein.</p>

                <h3>Disques de frein</h3>
                <p>Le remplacement des disques de frein est une opération essentielle pour maintenir un système de freinage sûr et efficace. Les disques de frein, également appelés rotors, sont les composants sur lesquels les plaquettes de frein appuient pour ralentir et arrêter le véhicule.</p>
            
                <h3>Étriers de frein</h3>
                <p>Les étriers de frein sont des composants essentiels du système de freinage. Ils abritent les plaquettes de frein et sont responsables de l'application de la pression sur les disques de frein pour ralentir ou arrêter le véhicule.</p>

                <h3>Flexibles de frein</h3>
                <p>Les flexibles de frein sont des tuyaux en caoutchouc renforcés qui relient les étriers aux conduites de frein. Ils permettent le transfert du liquide de frein sous pression depuis le système de freinage vers les étriers, permettant ainsi le mouvement des plaquettes de frein pour freiner les roues.</p>

                <h3>Purge du liquide de frein</h3>
                <p>La purge du liquide de frein est une opération qui consiste à éliminer l'air emprisonné dans le système de freinage et à remplacer le liquide de frein usagé par du liquide neuf. Cela garantit le bon fonctionnement et la performance du système de freinage.</p>

            </section>
        </>
    )
}

export default Service;