<?php
class Usuario
{
  private $conn;
  private $tabla_usuarios = "usuarios";

  public function __construct($conn)
  {
    $this->conn = $conn;
  }

  public function guardarUsuario(string $correo, string $contrasena)
  {
    try {
      // Crea y prepara la sentencia sql para guardar usuarios
      $sql = "INSERT INTO {$this->tabla_usuarios} (
        correo, contrasena
        ) VALUES (
        :correo, :contrasena)";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      // Añade los parametros de la sentencia
      $stmt->bindParam(":correo", $correo);
      $stmt->bindParam(":contrasena", $contrasena);

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al crear el usuario");

      $stmt = null; // Cierra la declaración
      return ["success" => true];
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }

  public function obtenerUsuarioPorCorreo(string $correo)
  {
    try {
      // Crea y prepare la sentencia sql para guardar usuarios
      $sql = "SELECT * FROM {$this->tabla_usuarios}
        WHERE correo = :correo";
      $stmt = $this->conn->prepare($sql);

      if (!$stmt) throw new PDOException("Ocurrió un error al preparar la consulta");

      $stmt->bindParam(":correo", $correo);

      if (!$stmt->execute()) throw new PDOException("Ocurrió un error al obtener el usuario");

      // Obtiene los datos de la consulta en un array asociativo
      $datos = $stmt->fetch(PDO::FETCH_ASSOC);

      $stmt = null; // Cierra la declaración

      if ($datos) return ["success" => true, "datos" => $datos];

      return ["error" => "Correo de usuario no encontrado"];
    } catch (PDOException $e) {
      return ["error" => $e->getMessage()];
    }
  }
}
