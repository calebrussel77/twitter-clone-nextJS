import React, { useEffect } from "react";
import AddPost from "../components/Posts/AddPost/AddPost";
import Posts from "../components/Posts/Posts";
import Layout from "../components/hoc/Layout";
import { signin, useSession } from "next-auth/client";
import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";

export default function Accueil(props) {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <div className="lg:fixed lg:top-1/3 lg:left-1/3 mt-24">
        <div className="p-3 max-w-lg flex-col flex mx-auto justify-end">
          <p className="text-3xl font-bold text-center">
            Désolé vous n'êtes pas connecté et vous n'avez pas droit à ce
            contenu !
          </p>
          <button
            onClick={signin}
            className="p-2 rounded-md text-lg bg-secondary-200 text-secondary-700 font-light mt-2 w-full focus:outline-none hover:bg-secondary-700 hover:text-white"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      <div className="mdl:block hidden bg-primary-700 border-b border-gray-700 fixed top-0 w-7/2 lg:w-1/3 p-3 z-20">
        <div className="flex items-center justify-between flex-row">
          <h2 className="font-extrabold text-xl">Accueil</h2>
          <svg
            viewBox="0 0 24 24"
            className="fill-current stroke-current text-secondary-700 h-6 w-6"
          >
            <g>
              <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" />
            </g>
          </svg>
        </div>
      </div>
      <AddPost />
      <div className="h-3 w-full bg-gray-800 mt-16 md:mt-0" />
      <Posts />
      <div className="h-2 w-full bg-gray-800 mb-12 md:mb-0 md:h-0" />
    </Layout>
  );
}
