import mongoose from "mongoose";

let connectDB;
connectDB = mongoose
  .connect(
    "mongodb+srv://caleb-twitter:qwertyu@cluster0.xnf7d.mongodb.net/twitter_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("MongoDB is Connected SUCCESSFUL !");
  })
  .catch((err) => {
    console.log(err);
  });

export default connectDB;
