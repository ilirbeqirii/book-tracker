import { Book } from "@book-tracker/shared/book";
import Image from "next/image";

function FinishedBooksPage({ finishedBooks }: { finishedBooks: Book[] }) {
  return (
    <div>
      <h1>Finished Books</h1>
      <p>This page will display a list of books that have been finished.</p>

      {finishedBooks.length === 0 ? (
        <p>No finished books available.</p>
      ) : (
        <ul>
          {finishedBooks.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Genre: {book.genre}</p>
              <p>Publication Year: {book.publicationYear}</p>
              <p>Description: {book.description}</p>
              {book.image && <Image src={book.image} alt={book.title} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FinishedBooksPage;

export async function getStaticProps() {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/books/finished`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const finishedBooks = await response.json();

  return {
    props: { finishedBooks },
  };
}
