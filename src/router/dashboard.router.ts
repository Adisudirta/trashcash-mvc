import { Router } from "express";
import TrashController from "../controllers/trash.controller";
import upload from "../middleware/upload";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", TrashController.dashboardPage);
dashboardRouter.get("/dashboard/upload", TrashController.uploadPage);

dashboardRouter.post(
  "/dashboard/upload",
  upload.single("image"),
  TrashController.upload
);

export default dashboardRouter;
