import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";

import User from "../../../../models/Users";
import checkAuth from "../../../utils/checkAuth";

connectDB;

export default handler
  .use(checkAuth)
  .use((req, resp, next) => {
    // REMOVE FOLLOWING PERSON INTO THE USER AUTHENTICATED
    User.findOneAndUpdate(
      { _id: req.userData?.id },
      { $pull: { following: req.body.userId } },
      { new: true }
    )
      .then()
      .catch();
    next();
  })
  .put((req, resp, next) => {
    // REMOVE FOLLOWER PERSON INTO THE USER WE ARE FOLLOWING

    User.findOneAndUpdate(
      { _id: req.body?.userId },
      { $pull: { followers: req.userData?.id } },
      { new: true }
    )
      .then((user) => {
        return resp.json({ user, msg: `Vous êtes désabonné de ${user.name}` });
      })
      .catch((err) => {
        console.log(error);
        return resp.status(502).json({
          errorMsg: "Une erreur est survenue veuillez réessayer !",
        });
      });
  });
