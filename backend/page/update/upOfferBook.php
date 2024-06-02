<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if (isset($_POST['selectbook']) && isset($_GET['offerId'])) {

    $selectbook = $_POST['selectbook'];
    $offerId = $_GET['offerId'];

    $sql = "UPDATE offers SET idbooks = :selectbook WHERE idoffers = :offerId";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':selectbook', $selectbook);
    $stmt->bindParam(':offerId', $offerId);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => 1,
            "message" => "Başarıyla güncellendi."
        ]);
    } else {
        echo json_encode([
            "status" => 0,
            "message" => "Güncelleme sırasında bir hata oluştu."
        ]);
    }
} else {
    echo json_encode([
        "status" => 0,
        "message" => "Query Parametreleri bulunamadı."
    ]);
}
