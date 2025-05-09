
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../../api/api';    
import Fichemedecin from '../../composant/Fichemedecin';

export default function Medecins() {
  const navigate = useNavigate();
  const [listeVisible, setlisteVisible] = useState(false); //boolean
  const [nomMedecin, setnomMedecin] = useState('');
  const [listeMedecin, setlisteMedecin] = useState([]);
  const [version, setversion] = useState(false); 
  const [medecin, setMedecin] = useState({});

  // appelle l'API
  async function Medecin(lenom) {
    try {
      setversion(true); 
      // const response = await api.get('http://172.16.61.61/restGSB/medecins?nom=v', { // prend le param nom= il commence par v
        const response = await api.get('http://172.16.61.61/restGSB/medecins', { 
        params: { nom: lenom }, });
      return response.data || []; 
    } finally {}
  }

  async function charger(event) {        
    const saisie = event.target.value; 
    setnomMedecin(saisie);
    if (saisie) { 
    // if (saisie > 2) // après 2 caractères
      const results = await Medecin(saisie); 
      setlisteMedecin(results);         // affichage des données par rapport a la saisie
      setlisteVisible(true);
    } else {
      setlisteVisible(false); 
      setlisteMedecin([]);    // affichage vide
    }
  }

  // Récuperer les informations 
  function selectMedecin(lemedecin) {
    console.log('Médecin sélectionné :', lemedecin);
     //garder le nom et le prenom dans le input

    

      // setnomMedecin ({lemedecin.nom} {lemedecin.prenom})
     setnomMedecin(`${lemedecin.nom} ${lemedecin.prenom}`); 
     setMedecin(lemedecin);

      setlisteVisible(false);
    setversion((version) => version + 1);
    navigate(`${lemedecin.id}`); // Naviguer vers l'ID du médecin

  }



  return (
    <>
      <form className=" max-w-md mx-auto">
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Rechercher un médecin
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
          </div>
          <input  onChange={charger}  type="text" id="search" value={nomMedecin} 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dr Tran Isabelle"/>
        </div>
      </form> 

      {listeVisible && (
        <ul className="max-w-md mx-auto mt-4 bg-white rounded-lg shadow-lg">
          {listeMedecin.map((medecin) => (
            <li
              key={medecin.id}
              onClick={() => selectMedecin(medecin)}
              className="p-4 border-b last:border-none cursor-pointer hover:bg-gray-100">
              {medecin.nom} {medecin.prenom}
            </li>
          ))}
        </ul>
      )}
      {listeVisible && listeMedecin.length === 0 && !version && (
        <p className="text-center mt-4 text-gray-500">Aucun médecin trouvé.</p>
      )}

      <Outlet context = {[medecin, setMedecin]} key={version}/>
     
    </>
  );
}
