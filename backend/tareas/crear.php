<?php
session_start();

require_once '../config/Database.php';
require_once './Controller/TareaController.php';

// Cabeceras para permitir CORS y definir el tipo de contenido
// Estas cabeceras permiten que el frontend pueda hacer peticiones a este endpoint desde un origen diferente y el servidor responda con el tipoo de contenido adecuado (.JSON)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// Verificar que el metodo por el que se envian los datos sea POST
if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
  http_response_code(405);
  echo json_encode(["error" => "Metodo de petición invalido"]);
  exit();
}

// Recibe el token de sesión de la petición y valida que esta exista en php
$headers = getallheaders();
$token = $headers['Authorization'] ?? '';

if ($token !== $_SESSION['token']) {
  http_response_code(401);
  echo json_encode(['error' => 'Token inválido']);
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

// Recibir todos los datos enviados por POST
$datos = [
  "titulo"              => $_POST['titulo'] ?? null,
  "descripcion"         => $_POST['descripcion'] ?? null,
  "usuario_id"          => $_POST['usuario_id'] ?? null,
  "ciudad"              => $_POST['ciudad'] ?? null,
  "clima_actual"        => $_POST['clima_actual'] ?? null,
  "frase_motivacional"  => $_POST['frase_motivacional'] ?? null
];

$controller = new TareaController($conexion);

$resultado = $controller->guardarTarea($datos);

if (isset($resultado["error"])) {
  http_response_code(500);
  echo json_encode($resultado);
  exit();
}

http_response_code(201);
echo json_encode($resultado);

exit();
