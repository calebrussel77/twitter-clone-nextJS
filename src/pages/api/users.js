import connectDB from "../../utils/connectDb";
import handler from "../../utils/handler";
import checkAuth from "../../utils/checkAuth";
import { getSession } from "next-auth/client";
import User from "../../../models/Users";

connectDB;

export default handler.get((req, resp, next) => {
  // GET THE LIST OF USERS

  User.find()
    .select("_id name email createdAt updateAt")
    .then((users) => {
      return resp.json({ users });
    });
});
