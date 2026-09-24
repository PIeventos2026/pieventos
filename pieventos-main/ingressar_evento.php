<?php

session_start();

require_once __DIR__ . "/config/conexao.php";

if(!isset($_SESSION['usuario'])){

    header("Location: login.php");

    exit();

}

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $usuario_rm = $_SESSION['rm'];
    $evento_id = $_POST['evento_id'];

    $sqlVerifica = "SELECT * FROM inscricoes
    WHERE usuario_rm = '$usuario_rm'
    AND evento_id = '$evento_id'";

    $resultVerifica = mysqli_query($conn, $sqlVerifica);

    if(mysqli_num_rows($resultVerifica) == 0){

        $sql = "INSERT INTO inscricoes
        (usuario_rm, evento_id)

        VALUES
        ('$usuario_rm', '$evento_id')";

        mysqli_query($conn, $sql);

    }

}

header("Location: index.php#meusEventos");

exit();

?>