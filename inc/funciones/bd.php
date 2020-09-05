<?php

// credenciales de la base de datos
define('DB_USUARIO', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'agendacontactos');
define('DB_PORT', '3307');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE,DB_PORT);

//Comprueba que se hace la conexion (aparece 1 en la pantalla)
//echo $conn->ping();

?>