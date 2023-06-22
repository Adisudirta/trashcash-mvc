import { Request, Response, Router } from "express";
import auth from "../middleware/auth";
import authRouter from "./auth.router";

const router = Router();

router.use(authRouter);

router.get("/", (req: Request, res: Response) => {
  res.render("pages/client/index");
});

router.get("/about", (req: Request, res: Response) => {
  res.render("pages/client/about");
});

router.get("/dashboard", (req: Request, res: Response) => {
  res.render("pages/dashboard/index");
});

router.use(auth);

export default router;
