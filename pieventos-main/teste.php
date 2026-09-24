<?php

$host = "127.0.0.1";
$user = "root";
$pass = "";
$db = "bancoev";

/* CONEXÃO */
$conn = mysqli_connect($host, $user, $pass, $db);

/* VERIFICAÇÃO */
if (!$conn) {

    die("Erro na conexão: " . mysqli_connect_error());

}

echo "<h1>Conexão OK!</h1>";

/* CONSULTA */
$sql = "SELECT * FROM eventos";

$result = mysqli_query($conn, $sql);

/* MOSTRAR EVENTOS */
while($evento = mysqli_fetch_assoc($result)) {

    echo "<hr>";

    echo "<h2>" . $evento['titulo'] . "</h2>";

    echo "<p>" . $evento['descricao'] . "</p>";

    echo "<p><strong>Categoria:</strong> " . $evento['categoria'] . "</p>";

    echo "<p><strong>Apresentador:</strong> " . $evento['apresentador'] . "</p>";

    echo "<p><strong>Local:</strong> " . $evento['local_evento'] . "</p>";

    echo "<p><strong>Data:</strong> " . $evento['data_evento'] . "</p>";

}

?>