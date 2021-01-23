//Auth user after login
import Cookies from "js-cookie";

export const authenticated = (user, callback) => {
  Cookies.set("id", user.id);
  Cookies.set("image", user.image);
  Cookies.set("name", user.name);
  Cookies.set("email", user.email);
  Cookies.set("about", user.about);

  callback();
};

export const getAuthenticated = () => {
  const user = {
    token: Cookies.get("token"),
    id: Cookies.get("id"),
    name: Cookies.get("name"),
    email: Cookies.get("email"),
    image: Cookies.get("image"),
    about: Cookies.get("about"),
  };

  return user;
};
