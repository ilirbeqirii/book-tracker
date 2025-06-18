import { Book } from "@book-tracker/shared/book";
import classes from "./book-card.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BookActions from "../book-actions/book-actions";

function BookCard({ book }: { book: Book }) {
  const pathName = usePathname();

  return (
    <div className={classes["book-card"]}>
      <Image
        src={book.image}
        alt={book.title}
        className={classes["book-cover"]}
        width={500}
        height={350}
        loading="lazy"
      />
      <h3 className={classes["book-title"]}>{book.title}</h3>
      <p className={classes["book-author"]}>By {book.author}</p>
      <p className={classes["book-meta"]}>
        ISBN: <span>{book.isbn}</span>
      </p>
      <p className={classes["book-meta"]}>
        Published: <span>{book.publicationYear}</span>
      </p>
      <span className={classes["book-genre"]}>{book.genre}</span>

      {pathName !== "/" && <BookActions book={book} />}
    </div>
  );
}

export default BookCard;
