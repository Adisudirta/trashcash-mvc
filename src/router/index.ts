import { Request, Response, Router } from "express";
import auth from "../middleware/auth";
import authRouter from "./auth.router";
import dashboardRouter from "./dashboard.router";

const router = Router();

router.use(authRouter);

router.get("/", (req: Request, res: Response) => {
  res.render("pages/client/index");
});

router.get("/about", (req: Request, res: Response) => {
  res.render("pages/client/about");
});

router.use(auth);

router.use(dashboardRouter);

export default router;
