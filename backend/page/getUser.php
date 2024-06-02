<?php
require_once '../vendor/autoload.php';
require_once "../connectDatabase.php";
require_once '../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder($_GET['authToken']);

if(!empty($userToken)){


    $sql = "SELECT users_name, email,phone_number,point point FROM users WHERE idusers = :idusers";
    if ($stmt = $pdo->prepare($sql)) {
        $stmt->bindParam(":idusers", $userToken->data->idusers, PDO::PARAM_STR);
        if ($stmt->execute()) {
            if ($stmt->rowCount() == 1) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($row);
            } else {
                echo json_encode(["error" => "Kullanıcı bilgileri bulunamadı."]);
            }
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