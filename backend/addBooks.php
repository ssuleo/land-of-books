<?php
require_once "connectDatabase.php";
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
    $statusQuery = $pdo->query("SELECT idstatus, book_status FROM status");
    while ($row = $statusQuery->fetch(PDO::FETCH_ASSOC)) {
        $statuses[$row['idstatus']] = $row['book_status'];
    }

    return ['categories' => $categories, 'statuses' => $statuses];
}

function addBook($pdo, $bookName, $authorName, $publicationYear, $description, $idcategory, $idstatus, $bookImage, $point) {
    try {
        $sql = "INSERT INTO books (books_name, writer, publication_year, description, idcategory, idstatus, book_image, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$bookName, $authorName, $publicationYear, $description, $idcategory, $idstatus, $bookImage, $point]);
        echo "Kitap başarıyla eklendi.";
    } catch (PDOException $e) {
        echo "Kitap eklenirken bir hata oluştu: " . $e->getMessage();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bookName = $_POST['bookName'] ?? '';
    $authorName = $_POST['authorName'] ?? '';
    $publicationYear = $_POST['publishYear'] ?? '';
    $description = $_POST['description'] ?? '';
    $idcategory = $_POST['category'] ?? '';
    $idstatus = $_POST['status'] ?? '';
    $bookImage = ''; 
    $point = $_POST["point"] ?? '';

    $publicationYear = filter_var($publicationYear, FILTER_VALIDATE_INT);
    $idcategory = filter_var($idcategory, FILTER_VALIDATE_INT);
    $idstatus = filter_var($idstatus, FILTER_VALIDATE_INT);
    $point = filter_var($point, FILTER_VALIDATE_INT);

    if ($publicationYear && $idcategory && $idstatus && $point) {
        addBook($pdo, $bookName, $authorName, $publicationYear, $description, $idcategory, $idstatus, $bookImage, $point);
    } else {
        echo "Girilen verilerde bir hata var.";
    }
} else {
    echo json_encode(getCategoriesAndStatuses($pdo));
}