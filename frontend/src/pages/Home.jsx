import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/SearchBar.css';
import '../styles/SearchResults.css';
import SearchBar from '../components/SearchBar';
import SmartDeviceCard from '../components/SmartDeviceCard';
import { mockData } from '../data/mockData';

function Home() {
  const [searchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNom, setUserNom] = useState('');
  const [users, setUsers] = useState([]);
  const [deviceStatusFilter, setDeviceStatusFilter] = useState('');

  const [demoDevice, setDemoDevice] = useState({
    name: "Thermostat Salon",
    currentTemp: 21.0,
    targetTemp: 23.0,
    mode: "Automatique",
    connectivity: "Wi-Fi (signal fort)",
    battery: 80,
    lastSeen: "Aujourd'hui à 10:00",
    status: "Connecté"
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDevices } = location.state || {};
  const storedSelectedDevices = JSON.parse(localStorage.getItem('selectedDevices')) || [];
  const devicesToShow = selectedDevices?.length ? selectedDevices : storedSelectedDevices;
  const selectedItems = mockData.connectedDevices.filter(device => devicesToShow.includes(device.id));
  const filteredDevices = deviceStatusFilter
  ? selectedItems.filter(device => device.status === deviceStatusFilter)
  : selectedItems;


  useEffect(() => {
    fetch('http://localhost:8000/checkSession.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(true);
          setUserNom(data.nom);
        }
      })
      .catch(error => console.error('Erreur session:', error));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const data = new URLSearchParams();
    data.append('admin_email', 'admin@example.com');

    fetch("http://localhost:8000/GetUsers.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if (data.users) {
          setUsers(data.users);
        } else {
          console.error("Pas de données utilisateurs.");
        }
      });
  };

  const handleLogout = () => {
    fetch('http://localhost:8000/logout.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(false);
          setUserNom('');
          navigate('/');
        }
      })
      .catch(error => console.error('Erreur logout:', error));
  };
  /*
  const handleSearch = (searchParams) => {
    const { term, status, filter } = searchParams;
    let results = [];
  
    mockData.connectedDevices.forEach(device => {
      // Vérifier si le terme de recherche correspond au nom ou à la description de l'appareil
      const matchesTerm = !term || device.name.toLowerCase().includes(term.toLowerCase()) || device.description?.toLowerCase().includes(term.toLowerCase());
  
      // Vérification du statut de l'appareil
      const matchesStatus = !status || device.status === status;

  
      // Vérification du filtre (par exemple, catégorie, etc.)
      const matchesFilter = !filter || device.category === filter;
  
      // Si l'appareil correspond aux critères de recherche, on l'ajoute aux résultats
      if (matchesTerm && matchesStatus && matchesFilter) {
        results.push(device);
      }
    });
  
    setSearchResults(results); // Mise à jour des résultats de la recherche
  };
  */
  
  

  const updateTemperature = (newTemp) => {
    setDemoDevice(prevState => ({
      ...prevState,
      targetTemp: newTemp,
    }));
  };

  const goToMessagePage = () => {
    navigate('/message');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <img src="../data/images/VillaConnectee.webp" alt="Maison intelligente" className="header-banner" />
          <h1>Bienvenue sur la plateforme intelligente</h1>
          <p>Explorez les objets connectés et services disponibles.</p>
          <SearchBar onSearch={setDeviceStatusFilter} />

        </div>
      </header>

      <section className="intro-section">
        {isLoggedIn ? (
          <div className="user-info">
            <h2>Bienvenue, {userNom} !</h2>
            <button className="btn btn-deconnecter" onClick={handleLogout}>Se déconnecter</button>
            <Link to="/login" className="btn btn-login">Profil</Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signup" className="btn btn-signup">S'inscrire</Link>
            <Link to="/login" className="btn btn-login">Se connecter</Link>
          </div>
        )}
      </section>

      <main className="home-main">
        {!isLoggedIn && (
          <section className="user-guide">
            <h3>Guide utilisateur</h3>
            <ol>
              <li>Créez vous un compte</li>
              <li>Patienter jusqu'à l'acceptation de votre compte par l'administrateur</li>
              <li>Vous êtes libre de gérer les objets connectés de la villa !</li>
            </ol>
          </section>
        )}

        {searchResults.length > 0 && (
          <section className="search-results">
            <h3>Résultats de la recherche</h3>
            <div className="results-grid">
              {searchResults.map(item => (
                <div key={item.id} className="result-card small-card">
                  <h4>{item.name}</h4>
                  <p><strong>{item.type}</strong></p>
                  <p className="status">{item.status}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {isLoggedIn && (
          <section className="users-section">
            <h3 className="section-title">Comptes de la maison intelligente</h3>
            <div className="users-grid three-columns">
              {users.map((user, index) => (
                <article key={index} className="user-card">
                  <div className="card-header">
                    <div className="user-avatar">
                      {user.nom.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-meta">
                      <h4 className="user-name">{user.nom}</h4>
                      {user.type && (
                        <span className={`user-badge ${user.type.toLowerCase()}`}>
                          {user.type}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      {isLoggedIn && (
        <section className="live-device">
          <h3>Appareil connecté en direct</h3>
          <div className="results-grid">
            {(searchResults.length > 0 ? searchResults : filteredDevices).length > 0 ? (
              (searchResults.length > 0 ? searchResults : filteredDevices).map(device => (
                <SmartDeviceCard key={device.id} device={device} updateTemperature={updateTemperature} />
              ))
            ) : (
              <SmartDeviceCard device={demoDevice} updateTemperature={updateTemperature} />
            )}
    </div>
  </section>
)}
      </main>

      <footer className="home-footer">
        <button onClick={goToMessagePage} className="message-btn">
          Envoyer un message à l'admin
        </button>
        <p>© 2025 Villa intelligente – Plateforme utilisateur</p>
      </footer>
    </div>
  );
}

export default Home;
