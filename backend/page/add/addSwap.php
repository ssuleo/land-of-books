<?php

require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$device = $_POST["device"];

$userToken = tokenDecoder($_GET['authToken']);


if(!empty($device) && !empty($userToken)){
   
    $sql2 = "SELECT * FROM `devices` WHERE `iddevices` = ?";
    $query2 = $pdo->prepare($sql2);
    $query2->execute([$device]);

    $userdevice = $query2->fetch(PDO::FETCH_ASSOC);

    $user = $pdo->prepare("SELECT * FROM `users` WHERE `idusers` = ?");
    $user->execute([$userToken->data->idusers]);

    $user = $user->fetch(PDO::FETCH_ASSOC);
    

    if($user["point"] >= $userdevice["point"]){
        $savesql = "INSERT INTO `offers` (`idoffers`, `idsenders`, `idusers`, `iddevices`, `senddevices`, `status`, `senderAdress`, `offered_points`,`requested_points`) VALUES (NULL, ?, ?, ?, ?, '0',?, ?,?);";

        $savequery = $pdo->prepare($savesql);
        $savequery->execute([$userToken->data->idusers , $userdevice["userId"] ,NULL , $userdevice["iddevices"] ,$_POST["adress"] , $userdevice["point"],$userdevice["point"] ]);    
        echo json_encode([
            "status" => 1,
            "message" => "İstek Gönderildi."
        ]);
    }else{
        echo json_encode([
            "message" => "Yetersiz puan"
        ]);
    }


}else{
    echo json_encode([
        "status" => 0,
        "message" => "Query parametreleri bulunamadı."
    ]);
}