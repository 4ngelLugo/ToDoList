<?php
session_start();

// Cabeceras para permitir CORS y definir el tipo de contenido
// Cabeceras para permitir CORS y definir el tipo de contenido
// Estas cabeceras permiten que el frontend pueda hacer peticiones a este endpoint desde un origen diferente y el servidor responda con el tipoo de contenido adecuado (.JSON)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// Verificar que el metodo por el que se envian los datos sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Método no permitido']);
  exit();
}

// Destruir la sesión
$_SESSION = [];
if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(
    session_name(),
    '',
    time() - 42000,
    $params["path"],
    $params["domain"],
    $params["secure"],
    $params["httponly"]
  );
}
session_destroy();

http_response_code(200);
echo json_encode(['success' => true]);
