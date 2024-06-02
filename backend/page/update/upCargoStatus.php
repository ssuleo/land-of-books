<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder(@$_GET['authToken']);
$offersID = @$_GET["offersId"];


if (!empty($offersID)  && !empty($_GET["type"])) {


    $select_query = $pdo->prepare(" SELECT * FROM `offers` WHERE `idoffers` = ?");
    $select_query->execute([$offersID]);


    if ($select_query->rowCount() == 1) {

        $selectedData = $select_query->fetch(PDO::FETCH_ASSOC);



        if ($_GET["type"] == "user") {
            // userCargo
            $add_Cargo = $pdo->prepare("UPDATE `cargo` SET `cargoStatus` = 1 WHERE `cargo`.`id` = ?;");
            $add_Cargo->execute([$selectedData["senderCargo"]]);
        } else {
            // senderCargo
            $add_Cargo = $pdo->prepare("UPDATE `cargo` SET `cargoStatus` = 1 WHERE `cargo`.`id` = ?;");
            $add_Cargo->execute([$selectedData["userCargo"]]);
        }


        echo json_encode([
            "status" => 1,
            "message" => "Kargo Teslimatı Başarıyla Gerçekleşti."
        ]);
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
