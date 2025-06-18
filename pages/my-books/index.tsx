import BookList from "@book-tracker/components/book-list/book-list";
import { Book } from "@book-tracker/shared/book";

function MyBooksPage({ myBooks }: { myBooks: Book[] }) {
  return (
    <div className="container">
      <div className="wrapper">
        <h2>My Books</h2>
        <p>
          Here you can find the list of the books that you have bought but not
          yet finished reading. Click on a book to view its details or share
          your thoughts.
        </p>

        <BookList books={myBooks} />
      </div>
    </div>
  );
}

export default MyBooksPage;

export async function getStaticProps() {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/books/owned`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const myBooks = await response.json();

  return {
    props: { myBooks },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
