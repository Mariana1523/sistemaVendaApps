import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/header";
import ContactPage from "./ContactPage/contact";
import HomePage from "./HomePage/home";
import ShoppingPage from "./Shopping/shopping";
import LoginPage from "./LoginPage/loginPage";
import "./index.css";


import AuthContext from "./Context/AuthContext";
import CreateAccount from "./CreateAccountPage/CreateAccount";

function App() {
  const { logged } = useContext(AuthContext);
  if(logged){
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/contatos" element={<ContactPage></ContactPage>} />
            <Route path="/" element={<HomePage></HomePage>} />
            
            <Route path="/shopping" element={<ShoppingPage></ShoppingPage>} />
          </Routes>
        </Router>
      </div>
    );
  }
  else{
    return(
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            
            <Route path="/criarConta" element={<CreateAccount></CreateAccount>} />
          </Routes>
        </Router>
      </div>
       
    );
  }
  
}

export default App;