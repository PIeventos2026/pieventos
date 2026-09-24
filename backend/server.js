const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()

app.use(cors())
app.use(express.json())


// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bancoev',
  port: 3306
})


// Testa a conexão
db.connect((erro) => {

  if (erro) {
    console.log('❌ Erro ao conectar com o MySQL:', erro.message)
    return
  }

  console.log('✅ MySQL conectado com sucesso!')
})


// Rota de teste
app.get('/', (req, res) => {

  res.json({
    mensagem: 'Back-end funcionando!'
  })

})


// LOGIN
app.post('/login', (req, res) => {

  const { rm, senha } = req.body

  if (!rm || !senha) {

    return res.status(400).json({
      mensagem: 'Preencha o RA e a senha.'
    })

  }

  const sql = `
    SELECT id, nome, rm, tipo
    FROM usuarios
    WHERE rm = ? AND senha = ?
  `

  db.query(sql, [rm, senha], (erro, resultados) => {

    if (erro) {

      console.log('Erro ao consultar usuário:', erro)

      return res.status(500).json({
        mensagem: 'Erro ao consultar o banco de dados.'
      })

    }

    if (resultados.length === 0) {

      return res.status(401).json({
        mensagem: 'RA ou senha incorretos.'
      })

    }

    res.json({
      mensagem: 'Login realizado com sucesso!',
      usuario: resultados[0]
    })

  })

})


// BUSCAR EVENTOS
app.get('/eventos', (req, res) => {

  const sql = `
    SELECT *
    FROM eventos
    ORDER BY data_evento ASC
  `

  db.query(sql, (erro, resultados) => {

    if (erro) {

      console.log('Erro ao buscar eventos:', erro)

      return res.status(500).json({
        mensagem: 'Erro ao buscar os eventos.'
      })

    }

    res.json(resultados)

  })

})

app.post('/eventos', (req, res) => {

  const {
    titulo,
    descricao,
    categoria,
    apresentador,
    local_evento,
    data_evento,
    horario,
    destaque
  } = req.body

  if (
    !titulo ||
    !descricao ||
    !categoria ||
    !apresentador ||
    !local_evento ||
    !data_evento ||
    !horario
  ) {
    return res.status(400).json({
      mensagem: 'Preencha todos os campos obrigatórios.'
    })
  }

  const sql = `
    INSERT INTO eventos
    (
      titulo,
      descricao,
      categoria,
      apresentador,
      local_evento,
      data_evento,
      horario,
      destaque
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      titulo,
      descricao,
      categoria,
      apresentador,
      local_evento,
      data_evento,
      horario,
      destaque || 0
    ],
    (erro, resultado) => {

      if (erro) {
        console.log('Erro ao adicionar evento:', erro)

        return res.status(500).json({
          mensagem: 'Erro ao salvar o evento.'
        })
      }

      res.status(201).json({
        mensagem: 'Evento adicionado com sucesso!',
        id: resultado.insertId
      })
    }
  )
})

// Teste para saber se este é o backend que está rodando
console.log('✅ ESTOU RODANDO O BACKEND NOVO!')


app.listen(3000, () => {

  console.log('🚀 Servidor rodando na porta 3000')

})