# PRUEBA TECNICA BRANGUS

Repositorio de la prueba técnica para la empresa Brangus, que incluye un backend en PHP, un frontend con ReactJS y usa CSS vanilla para los estilos

> [!IMPORTANT]
>
> ## Requisitos
>
> **PHP** con extensiones PDO habilitadas
> **Servidor web** Apache
> **MySQL** o MariaDB equivalente
> **Node.js** y **npm**/ **npx**

## Instalación

1. **Clonar el repositorio**

- Clonar el repositorio en la carpeta htdocs de xampp [C:\xampp\htdocs]

2. **Configurar base de datos**

- Importar el archivo .sql que se encuentra en la carpeta raiz del repositorio en su administrador de MySQL
> [!TIP]
> 
> Se recomienda nombrar la base de datos todo_app

3. **Configurar el backend**

- Entrar al archivo ubicado en '/backend/config/Database.php'
- Cambiar los atributos de la clase por los de su host, usuario y base de datos
- Datos por defecto:
  ```php
  host = "localhost"
  user = "root"
  password = ""
  database = "todo_app
  ```

4. **Configurar frontend**

- Entrar desde cmd, powershell o gitbash a la carpeta '/frontend':
  `cd C:\xampp\htdocs\PruebaTecnicaBrangus\frontend`
- Una vez dentro de la carpeta '/frontend' en la consola, se debe instalar las dependencias usando:
  `npm install`
- En caso de que en su servidor Apache se necesite escribir el puerto en la url para entrar, debe ingresar al archivo ubicado en '/frontend/src/constants/url.js' y ajustar la url
- Crear un archivo llamado '.env' en la carpeta '/frontend'
- Copiar en este el contenido de '.env.example' ubicado en la carpeta '/frontend', reemplazando "tu_api_key_aqui" por una API key valida de la pagina [openWeather](https://openweathermap.org/api)

5. **Iniciar el proyecto**

- Una vez configurado todo lo anterior, entrar desde cmd, powershell o gitbash a la carpeta '/frontend':
  `cd C:\xampp\htdocs\PruebaTecnicaBrangus\frontend`
- En la consola ingresar
  `npm run dev`
- Aparecera un link, debe asegurarse de que el puerto de este sea '5173'
- Al entrar al link podra empezar a usar la aplicación
