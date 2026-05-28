<?php

require_once __DIR__ . "/../config/conexao.php";

if(isset($_POST['cadastrar'])){

    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];
    $apresentador = $_POST['apresentador'];
    $local = $_POST['local_evento'];
    $data = $_POST['data_evento'];
    $imagem = $_POST['imagem'];
    $destaque = $_POST['destaque'];

    $sql = "INSERT INTO eventos
    (
        titulo,
        descricao,
        categoria,
        apresentador,
        local_evento,
        data_evento,
        imagem,
        destaque
    )

    VALUES

    (
        '$titulo',
        '$descricao',
        '$categoria',
        '$apresentador',
        '$local',
        '$data',
        '$imagem',
        '$destaque'
    )";

    mysqli_query($conn, $sql);

    header("Location: ../index.php");

    exit();

}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Criar Evento</title>

    <link rel="stylesheet" href="../assets/css/style.css">

</head>

<body>

<section class="eventos-section">

    <div class="container">

        <div class="section-title">

            <h2>
                Adicionar Evento
            </h2>

            <p>
                Cadastre um novo evento acadêmico.
            </p>

        </div>

        <form method="POST" class="form-evento">

            <input
                type="text"
                name="titulo"
                placeholder="Título do evento"
                required
            >

            <textarea
                name="descricao"
                placeholder="Descrição do evento"
                required
            ></textarea>

            <input
                type="text"
                name="categoria"
                placeholder="Categoria"
                required
            >

            <input
                type="text"
                name="apresentador"
                placeholder="Apresentador"
                required
            >

            <input
                type="text"
                name="local_evento"
                placeholder="Local do evento"
                required
            >

            <input
                type="date"
                name="data_evento"
                required
            >

            <input
                type="text"
                name="imagem"
                placeholder="nome-da-imagem.png"
                required
            >

            <select name="destaque">

                <option value="0">
                    Evento Normal
                </option>

                <option value="1">
                    Evento Destaque
                </option>

            </select>

            <button type="submit" name="cadastrar">
                Cadastrar Evento
            </button>

        </form>

    </div>

</section>

</body>
</html>