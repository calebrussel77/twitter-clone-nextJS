import axios from "axios";

export function axiosInstance(ctx = null) {
  return axios.create({
    baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    headers: { cookie: ctx.req?.headers.cookie ? ctx.req?.headers.cookie : "" },
  });
}
