import { NextApiRequest, NextApiResponse } from "next";
import { Book } from "@book-tracker/shared/book";
import {
  addBook,
  deleteBook,
  getAvailableBooks,
} from "@book-tracker/helpers/api-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(await getAvailableBooks());
    return;
  }

  if (req.method === "POST") {
    const { title, author, isbn, genre, publicationYear, description } =
      req.body;

    const books: Book[] = await getAvailableBooks();
    const newBook: Book = {
      id: books.length + 1,
      title,
      author,
      isbn,
      genre,
      publicationYear,
      description,
      image: "",
      isRead: false,
      completed: false,
      wishlist: false,
      owned: false,
    };

    const addedBook = await addBook(newBook);
    res.status(201).json(addedBook);
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    const book: Book = await deleteBook(id);
    res.status(200).json({ message: "Book removed", book });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
};

export default handler;
