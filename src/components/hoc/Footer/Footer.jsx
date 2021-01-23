import React from "react";
import { Menu, Transition } from "@headlessui/react";
import ActiveLink from "../../ActiveLink/ActiveLink.jsx";
import { useState } from "react";
// import AddPost from "../../Posts/AddPost/AddPost";
import Link from "next/link";
import { getAuthenticated } from "../../../utils/authenticated.js";

const Footer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getAuthenticated();

  return (
    <>
      <footer className="md:w-1/5 mdl:w-1/4 lg:w-1/3 mdl:static footer px-5 py-2 md:text-center border-t md:border-t-0 border-gray-700 fixed bottom-0 left-0 right-0  md:left-0 md:bottom-0 bg-primary-700 md:top-0 md:border-r md:border-gray-700 z-30">
        <div className="flex md:flex-col md:items-baseline md:space-y-5 flex-row space-y-0 justify-between items-center md:inline-block">
          <ActiveLink href="/">
            <a className="hidden hover:bg-secondary-200 hover:text-secondary-700 md:inline-block p-2 rounded-md">
              <svg
                viewBox="0 0 512 512"
                className="hover:text-secondary-700 fill-current stroke-current text-blue-600 h-6 w-6 lg:h-8 lg:w-8"
              >
                <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
              </svg>
            </a>
          </ActiveLink>
          <ActiveLink href="/accueil" activeClassName="text-secondary-700">
            <a className="group hover:bg-secondary-200 hover:text-secondary-700 flex space-x-3 p-2 rounded-md">
              <svg
                viewBox="0 0 24 24"
                activeClassName="text-secondary-700"
                className="group-hover:text-secondary-700 fill-current stroke-current h-6 w-6 lg:h-8 lg:w-8"
              >
                <path d="M22.58 7.35L12.475 1.897a1 1 0 00-.95 0L1.425 7.35A1.002 1.002 0 001.9 9.231c.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398a1 1 0 00.95-1.759zM12 15.435a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z" />
              </svg>
              <span className="hidden lg:inline text-xl font-bold">
                Accueil
              </span>
            </a>
          </ActiveLink>
          {/*second icon */}
          <ActiveLink href="/explore" activeClassName="text-secondary-700">
            <a className="group hover:bg-secondary-200 hover:text-secondary-700 flex space-x-3 p-2 rounded-md">
              <svg
                viewBox="0 0 24 24"
                activeClassName="text-secondary-700"
                className="group-hover:text-secondary-700 fill-current stroke-current h-6 w-6 lg:h-8 lg:w-8"
              >
                <path d="M21.53 20.47l-3.66-3.66A8.98 8.98 0 0020 11a9 9 0 10-9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66a.746.746 0 001.06 0 .747.747 0 00.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">
                Explorer
              </span>
            </a>
          </ActiveLink>
          {/*second icon */}
          <ActiveLink href="/notification" activeClassName="text-secondary-700">
            <a className="group hover:bg-secondary-200 hover:text-secondary-700 flex space-x-3 p-2 rounded-md">
              <svg
                viewBox="0 0 24 24"
                activeClassName="text-secondary-700"
                className="group-hover:text-secondary-700 fill-current stroke-current h-6 w-6 lg:h-8 lg:w-8"
              >
                <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03a.75.75 0 00.447 1.353h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514a.747.747 0 00-.263-.838zM12 20.478a2.84 2.84 0 01-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">
                Notifications
              </span>
            </a>
          </ActiveLink>
          {/*second icon */}
          <ActiveLink href="/message" activeClassName="text-secondary-700">
            <a className="group hover:bg-secondary-200 hover:text-secondary-700 flex space-x-3 p-2 rounded-md">
              <svg
                viewBox="0 0 24 24"
                activeClassName="text-secondary-700"
                className="group-hover:text-secondary-700 fill-current stroke-current h-6 w-6 lg:h-8 lg:w-8"
              >
                <path d="M19.25 3.018H4.75A2.753 2.753 0 002 5.77v12.495a2.754 2.754 0 002.75 2.753h14.5A2.754 2.754 0 0022 18.265V5.77a2.753 2.753 0 00-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367a.81.81 0 01-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83a2.265 2.265 0 002.52.001l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">
                Messages
              </span>
            </a>
          </ActiveLink>
          <ActiveLink href="/signet" activeClassName="text-secondary-700">
            <a className="group hidden hover:bg-secondary-200 hover:text-secondary-700 md:flex space-x-3 p-2 rounded-md">
              <svg
                activeClassName="text-secondary-700"
                className="group-hover:text-secondary-700 fill-current stroke-current w-6 h-6 md:inline-block lg:h-8 lg:w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="hidden lg:block text-lg font-bold">Signets</span>
            </a>
          </ActiveLink>
          <ActiveLink href="/list" activeClassName="text-secondary-700">
            <a className="group hidden hover:bg-secondary-200 hover:text-secondary-700 md:flex space-x-3 p-2 rounded-md">
              <svg
                activeClassName="text-secondary-700"
                viewBox="0 0 24 24"
                className="group-hover:text-secondary-700 fill-current stroke-current w-6 h-6 hidden md:inline-block lg:h-8 lg:w-8"
              >
                <path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5a.75.75 0 00-.75.75v15.5c0 .413.336.75.75.75h15.5a.75.75 0 00.75-.75V4.25a.75.75 0 00-.75-.75H4.25z" />
                <path d="M17 8.64H7a.75.75 0 010-1.5h10a.75.75 0 110 1.5zm0 4.11H7a.75.75 0 010-1.5h10a.75.75 0 010 1.5zm-5 4.11H7a.75.75 0 110-1.5h5a.75.75 0 010 1.5z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">Listes</span>
            </a>
          </ActiveLink>
          <ActiveLink href="/profil" activeClassName="text-secondary-700">
            <a className="group hidden hover:bg-secondary-200 hover:text-secondary-700 md:flex space-x-3 p-2 rounded-md">
              <svg
                viewBox="0 0 24 24"
                className="group-hover:text-secondary-700 fill-current stroke-current w-6 h-6 hidden md:inline-block lg:h-8 lg:w-8"
              >
                <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246a.753.753 0 01-.12-.654c.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">Profil</span>
            </a>
          </ActiveLink>
          <ActiveLink href="/more" activeClassName="text-secondary-700">
            <a
              activeClassName="text-secondary-700"
              className="group hidden hover:bg-secondary-200 hover:text-secondary-700 md:flex space-x-3 p-2 rounded-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="group-hover:text-secondary-700 fill-current stroke-current w-6 h-6 hidden md:inline-block lg:h-8 lg:w-8"
              >
                <path d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5a.75.75 0 110-1.5.75.75 0 010 1.5zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5a.75.75 0 110-1.5.75.75 0 010 1.5zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z" />
              </svg>
              <span className="hidden lg:block text-lg font-bold">Plus</span>
            </a>
          </ActiveLink>
        </div>

        <button className="md:mx-auto md:static md:mt-6 fixed rounded-full bottom-0 right-0 mr-4 mb-20 h-16 w-16 bg-secondary-700 text-white flex items-center justify-center focus:outline-none">
          <a href="#addPost">
            <svg
              viewBox="0 0 24 24"
              className="fill-current stroke-current text-white h-6 w-6"
            >
              <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
            </svg>
          </a>
        </button>
        <Menu>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative hidden md:mx-auto mt-auto focus:outline-none mdl:flex flex-row space-x-3 items-center p-4 bg-brand-700 rounded-md hover:bg-secondary-200"
          >
            <img
              src={user?.image}
              alt={user?.name}
              className="h-12 w-12 rounded-full border border-gray-700 block"
            />
            <div className="hidden lg:flex flex-col items-baseline">
              <p className="font-bold">{user?.name}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
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
                className="focus:outline-none absolute shadow-xl rounded-md divide-y divide-gray-100 outline-none bg-primary-700 top-0 right-0 -mt-56 -mr-24 border border-gray-700"
              >
                <div className="px-4 py-3 flex flex-row space-x-3 items-center">
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full border border-gray-700 block"
                  />
                  <div className="flex flex-col items-baseline">
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
                          active ? "bg-gray-800 text-gray-500" : "text-gray-700"
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
                          active ? "bg-gray-800 text-gray-500" : "text-gray-700"
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
                          active ? "bg-gray-800 text-gray-500" : "text-gray-700"
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
                      <Link href="/logout">
                        <a
                          className={`${
                            active ? "bg-gray-800" : "text-secondary-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Se déconnecter
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </button>
        </Menu>
      </footer>
    </>
  );
};
export default Footer;
