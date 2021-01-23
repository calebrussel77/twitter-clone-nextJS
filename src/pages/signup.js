import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { useNotification } from "../store/Notification";
import { withNotAuthComponent } from "../hoc/withNotAuthComponent";
import { withAuthServerSideProps } from "../hoc/withAuthServerSide";
import Axios from "axios";

const signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const dispatchNotification = useNotification();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!user.name || !user.password || !user.email) {
      dispatchNotification({
        type: "ERROR",
        msg: "Veuillez Remplir tous les champs",
      });
    } else {
      Axios.post("/api/signup", user)
        .then((response) => {
          dispatchNotification({
            type: "SUCCESS",
            msg: response.data.msg,
          });
          Router.push("/");
        })
        .catch((err) => {
          if (err?.response) {
            dispatchNotification({
              type: "ERROR",
              msg: err.response?.data.errorMsg,
            });
          }
        });
      setUser({ ...user, password: "" });
    }
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8 lg:py-24">
      <div className="flex flex-col max-w-screen-lg overflow-hidden bg-secondary-700 border rounded-md shadow-sm lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <div>
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="signup"
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />

            <div className="absolute inset-0 bg-primary-700 opacity-50" />
          </div>
          <svg
            className="absolute top-0 right-0 hidden h-full text-secondary-700 lg:inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>

        <div className="flex flex-col justify-center p-8 bg-secondary-700 lg:p-16 lg:pl-10 lg:w-1/2">
          <div>
            <p className="flex items-center space-x-3 px-3 mb-4 text-sm font-bold tracking-wider text-white uppercase">
              <svg className="fill-current h-8 w-8" viewBox="0 0 512 512">
                <defs />
                <path
                  d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                  fill="#03a9f4"
                />
              </svg>
              TWITTER CLONE
            </p>
          </div>
          <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
            Créer votre compte sur twitter clone
          </h5>
          <form
            onSubmit={handleSubmitRegister}
            autoComplete="off"
            className="text-secondary-200 mt-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              value={user.name}
              className="bg-gray-200 p-2 w-full mb-2 rounded-md mt-2 border focus:outline-none focus:border-secondary-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              onChange={handleChange}
              value={user.email}
              className="bg-gray-200 p-2 w-full mb-2 rounded-md mt-2 border focus:outline-none focus:border-secondary-700"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              label="Mot de passe"
              placeholder="Votre Mot de passe"
              className="bg-gray-200 p-2 w-full rounded-md mt-2 border focus:outline-none focus:border-secondary-700"
            />
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-secondary-200 hover:bg-primary-700 text-white font-bold px-3 py-2 rounded-md inline-block shadow-md"
              >
                Créer son compte
              </button>
            </div>
          </form>
          <p className="text-sm font-semibold text-right mt-10 text-white">
            Déjà membre ?
            <Link href="/">
              <a className="text-secondary-200 hover:underline cursor-pointer pl-2">
                connectez-vous
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withNotAuthComponent(signup);
export const getServerSideProps = withAuthServerSideProps();
