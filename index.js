require("dotenv").config();
const { query } = require("express");
const express = require("express");
const querystring = require("querystring");
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
  const data = {
    name: "liv",
    isCool: true,
  };

  res.json(data);
});

const generateRandomisedString = (length) => {
  let string = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    string += possible.charAt(Match.floor(Math.random() * possible.length));
  }

  return string;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomisedString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";

  const queryParameters = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParameters}`);
});

app.get("/callback", (req, res) => {
  res.send("callback");
});

app.listen(port, () => {
  console.log(`express app is listening at http://localhost:${port}`);
});
