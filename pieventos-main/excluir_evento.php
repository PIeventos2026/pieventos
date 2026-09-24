<?php

require_once __DIR__ . "/config/conexao.php";

if(isset($_GET['id'])){

    $id = $_GET['id'];

    $sql = "DELETE FROM eventos WHERE id = $id";

    mysqli_query($conn, $sql);

}

header("Location: index.php");

exit();

?>