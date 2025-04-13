import React, { useState, useEffect } from 'react';

function Message() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Vérification de la session à chaque rendu
  useEffect(() => {
    fetch('http://localhost:8000/checkSession.php', {
      method: 'GET',
      credentials: 'include', // inclure les cookies pour vérifier la session
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(true);
          console.log('L\'utilisateur est connecté.', data);
        } else {
          setIsLoggedIn(false);
          setStatus('vous devez être connecté pour envoyer un message.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la vérification de la session:', error);
        setStatus('Erreur lors de la vérification de la session.');
      });
  }, []);
  const handleSendMessage = (e) => {
    e.preventDefault(); // Empêcher la soumission du formulaire
  
    if (!message.trim()) {
      setStatus('Le message ne peut pas être vide.');
      return;
    }
  
    const data = new URLSearchParams();
    data.append('message', message);
  
  
    fetch('http://localhost:8000/sendMessage.php', {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
    .then(response => {
      console.log('Réponse du serveur : ', response);
      if (!response.ok) {
        throw new Error('Erreur de réponse du serveur');
      }
      return response.text();
    })
    .then(result => { 
      if (result === 'success') {
        setStatus('Message envoyé avec succès.');
        setMessage('');
      } else {
        setStatus('Erreur lors de l\'envoi : ' + result);
      }
    })
    .catch(error => {
      console.error('Erreur réseau ou serveur:', error);
      setStatus('Erreur réseau ou serveur.');
    });
  };
  

    

  // Si l'utilisateur n'est pas connecté, on ne montre pas le formulaire
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Contacter l'administrateur</h2>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Contacter l'administrateur</h2>
      <form onSubmit={handleSendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message ici..."
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Envoyer</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Message;
