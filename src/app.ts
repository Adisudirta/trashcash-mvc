import express from "express";
import path from "path";
import router from "./router";

const app = express();
const port = 3000;

app.use(express.static("src/assets"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(router);

app.listen(port, () => {
  console.log(`🌿 Trash Cash is running at: http://localhost:${port}/`);
});
