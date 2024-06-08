<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if (isset($_POST['selectdevice']) && isset($_GET['offerId'])) {

    $selectdevice = $_POST['selectdevice'];
    $offerId = $_GET['offerId'];

    $sql = "UPDATE offers SET iddevices = :selectdevice WHERE idoffers = :offerId";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':selectdevice', $selectdevice);
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
