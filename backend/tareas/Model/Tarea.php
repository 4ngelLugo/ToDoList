<?php
class Tarea
{
  private $conn;
  private $tabla_tareas = "tareas";
  private $tabla_usuarios = "usuarios";

  public function __construct($conn)
  {
    $this->conn = $conn;
  }

  public function guardarTarea(array $datos)
  {
    try {
      // Crea y prepara la sentencia sql para guardar usuarios
      $sql = "INSERT INTO {$this->tabla_tareas} (
        titulo,
        descripcion,
        estado,
        fecha_creacion,
        usuario_id,
        ciudad,
        clima_actual,
        frase_motivacional
      ) VALUES (
        :titulo,
        :descripcion,
        'pendiente',
        CURRENT_TIMESTAMP(),
        :usuario_id,
        :ciudad,
        :clima_actual,
        :frase_motivacional
      )";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      // Añade los parametros de la sentencia
      $stmt->bindParam(":titulo", $datos['titulo']);
      $stmt->bindParam(":descripcion", $datos['descripcion']);
      $stmt->bindParam(":usuario_id", $datos['usuario_id']);
      $stmt->bindParam(":ciudad", $datos['ciudad']);
      $stmt->bindParam(":clima_actual", $datos['clima_actual']);
      $stmt->bindParam(":frase_motivacional", $datos['frase_motivacional']);

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al crear la tarea");

      $stmt = null; // Cierra la declaración
      return ["success" => true];
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }

  public function obtenerTodasLasTareas()
  {
    try {
      $sql = "SELECT
        t.id,
        t.titulo,
        t.descripcion,
        t.estado,
        t.fecha_creacion as fechaCreacion,
        t.usuario_id as usuarioId,
        u.correo as usuarioCorreo,
        t.ciudad,
        t.clima_actual as climaActual,
        t.frase_motivacional as fraseMotivacional
      FROM {$this->tabla_tareas} t
      LEFT JOIN {$this->tabla_usuarios} u
        ON t.usuario_id = u.id
      ORDER BY t.id ASC";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al obtener las tareas");

      // Obtiene los datos de la consulta en un array asociativo
      $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $stmt = null; // Cierra la declaración

      if ($datos) return ["success" => true, "datos" => $datos];

      return ["success" => "No se encontraron tareas"];;
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }

  public function obtenerTodasLasTareasPorUsuario(int $usuario_id)
  {
    try {
      $sql = "SELECT
        t.id,
        t.titulo,
        t.descripcion,
        t.estado,
        t.fecha_creacion as fechaCreacion,
        t.usuario_id as usuarioId,
        u.correo as usuarioCorreo,
        t.ciudad,
        t.clima_actual as climaActual,
        t.frase_motivacional as fraseMotivacional
      FROM {$this->tabla_tareas} t
      LEFT JOIN {$this->tabla_usuarios} u
        ON t.usuario_id = u.usuario_id
      WHERE t.usuario_id = :usuario_id
      ORDER BY t.id ASC";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      $stmt->bindParam(":usuario_id", $usuario_id);

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al obtener las tareas");

      // Obtiene los datos de la consulta en un array asociativo
      $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $stmt = null; // Cierra la declaración

      if ($datos) return ["success" => true, "datos" => $datos];

      return ["success" => "No se encontraron tareas"];;
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }

  public function obtenerTareaPorId(int $id)
  {
    try {
      $sql = "SELECT
        t.id,
        t.titulo,
        t.descripcion,
        t.estado,
        t.fecha_creacion as fechaCreacion,
        t.usuario_id as usuarioId,
        u.correo as usuarioCorreo,
        t.ciudad,
        t.clima_actual as climaActual,
        t.frase_motivacional as fraseMotivacional
      FROM {$this->tabla_tareas} t
      LEFT JOIN {$this->tabla_usuarios} u
        ON t.usuario_id = u.usuario_id
      WHERE t.id = :id
      ORDER BY t.id ASC";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      $stmt->bindParam(":id", $id);

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al obtener la tarea");

      // Obtiene los datos de la consulta en un array asociativo
      $datos = $stmt->fetch(PDO::FETCH_ASSOC);

      $stmt = null; // Cierra la declaración

      if ($datos) return ["success" => true, "datos" => $datos];

      return ["error" => "Tarea no encontrada"];
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }
}
