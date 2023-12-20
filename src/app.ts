import express from "express";
import path from "path";
import router from "./router";
import session from "express-session";
import passport from "./lib/passport";
import flash from "express-flash";
import morgan from "morgan";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static("src/assets"));
app.use(express.static(path.join(__dirname, "../public/uploads")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "Buat ini jadi rahasia",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(port, () => {
  console.log(`🌿 Trash Cash is running at port ${port}`);
});
