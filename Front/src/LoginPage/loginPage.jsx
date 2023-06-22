import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";


import axios from "axios";


import { useHistory } from "react-router-dom";

function criarUsuario(nome, email, senha) {
  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
  };
  
  axios.post("http://localhost:3001/criaUsuario", novoUsuario)
  .then(response => {
    console.log('Usuário criado com sucesso');
    
    // Faça o tratamento adicional necessário após a criação do usuário
  })
  .catch(error => {
    console.error('Erro ao criar usuário', error);
    // Faça o tratamento de erro necessário
  });
} 
function verificaLogin(email, senha){
  const url = 'http://localhost:3001/verificaUsuario'; // Substitua pela sua URL correta

  const data = {
    email: email,
    senha: senha,
  };

  return axios.post(url, data)
    .then(response => {
      // Se a resposta for bem-sucedida, você pode tratar a resposta aqui
      if (response.status == 200) {
        return true;
      } else if (response.status == 201) {
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
export default function LoginPage() {
    const {setLogged} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    const handleSenhaChange = (event) => {
      setSenha(event.target.value);
    };
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
            <form className="space-y-6" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Esqueceu a senha?
                    </a>
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
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={()=>{
                    
                   
                    verificaLogin(email, senha)
                    .then(result => {
                      if (result === true) {
                        // Login bem-sucedido, faça algo aqui
                        setLogged(true)
                        
                       
                      } else {
                        // Login inválido, faça algo aqui
                        setLogged(false);
                        console.log("Email ou senha inválidos");
                      }
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
            </form>
  
            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
        </div>
      </div>
    </>
  );
}
