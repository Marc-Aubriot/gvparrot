/* dependencies */
import { Outlet } from "react-router-dom";

/* components */
import BackofficeHeader from "./components/BackofficeHeader";
import BackofficeNavbar from "./components/BackofficeNavbar";

const Backoffice = () => {
    return (
        <>
            <BackofficeHeader />

            <Outlet />

            <BackofficeNavbar />
        </>
    )
}

export default Backoffice;