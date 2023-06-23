import { Router } from "express";
import TrashController from "../controllers/trash.controller";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", TrashController.dashboardPage);
dashboardRouter.get("/dashboard/upload", TrashController.uploadPage);

export default dashboardRouter;
