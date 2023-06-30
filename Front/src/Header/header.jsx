import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
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
          <li className="nav-item dashHeader">
                <Link to="/Dashboard">Dashboard</Link>
              </li>
            <span className="username">Olá, {user.nome}</span>
            <button
              className="loggoutButton"
              onClick={() => {
                setUser(null);
                navigate("/");
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
