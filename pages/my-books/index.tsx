import { Book } from "@book-tracker/shared/book";
import Image from "next/image";

function MyBooksPage({ myBooks }: { myBooks: Book[] }) {
	return (
		<div>
			<h1>My Books</h1>
			<p>Here you can see all the books you have bought.</p>
			{myBooks.length === 0 ? (
				<p>No books available.</p>
			) : (
				<ul>
					{myBooks.map((book) => (
						<li key={book.id}>
							<h2>{book.title}</h2>
							<p>Author: {book.author}</p>
							<p>ISBN: {book.isbn}</p>
							<p>Publication Year: {book.publicationYear}</p>
							<p>Genre: {book.genre}</p>
							{book.image && (
								<Image src={book.image} alt={book.title} width="400" height="300" />
							)}
							<p>Description: {book.description}</p>
						</li>
					))}
				</ul>
			)}
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
    props: {myBooks},
  };
}
