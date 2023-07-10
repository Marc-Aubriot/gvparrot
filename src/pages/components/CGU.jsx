/* styles */
import './styles/CGU.css';

// Page content les mentions légales et les Conditions Générales d'utilisation
const CGU = () => {
    window.scrollTo(0, 0);
    
    return (
        <div className="CGUContentWrapper">
            <h3>Mentions Légales</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque unde totam quam ut nihil cumque doloribus quae! Rerum pariatur numquam exercitationem vel odio, in iste, unde esse blanditiis reprehenderit ratione?</p>

            <h3>Conditions Générales d'utilisation</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint atque autem facere quis molestiae id iure fuga minima odio recusandae, pariatur commodi tempore, debitis non quae, harum maxime voluptate illum.</p>
        </div>
    )
}

export default CGU;