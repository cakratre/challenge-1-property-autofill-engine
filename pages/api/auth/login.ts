import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Password salah" });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: "Login berhasil", user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
}
