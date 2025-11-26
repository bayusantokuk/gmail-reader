import { google } from "googleapis";

export default async function handler(req, res) {
  const code = req.query.code;

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);
  const access = tokens.access_token;

  res.redirect(`/dashboard.html?token=${access}`);
}
