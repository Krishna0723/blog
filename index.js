const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postBlog = require("./routes/postBlog");
const authentication = require("./routes/authentication");

env.config();
// console.log(process.env.dbString);
mongoose
  .connect(process.env.dbString, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/post", postBlog);
app.use("/auth", authentication);

app.listen(4000, () => {
  console.log("started at 4000");
});
