import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import AuthContext from "../Context/AuthContext";
import axios from 'axios';
const Header = () => {
  const {logged, setLogged} = useContext(AuthContext)
  if (logged){
    return (
      <header className="header">
        <nav>
          <div className="navSpace">
              <ul className="nav-list nav-list flex justify-center items-center h-full">
              
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/shopping">Catálogo</Link>
              </li>
              <li className="nav-item">
                <Link to="/contatos">Entre em Contato</Link>
              </li>
              
            </ul>
          </div>
          
          <div className="navSpace2">
            <button className="loggoutButton"
            onClick={()=>{
              setLogged(false)
              axios.get('http://localhost:3001/usuarios')
              .then(response => {
                console.log(response.data)
              })
              .catch(error => {
                console.error(error);
              });
            }}
            >
                Sair
              </button>
          </div>
          
        
        </nav>
      </header>
    );
  }
  
};
export default Header;
