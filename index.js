require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
// const news = require("./routes/news");
const NewsAPI = require("newsapi");
const newsApi = new NewsAPI(process.env.API_KEY);
require("dotenv").config();

app.use(cors());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", (req, res) => {
 res.send("News Api");
});

app.get("/api/news", (req, res) => {
 let query = "bitcoin";

 if (req.query.q != undefined && req.query.q != "undefined") query = req.query.q;

 const currRangeDateUNIX = (new Date().getTime() / 1000).toFixed(0);
 // 604800 = 7 days
 const prevRangeUNIX = currRangeDateUNIX - 604800;
 const date = new Date(prevRangeUNIX * 1000);
 const dateFormate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

 // To query /v2/everything
 // You must include at least one q, source, or domain
 newsApi.v2
  .everything({
   q: `${query}, crypto`,
   from: dateFormate,
   to: currRangeDateUNIX,
   language: "en",
   sortBy: "relevancy",
  })
  .then((response) => {
   console.log("response", response);
   res.send(response);
  });
});
// app.use("/api/news", news);

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

const port = process.env.PORT || 9000;
app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});
