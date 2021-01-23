import axios from "axios";
import Cookies from "js-cookie";

export function axiosInstancePost(url, data) {
  const token = Cookies.get("token");

  return axios.post(url, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
  });
}
