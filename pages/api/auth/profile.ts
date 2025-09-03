import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authBearer } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const decoded = await authBearer(req, res);
    if (!decoded) return; // error sudah dikirim oleh helper

    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
}
