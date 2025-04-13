<?php

session_start();
include 'dbConfig.php'; 

// Vérification de la session
if (!isset($_SESSION['email'])) {
    echo "Vous devez être connecté pour envoyer un message.";
    exit();
}

$userEmail = $_SESSION['email']; 
$message = $_POST['message']; 

// Si le message est vide
if (empty($message)) {
    echo "Le message ne peut pas être vide.";
    exit();
}

// Requête d'insertion dans la table des messages
$sql = "INSERT INTO messages (user_email, message) VALUES ('$userEmail', '$message')";

// Exécution de la requête
if (mysqli_query($conn, $sql)) {
    echo "success"; 
} else {
    echo "Erreur lors de l'envoi du message: " . mysqli_error($conn); // Affiche l'erreur en cas de problème
}

mysqli_close($conn); 



?>
