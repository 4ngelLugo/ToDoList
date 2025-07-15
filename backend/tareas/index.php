<?php
session_start();

require_once '../config/Database.php';
require_once './Controller/TareaController.php';

// Cabeceras para permitir CORS y definir el tipo de contenido
// Estas cabeceras permiten que el frontend pueda hacer peticiones a este endpoint desde un origen diferente y el servidor responda con el tipoo de contenido adecuado (.JSON)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
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

$controller = new TareaController($conexion);

// Obtener tareas por id de usuario, id de tarea u obtenerlas todas
if (isset($_GET['usuario_id']))
  $resultado = $controller->obtenerTodasLasTareasPorUsuario($_GET['usuario_id']);
else if (isset($_GET['tarea_id']))
  $resultado = $controller->obtenerTareaPorId($_GET['tarea_id']);
else
  $resultado = $controller->obtenerTodasLasTareas();

if (isset($resultado["error"])) {
  http_response_code(500);
  echo json_encode($resultado);
  exit();
}

http_response_code(201);
echo json_encode($resultado);

exit();
