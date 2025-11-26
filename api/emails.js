const { google } = require("googleapis");
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
oAuth2Client.setCredentials({
  access_token: "MASUKKAN_ACCESS_TOKEN_DI_SINI"
});
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
