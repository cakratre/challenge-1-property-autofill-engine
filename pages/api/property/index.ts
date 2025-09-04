// api/property/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { propertyName, address, type, size, price, description, imageUrl, imagePublicId } = req.body;

      if (!propertyName || !address || !type || !size || !price) {
        return res.status(400).json({ error: "Field tidak boleh kosong" });
      }

      const newProperty = await prisma.property.create({
        data: {
          propertyName,
          address,
          type,
          size,
          price,
          description,
          imageUrl,
          imagePublicId,
        },
      });

      return res.status(201).json(newProperty);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Gagal membuat property" });
    }
  }

  if (req.method === "GET") {
    try {
      const properties = await prisma.property.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
