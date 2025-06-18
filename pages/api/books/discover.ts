import { NextApiRequest, NextApiResponse } from "next";
import { Book } from "@book-tracker/shared/book";
import {
  addBook,
  deleteBook,
  getAvailableBooks,
  getBookById,
} from "@book-tracker/helpers/api-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id && typeof id === "string") {
      const book: Book = await getBookById(+id);
      if (book) {
        res.status(200).json(book);
        return;
      }

      res.status(404).json({ error: "Book not found" });
      return;
    }

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
      deleted: false,
    };

    const addedBook = await addBook(newBook);
    res.status(201).json(addedBook);
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (id && typeof id == "string") {
      const book: Book = await deleteBook(+id);
      res.status(200).json({ message: "Book removed successfully", book });
      return;
    } else {
      res.status(400).json({ error: "Invalid book ID" });
      return;
    }
  }

  res.status(405).json({ error: "Method not allowed" });
};

export default handler;
