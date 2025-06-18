import { NextApiRequest, NextApiResponse } from "next";
import { buyBook, getOwnedBooks } from "@book-tracker/helpers/api-utils";

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

  if (req.method === "POST") {
    const { id } = req.body;
    try {
      const book = await buyBook(id);
      res.status(200).json({ message: "Book purchased successfully", book });
    } catch {
      res.status(500).json({ error: "Failed to buy the book" });
    }

    return;
  }
}

export default handler;
