<?php
session_start();
include 'dbConfig.php';
//var_dump($_POST);



$adminEmail = $_POST['admin_email']; //  Email de l'admin connecté

$sql = "SELECT email,nom, role,type FROM utilisateurs WHERE email != ?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $adminEmail);
$stmt->execute();
$result = $stmt->get_result();
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
// Récupérer la liste d'attente
$sql_attente = "SELECT email,role,type FROM listeAttente";  
$result_attente = $conn->query($sql_attente);
$attente = [];
while ($row = $result_attente->fetch_assoc()) {
    $attente[] = $row;
}

header('Content-Type: application/json');
echo json_encode(['users' => $users, 'attente' => $attente]);
$conn->close();



?>