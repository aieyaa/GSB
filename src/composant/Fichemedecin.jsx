import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/api.js";


function Fiche({ leMedecin }) {

    const [medecin, setMedecin] = leMedecin;
    // const [medecin, setMedecin] = useState(leMedecin);
    const [updateMedecinSuccess, setUpdateMedecinSuccess] = useState()


//modifier les informations du médecin 
   async function updateMedecin(e) {
        e.preventDefault();
        // setUpdateMedecin(medecin);
        await setUpdateMedecin(medecin);
    }
    
    // params = les données du medecin : lemedecin
    async function setUpdateMedecin(params) {
        console.log("Données update : ", params);


        const lienUrl = '/restGSB/majMedecin';
        const type = 
        { headers: {
                'Content-Type': 'application/json'
            }};

        try {
            const response = await api.put(lienUrl, params, type 
        );
    console.log('response.data :', response.data); 
    //affiche rien, pas d'enregistrement dans la base de données 
            if (response.status === 200) {
                setUpdateMedecinSuccess(true); 
            } else {
                setUpdateMedecinSuccess(false); 
                console.error('Erreur lors de la mise à jour.');
                
            }
            return response;
            
        } catch (error) {
            console.error('Erreur réseau :', error.response);
            setUpdateMedecinSuccess(false);
        }
    }
    


    return (
        <>

        <div className="grid gap-6 mb-6 mt-4">
         <div>
             <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Nom</label>
             <input type="text" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             value={medecin.nom}
             onChange={(e) => setMedecin({ ...medecin, nom: e.target.value })} 
            
             
             
             />
        </div>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Prénom</label>
            <input type="text" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             value={medecin.prenom}
             onChange={(e) => setMedecin({ ...medecin, prenom: e.target.value })} />
        </div>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
            <input type="text" id="adresse" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
             value={medecin.adresse}
             onChange={(e) => setMedecin({ ...medecin, adresse: e.target.value })}/>
        </div>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
            <input type="text" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             value={medecin.tel || ''}
             onChange={(e) => setMedecin({ ...medecin, tel: e.target.value })}/>
        </div>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commentaire</label>
            <input type="text" id="commentaire" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             value={medecin.specialitecomplementaire || ''}
             onChange={(e) => setMedecin({ ...medecin, specialitecomplementaire: e.target.value })}/>
        </div>

        <button
    type="button"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    onClick={updateMedecin} > 
    Mise à jour </button>

{/* Barre d'erreur */}
            {updateMedecinSuccess && <p className="text-green-500">Mise à jour réussie !</p>}
            {!updateMedecinSuccess && updateMedecinSuccess !== undefined && <p className="text-red-500">Échec de la mise à jour.</p>}


        </div> 


        </>
    );
}

// Fiche rapports 
function Rapports({ idMedecin }) {
    const [rapportsMedecin, setRapportsMedecin] = useState([]); // Stockage des rapports
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); // Indicateur chargement

    useEffect(() => {
        // Fonction pour récupérer les rapports depuis l'API
        async function fetchRapports() {
            setLoading(true); // Début du chargement
            try {
                const response = await api.get(`/rapports/${idMedecin}`); // Appel à l'API
                const data = response.data; // les données dans `data`
                // console.log('Rapports Stockés', data);
                setRapportsMedecin(data); // Mise à jour des rapports
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); // Fin du chargement
            }
        }

        if (idMedecin) {
            fetchRapports(); // Appel de la fonction si un ID est fourni
        }
    }, [idMedecin]); 

    // Conversion de date jj-mm-aaaa
    function formatDate(dateString) {
        const date = new Date(dateString);
        // Extraire le jour, le mois et l'année
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`; // Retourne sous le format
    }
    

    return (
        
        <div>
            {loading && <p>Chargement des rapports...</p>}
            
            {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

            {!loading && rapportsMedecin.length === 0 && !error && (
                <p>Aucun rapport trouvé pour ce médecin.</p>
            )}

            {/* Affichage des rapports */}
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Motif
                </th>
                <th scope="col" className="px-6 py-3">
                    Bilan
                </th>
                <th scope="col" className="px-6 py-3">
                   Nom et Prénom 
                </th>
            </tr>
        </thead>
<tbody>
  {rapportsMedecin.map((rapport) => (
    <tr
      key={rapport.id || `rapport-${rapport}`}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td className="px-6 py-4">{formatDate(rapport.date)}</td> 
      <td className="px-6 py-4">{rapport.motif}</td>
      <td className="px-6 py-4">{rapport.bilan}</td>
      <td className="px-6 py-4">{rapport.nom} {rapport.prenom}</td>
    </tr>
  ))}
</tbody>

    </table>
</div>

        </div>
    );
}






export default function Fichemedecin() {
    const [medecin, setMedecin] = useOutletContext();
    const [affichage, setAffichage] = useState('fiche')

    return (
        <>
        <div className="flex justify-center items-center ">
     <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"> 
     <ul className="flex flex-wrap -mb-px"> 
         <li className="me-2"> 
            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            onClick={() => setAffichage('fiche')} >
                Fiche Médecin</a> 
            </li> 
            <li className="me-2"> 
            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            onClick={() => setAffichage('rapports')}>
                Rapport Médecin</a> 
            </li> 
    </ul> 

{
    affichage == 'fiche' ? 
    <Fiche leMedecin={[medecin, setMedecin]} />
    : 
    <Rapports idMedecin={medecin.id}/>
}


    </div>
</div>
        </>
    )
}