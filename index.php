<?php

session_start();

if(!isset($_SESSION['usuario'])){

    header("Location: login.php");

    exit();

}

require_once __DIR__ . "/config/conexao.php";

$tipoUsuario = $_SESSION['tipo'];

$podeGerenciar =
(
    $tipoUsuario == "admin" ||
    $tipoUsuario == "professor"
);

/* BUSCAR EVENTOS */
$sql = "SELECT * FROM eventos ORDER BY data_evento ASC";
$result = mysqli_query($conn, $sql);

/* EVENTO DESTAQUE */
$sqlDestaque = "SELECT * FROM eventos WHERE destaque = 1 LIMIT 1";
$resultDestaque = mysqli_query($conn, $sqlDestaque);

$destaque = mysqli_fetch_assoc($resultDestaque);

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>FATEC Eventos</title>

    <link rel="stylesheet" href="assets/css/sistema.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

</head>

<body>

<div class="dashboard-layout">

    <!-- SIDEBAR -->
  <aside class="sidebar">

    <div class="usuario-logado">

        <p>
            <?= $_SESSION['usuario']; ?>
        </p>

        <span>
            <?= strtoupper($_SESSION['tipo']); ?>
        </span>

    </div>

   <nav class="sidebar-menu">

    <?php if($podeGerenciar) { ?>

        <button type="button" class="sidebar-btn destaque" id="abrirForm">
            + Adicionar Evento
        </button>

    <?php } else { ?>

        <button type="button" class="sidebar-btn destaque" id="abrirIngresso">
            Ingressar Evento
        </button>

    <?php } ?>

    <button type="button" class="sidebar-btn" onclick="scrollTopo()">
        Destaque
    </button>

    <button type="button" class="sidebar-btn" onclick="scrollPara('eventos')">
        Eventos
    </button>

    <?php if($_SESSION['tipo'] == "aluno") { ?>

        <button type="button" class="sidebar-btn" onclick="scrollPara('meusEventos')">
            Meus Eventos
        </button>

    <?php } ?>

    <a href="logout.php" class="sidebar-btn logout-btn">
        Sair da Conta
    </a>

</nav>

