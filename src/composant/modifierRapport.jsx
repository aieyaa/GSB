
import React, { useState, useEffect} from "react";
import api from "../api/api.js";


export default function ModifierRapport({  date }) {
  // const [date, setDate] = useState('');
  const [listeVisible, setListeVisible] = useState(false);
  const [rapport, setRapport] = useState(null);
  const [majRapportSuccess, setMajRapportSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // État pour gérer les messages de succès


  const [errorMessage, setErrorMessage] = useState(''); 
  const [rapportSelectionne, setRapportSelectionne] = useState('');
  const [formData, setFormData] = useState( '');

  const datavisiteur = "a131" // idVisiteur de force 

// Charger le rapport 
// Dès le moment ou la date est renseigner
// Vérifier si la date est au bon format comme dans la base
useEffect(() => {
  if (date) {
    const regex_yyyymmdd = /^(19|20)\d\d[-](0[1-9]|1[0-2])[-](0[1-9]|[12][0-9]|3[01])$/;
    if (regex_yyyymmdd.test(date)) {
      rechercherRapport(datavisiteur, date);
    } else {
      setErrorMessage("La date fournie est invalide.");
    }
  }
}, [date]); // Déclenche l'effet à chaque modification de `date`


//rechercher un rapport en fonction de la date
async function rechercherRapport(datavisiteur, date) {
  try {
    const response = await api.get(`/rapports_a_date?idVisiteur=${datavisiteur}&date=${date}`);
    if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
      console.log("Rapports récupérés :", response.data);
        setErrorMessage(''); // Effacer le message d'erreur si des rapports sont trouvés
        setRapport(response.data);
      } else {
        console.error("Aucun rapport trouvé pour cette date");
      }
    }
  catch (error) {
    console.error("Erreur de requête :", error);
  }
}


function SelectRapport(r) {
  setRapportSelectionne(r);
  setFormData({ ...r }); // Remplir le formulaire avec les données du rapport sélectionné
}

function targetChange(event) {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
}

//Modifier le rapport 
async function UpdateRapport() {
  if (!formData.motif || !formData.bilan) {
    setErrorMessage("Tous les champs du formulaire doivent être remplis.");
    return;
  }
  try {
    // appelle a l'api pour 'mise à jour' des rapports 
    const response = await api.put(`/majRapports/${formData.idRapport}`, formData);
    if (response.status === 200) {
      setErrorMessage("");
      setSuccessMessage("Les données du rapport ont été modifiées avec succès !");
      rechercherRapport(datavisiteur, date); // Recharger la liste des rapports
      setRapportSelectionne(null); // Réinitialiser la sélection
    } else {
      setErrorMessage("Échec de la modification du rapport.");
      setSuccessMessage(""); // Effacer le message de succès en cas d'échec
    }
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
    setErrorMessage("Une erreur est survenue lors de la modification du rapport.");
    setSuccessMessage(""); // Effacer le message de succès en cas d'erreur
  }
}

//Situation
//Supprimer le rapport 
async function supprimerRapport(r) {
 console.log(r);


  if (window.confirm("Voulez-vous vraiment supprimer ce rapport ?")) {
    try {
      const response = await api.delete(`/supprimerRapport/${r.idRapport}`);
      if (response.status === 200) {
        setSuccessMessage("Rapport supprimé avec succès !");
        setErrorMessage("");
        setRapportSelectionne(null);
        rechercherRapport(datavisiteur, date); // recharge la liste
      } else {
        setErrorMessage("Échec de la suppression du rapport.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setErrorMessage("Une erreur s'est produite lors de la suppression.");
      setSuccessMessage("");
    }
  }
}










  return (
    <>
  {/* Afficher les rapports par rapport à la date*/}
  {rapport && rapport.length > 0 ? (
  <div className="mt-6">
    <h2>Rapports :</h2>
    <table className="table-auto bg-white dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm">
      <thead>
        <tr className="bg-gray-300 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <th className="px-20 py-2 border">Rapport</th>
          <th className="px-20 py-2 border">Motif</th>
          <th className="px-20 py-2 border">Bilan</th>
          <th className="px-4 py-2 border">Médecin</th>
          <th className="px-4 py-2 border">Modifier</th>
        </tr>
      </thead>
      <tbody>
        {rapport.map((r, index) => (
          <tr key={index}>
            <td className="px-20 py-2 border">{r.idRapport}</td>
            <td className="px-20 py-2 border">{r.motif}</td>
            <td className="px-20 py-2 border">{r.bilan}</td>
            <td className="px-4 py-2 border">{r.nomMedecin} {r.prenomMedecin}</td>
            <td className="px-4 py-2 border">
                    <button
                      className="bg-sky-500 text-white px-4 py-2 rounded"
                      onClick={() => SelectRapport(r)}
                    >
                      Modifier
                    </button>

                    <button  onClick={() => supprimerRapport(r)}
                    
                    > Supprimer </button>



                  </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="text-red-500 mt-2">
    {rapport === null ? "Aucun rapport à cette date " : "Aucun rapport disponible. Veuillez vérifier vos données."}
  </div>
)}


{/* Afficher un message d'erreur : aucun rapport */}
{errorMessage && (
  <div className="text-red-500 mt-2">
    {errorMessage}
  </div>
)}



{/* Formulaire pour Modifier un rapport */}
 {rapportSelectionne && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
          <h2>Modifier le Rapport :</h2>
          <form>
            <div className="mb-4">
              <label>Motif :</label>
              <input
                type="text"
                name="motif"
                value={formData.motif}
                onChange={targetChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Bilan :</label>
              <input
                type="text"
                name="bilan"
                value={formData.bilan}
                onChange={targetChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <button
              type="button"
              onClick={UpdateRapport}
              className="bg-sky-500 text-white px-4 py-2 rounded"
            >
              Enregistrer les modifications
            </button>
          </form>
          </div>
)}

{successMessage && (
  <div className="text-green-500 mt-2">
    {successMessage}
  </div>
)}


    </>
  );
}
