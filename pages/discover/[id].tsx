import { Book } from "@book-tracker/shared/book";
import Image from "next/image";
import classes from "./book-details.module.css";
import { useRouter } from "next/navigation";
import { useToastNotification } from "@book-tracker/components/ui/toast-notification/toast-notification";
import Modal from "@book-tracker/components/ui/modal/modal";
import { useState } from "react";

function BookDetailsPage({ bookDetails }: { bookDetails: Book }) {
  const router = useRouter();
  const { showToast } = useToastNotification();
  const [modalState, setModalState] = useState({ message: "", title: "" });

  const askForApproval = () => {
    setModalState({
      message: "Are you sure you want to delete this book?",
      title: "Delete Book",
    });
  };

  const deleteBook = async () => {
    try {
      const response = await fetch(
        `/api/books/discover/?id=${bookDetails.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setModalState({
          message: "",
          title: "",
        });

        const result = await response.json();
        showToast(result.message, "success");

        router.push("/discover");
      } else {
        showToast("Failed to delete the book. Please try again.", "error");
      }
    } catch {
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="container">
      <div className={classes["book-details-section"]}>
        <div className={classes["details-cover-container"]}>
          <Image
            src={bookDetails.image}
            alt={bookDetails.title}
            width={500}
            height={300}
            className={classes["details-book-cover"]}
          />
        </div>

        <div className={classes["details-content"]}>
          <h1 className={classes["details-title"]}>{bookDetails.title}</h1>
          <p className={classes["details-author"]}>By {bookDetails.author}</p>
          <div className={classes["details-meta-group"]}>
            <p className={classes["details-meta"]}>
              <strong>ISBN:</strong> {bookDetails.isbn}
            </p>
            <p className={classes["details-meta"]}>
              <strong>Published:</strong> {bookDetails.publicationYear}
            </p>
          </div>
          <span className={classes["details-genre"]}>{bookDetails.genre}</span>

          <p className={classes["details-summary"]}>
            {bookDetails.description}
          </p>

          <div className={classes["details-actions"]}>
            <button className="btn btn-secondary" onClick={() => router.back()}>
              Back to Library
            </button>

            <button className="btn btn-danger" onClick={askForApproval}>
              Delete Book
            </button>
          </div>
        </div>
      </div>

      {modalState.message && (
        <Modal
          show={true}
          message={modalState.message}
          title={modalState.title}
          onConfirm={deleteBook}
          onClose={() => setModalState({ message: "", title: "" })}
        />
      )}
    </div>
  );
}

export default BookDetailsPage;

export async function getStaticProps(context: {
  params: { id: string };
}): Promise<{ props: { bookDetails: Book }; revalidate: number }> {
  const { id } = context.params;

  const res = await fetch(
    `${process.env.PUBLIC_API_URL}/books/discover?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const bookDetails: Book = await res.json();

  return {
    props: {
      bookDetails,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.PUBLIC_API_URL}/books/discover`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const books: Book[] = await res.json();
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
