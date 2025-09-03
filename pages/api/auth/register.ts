import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const { password: _, ...userWithoutPassword } = user;
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(200).json({ message: "Register berhasil", user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
}
