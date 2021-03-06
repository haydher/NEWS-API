require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const NewsAPI = require("newsapi");
const newsApi = new NewsAPI(process.env.API_KEY);

app.use(cors());

app.get("/", (req, res) => {
 res.send("News Api");
});

app.get("/turnServerOn", (req, res) => {
 res.send({ status: 200 });
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

const port = process.env.PORT || 9000;
app.listen(port, () => {
 console.log(`Example app listening at port: ${port}`);
});
