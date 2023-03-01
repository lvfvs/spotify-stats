require("dotenv").config();
const express = require("express");
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

app.get("/login", (req, res) => {
  res.redirect("https://accounts.spotify.com/authorize?" + 
    querystring.stringify({
      client_id=${CLIENT_ID}&
    }));
});

app.listen(port, () => {
  console.log(`express app is listening at http://localhost:${port}`);
});
