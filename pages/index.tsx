import AvailableBooksWidget from "@book-tracker/components/dashboard/available-books";
import CompletedBooksWidget from "@book-tracker/components/dashboard/completed-books";
import MyBooksWidget from "@book-tracker/components/dashboard/my-books";
import { GroupedBooks } from "@book-tracker/shared/grouped-books";

export default function Home({
  dashboardData,
}: {
  dashboardData: GroupedBooks;
}) {
  const { books, ownedBooks, completedBooks } = dashboardData;

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Dashboard</h2>
        <p>
          Here you can find an overview of your book collection, including the
          books you own, those you have completed, and those you wish to read in
          the future.
        </p>

        <AvailableBooksWidget books={books} />
        <MyBooksWidget books={ownedBooks} />
        <CompletedBooksWidget books={completedBooks} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/dashboard`);
  const data = await response.json();

  return {
    props: {
      dashboardData: data,
    },
    revalidate: 10,
  };
}
