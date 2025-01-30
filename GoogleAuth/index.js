import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const server = express();

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_CALLBACK_URL = "http%3A//localhost:4001/google/callback";
const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",
  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

server.get("/", (req, res) => {
  res.json({ message: "server is running", success: true });
});

server.get("/login", (req, res) => {
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

server.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:4001/google/callback",
    grant_type: "authorization_code",
  };

  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();

  const { id_token } = access_token_data;

  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );
  res.status(token_info_response.status).json(await token_info_response.json());
});

server.listen(process.env.PORT, () => {
  console.log("server started at http://localhost:4001");
});
