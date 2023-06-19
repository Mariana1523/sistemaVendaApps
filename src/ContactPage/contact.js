import "./contact.css";
import React from "react";

export default function ContactPage() {
  return (
    <div className="contatos">
      <h1>Entre em Contato</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensagem:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Digite sua mensagem"
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
