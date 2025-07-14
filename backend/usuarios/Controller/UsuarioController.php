<?php
require_once __DIR__ . '/../Model/Usuario.php';

class UsuarioController
{
  private $modelo_usuario;

  public function __construct($conn)
  {
    $this->modelo_usuario = new Usuario($conn);
  }

  public function guardarUsuario(string $correo, string $contrasena)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($correo) || empty($contrasena)) return ["error" => "Complete todos los campos"];

    // Valida que no exista un usuario con el mismo correo en la base de datos antes de crear uno nuevo
    $validar_correo = $this->modelo_usuario->obtenerUsuarioPorCorreo($correo);
    if (isset($validar_correo["datos"]["correo"])) return ["error" => "Ya existe un usuario con este correo"];

    // Encripta la contraseña del usuario antes de registrarlo en la base de datos
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);

    $resultado = $this->modelo_usuario->guardarUsuario($correo, $hash);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al crear el usuario"];
  }

  public function obtenerUsuarioPorCorreo(string $correo)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($correo)) return ["error" => "No se dio un correo"];

    $resultado = $this->modelo_usuario->obtenerUsuarioPorCorreo($correo);
    if ($resultado) return $resultado;

    return ["error" => "Ocurrió un error al obtener el usuario"];
  }
}
