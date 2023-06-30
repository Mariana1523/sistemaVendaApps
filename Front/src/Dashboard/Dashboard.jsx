import React, { useState } from 'react';
import "./Dashboard.css"
import axios from 'axios';
// Componente do Dashboard
export default function Dashpage() {
  const [activeContent, setActiveContent] = useState('content1');
  const [totalCompras, settotalCompras] = useState(0);

  function getCompras() {
    axios
      .get("http://localhost:3001/totalCompras")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data[0].quantidade_compras);
        settotalCompras(response.data[0].quantidade_compras); // Atualizar o estado com os dados recebidos
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

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleItemClick('content1')}>Faturamento</li>
          <li onClick={() => handleItemClick('content2')}>Dados de Clientes</li>
          <li onClick={() => handleItemClick('content3')}>Conteúdo 3</li>
        </ul>
      </div>

      <div className="main-content">
        {activeContent === 'content1' && (
          <div className="content">
            <h2>Conteúdo 1</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Compras Totais Realizadas</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalCompras}</td>
                  <td>usuario1@example.com</td>
                </tr>
                <tr>
                  <td>Usuário 2</td>
                  <td>usuario2@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeContent === 'content2' && (
          <div className="content">
            <h2>Conteúdo 2</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Item 1</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Item 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeContent === 'content3' && (
          <div className="content">
            <h2>Conteúdo 3</h2>
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


