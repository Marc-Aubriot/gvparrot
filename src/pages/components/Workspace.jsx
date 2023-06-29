/* dependencies */
import { Outlet, useOutletContext } from 'react-router-dom';

/* styles */
import './styles/Workspace.css';

// Layout et wrapper pour la zone de travail
const Workspace = (props) => {
    // récupère les données user
    const [user, setUser] = useOutletContext();

    // render le Layout
    return (
        <div className='Workspace'>
            <h1 className='workspaceTitle'>Hello {user[0]}</h1>
            <Outlet context={[user, setUser]} />
        </div>
    )
}

export default Workspace;