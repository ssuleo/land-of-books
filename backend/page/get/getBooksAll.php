<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$query = $pdo->prepare("SELECT devices.devices_name, users.users_name, devices.point, devices.device_image ,devices.description ,devices.brand FROM devices INNER JOIN users ON devices.userId = users.idusers");
$query->execute();

echo json_encode([
    "status" => 1,
    "data" => $query->fetchAll(PDO::FETCH_ASSOC)
]);