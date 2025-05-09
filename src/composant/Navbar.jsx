import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/accueil', current: true },
  { name: 'Rapports', href: '/accueil/rapport', current: false },
  { name: 'Médecins', href: '/accueil/medecins', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BarNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* <nav className="bg-red border-gray-200 dark:bg-gray-900"> */}
      <nav className="bg-sky-500/50 ">
        <div className=" bg-red max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-4">
          {/* Logo */}
          <a href="/">
  <img src="/GSB.png" className="h-8 mr-6" alt="Logo" />
</a>


          {/* Navigation Links */}
          <ul className="flex space-x-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href} // Utilisation de `Link` pour une navigation client-side
                  className={classNames(
                    item.current
                      ? 'text-blue-700 dark:text-blue-500'
                      : 'text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icon User */}
          <div className="relative ml-auto flex items-center space-x-4">
  <button
    type="button"
    className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    id="user-menu-button"
    aria-expanded={isDropdownOpen ? 'true' : 'false'}
    onClick={toggleDropdown}
  >
    <span className="sr-only">Open user menu</span>
    <img className="w-8 h-8 rounded-full" src="/panda.png" alt="User Avatar" />
  </button>

  {isDropdownOpen && (
    <div
      className="absolute right-0 mt-2 w-48 z-50 text-base bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
    >
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            to="/accueil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Déconnexion
          </Link>
        </li>
      </ul>
    </div>
  )}
</div>
        </div>
      </nav>
    </>
  );
}
