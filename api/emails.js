import { google } from "googleapis";

export default async function handler(req, res) {
  const token = req.query.token;

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });

  const gmail = google.gmail({ version: "v1", auth });

  const list = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10
  });

  res.json(list.data);
}
