
import React, { useState } from "react";
import api from "../api/api.js";
import { useUser } from '../context/context';


export default function AjouterRapport({ medecin}) {
  const [addRapportSuccess, setaddRapportSuccess] = useState(null); // null pour état initial
  const [dateVisite, setDateVisite] = useState("");
  const [motif, setMotif] = useState("");
  const [bilan, setBilan] = useState("");
  const { datavisiteur } = useUser();

  async function AjouterRapport(e) {
    e.preventDefault(); // rafraichissement

    const visiteur = "a131" // idVisiteur de force 

    // Données à envoyer à l'API
    const data = {
      idMedecin: medecin.id, // Lier le rapport au médecin sélectionné
      idVisiteur: visiteur, // idVisiteur de force 
      date: dateVisite,
      motif: motif,
      bilan: bilan,
      medicaments : null
    };

    try {
      // Appel à l'API pour enregistrer le rapport
      const response = await api.put('http://172.16.61.61/restGSB/ajouterRapport', data);

      if (response.status === 200 || response.status === 201) {
        console.log("Rapport ajouté avec succès :", response.data);
        setaddRapportSuccess(true); // Indiquer le succès
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du rapport :", error);
      setaddRapportSuccess(false); // Indiquer l'échec
    }
  }

  return (
    <div className="grid gap-6 mb-6 mt-4">
      {/* Affichage du médecin sélectionné */}
      <p className="text-gray-700 dark:text-gray-300">
        Rapport pour : {medecin.nom} {medecin.prenom}
      </p>

      {/* Formulaire pour ajouter un rapport */}
      <form onSubmit={AjouterRapport} className="max-w-md mx-auto">
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date Visite
          </label>
          <input type="date" id="date" value={dateVisite} onChange={(e) => setDateVisite(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="motif" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Motif
          </label>
          <input type="text" id="motif" value={motif} onChange={(e) => setMotif(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
        </div>
        <div>
          <label htmlFor="bilan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Bilan
          </label>
          <textarea id="bilan" value={bilan} onChange={(e) => setBilan(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
        </div>

        <button
          type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
          Ajouter 
          </button>
      </form>

      {/* Confirmation de succès ou échec */}
      {addRapportSuccess && (
        <p className="text-green-500 mt-2">Ajouté avec succès !</p>
      )}
      {addRapportSuccess === false && (
        <p className="text-red-500 mt-2">Une erreur est survenue lors de l'ajout du rapport.</p>
      )}
    </div>
  );
}

