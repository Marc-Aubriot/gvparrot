/* styles */
import './styles/NavSnippet.css';

const NavSnippet = (props) => {
    // freinage, échappement,  électronique, transmission, refroidissement
    return (
        <nav className='navSnippet largeScreenContainer'>
            <ul>
                {
                    props.serviceList.map( (element, index) => {

                        if (props.serviceCategorie === element[1]) {

                            props.activeServiceHook(element[2]);
                            console.log(props.activeService)
                            
                            return (
                                <li key={index}>{element[2]}</li>
                            )
                        }
                        
                    })
                }
            </ul>
        </nav>
    )
}

export default NavSnippet;