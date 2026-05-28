<?php

require_once __DIR__ . "/config/conexao.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $id = $_POST['id'];
    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];
    $apresentador = $_POST['apresentador'];
    $local_evento = $_POST['local_evento'];
    $data_evento = $_POST['data_evento'];
    $destaque = $_POST['destaque'];

    $sql = "UPDATE eventos SET
        titulo = '$titulo',
        descricao = '$descricao',
        categoria = '$categoria',
        apresentador = '$apresentador',
        local_evento = '$local_evento',
        data_evento = '$data_evento',
        destaque = '$destaque'
        WHERE id = $id";

    mysqli_query($conn, $sql);
}

header("Location: index.php");
exit();

?>