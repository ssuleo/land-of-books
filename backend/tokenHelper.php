<?php
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
function tokenHelper($id, $username, $email) {
    $key = "authToken";
    $payload = array(
        "exp" => time() + (86400 * 30),
        "data" => array(
            "idusers" => $id,
            "users_name" => $username,
            "email" => $email
        )
    );

    return JWT::encode($payload, $key, 'HS256');
}



function tokenDecoder($token) {
    $key = "authToken";

    try {
        // JWT'yi çözmek ve doğrulamak için JWT::decode() fonksiyonunu kullanıyoruz
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        
        // JWT'nin çözülen verisini geri döndürüyoruz
        return $decoded;
    } catch (\Exception $e) {
        // Hata durumunda uygun bir yanıt veya hata mesajı dönüyoruz
        return 0;
    }
}


function validateTokenAndGetUsername($pdo) {
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
        echo json_encode(["error" => "Authorization header is missing"]);
        exit;
    }
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);
    if (count($arr) != 2) {
        echo json_encode(["error" => "Authorization header is invalid"]);
        exit;
    }
    $jwt = $arr[1];
    $key = "authToken";
    try {
        $decoded = JWT::decode($jwt, $key , 'HS256');
        return $decoded->data->users_name;
    } catch (Exception $e) {
        echo json_encode(["error" => "Access denied. Error: " . $e->getMessage()]);
        exit;
    }
}
?>
