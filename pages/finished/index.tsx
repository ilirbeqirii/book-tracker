import BookList from "@book-tracker/components/book-list/book-list";
import { Book } from "@book-tracker/shared/book";

function FinishedBooksPage({ finishedBooks }: { finishedBooks: Book[] }) {
  return (
    <div className="container">
      <div className="wrapper">
        <h2>Finished Books</h2>

        <p>
          Here you can find a list of books that you have finished reading.
          Click on a book to view its details or share your thoughts.
        </p>

        <BookList books={finishedBooks} />
      </div>
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
    revalidate: 60, // Revalidate every 60 seconds
  };
}
