<?php
class Autenticacion
{
  public function autenticar($correo, $contrasena, $hash)
  {
    // Valida que los campos reequeridos no esten vacios
    if (empty($correo) || empty($contrasena)) return ["error" => "Complete todos los campos"];

    if (!password_verify($contrasena, $hash)) return ["error" => "Contraseña incorrecta"];

    return ["success" => true];
  }
}
