import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import axios from 'axios';
const Header = () => {
  const {logged, setLogged} = useContext(AuthContext)
  const navigate = useNavigate();
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
              navigate('/')
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
