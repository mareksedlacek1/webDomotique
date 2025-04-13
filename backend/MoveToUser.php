<?php
session_start();
include 'dbConfig.php';

$email = $_POST['email']; // Récupère l'email de l'utilisateur à déplacer


$sql_add_user = "INSERT INTO utilisateurs SELECT * FROM listeAttente WHERE email = ?";
$stmt_add_user = $conn->prepare($sql_add_user);
$stmt_add_user->bind_param("s", $email);

if ($stmt_add_user->execute()) {
    //  Supprimer l'utilisateur de la liste d'attente
    $sql_remove_from_attente = "DELETE FROM listeAttente WHERE email = ?";
    $stmt_remove = $conn->prepare($sql_remove_from_attente);
    $stmt_remove->bind_param("s", $email);
    if ($stmt_remove->execute()) {
        echo "success";
    } else {
        echo " Erreur lors de la suppression de la liste d'attente.";
    }
} else {
    echo " Erreur lors de l'ajout dans la liste des utilisateurs.";
}

$conn->close();
?>
