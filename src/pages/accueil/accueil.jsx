import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../../context/context';
import Navbar from '../../composant/Navbar';

function Accueil() {
  const location = useLocation();
  const { user, setUser } = useUser();
  const { nom, prenom } = user;

  React.useEffect(() => {
    if (location.state) {
      const { nom, prenom } = location.state;
      setUser({ nom, prenom });
    }
  }, [location.state, setUser]);

  return (
    <>
      <Navbar />
      <h1 className= " flex justify-center items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Bonjour, {nom} {prenom}
      </h1>
      <Outlet />
    </>
  );
}

export default Accueil;
