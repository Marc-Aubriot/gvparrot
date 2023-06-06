import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer>
            
            <div className='footerTopBox'>
                <div className='addressePanel'>
                    <p>Où nous trouver?</p>
                    <p>6, rue de Bruxelles</p>
                    <p>57370 PHALSBOURG</p>
                    <p>Zone industrielle</p>
                    <p>D46, 57370SCHALBACH</p>
                </div>

                <div className='contactPanel'>
                    <p>Nous contacter</p>
                    <p>Téléphone</p>
                    <p>Email</p>
                    <p>Contact en ligne</p>
                </div>
            </div>

            <div className='footerBotBox'>
                <p>Horaires d'ouvertures</p>
                
                <div className='ouvertureBox'>
                    <div className='daynameBox'>
                        <p>Lundi</p>
                        <p>Mardi</p>
                        <p>Mercredi</p>
                        <p>Jeudi</p>
                        <p>Vendredi</p>
                        <p>Samedi</p>
                        <p>Dimanche</p>
                    </div>
                    
                    <div className='horairesBox'>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>08h00 - 12h00 / 13h00 - 18h00</p>
                        <p>fermé</p>
                    </div>
                </div>
            </div>

            <p>Copyright 2023 - Mentions légales - Charte de confidentialité</p>
        </footer>
    )
}

export default Footer;