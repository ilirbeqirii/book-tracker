import { getGroupedBooks } from "@book-tracker/helpers/api-utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const groupedBooks = await getGroupedBooks();
    res.status(200).json(groupedBooks);
    return;
  }
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  return;
}
export default handler;
