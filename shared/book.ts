interface Base {
  isRead: boolean;
  completed: boolean;
  wishlist: boolean;
  owned: boolean;
  deleted: boolean;
}

export interface Book extends Base {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  image: string;
  description: string;
  rating: number; // New property added
}
