<?php
session_start();

// Autoriser les requêtes CORS 
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true"); // Pour les cookies de session
header("Access-Control-Allow-Headers: Content-Type");

// Vérifier si l'utilisateur est connecté
if (isset($_SESSION['email'])&& isset($_SESSION['nom'])) {
    echo json_encode(["success" => true, "role" => $_SESSION['role'],"email" => $_SESSION['email'],"nom" => $_SESSION['nom']]);
    //echo json_encode(["success" => true, "nom" => $_SESSION['nom']]);
} else {
    echo json_encode(["success" => false]);
}
?>
