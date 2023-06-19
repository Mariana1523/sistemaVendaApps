import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/header";
import ContactPage from "./ContactPage/contact";
import HomePage from "./HomePage/home";
import ShoppingPage from "./Shopping/shopping";
import "./index.css";
import Contact from "./ContactPage/contact";
function App() {
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

export default App;
