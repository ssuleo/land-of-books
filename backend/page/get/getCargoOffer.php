<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder($_GET['authToken']);

if (!empty($userToken)) {

    $query = $pdo->prepare("SELECT offers.*, 
    sender.users_name AS sender_name,
    user.users_name AS user_name,
    senderdevice.devices_name AS senderdevice_name,
    senderdevice.model AS senderdevice_author,
    senderdevice.point AS senderdevice_point,
    senderdevice.device_image AS senderdevice_image,
    userdevice.devices_name AS userdevice_name,
    userdevice.model AS userdevice_author,
    userdevice.point AS userdevice_point,
    userdevice.device_image AS userdevice_image,
    senderCargo.cargoNo AS senderCargoNo,
    userCargo.cargoNo AS userCargoNo,
    senderCargo.cargoStatus AS senderCargoStatus,
    userCargo.cargoStatus AS userCargoStatus
FROM offers
LEFT JOIN users AS sender ON sender.idusers = offers.idsenders
LEFT JOIN users AS user ON user.idusers = offers.idusers
LEFT JOIN devices AS senderdevice ON senderdevice.iddevices = offers.senddevices
LEFT JOIN devices AS userdevice ON userdevice.iddevices = offers.iddevices
LEFT JOIN cargo AS senderCargo ON senderCargo.id = offers.senderCargo
LEFT JOIN cargo AS userCargo ON userCargo.id = offers.userCargo
WHERE (offers.idusers = :userid OR offers.idsenders = :userid) 
ORDER BY offers.idoffers DESC;



");

    $query->execute([":userid" => $userToken->data->idusers]);

    echo json_encode([
        "status" => 1,
        "userId" => $userToken->data->idusers,
        "data" => $query->fetchAll(PDO::FETCH_ASSOC)
    ]);
} else {
    echo json_encode([
        "status" => 0,
        "message" => "Query Parametreleri bulunamadı."
    ]);
}
