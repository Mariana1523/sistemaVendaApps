const Client = require("pg").Client;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const cliente = new Client({
  user: "postgres",
  password: "2002",
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

app.get("/totalCompras", (req, res) => {
  cliente
    .query(
      "SELECT count(*), SUM(preco) FROM compra C inner join aplicativo A ON A.codapp = c.idapp;"
    )
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error + "Erro interno do servidor");
    });
});

app.get("/comprasPorUsuario", (req, res) => {
  cliente
    .query(
      "select u.nome, count(c.id)  from usuario u Left join compra c ON u.id = c.idusuario group by u.nome;"
    )
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.get("/valorMedioPorUsuario", (req, res) => {
  cliente
    .query(
      "SELECT u.id, u.nome, AVG(c.valor) AS valor_medio_compras FROM usuario u LEFT JOIN compra c ON u.id = c.idUsuario sGROUP BY u.id, u.nome;"
    )
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.get("/appsMaisVendidos", (req, res) => {
  cliente
    .query(
      "SELECT a.nome, COUNT(c.id) AS numero_compras FROM aplicativo a LEFT JOIN compra c ON a.codapp = c.idApp GROUP BY a.codapp, a.nome ORDER BY numero_compras DESC LIMIT 2;"
    )
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.get("/comprasPorMes", (req, res) => {
  cliente
    .query(
      "SELECT DATE_TRUNC('month', data_compra) AS mes, COUNT(*) AS numero_compras FROM compra GROUP BY mes ORDER BY mes;"
    )
    .then((results) => {
      const resultado = results.rows;
      res.send(resultado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.get("/usuariosCompraramFinancas", (req, res) => {
  cliente
    .query(
      "SELECT nome FROM usuario WHERE id IN ( SELECT idUsuario FROM compra WHERE idApp IN ( SELECT codapp FROM aplicativo WHERE categoria = 'Finanças');"
    )
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

app.post("/editUser", (req, res) => {
  const { nome, email, senha } = req.body;
  const query = "UPDATE usuario SET email = $2, senha = $3 WHERE nome = $1";

  cliente
    .query(query, [nome, email, senha])
    .then(() => {
      res.status(201).send("Usuário alterado com sucesso");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/excluiUser", (req, res) => {
  const { nome, deleteAll } = req.body;
  let query = "";
  if (deleteAll) {
    query = "DELETE FROM usuario WHERE nome = $1";
  } else {
    return res.status(400).send("Parâmetro deleteAll precisa ser true");
  }
  cliente
    .query(query, [nome])
    .then(() => {
      res.status(201).send("Usuário excluído com sucesso");
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

app.post("/insereAplicativos", (req, res) => {
  const { nome, descricao, valor, categoria, imagem } = req.body; // Supondo que você esteja enviando os dados do usuário no corpo da requisição

  const query =
    "INSERT INTO aplicativo (nome, descricao, valor, categoria, imagem) VALUES ($1, $2, $3, $4, $5)";

  cliente
    .query(query, [nome, descricao, valor, categoria, imagem])
    .then(() => {
      res.status(201).send("Aplicativo Inserido Com Sucesso");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.post("/editAplicativos", (req, res) => {
  const { codapp, nome, descricao, valor, categoria, imagem } = req.body;
  const query =
    "UPDATE aplicativo SET nome = $2, descricao = $3, valor = $4, categoria = $5, imagem = $6 WHERE codapp = $1";

  cliente
    .query(query, [codapp, nome, descricao, valor, categoria, imagem])
    .then(() => {
      res.status(201).send("Aplicativo alterado com sucesso");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    });
});

app.get("/comprasPorData", (req, res) => {
  const { date } = req.query;
  const query =
    "SELECT a.nome, COUNT(*) AS total_vendas FROM compra c JOIN aplicativo a ON c.idapp = a.codapp GROUP BY a.nome HAVING COUNT(*) = ( SELECT MAX(total_vendas) FROM ( SELECT COUNT(*) AS total_vendas FROM compra WHERE data_compra >= $1 GROUP BY idapp  ) AS subquery );";
  cliente
    .query(query, [date])
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
