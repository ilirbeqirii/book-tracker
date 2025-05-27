import { NextApiRequest, NextApiResponse } from "next";
import { getOwnedBooks } from "@book-tracker/helpers/api-utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const books = await getOwnedBooks();
      res.status(200).json(books);
    } catch {
      res.status(500).json({ error: "Failed to fetch my books" });
    }
    return;
  }
}

export default handler;
