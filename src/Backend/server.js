const Client = require('pg')
const cliente = new Client({
   user:"postgres",
   password:"admin_pr",
   host:"127.0.0.1",
   port:5432,
   database: "Sistema"
})
 

cliente.connect()

cliente.query("select * from usuario")
.then(results =>{
   const resultado = results.rows
   console.log(resultado)
})
.finally(()=> cliente.end())