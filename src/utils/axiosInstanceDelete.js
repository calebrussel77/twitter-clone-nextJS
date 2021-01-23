import axios from "axios";
import Cookies from "js-cookie";

export function axiosInstanceDelete(url, data) {
  const token = Cookies.get("token");

  return axios.delete(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
}
