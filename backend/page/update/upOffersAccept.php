<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder(@$_GET['authToken']);
$offersID = @$_GET["offersId"];
$adress = @$_POST["adress"];

if (!empty($userToken) && !empty($offersID) && !empty($adress)) {
    $select_query = $pdo->prepare("SELECT * FROM `offers` WHERE `idoffers` = ?");
    $select_query->execute([$offersID]);
    $data = $select_query->fetch(PDO::FETCH_ASSOC);

    if (!empty($data)) {
        try {
            $pdo->beginTransaction();

            $update_offer_query = $pdo->prepare("UPDATE offers SET userAdress = ?, status = 1 WHERE idoffers = ?");
            $update_offer_query->execute([$adress, $offersID]);

            $offered_points = (int) $data['offered_points'];  
            $requested_points = (int) $data['requested_points'];  

            $update_receiver_points_query = $pdo->prepare("UPDATE users SET point = point + ? WHERE idusers = ?");
            $update_receiver_points_query->execute([$offered_points, $data['idusers']]); 

            $update_sender_points_query = $pdo->prepare("UPDATE users SET point = point + ? WHERE idusers = ?");
            $update_sender_points_query->execute([$requested_points, $data['idsenders']]); 

            $pdo->commit();

            echo json_encode([
                "status" => 1,
                "message" => "Başarılı bir şekilde kabul edildi."
            ]);
        } catch (Exception $e) {

            $pdo->rollBack();
            echo json_encode([
                "error" => $e->getMessage(),
                "status" => 0,
                "message" => "Hata oluştu, daha sonra tekrar deneyiniz."
            ]);
        }
    } else {
        echo json_encode([
            "status" => 0,
            "message" => "Eşleşme bulunamadı."
        ]);
    }
} else {
    echo json_encode([
        "status" => 0,
        "message" => "Query Parametreleri bulunamadı."
    ]);
}
