import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    Cookies.remove("name"),
    Cookies.remove("id"),
      Cookies.remove("email"),
      Cookies.remove("token", { path: "/" }),
      Cookies.remove("about"),
      Cookies.remove("image");

    Router.push("/");
  }, []);
  return (
    <p className="text-lg font-bold text-secondary-700 text-center">
      Déconnexion...
    </p>
  );
};

export default Logout;
