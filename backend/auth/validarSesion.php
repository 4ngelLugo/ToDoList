<?php
session_start();

require_once '../config/Database.php';
require_once '../usuarios/Controller/UsuarioController.php';
require_once './Autenticacion.php';

// Cabeceras para permitir CORS y definir el tipo de contenido
// Estas cabeceras permiten que el frontend pueda hacer peticiones a este endpoint desde un origen diferente y el servidor responda con el tipoo de contenido adecuado (.JSON)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

// Verificar que el metodo por el que se envian los datos sea POST
if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
  http_response_code(405);
  echo json_encode(["error" => "Metodo de petición invalido"]);
  exit();
}

// Recibir todos los datos enviados por POST
$correo = $_POST["correo"] ?? null;
$contrasena = $_POST["contrasena"] ?? null;

if (empty($correo) || empty($contrasena)) {
  http_response_code(response_code: 400);
  echo json_encode(["error" => "Complete todos los campos"]);
  exit();
}

// Conectar a la base de datos y verificar que la conexión sea exitosa
$database = new Database();
$conexion = $database->getConnection();

if (!$conexion) {
  http_response_code(500);
  echo json_encode(["error" => "Ocurrió un error de conexion a la base de datos"]);
  exit();
}

$controller = new UsuarioController($conexion);

$usuario = $controller->obtenerUsuarioPorCorreo($correo);

if (isset($usuario["error"])) {
  http_response_code(500);
  echo json_encode($usuario);
  exit();
}

if (!password_verify($contrasena, $usuario['datos']['contrasena'])) {
  http_response_code(400);
  echo json_encode(["error" => "Contraseña incorrecta"]);
  exit();
}

$token = bin2hex(random_bytes(32)); // Genera un token de 64 caracteres aleatorios

$_SESSION['token'] = $token;

$datos = [
  "isAutenticado" => true,
  "usuario" => [
    "id" => $usuario['datos']['id'],
    "correo" => $usuario['datos']['correo']
  ],
  "token" => $_SESSION['token']
];

http_response_code(200);
echo json_encode($datos);

exit();
