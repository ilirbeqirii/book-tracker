import BookCard from "../book-card/book-card";
import { Book } from "@book-tracker/shared/book";

export default function CompletedBooksWidget({ books }: { books: Book[] }) {
  return (
      <div className="wrapper">
        <h3>Completed Books ({books.length})</h3>

        {books.length > 0 && (
          <div className="book-list-container-inline">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {!books.length && (
          <div className="no-books-message">
            <p>No completed books found 😩.</p>
          </div>
        )}
      </div>
  );
}
