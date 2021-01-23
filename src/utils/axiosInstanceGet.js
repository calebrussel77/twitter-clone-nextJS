import axios from "axios";
import Cookies from "js-cookie";

export function axiosInstanceGet(url) {
  const token = Cookies.get("token");

  return axios.get(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
}
