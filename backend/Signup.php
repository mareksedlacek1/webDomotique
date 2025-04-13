<?php
include 'dbConfig.php';

$response = ["success" => false, "message" => "Erreur inconnue"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $age = $_POST['age'] ?? '';
    $genre = $_POST['genre'] ?? '';
    $type = $_POST['type'] ?? '';
    $photoPath = null;

    if (empty($nom) || empty($email) || empty($password) || empty($age) || empty($genre)|| empty($type)) {
        $response["message"] = "Erreur : Données manquantes";
        echo json_encode($response);
        exit;
    }

    // Vérifier si l'email existe
    $stmt_check = $conn->prepare("SELECT email FROM listeAttente WHERE email = ?");
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $stmt_check->store_result();

    $stmt = $conn->prepare("SELECT email FROM utilisateurs WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt_check->num_rows > 0 || $stmt->num_rows > 0) {
        $response["message"] = "Cet email est déjà associé à un compte.";
        echo json_encode($response);
        exit;
    }

    // Upload photo
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $uploadDir = "/home/cytech/web/backend/photo/";
        $fileName = basename($_FILES['photo']['name']);
        $uploadFilePath = $uploadDir . uniqid() . "_" . $fileName;
        $imageFileType = strtolower(pathinfo($uploadFilePath, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

        if (!in_array($imageFileType, $allowedTypes)) {
            $response["message"] = "Seules les images JPG, JPEG, PNG et GIF sont autorisées.";
            echo json_encode($response);
            exit;
        }

        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $uploadFilePath)) {
            $response["message"] = "Erreur lors de l'upload de l'image.";
            echo json_encode($response);
            exit;
        }

        $photoPath = $uploadFilePath;
    }

    // Insertion
    $stmt = $conn->prepare("INSERT INTO listeAttente (nom, email, password, age, genre, type, photo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssisss", $nom, $email, $password, $age, $genre, $type, $photoPath);
    if ($stmt->execute()) {
        $response["success"] = true;
        $response["message"] = "Inscription réussie !";
    } else {
        $response["message"] = "Erreur SQL : " . $stmt->error;
    }

    echo json_encode($response);
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Requête non autorisée"]);
}
?>
