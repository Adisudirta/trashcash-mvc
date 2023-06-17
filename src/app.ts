import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const nama = "John Doe";

  res.render("index", { nama: nama });
});

app.listen(port, () => {
  console.log(`🌿 Trash Cash is running at: http://localhost:${port}/`);
});
