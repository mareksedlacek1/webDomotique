<?php
// Vérification du rôle de l'utilisateur (admin)
session_start();
include 'dbConfig.php';
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo "Accès interdit.";
    exit();
}


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les messages
$sql = "SELECT * FROM messages ORDER BY sent_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h3>Messages des utilisateurs</h3>";
    echo "<table border='1'>";
    echo "<tr><th>Email de l'utilisateur</th><th>Message</th><th>Date</th></tr>";

    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row['user_email'] . "</td><td>" . $row['message'] . "</td><td>" . $row['sent_at'] . "</td></tr>";
    }

    echo "</table>";
} else {
    echo "Aucun message trouvé.";
}

$conn->close();
?>
