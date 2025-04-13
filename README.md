# webDomotique
Lancer le projet sous Linux 
Prérequis 
Avant de démarrer, assurez-vous d’avoir les outils suivants installés sur votre machine : - Node.js (pour React) - npm (pour gérer les
dépendances) - PHP (pour le backend) - VS Code (optionnel, mais recommandé pour la collaboration avec Live Share) 
1. Lancer le serveur Frontend (React) 
Ouvrez un terminal dans VS Code ou votre terminal préféré.
Naviguez vers le répertoire frontend de votre projet : bash cd /web/frontend 
Installez les dépendances avec npm : bash npm install 
Démarrez le serveur React avec la commande suivante : bash npm start Le serveur React sera lancé sur **http://localhost
3000**. 
2. Lancer le serveur Backend (PHP) 
Ouvrez un autre terminal dans VS Code.
Naviguez vers le répertoire backend : bash cd web/backend 
Lancez le serveur PHP avec la commande suivante : bash php -S localhost:8000 Le serveur PHP sera maintenant
disponible sur **http://localhost:8000**.


Pour découvrir et explorer les fonctionnalités de l'application, vous pouvez vous connecter avec l'un des deux comptes préconfigurés :
le compte admin (Email : admin@example.com, Mot de passe : admin) qui vous donne un accès complet à toutes les fonctionnalités d'administration,
et le compte utilisateur simple (Email : alice.dupont@example.com, Mot de passe : hashed_password_1) 
qui offre un accès limité pour interagir avec les appareils domotiques et consulter les données
