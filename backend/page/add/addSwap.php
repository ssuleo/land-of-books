<?php

require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$book = $_POST["book"];

$userToken = tokenDecoder($_GET['authToken']);


if(!empty($book) && !empty($userToken)){
   
    $sql2 = "SELECT * FROM `books` WHERE `idbooks` = ?";
    $query2 = $pdo->prepare($sql2);
    $query2->execute([$book]);

    $userbook = $query2->fetch(PDO::FETCH_ASSOC);

    $user = $pdo->prepare("SELECT * FROM `users` WHERE `idusers` = ?");
    $user->execute([$userToken->data->idusers]);

    $user = $user->fetch(PDO::FETCH_ASSOC);
    

    if($user["point"] >= $userbook["point"]){
        $savesql = "INSERT INTO `offers` (`idoffers`, `idsenders`, `idusers`, `idbooks`, `sendbooks`, `status`, `senderAdress`, `offered_points`,`requested_points`) VALUES (NULL, ?, ?, ?, ?, '0',?, ?,?);";

        $savequery = $pdo->prepare($savesql);
        $savequery->execute([$userToken->data->idusers , $userbook["userId"] ,NULL , $userbook["idbooks"] ,$_POST["adress"] , $userbook["point"],$userbook["point"] ]);    
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