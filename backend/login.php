<?php
require_once "connectDatabase.php";
require_once 'vendor/autoload.php';
require_once 'tokenHelper.php'; 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

session_start();

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($data && isset($data['users_name'], $data['email'], $data['password'])) {
        $username = $data['users_name'];
        $email = $data['email'];
        $user_password = $data['password'];

        $sql = "SELECT idusers, users_name, email, password, point FROM users WHERE users_name = :username AND email = :email";

        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() == 1) {
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    $stored_password = $row['password'];
                    if (password_verify($user_password, $stored_password)) {
                        $jwt = tokenHelper($row['idusers'], $row['users_name'], $row['email']); 
                        echo json_encode(["message" => "Success", "token" => $jwt]);
                    } else {
                        echo json_encode(["error" => "Incorrect password"]);
                    }
                } else {
                    echo json_encode(["error" => "No user found with the provided username and email"]);
                }
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
            unset($stmt);
        }
    } else {
        echo json_encode(["error" => "Invalid request data"]);
    }
}
unset($pdo);
?>