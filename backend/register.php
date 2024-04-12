<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$host = 'localhost';
$dbname = 'land_of_books'; 
$username = 'root'; 
$password = 'Sulee2001.';

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
        $user_password = password_hash($data['password'], PASSWORD_DEFAULT); // Password hashing

        // Check if user already exists
        $checkSql = "SELECT * FROM users WHERE users_name = :username OR email = :email";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->bindParam(":username", $username, PDO::PARAM_STR);
        $checkStmt->bindParam(":email", $email, PDO::PARAM_STR);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            // User already exists
            echo json_encode(["error" => "Username or Email already exists."]);
        } else {
            // Insert new user
            $sql = "INSERT INTO users (users_name, email, password) VALUES (:username, :email, :password)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":password", $user_password, PDO::PARAM_STR);

            if($stmt->execute()) {
                // Successfully created user
                echo json_encode(["message" => "User successfully registered."]);
            } else {
                echo json_encode(["error" => "There was a problem registering the user."]);
            }
        }
    } else {
        echo json_encode(["error" => "Invalid request data"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
