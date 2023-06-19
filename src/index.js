/* dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* root */
import './index.css';
import App from './App';

/* pages front office */
import Accueil from './pages/Accueil';
import Service from './pages/Service';
import Occasions from './pages/Occasions';
import Contact from './pages/Contact';
import ContactWithRef, { loader as refloader } from './pages/ContactWithRef';
import Espacepro from './pages/Espacepro';
import ErrorPage from './pages/ErrorPage';
import ProductPage, { loader as productLoader} from './pages/ProductPage';

/* pages back office */
import Backoffice, { loader as idloader } from './pages/Backoffice';
import Workspace from './pages/components/Workspace';
import AddEmployee from './pages/components/AddEmployee';
import ListEmployee from './pages/components/ListEmployee';
import DetailEmployee from './pages/components/detailEmployee';
import ModifyHoraires from './pages/components/ModifyHoraires';

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
        path: "/contact/:product",
        element: <ContactWithRef />,
        loader: productLoader,
      },{
        path: "/espacepro",
        element: <Espacepro />
      },{
        path: "/occasions/:id",
        element: <ProductPage />,
        loader: refloader,
      }
    ]
  },{
    path: "/backoffice",
    element: <Backoffice />,
    loader: idloader,
    children: [
      {
        path: "/backoffice/:id",
        element: <Workspace />,
        loader: idloader,
        children: [
          {
            path: "/backoffice/:id/addemployee",
            element: <AddEmployee />
          },{
            path: "/backoffice/:id/listemployee",
            element: <ListEmployee />
          },{
            path: "/backoffice/:id/listemployee/:employeeid",
            element: <DetailEmployee />,
            loader: idloader,
          },{
            path: "/backoffice/:id/modifyhoraires",
            element: <ModifyHoraires />
          }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);