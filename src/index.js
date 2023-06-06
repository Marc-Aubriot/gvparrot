/* dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* root */
import './index.css';
import App from './App';

/* pages */
import Accueil from './pages/Accueil';
import Service from './pages/Service';
import Occasions from './pages/Occasions';
import Contact from './pages/Contact';
import Espacepro from './pages/Espacepro';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />
      },{
        path: "/accueil",
        element: <Accueil />
      },
      {
        path: "/carrosserie",
        element: <Service title="Carrosserie"/>
      },{
        path: "/mecanique",
        element: <Service title="Mecanique"/>
      },{
        path: "/entretien",
        element: <Service title="Entretien"/>
      },{
        path: "/occasions",
        element: <Occasions />
      },{
        path: "/contact",
        element: <Contact />
      },{
        path: "/espacepro",
        element: <Espacepro />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);