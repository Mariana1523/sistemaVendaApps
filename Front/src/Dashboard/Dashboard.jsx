import React, { useEffect, useState } from 'react';
import "./Dashboard.css"
import axios from 'axios';
// Componente do Dashboard
export default function Dashpage() {
  const [activeContent, setActiveContent] = useState('content1');
  const [totalCompras, settotalCompras] = useState(0);
  const [valorTotalCompras, setValorTotalCompras] = useState(0);
  const [comprasUsuario, setComprasUsuario]= useState([])
  const [valorMedioPorUsuario, setvalorMedioPorUsuario] = useState(0);
  const [appsMaisVendidos, setAppsMaisVendidos] = useState(0);
  const [comprasPorMes, setcomprasPorMes] = useState(0);
  const [usuariosCompraramFinancas, setUsuariosCompraramFinancas] = useState(0);
  const [data, setData] = useState('');


  const handleInputChange = (event) => {
    setData(event.target.value);
  };
  useEffect(() => {
  
    getComprasPorUsuario();
 
    getCompras();
  }, []);


  function getUsuariosCompraramFinancas() {
    axios
      .get("http://localhost:3001/usuariosCompraramFinancas")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data[0].nome);
       
    })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }


  function getComprasPorMes() {
    axios
      .get("http://localhost:3001/comprasPorMes")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
      
       
    })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }


  function getAppsMaisVendidos() {
    axios
      .get("http://localhost:3001/appsMaisVendidos")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data[0].nome);
        console.log(response.data[0].numero_compras);

    })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }


  function getValorMedioPorUsuario() {
    axios
      .get("http://localhost:3001/valorMedioPorUsuario")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data[0].id);
        console.log(response.data[0].nome);
        console.log(response.data[0].valor_medio_compras);
    
    })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }

  function pesquisarCompraPorData(){
    axios
      .get("http://localhost:3001/comprasPorUsuario")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        
         console.log(response.data)
         setComprasUsuario(response.data)
      })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }
  function getComprasPorUsuario() {
    axios
      .get("http://localhost:3001/comprasPorUsuario")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        
         console.log(response.data)
         setComprasUsuario(response.data)
      })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }
  

  function getCompras() {
    axios
      .get("http://localhost:3001/totalCompras")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data[0].quantidade_compras);
        console.log(response.data[0].valor_total_compras);
        settotalCompras(response.data[0].totalcompras); // Atualizar o estado com os dados recebidos
        setValorTotalCompras(response.data[0].receita); // Atualizar o estado com os dados recebidos

    })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }

  const handleItemClick = (content) => {
    setActiveContent(content);
    getCompras()
  };
  function renderDadosApps(){


  }
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleItemClick('content1')}>Faturamento</li>
          <li onClick={() => handleItemClick('content2')}>Dados de Clientes</li>
          <li onClick={() => handleItemClick('content3')}>Dados de Aplicativos</li>
        </ul>
      </div>

      <div className="main-content">
        {activeContent === 'content1' && (
          <div className="content">
            <table className="table">
              <thead>
                <tr>
                  <th>Compras Totais Realizadas</th>
                  <th>Faturamento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalCompras}</td>
                  <td>{valorTotalCompras}</td>
                </tr>         
              </tbody>
            </table>
          </div>
        )}
        {activeContent === 'content2' && (
          <div className="content">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Aplicativos Comprados</th>
                </tr>
              </thead>
              <tbody>
              {comprasUsuario.map((usuario) => (
                <tr key={usuario.nome}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.count}</td>
                </tr>
              ))}
              
              </tbody>
            </table>
          </div>
        )}
        {activeContent === 'content3' && (
          
          <div className="content">
            <h2>Compras por Data</h2>
            <div className='filtroData'>
              <label>
                Data  - 
                <input type="date" value={data} onChange={handleInputChange} />
              </label>
              <button onClick={()=>pesquisarCompraPorData()} >Pesquisar</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>456</td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}


