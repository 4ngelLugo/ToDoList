<?php
require_once __DIR__ . '/../Model/Tarea.php';
class TareaController
{
  private $modelo_tarea;

  public function __construct($conn)
  {
    $this->modelo_tarea = new Tarea($conn);
  }

  public function guardarTarea(array $datos)
  {
    // Valida que los campos reequeridos no esten vacios
    if (
      empty($datos['titulo']) ||
      empty($datos['descripcion']) ||
      empty($datos['usuario_id']) ||
      empty($datos['ciudad'])
    ) return ["error" => "Complete todos los campos"];

    $resultado = $this->modelo_tarea->guardarTarea($datos);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al crear la tarea"];
  }
  public function obtenerTodasLasTareas()
  {
    $resultado = $this->modelo_tarea->obtenerTodasLasTareas();
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al obtener las tareas"];
  }

  public function obtenerTodasLasTareasPorUsuario(int $usuario_id)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($usuario_id)) return ["error" => "No se establecio el usuario"];

    $resultado = $this->modelo_tarea->obtenerTodasLasTareasPorUsuario($usuario_id);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al obtener las tareas"];
  }

  public function obtenerTareaPorId(int $id)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($id)) return ["error" => "No se establecio una tarea a buscar"];

    $resultado = $this->modelo_tarea->obtenerTareaPorId($id);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al obtener la tarea"];
  }

  public function editarTarea(array $datos)
  {
    // Valida que los campos reequeridos no esten vacios
    if (
      empty($datos['titulo']) ||
      empty($datos['descripcion'])
    ) return ["error" => "Complete todos los campos"];

    if (empty($datos['id'])) return ["error" => "No se establecio una tarea a editar"];

    $resultado = $this->modelo_tarea->editarTarea($datos);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al editar la tarea"];
  }

  public function completarTarea(int $id)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($id)) return ["error" => "No se establecio una tarea a completar"];

    $resultado = $this->modelo_tarea->completarTarea($id);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al completar la tarea"];
  }

  public function eliminarTarea(int $id)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($id)) return ["error" => "No se establecio una tarea a eliminar"];

    $resultado = $this->modelo_tarea->eliminarTarea($id);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al eliminar la tarea"];
  }
}
