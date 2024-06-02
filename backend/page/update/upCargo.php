<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder(@$_GET['authToken']);
$offersID = @$_GET["offersId"];

if (!empty($offersID) && !empty($_POST["type"]) && !empty($_POST["firma"]) && !empty($_POST["kargoNo"])) {


    $select_query = $pdo->prepare(" SELECT * FROM `offers` WHERE `idoffers` = ?");
    $select_query->execute([$offersID]);


    if ($select_query->rowCount() == 1) {

        $selectedData = $select_query->fetch(PDO::FETCH_ASSOC);


        if ($_POST["type"] == "sender") {
            if ($selectedData["senderCargo"] != null) {
                echo json_encode([
                    "status" => 0,
                    "message" => "Kargo bilgileri zaten ekli."
                ]);
                exit;
            }
        } else {
            if ($selectedData["userCargo"] != null) {
                echo json_encode([
                    "status" => 0,
                    "message" => "Kargo bilgileri zaten ekli."
                ]);
                exit;
            }
        }

        $add_Cargo = $pdo->prepare("INSERT INTO `cargo` (`id`, `cargoName`, `cargoNo` , `cargoStatus`) VALUES (NULL, ?, ?, 0);");
        $add_Cargo->execute([$_POST["firma"], $_POST["kargoNo"]]);

        $Cargo_id = $pdo->lastInsertId();
//eğer type değeri sender ise teklif yapan kullanıcının kargo bilgisini tutar .
        if ($_POST["type"] == "sender") {
            $update_query = $pdo->prepare("UPDATE `offers` SET `senderCargo` = ? WHERE `offers`.`idoffers` = ?");
            $update_query->execute([$Cargo_id, $offersID]);
        } else {
            $update_query = $pdo->prepare("UPDATE `offers` SET `userCargo` = ? WHERE `offers`.`idoffers` = ?");
            $update_query->execute([$Cargo_id, $offersID]);
        }

        echo json_encode([
            "status" => 1,
            "message" => "Kargo bilgileri başarıyla eklendi."
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
