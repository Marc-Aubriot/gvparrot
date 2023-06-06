/* dependencies */
import { Link } from 'react-router-dom';

/* styles */
import './styles/Accueil.css';

/* components */
import Bouton from './components/Bouton';
import Card from './components/Card';

/* ressources */
import heroImg from '../ressources/images/front/herobanner.jpg';
import img1 from '../ressources/images/front/article1.jpg';
import img2 from '../ressources/images/front/article2.jpg';
import img3 from '../ressources/images/front/article3.jpg';
import img4 from '../ressources/images/front/article4.jpg';

const Accueil = () => {
    return (
        <>
            <div>
                <h1 className='heroTitle'>Vos véhicules se détendent enfin</h1>
                <img src={heroImg} alt="hero banner" className='heroBanner'/>
            </div>
            

            <section className='sectionPanel'>

                <h2 className='sectionTitle'>SECTION TITLE : SERVICE - CARROSSERIE</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/carrosserie'} className='sectionLink'>Voir tous les services de carrosserie</Link>
                </div>

                <img src={img1} alt="une voiture neuve" className='photoSection'/>

            </section>

            <section className='sectionPanel'>

                <h2 className='sectionTitle'>SECTION TITLE : SERVICE - MECANIQUE</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/mecanique'} className='sectionLink'>Voir tous les services de mécanique</Link>
                </div>

                <img src={img2} alt="mécanique d'une voiture" className='photoSection'/>

            </section>

            <section className='sectionPanel'>

                <h2 className='sectionTitle'>SECTION TITLE : SERVICE - ENTRETIENS</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/entretien'} className='sectionLink'>Voir tous les services d'entretien'</Link>
                </div>

                <img src={img3} alt="entretien d'une voiture" className='photoSection'/>

            </section>

            <section className='bandSection'>
                <h3>Découvrez nos voitures d'occasions</h3>
                <div className="bandSectionBtn">
                    <Bouton text="Voitures d'occasions" linkstring="/occasions"></Bouton>
                </div>
                
            </section>

            <section className='sectionPanel2'>

                <h2 className='sectionTitle'>SECTION TITLE : A PROPOS</h2>

                <img src={img4} alt="staff & client" className='photoSection'/>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>
                
            </section>

            <section className='sectionPanel2'>
                <Card />
                <button>Laisser un avis</button>
                <button>Voir tous les avis</button>
            </section>
        </>
    )
}

export default Accueil;