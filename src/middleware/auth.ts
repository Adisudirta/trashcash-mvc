import { Request, Response } from "express";

export default function auth(req: Request, res: Response, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
