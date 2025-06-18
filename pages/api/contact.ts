import { saveContactData } from "@book-tracker/helpers/api-utils";
import { ContactData } from "@book-tracker/shared/contact";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod/v4";

const contactDataSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
  inquiryType: z.enum(["general", "bug", "feature"]),
  subject: z.string().min(1),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const body: ContactData = request.body;
  const parsedData = contactDataSchema.safeParse(body);
  if (!parsedData.success) {
    response.status(422).json({ message: "Invalid input." });
    return;
  }

  try {
    await saveContactData(parsedData.data);
    response.status(201).json({ message: "Contact data received" });
  } catch {
    response.status(500).json({ message: "Storing contact data failed." });
  }
}
