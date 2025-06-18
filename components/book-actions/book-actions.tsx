"use client";

import { usePathname, useRouter } from "next/navigation";
import classes from "./book-actions.module.css";
import Tooltip from "../ui/tooltip/tooltip";
import { Book } from "@book-tracker/shared/book";
import { useToastNotification } from "../ui/toast-notification/toast-notification";

function BookActions({ book }: { book: Book }) {
  const { showToast } = useToastNotification();
  const pathName = usePathname();
  const router = useRouter();

  const markAsReadHandler = async () => {
    const response = await fetch("/api/books/finished", {
      method: "POST",
      body: JSON.stringify({ id: book.id, finished: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    showToast(data.message, "success");
  };

  const markAsUnReadHandler = async () => {
    const response = await fetch("/api/books/finished", {
      method: "POST",
      body: JSON.stringify({ id: book.id, finished: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    showToast(data.message, "success");
  };

  const addToWishlist = async () => {
    const response = await fetch("/api/books/wishlist", {
      method: "POST",
      body: JSON.stringify({ id: book.id, wishlisted: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    showToast(data.message, "success");
  };

  const removeFromWishlist = async () => {
    const response = await fetch("/api/books/wishlist", {
      method: "POST",
      body: JSON.stringify({ id: book.id, wishlisted: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    showToast(data.message, "success");
  };

  const buyNowHandler = async () => {
    const response = await fetch("/api/books/owned", {
      method: "POST",
      body: JSON.stringify({ id: book.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    showToast(data.message, "success");
  };

  const goToDetailsHandler = () => {
    router.push(`/discover/${book.id}`);
  };

  return (
    <div className={classes["book-actions"]}>
      <Tooltip text="View Details">
        <button
          className="btn-icon"
          aria-label="View Details"
          onClick={goToDetailsHandler}
        >
          👁️
        </button>
      </Tooltip>

      {pathName !== "/finished" &&
        pathName !== "/wishlist" &&
        pathName !== "/discover" && (
          <Tooltip text="Mark as Read">
            <button
              className="btn-icon read-status-icon"
              aria-label="Mark as Read"
              onClick={markAsReadHandler}
            >
              ✔️
            </button>
          </Tooltip>
        )}

      {(pathName == "/finished" || book.isRead) && (
        <Tooltip text="Mark as Unread">
          <button
            className="btn-icon read-status-icon"
            aria-label="Mark as Unread"
            onClick={markAsUnReadHandler}
          >
            ╳
          </button>
        </Tooltip>
      )}

      {pathName == "/discover" && !book.wishlist && (
        <Tooltip text="Add to Wishlist">
          <button
            className="btn-icon wishlist-icon"
            aria-label="Add to Wishlist"
            onClick={addToWishlist}
          >
            ⭐
          </button>
        </Tooltip>
      )}

      {pathName == "/wishlist" && book.wishlist && (
        <Tooltip text="Remove from Wishlist">
          <button
            className="btn-icon wishlist-icon"
            aria-label="Remove from Wishlist"
            onClick={removeFromWishlist}
          >
            ★
          </button>
        </Tooltip>
      )}

      {pathName === "/discover" && (
        <Tooltip text="Buy Now">
          <button
            className="btn-icon buy-book-icon"
            aria-label="Buy Now"
            onClick={buyNowHandler}
          >
            🛒
          </button>
        </Tooltip>
      )}
    </div>
  );
}
export default BookActions;
