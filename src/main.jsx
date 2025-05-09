import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/index.jsx';
import Accueil from './pages/accueil/accueil.jsx';
import Rapport from './pages/accueil/rapport.jsx';
import Medecins from './pages/accueil/medecins.jsx';
import Fichemedecin from './composant/Fichemedecin.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserProvider } from './context/context.jsx';
import AjouterRapport from './composant/ajouterRapport.jsx';
import ModifierRapport from './composant/modifierRapport.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: 'accueil', element: <Accueil />,
    children: [
      { path: 'rapport', element: <Rapport />,
        children: [
          { path: ':id', element: <AjouterRapport/>},
          { path: ':id', element: <ModifierRapport/>}
        ]},

      { path: 'medecins', element: <Medecins />,
        children: [
          { path: ':id', element: <Fichemedecin /> },
        ]},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Envelopper l'application avec UserProvider */}
      <RouterProvider router={router} /> {/* Configuration du routage */}
    </UserProvider>
  </StrictMode>
);
