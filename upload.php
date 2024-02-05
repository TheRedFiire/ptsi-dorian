<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Limite de requêtes - à implémenter selon votre infrastructure serveur

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['file'])) {
    $firstName = preg_replace("/\s+/", "_", $_POST['firstName']);
    $lastName = preg_replace("/\s+/", "_", $_POST['lastName']);
    $subject = $_POST['subject'];
    $documentType = $_POST['documentType'];

    $dir = "./uploads/$subject/$documentType/$firstName_$lastName";
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }

    $filePath = $dir . '/' . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        echo json_encode(["message" => "Fichier téléchargé avec succès"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Une erreur est survenue lors du téléchargement du fichier"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Requête invalide"]);
}
?>