# Basic Book Tracker - Project Documentation (Next.js with Pages Router)

## 1. Introduction

This document outlines the requirements and design for a personal "Basic Book Tracker" application built with Next.js and the Pages Router. The primary goal of this project is to learn and practice Next.js development by creating a functional application for managing a personal book collection and a wishlist. This project aims to provide users with the ability to add, view, mark as read/unread, delete books, maintain a wishlist of desired books, and includes user authentication with login and signup functionalities as bonus features.

## 2. Goals

* **Learning Next.js (Pages Router):** To gain practical experience with core Next.js concepts such as file-system routing (Pages Router), components, JSX, state management (using React Hooks), data fetching (if integrating with an API), and handling user authentication within a Next.js environment.
* **No Tutorial Hell:** To learn by doing and problem-solving within the context of a real application, minimizing reliance on passive tutorial consumption.
* **Functional Application:** To create a usable application for personal book management with user accounts.

## 3. Target Audience

Individual users who want a secure and personal tool to keep track of their owned books and a list of books they want to read, with the added benefit of having their data associated with their own account.

## 4. Core Features

### 4.1. Adding Books

* Users should be able to add new books to their collection.
* The application should allow users to input the following information for each book:
    * Title (required)
    * Author (required)
    * ISBN (optional)
    * Genre (optional)
    * Publication Year (optional)
* The application should provide a user-friendly form for inputting book details.

### 4.2. Displaying Books

* The application should display a list of all the books currently in the logged-in user's collection.
* For each book, the displayed information should include at least the Title and Author.
* The display should clearly indicate the read/unread status of each book.

### 4.3. Marking Books as Read/Unread

* Users should be able to easily toggle the read/unread status of each book in their collection.
* The UI should provide a clear visual indication of a book's read status (e.g., a checkbox, a label with different styling).

### 4.4. Deleting Books

* Users should be able to remove books from their collection.
* The UI should provide a clear way to initiate the deletion of a book (e.g., a delete button).
* Consideration for a confirmation step before permanent deletion.

### 4.5. Wishlist

* Users should be able to add books they are interested in to a separate wishlist.
* The wishlist should display the Title and Author of each book.
* Users should be able to remove books from their wishlist.
* Optionally, users might be able to move books from the wishlist to their main collection (e.g., after purchasing or acquiring the book).

## 5. Bonus Features

### 5.1. Login

* Registered users should be able to log in to the application using their credentials (username/email and password).
* The login process should authenticate the user and establish a session.

### 5.2. Signup

* New users should be able to create an account by providing necessary information (e.g., username/email and password).
* The signup process should securely store user credentials.

## 6. Optional Enhancements (Future Considerations)

* **Filtering:** Allow users to filter the book list by genre or read status.
* **Searching:** Implement a search bar to find books by title or author.
* **Sorting:** Allow users to sort the book list by title, author, or publication year.
* **Data Persistence (Backend Integration):** Integrate with a backend service and database to store user data (books, wishlist) persistently across sessions and devices. This is essential for a multi-user application with login/signup.
* **Basic Styling:** Improve the visual presentation of the application with CSS (potentially using CSS Modules or Styled JSX).
* **User Profiles:** Allow users to manage their profile information.
* **Password Reset:** Implement a mechanism for users to reset their passwords.

## 7. Technical Design (Initial Thoughts)

* **Framework:** Next.js (with Pages Router)
* **Pages:**
    * `pages/index.js`: Home page, potentially displaying the book list for logged-in users or a landing page for non-logged-in users.
    * `pages/books/index.js`: Displays the list of owned books.
    * `pages/books/add.js`: Form for adding new books.
    * `pages/wishlist/index.js`: Displays the wishlist.
    * `pages/login.js`: User login page.
    * `pages/signup.js`: User registration page.
