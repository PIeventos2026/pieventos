<?php

$host = "127.0.0.1";
$user = "root";
$pass = "";
$db = "bancoev";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Erro na conexão: " . mysqli_connect_error());
}

?>