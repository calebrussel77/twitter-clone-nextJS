import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { getAuthenticated } from "../../../utils/authenticated";

const Header = (props) => {
  const user = getAuthenticated();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-40 left-0 right-0 bg-primary-700 mdl:hidden border-b p-3 border-gray-700 flex flex-row justify-between items-center mdl:border-r">
      <div className="inline-flex flex-row space-x-4 items-center md:ml-32">
        <Menu>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none flex flex-row space-x-3 p-2 items-center bg-brand-700 rounded-md hover:bg-secondary-200 relative"
          >
            <img
              src={user?.image}
              alt={user?.name}
              className="h-8 w-8 rounded-full border border-gray-700 block"
            />
            <svg
              className="w-5 h-5 ml-2 -mr-1 hidden mdl:inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <Transition
              show={isOpen}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Menu.Items
                static
                className="focus:outline-none absolute shadow-xl rounded-md divide-y divide-gray-100 outline-none max-w-lg bg-primary-700 top-0 right-0 mt-12 -mr-40 border border-gray-700"
              >
                <div className="px-4 py-3 flex flex-row items-center">
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full border border-gray-700 block"
                  />
                  <div className="flex flex-col items-baseline px-5">
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#account-settings"
                        className={`${
                          active
                            ? "bg-secondary-200 text-gray-500"
                            : "text-gray-600"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Paramètre du compte
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#new-account"
                        className={`${
                          active
                            ? "bg-secondary-200 text-gray-500"
                            : "text-gray-600"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Ajouter un compte existant
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    as="span"
                    disabled
                    className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                  >
                    Signaler (soon)
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#license"
                        className={`${
                          active
                            ? "bg-secondary-200 text-gray-500"
                            : "text-gray-600"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        License
                      </a>
                    )}
                  </Menu.Item>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-gray-800" : "text-secondary-700"
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Se déconnecter
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </button>
        </Menu>
        <span className="text-lg font-bold text-white">Accueil</span>
      </div>
      <div className="">
        <svg
          viewBox="0 0 24 24"
          className="fill-current stroke-current text-secondary-700 h-6 w-6"
        >
          <g>
            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" />
          </g>
        </svg>
      </div>
    </nav>
  );
};

export default Header;
