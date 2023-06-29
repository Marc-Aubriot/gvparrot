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
import ModifyServices from './pages/components/ModifyServices';
import VerifyComments from './pages/components/VerifyComments';
import BackofficeAccueil from './pages/components/BackofficeAccueil';
import MailBox from './pages/components/MailBox';
import AddCar from './pages/components/AddCar';
import ListEquipement from './pages/components/ListEquipement';
import SeeCarList from './pages/components/SeeCarList';
import ModifyCar from './pages/components/ModifyCar';

// routeur
const router = createBrowserRouter([
  // front office
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
  }
  
  //back office
  ,{
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
            path: "/backoffice/:id/accueil",
            element: <BackofficeAccueil />
          },{
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
          },{
            path: "/backoffice/:id/modifyservices",
            element: <ModifyServices />
          },{
            path: "/backoffice/:id/verifycomments",
            element: <VerifyComments />
          },{
            path: "/backoffice/:id/mailbox",
            element: <MailBox />
          },{
            path: "/backoffice/:id/addcar",
            element: <AddCar />
          },{
            path: "/backoffice/:id/equipmentlist",
            element: <ListEquipement />
          },{
            path: "/backoffice/:id/carlist",
            element: <SeeCarList />,
            loader: idloader,
          },{
            path: "/backoffice/:id/carlist/:carref",
            element: <ModifyCar />,
            loader: idloader,
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