//import React from "react";
import "./shopping.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Fragment} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'Basic Tee 6-Pack ',
  price: 'R$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
  
  export default function ShoppingPage() {

        const [products, setProducts] = useState([]);

        useEffect(() => {
          getAplicativos();
        }, []);
        
        function getAplicativos() {
          axios.get('http://localhost:3001/aplicativos')
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

        function renderPopUp(product){
          if (isPopupOpen){
            return(
              (
                <div className="fixed inset-0 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Pop-up Content</h2>
                    <Transition.Root show={true} as={Fragment}>
                      <Dialog as="div" className="relative z-10" onClose={() => setPopupOpen(null)}>
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
                                      <img src={product.imagem} className="object-cover object-center" />
                                      </div>
                                      <div className="sm:col-span-8 lg:col-span-7">
                                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.nome}</h2>
    
                                      <section aria-labelledby="information-heading" className="mt-2">
                                          <h3 id="information-heading" className="sr-only">
                                          Product information
                                          </h3>
    
                                          <p className="text-2xl text-gray-900">{product.preco}</p>
    
                                          
                                      </section>
    
                                      <section aria-labelledby="options-heading" className="mt-10">
                                          <h3 id="options-heading" className="sr-only">
                                          Product options
                                          </h3>
    
                                          <form>
                                          {/* Colors */}
                                          {/* Sizes */}
                                          <div className="mt-10">
                                              <div className="flex items-center justify-between">
                                              <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                  Size guide
                                              </a>
                                              </div>
    
                                          </div>
    
                                          <button
                                              type="submit"
                                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          >
                                              Comprar 
                                          </button>
                                          </form>
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
                    <button className="mt-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setPopupOpen(false)}>Fechar</button>
                  </div>
                </div>
              )
            );
          }
        }

        const [isPopupOpen, setPopupOpen] = useState(null);
        const [selectedColor, setSelectedColor] = useState(product.colors[0])
        const [selectedSize, setSelectedSize] = useState(product.sizes[2])
        return (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Aplicativos disponíveis</h2>
      
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                {products.map((product) => (
                  <div key={product.id} onClick={() => {
                      setPopupOpen(true)
                      console.log(product);
                    }
                  }>
                    {renderPopUp(product)}
                    <div className="aspect-h-1 pointer aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imagem}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            
                            {product.nome}
                          </a>
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.preco}</p>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
      
          </div>
        );
      }
      
  