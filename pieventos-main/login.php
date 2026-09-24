<?php

session_start();

require_once __DIR__ . "/config/conexao.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $rm = trim($_POST['rm']);
    $senha = trim($_POST['senha']);

    $sql = "SELECT * FROM usuarios
    WHERE rm = '$rm'
    AND senha = '$senha'";

    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){

        $usuario = mysqli_fetch_assoc($result);

        $_SESSION['usuario'] = $usuario['nome'];

        $_SESSION['tipo'] = $usuario['tipo'];

        $_SESSION['rm'] = $usuario['rm'];

        header("Location: index.php");

        exit();

    } else {

        $erro = "RM ou senha inválidos.";

    }

}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login | FATEC Eventos</title>

    <link rel="stylesheet" href="assets/css/login.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

</head>

<body>

<div class="login-container">

    <form method="POST" class="login-box">

        <span class="login-badge">
            Sistema Acadêmico
        </span>

        <h1>
            FATEC Eventos
        </h1>

        <p>
            Acesse o painel de eventos acadêmicos da instituição.
        </p>

        <?php if(isset($erro)) { ?>

            <div class="erro-login">

                <?= $erro; ?>

            </div>

        <?php } ?>

        <input
            type="text"
            name="rm"
            placeholder="RM"
            required
        >

        <input
            type="password"
            name="senha"
            placeholder="Senha"
            required
        >

        <button type="submit">
            Entrar
        </button>

    </form>

</div>

</body>
</html>