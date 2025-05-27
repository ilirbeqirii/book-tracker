import { Book } from "./book";

export interface GroupedBooks {
	books: Book[];
	ownedBooks: Book[];
	completedBooks: Book[];
}