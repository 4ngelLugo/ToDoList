<?php
class Database
{
  private $conn = null;

  private $host = "localhost";
  private $usuario = "root";
  private $contrasena = "";
  private $database = "todo_app";

  public function __construct()
  {
    try {
      $this->conn = null;

      $this->conn = new PDO("mysql:host={$this->host};dbname={$this->database};charset=utf8", $this->usuario, $this->contrasena);
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
      die("Error en la conexión: " . $e->getMessage());
    }
  }

  public function getConnection()
  {
    if ($this->conn !== null) {
      return $this->conn;
    }
  }
}
