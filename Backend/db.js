const Client = require("pg").Client;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const cliente = new Client({
  user: "postgres",
  password: "admin_melzinha",
  host: "127.0.0.1",
  port: 5432,
  database: "Sistema",
});

cliente.connect();

app.get("/usuarios", (req, res) => {
  cliente
    .query("SELECT * FROM usuario")
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

// modificar aqui 
app.get("/totalCompras", (req, res) => {
  cliente
    .query("SELECT * FROM usuario")
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/verificaUsuario", (req, res) => {
  const { email, senha } = req.body; // Supondo que você esteja enviando o email do usuário no corpo da requisição
  const query = "SELECT * FROM usuario WHERE email = $1 and senha = $2";

  cliente
    .query(query, [email, senha])
    .then((results) => {
      const usuario = results.rows[0]; // Pega o primeiro usuário retornado (se houver)
      if (usuario) {
        res.status(200).json(usuario); // Retorna o objeto do usuário encontrado como resposta JSON
      } else {
        res.status(201).send("Usuário não encontrado");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/criaUsuario", (req, res) => {
  const { nome, email, senha } = req.body; // Supondo que você esteja enviando os dados do usuário no corpo da requisição
  const query =
    "INSERT INTO usuario (nome, email, senha, isadmin) VALUES ($1, $2, $3, false)";

  cliente
    .query(query, [nome, email, senha])
    .then(() => {
      res.status(201).send("Usuário criado com sucesso");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/salvaContato", (req, res) => {
  const { nome, sobrenome, email, celular, mensagem } = req.body; // Supondo que você esteja enviando os dados do usuário no corpo da requisição
  const query =
    "INSERT INTO contato (nome, sobrenome, email, celular, mensagem) VALUES ($1, $2, $3, $4, $5)";

  cliente
    .query(query, [nome, sobrenome, email, celular, mensagem])
    .then(() => {
      res.status(201).send("Contato salvo com sucesso");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/salvaCompra", (req, res) => {
  const { idUser, idApp } = req.body;
  const query = "INSERT INTO compra (idusuario, idapp) VALUES ($1, $2)";
 
  cliente
    .query(query, [idUser, idApp])
    .then(() => {
      res.status(201).send("Compra realizada!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

app.get("/aplicativos", (req, res) => {
  cliente.query("SELECT * FROM aplicativo", (error, results) => {
    if (error) {
      // Lida com o erro de consulta
      console.error(error);
      res.status(500).json({ error: "Erro ao recuperar os aplicativos" });
    } else {
      // Envia os dados recuperados para o frontend
      res.status(200).json(results.rows);
    }
  });
});
