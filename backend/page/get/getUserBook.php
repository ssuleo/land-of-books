<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$userId = $_GET['userId'];


if(!empty($userId)){
    $query = "SELECT * FROM books WHERE userId = :userId";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':userId', $userId);

    $stmt->execute();

    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => 1,
        "data" => $books
    ]);
}else{
    echo json_encode([
        "status" => 0,
        "message" => "Query Parametreleri bulunamadı."
    ]);
}


?>