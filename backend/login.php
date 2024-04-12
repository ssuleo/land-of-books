<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$host = 'localhost';
$dbname = 'land_of_books'; 
$username = 'root'; 
$password = 'Sulee2001.'; 

session_start();

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}

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
                    if (password_verify($user_password, $stored_password)) { // Şifreleri doğrulama
                        $_SESSION["idusers"] = $row['idusers'];
                        $_SESSION["users_name"] = $row['users_name'];
                        $_SESSION["email"] = $row['email'];
                        $_SESSION["point"] = $row['point'];
                        
                        echo json_encode(["message" => "Success"]);
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
