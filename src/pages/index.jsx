
import { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import api from '../api/api.js';




// Fonction qui appelle l'API 
//Page de connexion
async function getVisiteur(lelogin, lemdp) {
  try {
    const response = await api.get('/connexion', {
      params: {
        login : lelogin,
        mdp : lemdp

       // 'Content-Type': 'multipart/form-data'
      },
    });
    return response;
  } catch (err) {
    console.error('Erreur API', err);
    }
}





export default function App() {
  const navigate = useNavigate(); // navigation
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  // Fonction pour gérer la connexion
  async function connection(e) {
    e.preventDefault();

    // Vérifie que les champs sont remplis
    if (!login || !password) {
      setError('Veuillez entrer votre login et mot de passe.');
      return;
    }



 
  // Données 
  const formData = new FormData(e.currentTarget);
  formData.append('login', login);
  formData.append('password', password);

  const response = await getVisiteur(formData) 
  getVisiteur(formData.get('login'), formData.get('password'))
  .then((response) => { 
  if (response.data != null) {
    const {nom, prenom, ville, adresse, cp, id} = response.data ;   // Retour des informations du visiteur
    const datavisiteur = response.data;
     console.log(" Datavisiteur : ",datavisiteur);
    navigate('/accueil', { state: { login , nom, prenom, ville, adresse, cp, id} });
        
  } else {
    setError('Authentification incorrect')
  }
});
}
  



  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img src="GSB.png" alt="logo" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Identification
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={connection}>
              <div>
                <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Login
                </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Entrez votre login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/*Bannière d'erreur */}
              {error && (
                <div
                  style={{
                    backgroundColor: 'red',
                    marginTop: '25px',
                    fontSize: '15px',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

