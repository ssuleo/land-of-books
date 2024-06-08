<?php
require_once '../vendor/autoload.php';
require_once "../connectDatabase.php";
require_once '../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder($_GET['authToken']);
$device = ($_GET['device']);

if(!empty($userToken)){



    $sql = "SELECT * FROM `devices` WHERE `userId` != :idusers AND `iddevices` = :iddevices";
    if ($stmt = $pdo->prepare($sql)) {
        $stmt->bindParam(":idusers", $userToken->data->idusers, PDO::PARAM_STR);
        $stmt->bindParam(":iddevices", $device, PDO::PARAM_STR);
   

        if ($stmt->execute()) {
  
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($row);
      
        } else {
            echo json_encode(["error" => "Kullanıcı bilgileri bulunamadı."]);
        }
        unset($stmt);
    }
    unset($pdo);

}else{
    echo json_encode(["error" => "Kullanıcı bilgileri bulunamadı."]);
    exit;
}