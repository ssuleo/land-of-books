<?php
require_once "../connectDatabase.php";
require_once '../tokenHelper.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$search = @$_GET['search'];
$userToken = tokenDecoder($_GET['authToken']);

// SQL sorgusunu hazırlayın
$sql = "SELECT * FROM `devices`  WHERE (`devices_name` LIKE :search  OR `model` LIKE :search) AND `userId` != :idusers;";
$stmt = $pdo->prepare($sql);



// Arama parametresini % ile çevreleyerek sorguyu tamamlamak için joker karakteri ekleyin
$search_param = '%' . $search . '%';

// Hazırlanmış sorguyu çalıştırın ve parametreyi bağlayın
$stmt->execute([':search' => $search_param , ':idusers' => $userToken->data->idusers]);

// Sonuçları fetch ile alın
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

// JSON formatında sonuçları ekrana yazdırın
echo json_encode($row);

// PDO ve statement'ı kapatın
unset($stmt);
unset($pdo);
