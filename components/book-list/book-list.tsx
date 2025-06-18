import classes from "./book-list.module.css";
import BookCard from "@book-tracker/components/book-card/book-card";
import { Book } from "@book-tracker/shared/book";
import NoAvailableBooks from "../core/no-available-books/no-available-books";

export default function BookList({ books }: { books: Book[] }) {
  if (!books || books.length === 0) {
    return <NoAvailableBooks />;
  }
  
  return (
    <div className={classes["book-list-container"]}>
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  );
}
