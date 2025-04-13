import React, { useState, useEffect } from 'react';
//import '../styles/Auth.css';
import '../styles/LogIn.css';  
import { useNavigate } from "react-router-dom";
import { mockData } from '../data/mockData';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [attente, setAttente] = useState([]);
    const [messages, setMessages] = useState([]);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userEmail, setUserEmail] = useState('');
    const [loginError, setLoginError] = useState('');
    const [selectedDevices, setSelectedDevices] = useState(
      JSON.parse(localStorage.getItem('selectedDevices')) || []  // Récupérer les appareils sélectionnés depuis localStorage
    );  


  // Vérifier l'état de la session au démarrage
    useEffect(() => {
        fetch('http://localhost:8000/checkSession.php', {
          method: 'GET',
          credentials: 'include', // inclure les cookies pour vérifier la session
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              setIsLoggedIn(true);
              setUserEmail(data.email); 
              setRole(data.role); 
            }
          })
          .catch(error => {
            console.error('Erreur lors de la vérification de la session:', error);
          });
      }, []);

    const handleLoginSubmit = (e) => {
      e.preventDefault();
    // Affichage des valeurs avant l'envoi
    console.log("Données envoyées : ", {email, password });
  
      // Crée les données à envoyer
      const data = new URLSearchParams();
      data.append('email', email);
      data.append('password', password);
      
  
      // recupere des données au serveur PHP
      fetch("http://localhost:8000/LogIn.php", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
      .then((response) => response.text())  // Lecture de la réponse en texte brut
      .then((data) => {
        console.log('Réponse du serveur:', data);  // Affiche la réponse du serveur
        if (data.startsWith('success')) {
          const [, userEmail, userRole] = data.split('|');
          console.log(" Email récupéré:", userEmail);
          console.log("Rôle récupéré:", userRole);
          setIsLoggedIn(true);
          setEmail(userEmail);
          setUserEmail(userEmail);
          setRole(userRole);
          setLoginError("");  // Réinitialiser l'erreur
        } else {
          setLoginError(data);  // Afficher l'erreur reçue
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
    };



    const handleLogout = () => {
      fetch('http://localhost:8000/logout.php', {
        method: 'GET',
        credentials: 'include', 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }, 
      })
      .then((response) => response.json()) 
      .then((data) => {
        if (data.success) {
          console.log('Déconnexion réussie:', data.message); // Affiche dans la console
          alert(data.message); // Affiche un message à l'utilisateur
          setIsLoggedIn(false);
          setUserEmail('');
          navigate('/'); 
        } else {
          console.error('Erreur de déconnexion:', data.message);
        }
      })
      .catch((error) => {
        console.error('Erreur réseau:', error);
      });
    };





    const [passwordMessage, setPasswordMessage] = useState('');

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault();
      
        if (!userEmail || !role) {
            console.error("Erreur : Email ou rôle manquant !");
            setPasswordMessage(" Une erreur est survenue.");
            return;
        }
    
        if (!newPassword.trim()) {
            setPasswordMessage(" Le mot de passe ne peut pas être vide.");
            return;
        }
        console.log("Données envoyées :", { userEmail, newPassword });
        // Création des données à envoyer
        const data = new URLSearchParams();
        data.append('userEmail', userEmail);
        data.append('newPassword', newPassword);
        data.append('role', role);
    
        fetch("http://localhost:8000/ChangePassword.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
        })
        .then(response => response.text()) 
        .then((serverMessage) => {
            console.log("Réponse du serveur :", serverMessage);
    
            if (serverMessage === "success") {
                setPasswordMessage(" Mot de passe changé avec succès !");
            } else {
                setPasswordMessage("" + serverMessage);
            }
        })
        .catch((error) => {
            console.error("Erreur:", error);
            setPasswordMessage(" Une erreur réseau est survenue.");
        });
    };

    const navigate = useNavigate();



    const handleDeleteUser = (targetEmail) => {
      if (!window.confirm(`Voulez-vous vraiment supprimer l'utilisateur ${targetEmail} ?`)) {
          return;
      }
  
      const data = new URLSearchParams();
      data.append('email', targetEmail);
  
      fetch("http://localhost:8000/DeleteUser.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
      })
      .then(response => response.text())
      .then((data) => {
          if (data === "success") {
              alert("Utilisateur supprimé avec succès !");
              setUsers(users.filter(user => user.email !== targetEmail)); // Mise à jour dynamique
          } else {
              alert(" Erreur lors de la suppression !");
          }
      })
      .catch((error) => {
          console.error(" Erreur suppression utilisateur:", error);
      });
    };
  



    useEffect(() => {
      if (isLoggedIn && role === 'admin') {
        fetchUsers();  // Appel uniquement si l'utilisateur est connecté et admin
      }
    }, [isLoggedIn, role]);
    const fetchUsers = () => {
      const adminEmail = 'admin@example.com';  // L'email de l'admin
    
      console.log(" Envoi de l'email admin :", adminEmail);  // Affiche l'email envoyé
    
      const data = new URLSearchParams();
      data.append('admin_email', adminEmail);  // Ajoute l'email dans les données envoyées
    
      fetch("http://localhost:8000/GetUsers.php", {
        method: "POST",  // Méthode POST pour envoyer les données
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"  
        },
        body: data  // Envoi des données avec l'email de l'admin
      })
      .then(response => response.json())  // Traite la réponse comme un JSON
      .then(data => {
        console.log(" Réponse brute du serveur:", data);

        if (data.users && data.attente) {
          setUsers(data.users);  // Mets à jour la liste des utilisateurs
          setAttente(data.attente);  // Mets à jour la liste des utilisateurs en attente
        } else {
          console.error(" Erreur : Pas de données valides dans la réponse");
        }
      })
      .catch(error => {
        console.error(" Erreur récupération utilisateurs et liste d'attente:", error);
      });
    };



    const handleMoveToUser = (email) => {
      // Demander à l'utilisateur de confirmer l'action
      if (window.confirm(`Voulez-vous vraiment déplacer ${email} de la liste d'attente vers la liste des utilisateurs ?`)) {
        
        // Préparer les données à envoyer
        const data = new URLSearchParams();
        data.append('email', email); // L'email de l'utilisateur à déplacer
        console.log("email a transferer:",email); 
    
        // Effectuer la requête pour déplacer l'utilisateur
        fetch("http://localhost:8000/MoveToUser.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: data
        })
        .then(response => response.text())
        .then(response => {
          if (response === 'success') {
            alert(`${email} a été déplacé avec succès vers la liste des utilisateurs.`);
            // Mettre à jour les listes localement après le déplacement
            setAttente(attente.filter(user => user.email !== email)); // Enlever de la liste d'attente
            setUsers([...users, { email, role: 'user' }]); // Ajouter à la liste des utilisateurs
          } else {
            alert(" Une erreur est survenue lors du déplacement.");
          }
        })
        .catch(error => {
          console.error(" Erreur lors du déplacement :", error);
        });
      }
    };
    const handleDeviceSelection = (event) => {
      const { value, checked } = event.target;
      setSelectedDevices((prevSelectedDevices) => {
          const updatedDevices = checked
              ? [...prevSelectedDevices, value]  // Ajoute l'appareil si coché
              : prevSelectedDevices.filter(device => device !== value);  // Enlève l'appareil si décoché
          localStorage.setItem('selectedDevices', JSON.stringify(updatedDevices));  // Sauvegarde dans localStorage
          return updatedDevices;
      });
  };

  const handleSubmitDevices = () => {
      navigate('/', { state: { selectedDevices } });  // Passe les appareils sélectionnés à Home
  };

  useEffect(() => {
    if (isLoggedIn && role === 'admin') {
        fetchMessages();  // Appel pour récupérer les messages
    }
}, [isLoggedIn, role]);

