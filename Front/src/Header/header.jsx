import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { Fragment } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";


export default function Header(){
  const { user, setUser } = useContext(AuthContext);
  const [editaUser, setEdition] = useState(false);
  const [delecao, setDelecao] = useState(false);
  const [edicao, setEdicao] = useState(false);
  const [configs, setConfigProduct] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [deleteAll, setDeleteAll] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };
  

  function excluiUser(nome, deleteAll) {
    const userExcluido = {
      nome: nome,
      deleteAll: deleteAll
    };
    
    axios.post("http://localhost:3001/excluiUser", userExcluido)
    .then(response => {
      console.log('Usuário excluído com sucesso');
      setDelecao(false)
      setUser(null)
    })
    .catch(error => {
      console.error('Erro ao excluir usuário', error);
      // Faça o tratamento de erro necessário
    });
  }
  function editUser(nome, email, senha) {
    const userEditado = {
      nome: nome,
      email: email,
      senha: senha
    };
    
    axios.post("http://localhost:3001/editUser", userEditado)
    .then(response => {
      console.log('Usuário editado com sucesso');
      setEdicao(false)
    })
    .catch(error => {
      console.error('Erro ao editar usuário', error);
      // Faça o tratamento de erro necessário
    });
  } 
  
  function configsUser() {
    if(editaUser){
      return(
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Pop-up Content</h2>
            <Transition.Root show={true} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setEdition(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>
    
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                      enterTo="opacity-100 translate-y-0 md:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 md:scale-100"
                      leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                      <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                          <button
                            type="button"
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                            onClick={() => setEdition(false)}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                            <div className="sm:col-span-8 lg:col-span-7">
                              
                                <div class="space-y-12">
                                  <div class="border-b border-gray-900/10 pb-12">
                                    <h2 class="text-base font-semibold leading-7 text-gray-900">Configurações do usuário</h2>
                                    <p class="mt-1 text-sm leading-6 text-gray-600">Edite ou delete seu usuário</p>
                                    <div className="botoes">
                                      <button
                                        onClick={() => {
                                          setConfigProduct(true);
                                          setEdicao(true);
                                        }}
                                        className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        Editar Conta
                                      </button>                                  
                                      <button
                                        onClick={() => {
                                          setConfigProduct(false);
                                          setDelecao(true);
                                        }}
                                        className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        Excluir Conta
                                      </button> 
                                    </div>  
                                    {configs && (
                                      <div>
                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div class="sm:col-span-4">
                                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Novo email</label>
                                            <div class="mt-2">
                                              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                  value = {email}
                                                  onChange = {handleEmailChange}
                                                />                                     
                                              </div>
                                            </div>
                                          </div>
                                        </div>                                       
                                        <div class="sm:col-span-4">
                                          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nova senha</label>
                                          <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value = {senha}
                                                onChange = {handleSenhaChange}
                                              />                                             
                                            </div>
                                          </div>
                                        </div>                                                                                                    
                                      </div>                 
                                    )}                                                                                                                                                                                                                             
                                    <button
                                      onClick={() => {
                                        setEdition(false)
                                        if(delecao) {
                                          setDeleteAll(true);
                                          excluiUser(user.nome, deleteAll)
                                        }
                                        else if (edicao){
                                          editUser(user.nome, email, senha)
                                        }
                                      }}
                                      className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-20 py-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                      Confirmar
                                    </button>                                      
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      );
    }
    return null
  }
  if(user){
    return (
      <>
        <header className="header">
        <nav>
        <div className="container">
            <div>
              <div style={{ textAlign: 'center' }}>
                <span className="username">
                  Olá, {user.nome} 
                  <button
                    className="configButton"
                    onClick={() => {
                      setEdition(true);
                    }}
                  >
                    Configurações Usuário
                  </button>
                </span>
              </div>
            </div>
          
          </div>
          <div className="navSpace" >
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shopping">Catálogo</Link>
                </li>               
              </ul>
          </div>

          <div className="navSpace2">
            {user.isadmin &&(
                <li className="nav-item dashHeader">
                <Link to="/Dashboard">Dashboard</Link>
              </li>
            )
            }
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
      {configsUser()}
      </>
      
      
    );
  }
  
  
};


