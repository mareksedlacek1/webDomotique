<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

try {
    if (isset($_SESSION['email'])) {
        // Supprimer explicitement le cookie de session
        setcookie(session_name(), '', time() - 3600, '/'); // Expire le cookie PHPSESSID

        // Détruire la session
        session_unset(); 
        session_destroy(); 

        echo json_encode(["success" => true, "message" => "Déconnexion réussie"]);
    } else {
        echo json_encode(["success" => false, "message" => "Utilisateur non connecté"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
