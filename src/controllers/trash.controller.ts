import { Request, Response } from "express";

export default class TrashController {
  static dashboardPage(req: Request, res: Response) {
    res.render("pages/dashboard/index");
  }

  static uploadPage(req: Request, res: Response) {
    res.render("pages/dashboard/upload");
  }
}
