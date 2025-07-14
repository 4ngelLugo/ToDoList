<?php
require_once '../config/Database.php';
require_once './Controller/TareaController.php';

// Cabeceras para permitir CORS y definir el tipo de contenido
// Estas cabeceras permiten que el frontend pueda hacer peticiones a este endpoint desde un origen diferente y el servidor responda con el tipoo de contenido adecuado (.JSON)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
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
$id = $_GET["tarea_id"];

$controller = new TareaController($conexion);

$resultado = $controller->completarTarea($id);

if (isset($resultado["error"])) {
  http_response_code(500);
  echo json_encode($resultado);
  exit();
}

http_response_code(201);
echo json_encode($resultado);

exit();
