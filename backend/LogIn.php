<?php
session_start(); 
include 'dbConfig.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //var_dump($_POST);
    // Récupérer les données de la requête
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo "Erreur : Données manquantes";
        exit();
    }

    // Vérifier si l'utilisateur existe
    $sql = "SELECT password,role,nom FROM utilisateurs WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Vérifie si l'utilisateur est dans la liste d'attente
    $sql_check_attente = "SELECT * FROM listeAttente WHERE email = ?";
    $stmt_check_attente = $conn->prepare($sql_check_attente);
    $stmt_check_attente->bind_param("s", $email);
    $stmt_check_attente->execute();
    $result = $stmt_check_attente->get_result();

    if ($result->num_rows > 0) {
        echo " Vous êtes actuellement en liste d'attente. Vous ne pouvez pas modifier votre mot de passe.";
        exit();
    }
    elseif ($stmt->num_rows == 0) {
        echo "Email ou mot de passe incorrect.";
        exit();
    }

    // Comparer le mot de passe saisi avec celui stocké
    $stmt->bind_result($stored_password,$role,$nom);
    $stmt->fetch();
  
    if ($password === $stored_password) {
        $_SESSION['email'] = $email;
        $_SESSION['nom'] = $nom;
        $_SESSION['role'] = $role;
        /*
        echo '<pre>';
        var_dump($_SESSION);  // Affiche le contenu de la session
        echo '</pre>';
        */
        // Connexion réussie, renvoyer l'email
        echo "success|$email|$role";
    } else {
        echo 'Email ou mot de passe incorrect.';
        }
      // Fermer la requête
      $stmt->close();

} else {
    echo "Erreur : Requête non autorisée";
}

$conn->close();
?>
