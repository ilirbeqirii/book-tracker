import type { NextApiRequest, NextApiResponse } from "next";
import {
  getFinishedBooks,
  markBookAsNotRead,
  markBookAsRead,
} from "@book-tracker/helpers/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const books = await getFinishedBooks();
    return res.status(200).json(books);
  }

  if (req.method === "POST") {
    const { id, finished } = req.body;
    if (finished) {
      const book = await markBookAsRead(id);
      return res.status(200).json({ message: "Book marked as read", book });
    } else {
      const book = await markBookAsNotRead(id);
      return res.status(200).json({ message: "Book marked as not read", book });
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}
