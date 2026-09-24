<?php

require_once __DIR__ . "/config/conexao.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];
    $apresentador = $_POST['apresentador'];
    $local_evento = $_POST['local_evento'];
    $data_evento = $_POST['data_evento'];
    $destaque = $_POST['destaque'];

    $sql = "INSERT INTO eventos
    (
        titulo,
        descricao,
        categoria,
        apresentador,
        local_evento,
        data_evento,
        destaque
    )

    VALUES
    (
        '$titulo',
        '$descricao',
        '$categoria',
        '$apresentador',
        '$local_evento',
        '$data_evento',
        '$destaque'
    )";

    mysqli_query($conn, $sql);

    header("Location: index.php");

    exit();

}

?>