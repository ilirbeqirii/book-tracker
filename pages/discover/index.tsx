import BookList from "@book-tracker/components/book-list/book-list";
import { Book } from "@book-tracker/shared/book";

function DiscoverPage({ books }: { books: Book[] }) {
  return (
    <div className="container">
      <div className="wrapper">
        <h2>Featured Books</h2>
        <p>
          Explore our curated selection of books. Click on a book to view
          details or add it to your wishlist.
        </p>

        <BookList books={books} />
      </div>
    </div>
  );
}
export default DiscoverPage;

export async function getStaticProps() {
  const respone = await fetch(`${process.env.PUBLIC_API_URL}/books/discover`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const books: Book[] = await respone.json();

  return {
    props: {
      books,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
