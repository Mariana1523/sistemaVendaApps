import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import AuthContext from "../Context/AuthContext";
import {server} from '../Backend/server'
const Header = () => {
  const {setLogged} = useContext(AuthContext)
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
            console.log(server)
          }}
          >
              Sair
            </button>
        </div>
        
      
      </nav>
    </header>
  );
};
export default Header;
