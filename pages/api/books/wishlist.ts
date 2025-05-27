import { addToWishlist, getWishlistBooks, removeFromWishlist } from "@book-tracker/helpers/api-utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
		const books = await getWishlistBooks();
		res.status(200).json(books);
		return;
  }

	if (req.method === "POST") {
		const { id, wishlisted } = req.body;
		if (wishlisted) {
			const book = await addToWishlist(id);
			res.status(200).json({ message: "Book added to wishlist", book });
		} else {
			const book = await removeFromWishlist(id);
			res.status(200).json({ message: "Book removed from wishlist", book });
		}
		return;
	}

	res.status(405).json({ error: "Method not allowed" });
}

export default handler;
