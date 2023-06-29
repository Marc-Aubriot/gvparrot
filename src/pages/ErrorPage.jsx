/* dependencies */
import { useRouteError, Link } from 'react-router-dom';


// Page d'erreur
const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={'/accueil'}><p><b>Retour page d'accueil</b></p></Link>
        </div>
    )
}

export default ErrorPage;