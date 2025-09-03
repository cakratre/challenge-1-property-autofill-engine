import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// fungsi buat generate token
export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// fungsi buat verify token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Fungsi buat nambahin auth Bearer ${TOKEN}
export async function authBearer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token tidak ditemukan" });
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ error: "Token tidak valid atau expired" });
    return null;
  }

  return decoded;
}