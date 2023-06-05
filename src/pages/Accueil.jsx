/* dependencies */
import { Link } from 'react-router-dom';

/* components */
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
                <h1>Vos véhicules se détendent enfin</h1>
                <img src={heroImg} alt="hero banner" />
            </div>
            

            <section>
                <h2>SECTION TITLE : SERVICE - CARROSSERIE</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                <Link to={'/carrosserie'}>Voir tous les services de carrosserie</Link>
                <img src={img1} alt="article" />
            </section>

            <section>
                <h2>SECTION TITLE : SERVICE - MECANIQUE</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                <Link to={'/mecanique'}>Voir tous les services de mécanique</Link>
                <img src={img2} alt="article" />
            </section>

            <section>
                <h2>SECTION TITLE : SERVICE - ENTRETIENS</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                <Link to={'/entretien'}>Voir tous les services d'entretien'</Link>
                <img src={img3} alt="article" />
            </section>

            <section>
                <h3>Découvrez nos voitures d'occasions</h3>
                <button>Voitures d'occasions</button>
            </section>

            <section>
                <img src={img4} alt="article" />
                <h2>SECTION TITLE : A PROPOS</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
            </section>

            <section>
                <Card />
                <button>Laisser un avis</button>
                <button>Voir tous les avis</button>
            </section>
        </>
    )
}

export default Accueil;