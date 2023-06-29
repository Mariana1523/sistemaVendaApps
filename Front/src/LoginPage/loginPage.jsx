import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };
  function VerificaLogin(email, senha) {
    const url = "http://localhost:3001/verificaUsuario"; // Substitua pela sua URL correta
    const data = {
      email: email,
      senha: senha,
    };

    return axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          const usuario = response.data;
          console.log("Usuário nome? : ", usuario.isadmin);
          const usuarioLogado = {
            id: usuario.id,
            nome: usuario.nome,
            senha: usuario.senha,
            email: usuario.email,
            isadmin: usuario.isadmin,
          };

          return usuarioLogado;
        } else if (response.status === 201) {
          alert("Email ou senha inválidos");
          return false;
        }
      })
      .catch((error) => {
        // Se ocorrer um erro na requisição, você pode tratar o erro aqui
        console.error(error);
        throw error;
      });
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/imgs/Logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faça login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="text-sm">
                <Link
                  to="/criarConta"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Criar Conta
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={senha}
                onChange={handleSenhaChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                VerificaLogin(email, senha)
                  .then((result) => {
                    setUser(result);
                  })
                  .catch((error) => {
                    // Tratar o erro da Promise, se necessário
                    console.error(error);
                  });
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
