WebDomotique
Lancer le projet sous Linux
Prérequis

Avant de démarrer, assurez-vous d’avoir les outils suivants installés sur votre machine :

    Node.js (pour React)

    npm (pour gérer les dépendances)

    PHP (pour le backend)

    VS Code (optionnel, mais recommandé pour la collaboration avec Live Share)

1. Lancer le serveur Frontend (React)

    Ouvrez un terminal dans VS Code ou votre terminal préféré, puis naviguez vers le répertoire frontend de votre projet.

cd /web/frontend

Installez les dépendances avec npm :

npm install

Démarrez le serveur React avec la commande suivante :

    npm start

    Le serveur sera lancé sur http://localhost:3000.

2. Lancer le serveur Backend (PHP)

    Ouvrez un autre terminal dans VS Code et naviguez vers le répertoire backend :

cd web/backend

Lancez le serveur PHP avec la commande suivante :

    php -S localhost:8000

    Le serveur sera maintenant disponible sur http://localhost:8000.

3. Créer la base de données

Sous Linux, pour créer la base de données, ouvrez le terminal, connectez-vous à MySQL avec l'utilisateur root, puis exécutez la commande pour charger le fichier SQL qui crée les tables nécessaires à l'application :

mysql -u root -p
source /home/cytech/web6/frontend/sql/tables.sql

4. Découvrir les fonctionnalités de l'application

Pour explorer les fonctionnalités de l'application, vous pouvez vous connecter avec l'un des deux comptes préconfigurés :

    Compte admin :
    Email : admin@example.com
    Mot de passe : admin
    (accès complet aux fonctionnalités d'administration)

    Compte utilisateur simple :
    Email : alice.dupont@example.com
    Mot de passe : hashed_password_1
    (accès limité pour interagir avec les appareils domotiques et consulter les données)
