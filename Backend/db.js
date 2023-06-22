const Client = require('pg').Client
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001; // Escolha uma porta adequada para o seu servidor

const cliente = new Client({
   user:"postgres",
   password:"admin_pr",
   host:"127.0.0.1",
   port:5432,
   database: "Sistema"
})
 

cliente.connect()


app.get('/usuarios', (req, res) => {
    cliente.query('SELECT * FROM usuario')
      .then(results => {
        const resultado = results.rows;
        res.send(resultado);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
      });
});
  
app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});


