import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [genre, setGenre] = useState('homme');
  const [type, setType] = useState('mère');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  
const handleFileChange = (e) => {
  setPhoto(e.target.files[0]); // Récupère le fichier sélectionné
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Créer une instance de FormData
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('age', age);
  formData.append('genre', genre);
  formData.append('type', type);
  
 
  if (photo) {
    formData.append('photo', photo); // "photo" doit correspondre au nom du champ dans PHP
  }
  /*
  try {
    const response = await fetch('http://localhost:8000/Signup.php', {
      method: 'POST',
      body: formData, // Envoie formData directement
    });
    
    const data = await response.text();
    alert(data); // Affiche la réponse du serveur
  } catch (error) {
    console.error('Erreur:', error);
  }*/
    try {
      const response = await fetch('http://localhost:8000/Signup.php', {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
    
      if (data.success) {
        alert(data.message);  // "Inscription réussie !"
        navigate('/');        // Redirection vers l'accueil
      } else {
        alert(data.message);  // Message d'erreur (ex : "email déjà utilisé")
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert("Une erreur s'est produite lors de l'inscription.");
    }
    
};
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <br />
      <label>
        Email :
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Mot de passe :
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Âge :
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <br />
      <label>
        Genre :
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="autre">Autre</option>
        </select>
      </label>
      <br />
      <label>
        Type de membre :
        <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="mère">Mère</option>
        <option value="père">Père</option>
        <option value="enfant">Enfant (maison)</option>
        <option value="domestique">Domestique (maison)</option>
        <option value="jardinier">Jardinier</option>
        <option value="gardien">Gardien</option>
        <option value="ménage">Ménage</option>
        <option value="nourrice">Nourrice</option>
        <option value="cuisinière">Cuisinière</option>
        <option value="autre">Autre</option>

        </select>
      </label>
      <br />
      <label>
        Photo :  
      {/* Sélection de la photo */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      <br />
      <button type="submit">Envoyer</button>
      <button type="button" onClick={() => navigate('/')} style={{ marginTop: '10px' }}>
        Retour à l'accueil
      </button>
    </form>
  );
}

export default Signup;