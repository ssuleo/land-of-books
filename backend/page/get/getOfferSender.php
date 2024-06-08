<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$userToken = tokenDecoder($_GET['authToken']);

if (!empty($userToken)) {

    $query = $pdo->prepare("SELECT offers.*, 
    user.users_name AS user_name, 
    sender.users_name AS sender_name,
    userdevice.devices_name AS userdevice_name,
userdevice.writer AS userdevice_author,
userdevice.point AS userdevice_point,
    userdevice.device_image AS userdevice_image,
    senderdevice.devices_name AS senderdevice_name,
senderdevice.writer AS senderdevice_author,
senderdevice.point AS senderdevice_point,
    senderdevice.device_image AS senderdevice_image,
senderCargo.cargoNo AS senderCargoNo,
userCargo.cargoNo AS userCargoNo
FROM offers
INNER JOIN users AS user ON user.idusers = offers.idusers
INNER JOIN users AS sender ON sender.idusers = offers.idsenders
INNER JOIN devices AS userdevice ON userdevice.iddevices = offers.iddevices
INNER JOIN devices AS senderdevice ON senderdevice.iddevices = offers.senddevices
INNER JOIN cargo AS senderCargo ON senderCargo.id = offers.senderCargo
INNER JOIN cargo AS userCargo ON userCargo.id = offers.userCargo
WHERE  offers.idsenders = :userid
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