</aside>


    <!-- CONTEÚDO -->

    <main class="dashboard-content">

        <!-- TÍTULO PRINCIPAL -->
        <section class="eventos-section">

            <div class="section-title">

                <h2>
                    Eventos Acadêmicos
                </h2>

                <div class="fatec-divider">

                    <span class="fatec-pill"></span>

                    <div class="fatec-line"></div>

                </div>

            </div>

        </section>

        <!-- HERO -->
  <section class="hero" id="destaque">

            <div class="hero-content">


                <?php if($destaque) { ?>

                    <!-- CARD DESTAQUE -->
                    <div class="hero-card">

                        <span class="hero-card-category">
                            <?= $destaque['categoria']; ?>
                        </span>

                        <h2>
                            <?= $destaque['titulo']; ?>
                        </h2>

                        <div class="hero-card-info">

                            <p>
                                <?= $destaque['descricao']; ?>
                            </p>

                            <p>
                                📅 <?= date('d/m/Y', strtotime($destaque['data_evento'])); ?>
                            </p>

                            <p>
                                👨‍🏫 <?= $destaque['apresentador']; ?>
                            </p>

                            <p>
                                📍 <?= $destaque['local_evento']; ?>
                            </p>

                        </div>

                        <button class="btn-detalhes" onclick="abrirModal(
                            '<?= addslashes($destaque['titulo']); ?>',
                            '<?= addslashes($destaque['categoria']); ?>',
                            '<?= date('d/m/Y', strtotime($destaque['data_evento'])); ?>',
                            '<?= addslashes($destaque['local_evento']); ?>',
                            '<?= addslashes($destaque['apresentador']); ?>',
                            `<?= addslashes($destaque['descricao']); ?>`
                        )">

                            Ver detalhes

                        </button>

                    </div>

                <?php } ?>

                <!-- TEXTO HERO -->
                <div class="hero-text">

                    <span class="badge">
                        Evento em Destaque
                    </span>

                    <p>
                        Descubra palestras, workshops, minicursos e eventos
                        organizados pela FATEC em um único lugar.
                    </p>

                </div>

            </div>

        </section>

        <!-- EVENTOS -->
        <section class="eventos-section" id="eventos">

            <div class="section-title">

                <h2>
                    Próximos Eventos
                </h2>

                <div class="fatec-divider">

                    <span class="fatec-pill"></span>

                    <div class="fatec-line"></div>

                </div>

            </div>

            <!-- FILTROS -->
            <section class="filtros">

                <div class="filtros-content">

                    <select id="categoriaFiltro">

                        <option value="todos">
                            Todas Categorias
                        </option>

                        <option value="Tecnologia">
                            Tecnologia
                        </option>

                        <option value="Agronegócio">
                            Agronegócio
                        </option>

                        <option value="Workshop">
                            Workshop
                        </option>

                        <option value="Palestra">
                            Palestra
                        </option>

                    </select>

                    <select>

                        <option>
                            Todas Modalidades
                        </option>

                        <option>
                            Presencial
                        </option>

                        <option>
                            Online
                        </option>

                    </select>

                </div>

            </section>

            <div class="eventos-grid" id="eventosGrid">

                <?php while($evento = mysqli_fetch_assoc($result)) { ?>

                    <div class="card-evento">

                        <div class="card-content">

                            <span class="categoria">
                                <?= $evento['categoria']; ?>
                            </span>

                            <h3>
                                <?= $evento['titulo']; ?>
                            </h3>

                            <p>
                                <?= $evento['descricao']; ?>
                            </p>

                            <div class="evento-info">

                                <p>
                                    📅 <?= date('d/m/Y', strtotime($evento['data_evento'])); ?>
                                </p>

                                <p>
                                    👨‍🏫 <?= $evento['apresentador']; ?>
                                </p>

                                <p>
                                    📍 <?= $evento['local_evento']; ?>
                                </p>

                            </div>

                            <button 
                                class="btn-detalhes"
                                onclick="abrirModal(
                                    '<?= addslashes($evento['titulo']); ?>',
                                    '<?= addslashes($evento['categoria']); ?>',
                                    '<?= date('d/m/Y', strtotime($evento['data_evento'])); ?>',
                                    '<?= addslashes($evento['local_evento']); ?>',
                                    '<?= addslashes($evento['apresentador']); ?>',
                                    `<?= addslashes($evento['descricao']); ?>`
                                )"
                            >

                                Ver detalhes

                            </button>

                            <?php if($podeGerenciar) { ?>

                                <div class="card-actions">

                                    <button
                                        type="button"
                                        class="btn-editar"
                                        onclick="abrirModalEditar(
                                            '<?= $evento['id']; ?>',
                                            '<?= htmlspecialchars($evento['titulo'], ENT_QUOTES); ?>',
                                            '<?= htmlspecialchars($evento['descricao'], ENT_QUOTES); ?>',
                                            '<?= htmlspecialchars($evento['categoria'], ENT_QUOTES); ?>',
                                            '<?= htmlspecialchars($evento['apresentador'], ENT_QUOTES); ?>',
                                            '<?= htmlspecialchars($evento['local_evento'], ENT_QUOTES); ?>',
                                            '<?= $evento['data_evento']; ?>',
                                            '<?= $evento['destaque']; ?>'
                                        )"
                                    >

                                        Editar

                                    </button>

                                    <a
                                        href="excluir_evento.php?id=<?= $evento['id']; ?>"
                                        class="btn-excluir"
                                        onclick="return confirm('Tem certeza que deseja excluir este evento?')"
                                    >

                                        Excluir

                                    </a>

                                </div>

                            <?php } ?>

                        </div>

                    </div>

                <?php } ?>

            </div>

        </section>

 <!-- MEUS EVENTOS -->
<?php if($_SESSION['tipo'] == "aluno") { ?>

<section class="eventos-section" id="meusEventos">

    <div class="section-title">

        <h2>
            Meus Eventos
        </h2>

        <div class="fatec-divider">

            <span class="fatec-pill"></span>

            <div class="fatec-line"></div>

        </div>

    </div>

    <div class="meus-eventos-lista">

        <?php

            $rmAluno = $_SESSION['rm'];

            $sqlMeusEventos = "

                SELECT eventos.*

                FROM inscricoes

                INNER JOIN eventos
                ON inscricoes.evento_id = eventos.id

                WHERE inscricoes.usuario_rm = '$rmAluno'

                ORDER BY eventos.data_evento ASC

            ";

            $resultMeusEventos =
                mysqli_query($conn, $sqlMeusEventos);

            if(mysqli_num_rows($resultMeusEventos) > 0){

                while($meuEvento =
                    mysqli_fetch_assoc($resultMeusEventos)){

        ?>

        <div class="meu-evento-item">

            <div class="meu-evento-info">

                <span class="categoria">
                    <?= $meuEvento['categoria']; ?>
                </span>

                <h3>
                    <?= $meuEvento['titulo']; ?>
                </h3>

                <p>
                    📅 <?= date('d/m/Y',
                    strtotime($meuEvento['data_evento'])); ?>

                    •

                    👨‍🏫 <?= $meuEvento['apresentador']; ?>
                </p>

            </div>

            <a
                href="sair_evento.php?evento_id=<?= $meuEvento['id']; ?>"
                class="btn-sair-evento"

                onclick="return confirm('Deseja sair deste evento?')"
            >

                ✕

            </a>

        </div>

        <?php

                }

            } else {

        ?>

        <p>
            Você ainda não ingressou em nenhum evento.
        </p>

        <?php } ?>

    </div>

</section>

<?php } ?>
    </main>

