//import React from "react";
import "./shopping.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Fragment } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import AuthContext from "../Context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}




export default function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(null);
  const [editProduct, setEdition] = useState(null);
  const [configs, setConfigProduct] = useState(false);
  const [delecao, setDelecao] = useState(false);
  const [edicao, setEdicao] = useState(false);
  const [insercao, setInsercao] = useState(false);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [deleteAll, setDeleteAll] = useState(false);
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  const handleValorChange = (event) => {
    setValor(event.target.value);
  };
  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };
  const handleImagemChange = (event) => {
    setImagem(event.target.value);
  };
  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };
  

  useEffect(() => {
    getAplicativos();
  }, []);

  function getAplicativos() {
    axios
      .get("http://localhost:3001/aplicativos")
      .then(function (response) {
        // Manipulando a resposta bem-sucedida
        console.log(response.data);
        setProducts(response.data); // Atualizar o estado com os dados recebidos
      })
      .catch(function (error) {
        // Manipulando erros
        console.log(error);
      });
  }
  function excluiApp(codapp, deleteAll) {
    const appExcluido = {
      codapp: codapp,
      deleteAll: deleteAll
    };
    
    axios.post("http://localhost:3001/excluiApp", appExcluido)
    .then(response => {
      console.log('Produto excluído com sucesso');
      setDelecao(false)
      getAplicativos()
    })
    .catch(error => {
      console.error('Erro ao excluir produto', error);
      // Faça o tratamento de erro necessário
    });
  }

  function insereAplicativos(nome, valor, categoria, imagem, descricao) {
    const appInserido = {
      nome: nome,
      descricao: descricao, 
      valor: valor, 
      categoria: categoria, 
      imagem: imagem
    };
    
    axios.post("http://localhost:3001/insereAplicativos", appInserido)
    .then(response => {
      console.log('Produto excluído com sucesso');
      setInsercao(false)
      getAplicativos()
    })
    .catch(error => {
      console.error('Erro ao excluir produto', error);
      // Faça o tratamento de erro necessário
    });
  } 
  
  function editAplicativos(codapp, nome, valor, categoria, imagem, descricao) {
    const appEditado = {
      codapp: codapp,
      nome: nome,
      descricao: descricao, 
      valor: valor, 
      categoria: categoria, 
      imagem: imagem
    };
    
    axios.post("http://localhost:3001/editAplicativos", appEditado)
    .then(response => {
      console.log('Produto excluído com sucesso');
      setEdicao(false)
      getAplicativos()
    })
    .catch(error => {
      console.error('Erro ao excluir produto', error);
      // Faça o tratamento de erro necessário
    });
  } 
  
  function realizarCompra(idUser, idApp) {
    const salvaCompra = {
      idApp: idApp,
      idUser: idUser,
    };
    
    axios
      .post("http://localhost:3001/salvaCompra", salvaCompra)
      .then(function (response) {
        console.log("Compra realizada com sucesso");
      })
      .catch(function (error) {
        console.error("Erro ao realizar compra", error);
        console.log(error);
      });
  }


  function renderPopUp() {
    if (isPopupOpen && selectedProduct && !editProduct) {
      return (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Pop-up Content</h2>
            <Transition.Root show={true} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setPopupOpen(false)}
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
                            onClick={() => setPopupOpen(false)}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                              <img
                                src={selectedProduct.imagem}
                                className="object-cover object-center"
                              />
                            </div>
                            <div className="sm:col-span-8 lg:col-span-7">
                              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                {selectedProduct.nome}
                              </h2>
                              <section
                                aria-labelledby="information-heading"
                                className="mt-2"
                              >
                                <h3
                                  id="information-heading"
                                  className="sr-only"
                                >
                                  Product information
                                </h3>

                                <p className="text-2xl text-gray-900">
                                  {selectedProduct.preco}
                                </p>
                              </section>

                              <section
                                aria-labelledby="options-heading"
                                className="mt-10"
                              >
                                
                                {selectedProduct.descricao}
                                <button
                                  onClick={() => {
                                    setPopupOpen(false)
                                    realizarCompra(user.id, selectedProduct.codapp)
                                    
                                  }}
                                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Comprar
                                </button>
                              </section>
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
    if (editProduct && selectedProduct && !isPopupOpen) {
      return (
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
                                    <h2 class="text-base font-semibold leading-7 text-gray-900">Configurações</h2>
                                    <p class="mt-1 text-sm leading-6 text-gray-600">Edite, insira ou delete aplicativos:</p>
                                    <div className="botoes">
                                      <button
                                        onClick={() => {
                                          setConfigProduct(true);
                                          setEdicao(true);
                                        }}
                                        className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        Editar
                                      </button> 
                                      <button
                                        onClick={() => {
                                          setConfigProduct(true);
                                          setInsercao(true);
                                        }}
                                        className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        Inserir
                                      </button> 
                                      <button
                                        onClick={() => {
                                          setConfigProduct(false);
                                          setDelecao(true);
                                        }}
                                        className="mt-6 mx-auto block rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        Deletar
                                      </button> 
                                    </div>  
                                    {configs && (
                                      <div>
                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div class="sm:col-span-4">
                                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                                            <div class="mt-2">
                                              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                  value = {nome}
                                                  onChange = {handleNomeChange}
                                                />                                     
                                              </div>
                                            </div>
                                          </div>
                                        </div>                                       
                                        <div class="sm:col-span-4">
                                          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Valor</label>
                                          <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value = {valor}
                                                onChange = {handleValorChange}
                                              />                                             
                                            </div>
                                          </div>
                                        </div>
                                        <div class="sm:col-span-4">
                                          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Categoria</label>
                                          <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value = {categoria}
                                                onChange = {handleCategoriaChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div class="sm:col-span-4">
                                          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Imagem</label>
                                          <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value = {imagem}
                                                onChange = {handleImagemChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div class="col-span-full">
                                          <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Descrição</label>
                                          <div class="mt-2">
                                            <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                              value = {descricao}
                                              onChange = {handleDescricaoChange}
                                            />
                                          </div>
                                        </div>  
                                      </div>                 
                                    )}                                                                                                                                                                                                                             
                                    <button
                                      onClick={() => {
                                        setEdition(false)
                                        if(delecao) {
                                          setDeleteAll(true);
                                          excluiApp(selectedProduct.codapp, deleteAll)
                                        } 
                                        else if(insercao) {
                                          insereAplicativos(nome, valor, categoria, imagem, descricao)
                                        }
                                        else if (edicao){
                                          editAplicativos(selectedProduct.codapp, nome, valor, categoria, imagem, descricao)
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

  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Aplicativos disponíveis
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
            <div
              key={product.id}
            >
              
              <div className="aspect-h-1 pointer aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  onClick={ (event) => {
                    console.log("UserId: " + user.Id);
                    setPopupOpen(true);
                    event.stopPropagation()
                    setSelectedProduct(product);
                  }}
                  src={product.imagem}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>{product.nome}</a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.preco}
                </p>
                <button onClick={() => {
                  setEdition(true);
                  setSelectedProduct(product);
                }}>
                  Configurações
                </button>
              </div>
            </div>
          ))}
          {renderPopUp()}
        </div>
      </div>
    </div>
  );
}
