import { useState } from 'react'
import './App.css'
import Eventos from './Eventos'

function App() {

  const [ra, setRa] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const [recuperarSenha, setRecuperarSenha] = useState(false)
  const [raRecuperacao, setRaRecuperacao] = useState('')
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState('')

  const [logado, setLogado] = useState(false)
  const [usuario, setUsuario] = useState(null)


  async function entrar() {

    if (ra === '' || senha === '') {
      setMensagem('Preencha o RA e a senha.')
      return
    }

    try {

      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          rm: ra,
          senha: senha
        })
      })


      const dados = await resposta.json()


      if (resposta.ok) {

        setUsuario(dados.usuario)
        setLogado(true)

      } else {

        setMensagem(dados.mensagem)

      }

    } catch (erro) {

      setMensagem('Não foi possível conectar ao servidor.')

    }

  }


  function abrirRecuperacao() {

    setRecuperarSenha(true)
    setMensagemRecuperacao('')
    setRaRecuperacao('')

  }


  function voltarLogin() {

    setRecuperarSenha(false)
    setMensagemRecuperacao('')
    setRaRecuperacao('')

  }


  function recuperar() {

    if (raRecuperacao === '') {

      setMensagemRecuperacao(
        'Digite seu RA para continuar.'
      )

      return
    }

    setMensagemRecuperacao(
      'Instruções para recuperação da senha foram enviadas!'
    )

  }


  // Depois que fizer login
  if (logado) {
    return <Eventos usuario={usuario} />
  }


  return (
    <main className="pagina">

      <section className="login-container">

        <div className="login-box">

          <div className="logo">
            <span>FATEC</span>
          </div>


          {!recuperarSenha ? (

            <>

              <h1>Login</h1>

              <p className="subtitulo">
                Acesse sua conta
              </p>


              <div className="formulario">

                <label htmlFor="ra">
                  RA
                </label>

                <input
                  id="ra"
                  type="text"
                  inputMode="numeric"
                  placeholder="Digite seu RA"
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                />


                <label htmlFor="senha">
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />


                <button
                  className="botao-login"
                  onClick={entrar}
                >
                  Entrar
                </button>


                {mensagem && (
                  <p className="mensagem">
                    {mensagem}
                  </p>
                )}


                <button
                  className="esqueceu"
                  onClick={abrirRecuperacao}
                >
                  Esqueci minha senha
                </button>

              </div>

            </>

          ) : (

            <>

              <h1>Recuperar senha</h1>

              <p className="subtitulo">
                Digite seu RA para recuperar sua senha
              </p>


              <div className="formulario">

                <label htmlFor="raRecuperacao">
                  RA
                </label>

                <input
                  id="raRecuperacao"
                  type="text"
                  inputMode="numeric"
                  placeholder="Digite seu RA"
                  value={raRecuperacao}
                  onChange={(e) => setRaRecuperacao(e.target.value)}
                />


                <button
                  className="botao-login"
                  onClick={recuperar}
                >
                  Continuar
                </button>


                {mensagemRecuperacao && (
                  <p className="mensagem">
                    {mensagemRecuperacao}
                  </p>
                )}


                <button
                  className="esqueceu"
                  onClick={voltarLogin}
                >
                  ← Voltar para o login
                </button>

              </div>

            </>

          )}

        </div>

      </section>

    </main>
  )
}

export default App