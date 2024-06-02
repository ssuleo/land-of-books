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
    senderBook.books_name AS senderBook_name,
    senderBook.writer AS senderBook_author,
    senderBook.point AS senderBook_point,
    senderBook.book_image AS senderBook_image,
    userBook.books_name AS userBook_name,
    userBook.writer AS userBook_author,
    userBook.point AS userBook_point,
    userBook.book_image AS userBook_image,
    senderCargo.cargoNo AS senderCargoNo,
    userCargo.cargoNo AS userCargoNo,
    senderCargo.cargoStatus AS senderCargoStatus,
    userCargo.cargoStatus AS userCargoStatus
FROM offers
LEFT JOIN users AS sender ON sender.idusers = offers.idsenders
LEFT JOIN users AS user ON user.idusers = offers.idusers
LEFT JOIN books AS senderBook ON senderBook.idbooks = offers.sendbooks
LEFT JOIN books AS userBook ON userBook.idbooks = offers.idbooks
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
