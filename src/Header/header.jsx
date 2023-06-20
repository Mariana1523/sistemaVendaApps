import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import AuthContext from "../Context/AuthContext";

const Header = () => {
  const {setLogged} = useContext(AuthContext)
  return (
    <header className="header">
      <nav>
        <div className="navSpace">
            <ul className="nav-list">
            
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
          }}
          >
              Loggout
            </button>
        </div>
        
      
      </nav>
    </header>
  );
};
export default Header;
