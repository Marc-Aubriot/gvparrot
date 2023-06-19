/* dependencies */
import { Outlet, useOutletContext } from 'react-router-dom';

/* styles */
import './styles/Workspace.css';

const Workspace = (props) => {
    const [user, setUser] = useOutletContext();

    return (
        <div className='Workspace'>
            <h1 className='workspaceTitle'>Hello {user[0]}, bon travail :D</h1>
            <Outlet context={[user, setUser]} />
        </div>
    )
}

export default Workspace;