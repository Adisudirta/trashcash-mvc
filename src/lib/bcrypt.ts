import { hash, compare } from "bcrypt";

const salt = 10;

export async function generateHash(password) {
  return await hash(password, salt);
}

export async function compareHash(password, hash) {
  return await compare(password, hash);
}
