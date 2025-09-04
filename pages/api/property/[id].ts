// api/property/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const property = await prisma.property.findUnique({
        where: { id: Number(id) },
      });

      if (!property) {
        return res.status(404).json({ error: "Property tidak ditemukan" });
      }

      return res.status(200).json(property);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Gagal mengambil property" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
