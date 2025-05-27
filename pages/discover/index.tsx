import { Book } from "@book-tracker/shared/book";
import Image from "next/image";

function DiscoverPage({ books }: { books: Book[] }) {
  return (
    <div>
      <h1>Discover</h1>
      <p>Explore new content and features.</p>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Publication Year: {book.publicationYear}</p>
            <p>Genre: {book.genre}</p>
            <Image src={book.image} alt={book.title} width="400" height="300" />
            <p>Description: {book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DiscoverPage;

export async function getStaticProps() {
  const respone = await fetch(`${process.env.PUBLIC_API_URL}/books`);
  const books: Book[] = await respone.json();

  return {
    props: {
      books,
    },
  };
}
