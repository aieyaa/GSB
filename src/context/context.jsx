// context.jsx
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ nom: 'Inconnu', prenom: 'Inconnu'});
  
  const [datavisiteur, setDatavisiteur] = useState('');

  return (
    // <UserContext.Provider value={{ user, setUser } }>
    <UserContext.Provider value={{ user, setUser, datavisiteur, setDatavisiteur }}>
      {children}
    </UserContext.Provider>

  );
};

export const useUser = () => useContext(UserContext);
