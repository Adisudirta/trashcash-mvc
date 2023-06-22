import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import { compareHash } from "./bcrypt";

const prisma = new PrismaClient();

async function authenticate(email, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isPasswordValid = await compareHash(password, user.password);

    if (!isPasswordValid) throw new Error("Wrong password");

    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    authenticate
  )
);

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: number, done) =>
  done(null, await prisma.user.findUnique({ where: { id } }))
);

export default passport;
