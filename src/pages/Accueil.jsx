/* dependencies */
import { Link } from 'react-router-dom';

/* styles */
import './styles/Accueil.css';

/* components */
import Bouton from './components/Bouton';
import CommentCard from './components/CommentCard';

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
            

            <section>

                <h2>SECTION TITLE : SERVICE - CARROSSERIE</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/carrosserie'} className='sectionLink'>Voir tous les services de carrosserie</Link>
                </div>

                <img src={img1} alt="une voiture neuve"/>

            </section>

            <section>

                <h2>SECTION TITLE : SERVICE - MECANIQUE</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/mecanique'} className='sectionLink'>Voir tous les services de mécanique</Link>
                </div>

                <img src={img2} alt="mécanique d'une voiture"/>

            </section>

            <section>

                <h2>SECTION TITLE : SERVICE - ENTRETIENS</h2>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>

                <div className='linkwrapper'>
                    <Link to={'/entretien'} className='sectionLink'>Voir tous les services d'entretien'</Link>
                </div>

                <img src={img3} alt="entretien d'une voiture"/>

            </section>

            <section className='bandSection'>
                <h3>Découvrez nos voitures d'occasions</h3>
                <div className="bandSectionBtn">
                    <Bouton text="Voitures d'occasions" linkstring="/occasions"></Bouton>
                </div>
                
            </section>

            <section>

                <h2>SECTION TITLE : A PROPOS</h2>

                <img src={img4} alt="staff & client"/>

                <div className='textwrapper'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                </div>
                
            </section>

            <section>
                <h2>SECTION TITLE : AVIS</h2>
                <CommentCard nom="Jacques" rating="5/5" comment='"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."'/>
                
                <div className='avisBtnBox'>
                    <Bouton text="Laisser un avis"></Bouton>
                    <Bouton text="Voir tous les avis"></Bouton>
                </div>
                
            </section>
        </>
    )
}

export default Accueil;