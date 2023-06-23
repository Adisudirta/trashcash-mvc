import { Router } from "express";
import TrashController from "../controllers/trash.controller";
import upload from "../middleware/upload";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", TrashController.dashboardPage);
dashboardRouter.get("/dashboard/upload", TrashController.uploadPage);
dashboardRouter.get("/dashboard/:id/edit", TrashController.editPage);
dashboardRouter.post("/dashboard/:id/delete", TrashController.delete);

dashboardRouter.post(
  "/dashboard/:id/edit",
  upload.single("image"),
  TrashController.update
);

dashboardRouter.post(
  "/dashboard/upload",
  upload.single("image"),
  TrashController.upload
);

export default dashboardRouter;
