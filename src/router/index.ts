import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("pages/client/index");
});

router.get("/about", (req: Request, res: Response) => {
  res.render("pages/client/about");
});

router.get("/register", (req: Request, res: Response) => {
  res.render("pages/auth/register");
});

router.get("/login", (req: Request, res: Response) => {
  res.render("pages/auth/login");
});

export default router;
