<?php
session_start();
include 'dbConfig.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données
    $email = $_POST['userEmail'] ?? '';
    $newPassword = $_POST['newPassword'] ?? '';  

    if (empty($email) || empty($newPassword)) {
        echo "Erreur : Données manquantes";
        exit();
    }

    // Requête pour mettre à jour le mot de passe
    $sql = "UPDATE utilisateurs SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $newPassword, $email);  // Remplacer l'ancien mot de passe par le nouveau
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Erreur lors de la mise à jour du mot de passe";
    }

    $stmt->close();
} else {
    echo "Requête non autorisée";
}

$conn->close();
?>
