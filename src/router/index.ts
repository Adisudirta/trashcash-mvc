import { Request, Response, Router } from "express";
import auth from "../middleware/auth";
import authRouter from "./auth.router";
import dashboardRouter from "./dashboard.router";
import TrashController from "../controllers/trash.controller";

const router = Router();

router.use(authRouter);

router.get("/", TrashController.clientPage);

router.post("/", TrashController.search);

router.get("/trashes/:id", TrashController.detailPage);

router.get("/about", (req: Request, res: Response) => {
  res.render("pages/client/about");
});

router.use(auth);

router.use(dashboardRouter);

export default router;
