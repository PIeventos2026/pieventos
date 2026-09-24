import { useEffect, useState } from 'react'
import './Eventos.css'

function Eventos({ usuario }) {

  const [eventos, setEventos] = useState([])

  const [pesquisa, setPesquisa] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [carregando, setCarregando] = useState(true)

  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  // Controla qual parte da página está aberta
  const [pagina, setPagina] = useState('inicio')

  // Eventos favoritados
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosSalvos = localStorage.getItem('eventosFavoritos')

    if (favoritosSalvos) {
      return JSON.parse(favoritosSalvos)
    }

    return []
  })

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao buscar eventos')
        }

        return resposta.json()
      })
      .then((dados) => {
        setEventos(dados)
        setCarregando(false)
      })
      .catch((erro) => {
        console.log('Erro ao buscar eventos:', erro)
        setCarregando(false)
      })
  }, [])

  // Salva os favoritos no navegador
  useEffect(() => {
    localStorage.setItem(
      'eventosFavoritos',
      JSON.stringify(favoritos)
    )
  }, [favoritos])

  const eventoDestaque = eventos.find((evento) => {
    return evento.destaque == 1
  })

  const eventosFiltrados = eventos.filter((evento) => {
    const titulo = String(evento.titulo || '')
    const descricao = String(evento.descricao || '')
    const categoria = String(evento.categoria || '')
    const texto = pesquisa.toLowerCase()

    const pesquisaOk =
      titulo.toLowerCase().includes(texto) ||
      descricao.toLowerCase().includes(texto)

    const categoriaOk =
      categoriaFiltro === '' ||
      categoria === categoriaFiltro

    return pesquisaOk && categoriaOk
  })

  // Eventos que o usuário favoritou
  const meusEventos = eventos.filter((evento) => {
    return favoritos.includes(evento.id)
  })

  function mostrarTipo(tipo) {
    if (tipo === 'admin') {
      return 'Administrador'
    }

    if (tipo === 'professor') {
      return 'Professor'
    }

    return 'Aluno'
  }

  function abrirDetalhes(evento) {
    setEventoSelecionado(evento)
  }

  function fecharDetalhes() {
    setEventoSelecionado(null)
  }

  // Favoritar / desfavoritar evento
  function alternarFavorito(id) {

    if (favoritos.includes(id)) {

      setFavoritos(
        favoritos.filter((favoritoId) => favoritoId !== id)
      )

    } else {

      setFavoritos([
        ...favoritos,
        id
      ])

    }
  }

  // Voltar para a tela principal
  function irParaInicio() {
    setPagina('inicio')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Abrir Meus Eventos
  function abrirMeusEventos() {
    setPagina('meus')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="dashboard-layout">

      {/* MENU LATERAL */}

      <aside className="sidebar">

        <div className="sidebar-user">

          <h2>
            FATEC Eventos
          </h2>

          <p>
            {usuario?.nome || 'Usuário'}
          </p>

          <span>
            {mostrarTipo(usuario?.tipo)}
          </span>

        </div>

        <nav>

          {/* DESTAQUE */}

          <button
            className="sidebar-btn"
            onClick={irParaInicio}
          >
            ★ Destaque
          </button>

          {/* EVENTOS */}

          <button
            className="sidebar-btn"
            onClick={irParaInicio}
          >
            Eventos
          </button>

          {/* PROFESSOR E ADMIN */}

          {usuario?.tipo === 'admin' ||
          usuario?.tipo === 'professor' ? (

            <button
              className="sidebar-btn"
            >
              + Adicionar Evento
            </button>

          ) : (

            /* ALUNO */

            <button
              className="sidebar-btn"
              onClick={abrirMeusEventos}
            >
              ♥ Meus Eventos
            </button>

          )}

        </nav>

        <button className="sidebar-btn sair">
          Sair da Conta
        </button>

      </aside>


      {/* CONTEÚDO */}

      <main className="dashboard-content">

        {/* ========================= */}
        {/* TELA PRINCIPAL */}
        {/* ========================= */}

        {pagina === 'inicio' && (

          <>

            <h1>
              Eventos Acadêmicos
            </h1>

            <p className="subtitulo">
              Confira os eventos acadêmicos disponíveis na instituição.
            </p>


            {/* EVENTO DESTAQUE */}

            {!carregando && eventoDestaque && (

              <section
                className="evento-destaque"
                id="destaque"
              >

                <span className="categoria">
                  {eventoDestaque.categoria}
                </span>

                <h2>
                  {eventoDestaque.titulo}
                </h2>

                <p>
                  {eventoDestaque.descricao}
                </p>

                <div className="informacoes-evento">

                  <span>
                    📅 {eventoDestaque.data_evento}
                  </span>

                  <span>
                    👤 {eventoDestaque.apresentador}
                  </span>

                  <span>
                    📍 {eventoDestaque.local_evento}
                  </span>

                </div>

                <div className="acoes-evento">

                  <button
                    className="botao-detalhes"
                    onClick={() =>
                      abrirDetalhes(eventoDestaque)
                    }
                  >
                    Ver detalhes
                  </button>

                  {/* FAVORITO */}

                  {usuario?.tipo === 'aluno' && (

                    <button
                      className={
                        favoritos.includes(eventoDestaque.id)
                          ? 'botao-favorito favoritado'
                          : 'botao-favorito'
                      }
                      onClick={() =>
                        alternarFavorito(eventoDestaque.id)
                      }
                    >
                      {favoritos.includes(eventoDestaque.id)
                        ? '♥ Favoritado'
                        : '♡ Favoritar'}
                    </button>

                  )}

                </div>

              </section>

            )}


            {/* FILTROS */}

            <div className="filtros">

              <input
                type="text"
                placeholder="Pesquisar evento..."
                value={pesquisa}
                onChange={(e) =>
                  setPesquisa(e.target.value)
                }
              />

              <select
                value={categoriaFiltro}
                onChange={(e) =>
                  setCategoriaFiltro(e.target.value)
                }
              >

                <option value="">
                  Todas as categorias
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

            </div>


            {/* EVENTOS */}

            <section
              className="eventos-section"
              id="eventos"
            >

              <div className="titulo-section">

                <h2>
                  Próximos Eventos
                </h2>

              </div>


              {carregando ? (

                <p className="nenhum-evento">
                  Carregando eventos...
                </p>

              ) : eventosFiltrados.length > 0 ? (

                <div className="lista-eventos">

                  {eventosFiltrados.map((evento) => (

                    <article
                      className="card-evento"
                      key={evento.id}
                    >

                      <span className="categoria">
                        {evento.categoria}
                      </span>

                      <h3>
                        {evento.titulo}
                      </h3>

                      <p>
                        {evento.descricao}
                      </p>

                      <div className="informacoes-evento">

                        <span>
                          📅 {evento.data_evento}
                        </span>

                        <span>
                          👤 {evento.apresentador}
                        </span>

                        <span>
                          📍 {evento.local_evento}
                        </span>

                      </div>


                      <div className="acoes-evento">

                        <button
                          className="botao-detalhes"
                          onClick={() =>
                            abrirDetalhes(evento)
                          }
                        >
                          Ver detalhes
                        </button>


                        {/* FAVORITAR */}

                        {usuario?.tipo === 'aluno' && (

                          <button
                            className={
                              favoritos.includes(evento.id)
                                ? 'botao-favorito favoritado'
                                : 'botao-favorito'
                            }
                            onClick={() =>
                              alternarFavorito(evento.id)
                            }
                          >

                            {favoritos.includes(evento.id)
                              ? '♥'
                              : '♡'}

                          </button>

                        )}

                      </div>

                    </article>

                  ))}

                </div>

              ) : (

                <p className="nenhum-evento">
                  Nenhum evento encontrado.
                </p>

              )}

            </section>

          </>

        )}


        {/* ========================= */}
        {/* MEUS EVENTOS */}
        {/* ========================= */}

        {pagina === 'meus' && (

          <section className="meus-eventos">

            <h1>
              Meus Eventos
            </h1>

            <p className="subtitulo">
              Aqui estão os eventos que você favoritou.
            </p>


            {meusEventos.length > 0 ? (

              <div className="lista-eventos">

                {meusEventos.map((evento) => (

                  <article
                    className="card-evento"
                    key={evento.id}
                  >

                    <span className="categoria">
                      {evento.categoria}
                    </span>

                    <h3>
                      {evento.titulo}
                    </h3>

                    <p>
                      {evento.descricao}
                    </p>

                    <div className="informacoes-evento">

                      <span>
                        📅 {evento.data_evento}
                      </span>

                      <span>
                        👤 {evento.apresentador}
                      </span>

                      <span>
                        📍 {evento.local_evento}
                      </span>

                    </div>


                    <div className="acoes-evento">

                      <button
                        className="botao-detalhes"
                        onClick={() =>
                          abrirDetalhes(evento)
                        }
                      >
                        Ver detalhes
                      </button>


                      <button
                        className="botao-favorito favoritado"
                        onClick={() =>
                          alternarFavorito(evento.id)
                        }
                      >
                        ♥
                      </button>

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              <div className="sem-favoritos">

                <div className="icone-sem-favoritos">
                  ♡
                </div>

                <h2>
                  Você ainda não favoritou nenhum evento.
                </h2>

                <p>
                  Clique no coração dos eventos que você deseja acompanhar.
                </p>

                <button
                  className="botao-detalhes"
                  onClick={irParaInicio}
                >
                  Ver eventos
                </button>

              </div>

            )}

          </section>

        )}

      </main>


      {/* ========================= */}
      {/* MODAL DE DETALHES */}
      {/* ========================= */}

      {eventoSelecionado && (

        <div
          className="modal-fundo"
          onClick={fecharDetalhes}
        >

          <div
            className="modal-evento"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-fechar"
              onClick={fecharDetalhes}
            >
              ×
            </button>

            <span className="categoria">
              {eventoSelecionado.categoria}
            </span>

            <h2>
              {eventoSelecionado.titulo}
            </h2>

            <p className="modal-descricao">
              {eventoSelecionado.descricao}
            </p>

            <div className="modal-informacoes">

              <p>
                <strong>📅 Data:</strong>{' '}
                {eventoSelecionado.data_evento}
              </p>

              <p>
                <strong>🕐 Horário:</strong>{' '}
                {eventoSelecionado.horario ||
                  'Não informado'}
              </p>

              <p>
                <strong>👤 Apresentador:</strong>{' '}
                {eventoSelecionado.apresentador}
              </p>

              <p>
                <strong>📍 Local:</strong>{' '}
                {eventoSelecionado.local_evento}
              </p>

            </div>


            {/* FAVORITAR DENTRO DO MODAL */}

            {usuario?.tipo === 'aluno' && (

              <button
                className={
                  favoritos.includes(eventoSelecionado.id)
                    ? 'botao-favorito-modal favoritado'
                    : 'botao-favorito-modal'
                }
                onClick={() =>
                  alternarFavorito(eventoSelecionado.id)
                }
              >

                {favoritos.includes(eventoSelecionado.id)
                  ? '♥ Remover dos meus eventos'
                  : '♡ Adicionar aos meus eventos'}

              </button>

            )}


            <button
              className="botao-fechar-modal"
              onClick={fecharDetalhes}
            >
              Fechar
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Eventos