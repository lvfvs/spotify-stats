require("dotenv").config();
const express = require("express");
const axios = require("axios");
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
    string += possible.charAt(Math.floor(Math.random() * possible.length));
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
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
      } else {
        res.send(response);
      }
    })

    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`express app is listening at http://localhost:${port}`);
});
