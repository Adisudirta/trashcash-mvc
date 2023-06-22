import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/register", AuthController.registerPage);
authRouter.post("/register", AuthController.register);
authRouter.get("/login", AuthController.loginPage);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
