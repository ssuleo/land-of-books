<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder(@$_GET['authToken']);
$offersID = @$_GET["offersId"];

if (!empty($userToken) && !empty($offersID) ) {

    $select_query = $pdo->prepare("SELECT * FROM `offers` WHERE `idoffers` = ?");
    $select_query->execute([$offersID]);
    $data = $select_query->fetch(PDO::FETCH_ASSOC);
    
    if (!empty($data)) {
        try {
                $query = $pdo->prepare("UPDATE offers SET  status = 2 WHERE idoffers = ?");
            $query->execute([ $offersID]);
            echo json_encode([
                "status" => 1,
                "message" => "Reddedildi"
            ]);
        } catch (\Throwable $th) {
            print_r($th);
            echo json_encode([
                "error" => $th->getMessage(),
                "status" => 0,
                "message" => "Hata oluştu, daha sonra tekrar deneyiniz."
            ]);
        }
    }else{
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
