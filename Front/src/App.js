import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/header";
import HomePage from "./HomePage/home";
import ShoppingPage from "./Shopping/shopping";
import LoginPage from "./LoginPage/loginPage";
import "./index.css";

import AuthContext from "./Context/AuthContext";
import CreateAccount from "./CreateAccountPage/CreateAccount";
import Dashpage from "./Dashboard/Dashboard";

function App() {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/Dashboard" element={<Dashpage></Dashpage>} />
            <Route path="/shopping" element={<ShoppingPage></ShoppingPage>} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />

            <Route
              path="/criarConta"
              element={<CreateAccount></CreateAccount>}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