</div>

<!-- MODAL DETALHES -->
<div class="modal-overlay" id="modalOverlay">

    <div class="modal">

        <button class="close-modal" id="closeModal" type="button">
            ✕
        </button>

        <span class="modal-categoria" id="modalCategoria"></span>

        <h2 id="modalTitulo"></h2>

        <div class="modal-info">

            <p id="modalData"></p>

            <p id="modalLocal"></p>

            <p id="modalProfessor"></p>

        </div>

        <p class="modal-descricao" id="modalDescricao"></p>

    </div>

</div>

<!-- MODAL ADICIONAR EVENTO -->
<?php if($podeGerenciar) { ?>

    <div class="modal-overlay" id="modalFormOverlay">

        <div class="modal form-modal">

            <button class="close-modal" id="closeFormModal" type="button">
                ✕
            </button>

            <h1 class="modal-title">
                Adicionar Evento
            </h1>

            <form action="salvar_evento.php" method="POST" class="form-evento">

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

                <select name="categoria" required>

                    <option value="">
                        Selecione uma categoria
                    </option>

                    <option value="Tecnologia">
                        Tecnologia
                    </option>

                    <option value="Agronegócio">
                        Agronegócio
                    </option>

                    <option value="Workshop">
                        Workshop
                    </option>

                    <option value="Palestra">
                        Palestra
                    </option>

                </select>

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

                <select name="destaque">

                    <option value="0">
                        Evento Normal
                    </option>

                    <option value="1">
                        Evento Destaque
                    </option>

                </select>

                <button type="submit">
                    Cadastrar Evento
                </button>

            </form>

        </div>

    </div>

<?php } ?>

<!-- MODAL EDITAR -->
<?php if($podeGerenciar) { ?>

    <div class="modal-overlay" id="modalEditarOverlay">

        <div class="modal form-modal">

            <button class="close-modal" id="closeEditarModal" type="button">
                ✕
            </button>

            <h1 class="modal-title">
                Editar Evento
            </h1>

            <form action="editar_evento.php" method="POST" class="form-evento">

                <input type="hidden" name="id" id="editarId">

                <input type="text" name="titulo" id="editarTitulo" required>

                <textarea name="descricao" id="editarDescricao" required></textarea>

                <select name="categoria" id="editarCategoria" required>

                    <option value="Tecnologia">
                        Tecnologia
                    </option>

                    <option value="Agronegócio">
                        Agronegócio
                    </option>

                    <option value="Workshop">
                        Workshop
                    </option>

                    <option value="Palestra">
                        Palestra
                    </option>

                </select>

                <input type="text" name="apresentador" id="editarApresentador" required>

                <input type="text" name="local_evento" id="editarLocal" required>

                <input type="date" name="data_evento" id="editarData" required>

                <select name="destaque" id="editarDestaque">

                    <option value="0">
                        Evento Normal
                    </option>

                    <option value="1">
                        Evento Destaque
                    </option>

                </select>

                <button type="submit">
                    Salvar Alterações
                </button>

            </form>

        </div>

    </div>

<?php } ?>

<!-- MODAL INGRESSAR EVENTO -->
<?php if($_SESSION['tipo'] == "aluno") { ?>

    <div class="modal-overlay" id="modalIngressoOverlay">

        <div class="modal form-modal">

            <button class="close-modal" id="closeIngressoModal" type="button">
                ✕
            </button>

            <h1 class="modal-title">
                Ingressar em Evento
            </h1>

            <form action="ingressar_evento.php" method="POST" class="form-evento">

                <select name="evento_id" required>

                    <option value="">
                        Selecione um evento
                    </option>

                    <?php

                        $sqlEventosIngresso = "
                            SELECT id, titulo, data_evento
                            FROM eventos
                            ORDER BY data_evento ASC
                        ";

                        $resultEventosIngresso = mysqli_query($conn, $sqlEventosIngresso);

                        while($eventoIngresso = mysqli_fetch_assoc($resultEventosIngresso)) {

                    ?>

                        <option value="<?= $eventoIngresso['id']; ?>">
                            <?= $eventoIngresso['titulo']; ?> -
                            <?= date('d/m/Y', strtotime($eventoIngresso['data_evento'])); ?>
                        </option>

                    <?php } ?>

                </select>

                <button type="submit">
                    Confirmar Ingresso
                </button>

            </form>

        </div>

    </div>

<?php } ?>

<script src="assets/js/main.js?v=<?php echo time(); ?>"></script>

</body>

</html>
