import axios from "axios";
import Cookies from "js-cookie";

export function axiosInstancePut(url, data) {
  const token = Cookies.get("token");

  return axios.put(url, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
}
