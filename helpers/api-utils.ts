import path from "path";
import fs from "fs/promises";
import { Book } from "@book-tracker/shared/book";
import { GroupedBooks } from "@book-tracker/shared/grouped-books";

const dataFilePath = path.join(process.cwd(), "pages", "api", "data.json");

async function readData(): Promise<Book[]> {
  const fileContents = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(fileContents) as Book[];
}

async function writeData(data: Book[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function getAllBooks(): Promise<Book[]> {
  const books = await readData();
  return books || [];
}

export async function getBookById(id: number) {
  const books = await getAllBooks();
  const book = books.find((book) => book.id === id);

  if (!book) {
    throw new Error(`Book with id ${id} not found`);
  }

  return book;
}

export async function addBook(newBook: Book) {
  const books = await getAllBooks();
  books.push(newBook);
  await writeData(books);
  return newBook;
}

export async function deleteBook(id: number) {
  const books = await getAllBooks();
  const bookIndex = books.findIndex((book: Book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error(`Book with id ${id} not found`);
  }

  const [removedBook] = books.splice(bookIndex, 1);
  await writeData(books);
  return removedBook;
}

export async function getGroupedBooks() {
  const books = await getAllBooks();
  const groupedBooks: GroupedBooks = {
    books: books.filter(
      (book) => !book.wishlist && !book.owned && !book.isRead && !book.completed
    ),
    ownedBooks: books.filter((book) => book.owned),
    completedBooks: books.filter((book) => book.isRead),
  };

  return groupedBooks;
}

export async function getAvailableBooks(): Promise<Book[]> {
  const books = await getAllBooks();
  return books.filter((book) => !book.wishlist && !book.owned && !book.isRead && !book.completed);
}

export async function getWishlistBooks(): Promise<Book[]> {
  const books = await getAllBooks();
  return books.filter((book) => book.wishlist);
}

export async function getOwnedBooks(): Promise<Book[]> {
  const books = await getAllBooks();
  return books.filter((book) => book.owned);
}

export async function getFinishedBooks(): Promise<Book[]> {
  const books = await getAllBooks();
  return books.filter((book) => book.isRead);
}

export async function markBookAsRead(id: number) {
  const books = await getAllBooks();
  const bookIndex = books.findIndex((book: Book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error(`Book with id ${id} not found`);
  }

  books[bookIndex].isRead = true;
  await writeData(books);
  return books[bookIndex];
}

export async function markBookAsNotRead(id: number) {
  const books = await readData();
  const bookIndex = books.findIndex((book: Book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error(`Book with id ${id} not found`);
  }

  books[bookIndex].isRead = false;

  await writeData(books);
  return books[bookIndex];
}

export async function addToWishlist(id: number) {
  const books = await readData();
  const bookIndex = books.findIndex((book: Book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error(`Book with id ${id} not found`);
  }

  books[bookIndex].wishlist = true;
  await writeData(books);
  return books[bookIndex];
}

export async function removeFromWishlist(id: number) {
  const books = await readData();
  const bookIndex = books.findIndex((book: Book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error(`Book with id ${id} not found`);
  }

  books[bookIndex].wishlist = false;
  await writeData(books);
  return books[bookIndex];
}
