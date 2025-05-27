import { Book } from "@book-tracker/shared/book";
import Image from "next/image";

function WishlistPage({ wishlist }: { wishlist: Book[] }) {
  return (
    <div>
      <h1>Wishlist</h1>
      <p>This is your wishlist page.</p>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((book) => (
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

export default WishlistPage;

export async function getStaticProps() {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/books/wishlist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const wishlist = await response.json();

  return {
    props: { wishlist },
  };
}
