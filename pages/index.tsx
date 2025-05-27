import { GroupedBooks } from "@book-tracker/shared/grouped-books";
import Head from "next/head";


export default function Home({ dashboardData }: { dashboardData: GroupedBooks }) {
  const { books, ownedBooks, completedBooks } = dashboardData;

  return (
    <>
      <Head>
        <title>Book Tracker</title>
        <meta name="description" content="Book management app that helps you keep track of your books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Book Tracker</h1>
        <div>Available Books {books.length}</div>
        <div>My Books {ownedBooks.length}</div>
        <div>Completed Books {completedBooks.length}</div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/dashboard`);
  const data = await response.json();

  console.log(data);

  return {
    props: {
      dashboardData: data
    },
    revalidate: 10
  };
}
