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
      
      <Outlet />

      <Footer />
    </>
  );
}

export default App;
