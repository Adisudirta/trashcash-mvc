import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("src/assets"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/about", (req: Request, res: Response) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`🌿 Trash Cash is running at: http://localhost:${port}/`);
});
