<?php
session_start();
include 'dbConfig.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailToDelete  = $_POST['email'] ?? '';
 
    if (empty($emailToDelete )) {
        echo "Erreur : Email manquant";
        exit();
    }

    $sql = "DELETE FROM utilisateurs WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $emailToDelete);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Erreur suppression";
    }

    $stmt->close();
} else {
    echo "Erreur : Requête non autorisée";
}

$conn->close();
?>
