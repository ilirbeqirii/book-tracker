import BookList from "@book-tracker/components/book-list/book-list";
import { Book } from "@book-tracker/shared/book";

function WishlistPage({ wishlist }: { wishlist: Book[] }) {
  return (
    <div className="container">
      <div className="wrapper">
        <h2>Wishlist</h2>

        <p>
          Here you can find a list of books that you wish to read in the future.
          Click on a book to view its details or mark it as read.
        </p>

        <BookList books={wishlist} />
      </div>
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
    revalidate: 60, // Revalidate every 60 seconds
  };
}
