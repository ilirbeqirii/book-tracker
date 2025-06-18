import classes from './no-available-books.module.css';

export default function NoAvailableBooks() {
  return (
    <div className={classes['no-books-message-section']}>
      <h3>No Books Available</h3>
      <p>
        It looks like there are no books to display in this section yet. Try
        adding some!
      </p>
    </div>
  );
}