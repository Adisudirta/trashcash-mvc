import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import passport from "../lib/passport";
import { generateHash } from "../lib/bcrypt";

const prisma = new PrismaClient();

export default class AuthController {
  static loginPage(req: Request, res: Response) {
    if (req.isAuthenticated()) return res.redirect("/dashboard");

    res.render("pages/auth/login");
  }

  static registerPage(req: Request, res: Response) {
    res.render("pages/auth/register");
  }

  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      await prisma.user.create({
        data: {
          username,
          email,
          password: await generateHash(password),
        },
      });
      res.redirect("/dashboard");
      return;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          req.flash("error", "An email is already use!");
        }
      }
      res.redirect("/register");
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/login");
    });
  }
}
