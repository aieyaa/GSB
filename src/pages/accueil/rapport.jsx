import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';
import { Outlet, useNavigate } from 'react-router-dom';
import AjouterRapport from '../../composant/ajouterRapport.jsx';
import ModifierRapport from '../../composant/modifierRapport.jsx';



function Ajouter() {
  const [listeVisible, setlisteVisible] = useState(false); // boolean
  const [nomMedecin, setnomMedecin] = useState("");
  const [listeMedecin, setlisteMedecin] = useState([]);
  const [medecin, setMedecin] = useState(null); // Stocke le médecin sélectionné

  // Appelle l'API
  // Chercher le medecin 
  async function Medecin(lenom) {
    try {
      const response = await api.get("http://172.16.61.61/restGSB/medecins", {
        params: { nom: lenom },
      });
      return response.data || [];
    } catch (error) {
      console.error("Erreur lors de la recherche des médecins :", error);
      return [];
    }
  }

  // Charger la liste des médecins 
  async function charger(event) {
    const saisie = event.target.value;
    setnomMedecin(saisie);
    if (saisie) {
      const results = await Medecin(saisie);
      setlisteMedecin(results); // Affichage des données par rapport à la saisie
      setlisteVisible(true);
    } else {
      setlisteVisible(false);
      setlisteMedecin([]); // Réinitialiser la liste
    }
  }

  // Sélectionner un médecin
  function selectMedecin(lemedecin) {
    console.log("Médecin sélectionné :", lemedecin);
    setMedecin(lemedecin); // Définit le médecin sélectionné
    setlisteVisible(false);
  }

  return (
    <>
      {!medecin ? (
        // Afficher la barre de recherche
        // <form className="max-full mx-auto">
           <form className="max-w-lg mx-auto px-50"> 

          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Rechercher un médecin
          </label>
          <div className="relative">
            <input onChange={charger} type="text" id="search" value={nomMedecin} className="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50" placeholder="Dr Tran Isabelle"/>
          </div>
        </form>
      ) : (
        // Afficher le composant AjouterRapport avec le médecin sélectionné
        <AjouterRapport medecin={medecin} />
      )}

      {listeVisible && (
        <ul className="max-w-md mx-auto mt-4 bg-white rounded-lg shadow-lg">
          {listeMedecin.map((medecin) => (
            <li key={medecin.id} onClick={() => selectMedecin(medecin)} className="p-4 border-b last:border-none cursor-pointer hover:bg-gray-100">
              {medecin.nom} {medecin.prenom}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}


function Modifier({ visiteur }) {
  const [dateVisite, setDateVisite] = useState("");
  const [showModifierRapport, setShowModifierRapport] = useState(false);

  const formatDate = (date) => {
    console.log(date);
    if (date) {

      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`; // Format YYYY-MM-DD
    }
    return "";
  };

 // Afficher le composant ModifierRapport
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateVisite(newDate);
    if (newDate) {
      setShowModifierRapport(true);
    } else {
      setShowModifierRapport(false);
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Chercher un rapport
        </label>
        <input
          type="date" id="date" value={dateVisite} onChange={handleDateChange} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />


      </div>

      {/* Afficher avec les paramètres visiteur et date */}
      {showModifierRapport && <ModifierRapport visiteur={visiteur} date={dateVisite}/>}

    </>
  );
}











//

export default function Rapport() {
  // const [medecin, setMedecin] = useOutletContext();
  const [affichage, setAffichage] = useState('Ajouter')

  return (
      <>
<div className="flex justify-center items-center w-full">

   <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"> 
   <ul className="flex flex-wrap -mb-px"> 
       <li className="me-2"> 
          <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          onClick={() => setAffichage('Ajouter')} >
              Ajouter un rapport </a> 
          </li> 
          <li className="me-2"> 
          <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          onClick={() => setAffichage('Modifier')}>
              Modifier un rapport </a> 
          </li> 
  </ul> 

  {/* {affichage === 'Ajouter' ? <Ajouter /> : <Modifier />} */}
  {affichage === 'Ajouter' ? (
          <Ajouter setAffichage={setAffichage} /> // Passer setAffichage comme prop
        ) : (
          <Modifier />
        )}
  </div>
</div>
      </>
  )
}


