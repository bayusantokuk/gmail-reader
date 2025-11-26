import { google } from "googleapis";

export default async function handler(req, res) {
  const auth = req.auth; // token OAuth dari callback
  const gmail = google.gmail({ version: "v1", auth });

  // Ambil list email
  const listRes = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
  });

  const messages = listRes.data.messages || [];

  // Ambil detail tiap email
  const detailedMessages = await Promise.all(
    messages.map(async (msg) => {
      const message = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
        format: "full",
      });

      const headers = message.data.payload.headers;
      const from = headers.find((h) => h.name === "From")?.value;
      const subject = headers.find((h) => h.name === "Subject")?.value;
      const snippet = message.data.snippet;

      return { id: msg.id, from, subject, snippet };
    })
  );

  res.status(200).json({ emails: detailedMessages });
}