* **Components:** Reusable UI elements (e.g., `BookCard`, `BookForm`, `WishlistItem`, `AuthForm`). These would likely reside in a `components/` directory.
* **State Management:** React Hooks (`useState`, `useEffect`, `useContext` if needed for more complex state) will be used for managing component state. For global state related to authentication, Context API or a simpler global state management solution might be considered initially.
* **Data Storage:** Initially, while focusing on frontend learning, user authentication and book data might be simulated or use browser-based storage (with clear limitations for a real application). For persistent storage in a real-world scenario with login/signup, a backend service and database are essential.
* **Data Model:** A JavaScript object structure (or TypeScript interfaces if using TypeScript) will represent the structure of a book object (title, author, isbn, genre, publicationYear, status). A similar structure will be needed for user data.
* **Authentication:**
    * **Frontend:** Handling form submissions, managing authentication state (e.g., logged-in user), and potentially storing tokens in `localStorage` or `cookies` (with security considerations).
    * **Backend (Conceptual for now):** In a real application, this would involve API calls to a backend for user registration, login, and session management.
* **Forms:** React's form handling mechanisms will be used. Libraries like `react-hook-form` or `formik` could be considered for more complex forms.
* **Routing:** Next.js's file-system routing (Pages Router) will handle navigation between different pages.
* **API Routes (for future backend integration):** Next.js API routes (`pages/api/`) could be used to build a basic backend or to interact with an external API for authentication and data storage.
* **Styling:** CSS Modules, Styled JSX, or global CSS files can be used for styling.

## 8. Development Plan (Iterative Approach)

1.  **Setup:** Create a new Next.js project using `npx create-next-app@latest --example basic-mdx basic-book-tracker` (or a similar basic template). Navigate to the project directory.
2.  **Basic Book Management Pages and Components:**
    * Create `pages/books/index.js` to display the book list.
    * Create `pages/books/add.js` with a form for adding books.
    * Create a `components/BookForm.js` component.
    * Manage book data using `useState` within the `pages/books/index.js` initially.
3.  **Mark as Read/Unread and Delete Functionality:** Implement these features within the `pages/books/index.js` component, updating the local book data state.
4.  **Wishlist Page:**
    * Create `pages/wishlist/index.js` to display the wishlist.
    * Implement an "Add to Wishlist" button in the book list and logic to manage the wishlist data (using `useState` initially).
    * Implement "Remove from Wishlist" functionality.
5.  **Authentication Pages and Components:**
    * Create `pages/login.js` with a login form (using `useState` for form data).
    * Create `pages/signup.js` with a signup form (using `useState` for form data).
    * Create a reusable `components/AuthForm.js` component.
6.  **Basic Authentication Logic (Frontend Simulation):**
    * For learning purposes, simulate user account creation and storage (e.g., in a simple in-memory object or `localStorage` - **note the security limitations of this approach for real applications**).
    * Implement basic login logic by checking provided credentials against the simulated accounts.
    * Manage authentication state using `useState` or `useContext` at a higher level.
    * Implement basic "logout" functionality.
7.  **Route Protection:** Implement logic (e.g., using `useEffect` and conditional rendering) to redirect unauthenticated users from the book list and wishlist pages to the login page.
8.  **Integrate Authentication with Book Data (Conceptual for now):** Understand how, in a real application, each user's book data would be associated with their account (likely through a user ID).
9.  **Optional Enhancements:** Implement features from Section 6 iteratively as time and learning progress allow, with a strong emphasis on backend integration (using Next.js API routes or an external API) for persistent and secure user data management if pursuing the login/signup features beyond a basic learning exercise.

## 9. Technologies Used

* React
* Next.js (Pages Router)
* JSX
* JavaScript (or TypeScript)
* React Hooks (`useState`, `useEffect`, etc.)
* CSS (CSS Modules, Styled JSX, or global CSS)

## 10. Potential Challenges (with Bonus Features)

* Understanding Next.js's file-system routing and data fetching patterns.
* Managing component state effectively with React Hooks.
* Implementing even basic authentication logic securely on the frontend (understanding security principles is important).
* Grasping the need for and complexities of backend integration for real user authentication and data persistence in a Next.js application.
* Protecting routes based on authentication status in a Next.js environment.
* Choosing and implementing a suitable styling approach in Next.js.

## 11. Conclusion

Developing the Basic Book Tracker with Next.js (Pages Router) provides a strong foundation for learning full-stack React development. The addition of login and signup features introduces crucial concepts related to user authentication and state management in a routed application. While the initial implementation might involve frontend simulations for learning, recognizing the importance of backend integration for a real-world application is key for future development. This documentation serves as a guide for building this project and exploring the capabilities of Next.js.