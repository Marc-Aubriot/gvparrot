/* dependencies */
import { Outlet } from "react-router-dom";

/* Styles */
import './App.css';

/* Components */
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';


function App() {
  return (
    <>
      <Header />
    
      <div className="outletContainer">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;
