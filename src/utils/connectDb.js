import mongoose from "mongoose";

let connectDB;
connectDB = mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("MongoDB is Connected SUCCESSFUL !");
  })
  .catch((err) => {
    console.log(err);
  });

export default connectDB;
