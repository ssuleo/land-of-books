<?php
require_once "connectDatabase.php";
require_once 'tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

session_start();

function getCategoriesAndStatuses($pdo) {
    $categories = [];
    $categoryQuery = $pdo->query("SELECT idcategory, category_name FROM category");
    while ($row = $categoryQuery->fetch(PDO::FETCH_ASSOC)) {
        $categories[$row['idcategory']] = $row['category_name'];
    }

    $statuses = [];
    $statusQuery = $pdo->query("SELECT idstatus, device_status FROM status");
    while ($row = $statusQuery->fetch(PDO::FETCH_ASSOC)) {
        $statuses[$row['idstatus']] = $row['device_status'];
    }

    return ['categories' => $categories, 'statuses' => $statuses];
}

function saveImage($imageFile) {
    if ($imageFile['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Dosya yükleme hatası.');
    }

    $validTypes = ['image/jpeg', 'image/png'];
    if (!in_array($imageFile['type'], $validTypes)) {
        throw new Exception('Geçersiz dosya tipi.');
    }

    $uniqueName = time() . '_' . md5(basename($imageFile['name'])) . '.png';
    $targetPath = 'uploads/' . $uniqueName;
    
    if (move_uploaded_file($imageFile['tmp_name'], $targetPath)) {
        return $uniqueName;
    } else {
        throw new Exception('Resim yükleme başarısız.');
    }
}

function adddevice($pdo, $userId, $deviceName, $authorName, $year, $description, $category_id, $idstatus, $deviceImage, $point,$brand) {
    try {
        $sql = "INSERT INTO devices (userId, devices_name, model, year, description, category_id, idstatus, device_image, point,brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $deviceName, $authorName, $year, $description, $category_id, $idstatus, $deviceImage, $point,$brand]);

        $sql2 = "UPDATE users SET point = COALESCE(point, 0) + 2 WHERE idusers = ?";
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->execute([$userId]);

        echo "Cihaz başarıyla eklendi.";
    } catch (PDOException $e) {
        echo "Cihaz eklenirken bir hata oluştu: " . $e->getMessage();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $deviceImage = saveImage($_FILES['deviceImage']); 
        $deviceName = $_POST['deviceName'] ?? '';
        $authorName = $_POST['authorName'] ?? '';
        $year = filter_var($_POST['publishYear'], FILTER_VALIDATE_INT);
        $description = $_POST['description'] ?? '';
        $category_id = filter_var($_POST['category'], FILTER_VALIDATE_INT);
        $idstatus = filter_var($_POST['status'], FILTER_VALIDATE_INT);
        $point = filter_var($_POST["point"], FILTER_VALIDATE_INT);
        $brand = $_POST['brand'] ?? '';

        if (!$year || !$category_id || !$idstatus || !$point) {
            throw new Exception('Girilen verilerde bir hata var.');
        }

        $userToken = tokenDecoder($_GET['authToken']);
        if (!$userToken) {
            throw new Exception('Geçersiz kullanıcı token.');
        }

        adddevice($pdo, $userToken->data->idusers, $deviceName, $authorName, $year, $description, $category_id, $idstatus, $deviceImage, $point,$brand);
    } catch (Exception $e) {
        echo $e->getMessage();
    }
} else {
    echo json_encode(getCategoriesAndStatuses($pdo));
}
?>