const fetchMessages = () => {
    fetch('http://localhost:8000/GetMessages.php', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Messages récupérés:', data);
        if (data.messages) {
            setMessages(data.messages);  // Met à jour l'état des messages
        } else {
            console.error('Erreur lors de la récupération des messages.');
        }
    })
    .catch(error => {
        console.error('Erreur de récupération des messages:', error);
    });
};


    
return (
  //<div className="login-container">
  <div>
    {!isLoggedIn ? (
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label>
          Email :
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="form-input"
            required
          />
        </label>
        <label>
          Mot de passe :
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-input"
            required
          />
        </label>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit" className="submit-btn">Se connecter</button>
      </form>
    ) : (
      <div className="dashboard">
        <h2 className="welcome-message">Bienvenue, {userEmail}!</h2>
        
        {role === 'admin' ? (
          <div className="admin-dashboard">
            <div className="dashboard-section">
              <h3>Liste des utilisateurs</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Rôle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.type}</td>
                        <td>{user.role}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteUser(user.email)}
                            className="delete-btn"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Liste d'attente</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Rôle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attente.map((user, index) => (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.type}</td>
                        <td>{user.role}</td>
                        
                        <td>
                          <button 
                            onClick={() => handleMoveToUser(user.email)}
                            className="action-btn"
                          >
                            Passer à utilisateur
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Messages des utilisateurs</h3>
              {messages.length > 0 ? (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message, index) => (
                        <tr key={index}>
                          <td>{message.user_email}</td>
                          <td>{message.message}</td>
                          <td>{message.sent_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">Aucun message à afficher.</p>
              )}
            </div>

            <div className="dashboard-section devices-section">
              <h3>Sélectionnez des appareils à afficher</h3>
              <form className="devices-form">
                {mockData.connectedDevices.map((device) => (
                  <div key={device.id} className="device-checkbox">
                    <input
                      type="checkbox"
                      id={`device-${device.id}`}
                      value={device.id}
                      checked={selectedDevices.includes(device.id)}
                      onChange={handleDeviceSelection}
                    />
                    <label htmlFor={`device-${device.id}`}>{device.name}</label>
                  </div>
                ))}
              </form>
              <div className="action-buttons">
                <button 
                  onClick={handleSubmitDevices} 
                  className="action-btn"
                >
                  Appliquer les modifications
                </button>
                <button 
                  onClick={() => navigate('/')} 
                  className="action-btn home-btn"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="user-dashboard">
            <div className="dashboard-section">
              <h3>Modifier votre mot de passe</h3>
              <form onSubmit={handleChangePasswordSubmit} className="password-form">
                <label>
                  Nouveau mot de passe :
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="form-input"
                    required
                  />
                </label>
                <button type="submit" className="submit-btn">
                  Modifier le mot de passe
                </button>
              </form>
              {passwordMessage && (
                <p className={passwordMessage.startsWith('✅') ? 'success-message' : 'error-message'}>
                  {passwordMessage}
                </p>
              )}
            </div>
            <div className="action-buttons">
              <button 
                onClick={() => navigate('/')} 
                className="action-btn"
              >
                Retour à l'accueil
              </button>
              <button 
                onClick={handleLogout} 
                className="logout-btn"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    )}
      </div>
  //</div>
);




}
              
export default Login;