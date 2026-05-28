<?php

session_start();

require_once __DIR__ . "/config/conexao.php";

if(!isset($_SESSION['usuario'])){

    header("Location: login.php");

    exit();

}

if(isset($_GET['evento_id'])){

    $evento_id = $_GET['evento_id'];

    $rmAluno = $_SESSION['rm'];

    $sql = "DELETE FROM inscricoes
            WHERE usuario_rm = '$rmAluno'
            AND evento_id = '$evento_id'";

    mysqli_query($conn, $sql);

}

header("Location: index.php#meusEventos");

exit();

?>