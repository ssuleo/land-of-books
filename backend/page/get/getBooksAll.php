<?php
require_once "../../connectDatabase.php";
require_once '../../tokenHelper.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$query = $pdo->prepare("SELECT books.books_name, users.users_name, books.point, books.book_image ,books.description ,books.publisher FROM books INNER JOIN users ON books.userId = users.idusers");
$query->execute();

echo json_encode([
    "status" => 1,
    "data" => $query->fetchAll(PDO::FETCH_ASSOC)
]);