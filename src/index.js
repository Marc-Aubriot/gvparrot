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
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import Backoffice from './pages/Backoffice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
      },{
        path: "/occasions/:id",
        element: <ProductPage />
      },{
        path: "/backoffice",
        element: <Backoffice />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);