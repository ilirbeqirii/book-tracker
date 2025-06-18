"use client";

import Link from "next/link";
import classes from "./main-menu.module.css";
import { usePathname } from "next/navigation";

function MainMenu() {
  const pathName = usePathname();

  return (
    <header className={classes.header}>
      <div className={classes["header-wrapper"]}>
        <div className={classes.name}>📚 Book Explorer</div>
        <nav>
          <ul className={classes.menu}>
            <li className={classes["menu-item"]}>
              <Link href="/" className={pathName == "/" ? classes.active : ""}>
                Home
              </Link>
            </li>
            <li className={classes["menu-item"]}>
              <Link
                href="/discover"
                className={pathName == "/discover" ? classes.active : ""}
              >
                Library
              </Link>
            </li>
            <li className={classes["menu-item"]}>
              <Link
                href="/wishlist"
                className={pathName == "/wishlist" ? classes.active : ""}
              >
                Wishlist
              </Link>
            </li>
            <li className={classes["menu-item"]}>
              <Link
                href="/finished"
                className={pathName == "/finished" ? classes.active : ""}
              >
                Finished Books
              </Link>
            </li>
            <li className={classes["menu-item"]}>
              <Link
                href="/my-books"
                className={pathName == "/my-books" ? classes.active : ""}
              >
                My Books
              </Link>
            </li>
            <li className={classes["menu-item"]}>
              <Link
                href="/contact"
                className={pathName == "/contact" ? classes.active : ""}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainMenu;
