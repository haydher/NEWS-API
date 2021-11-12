const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const news = require("./routes/news");
require("dotenv").config();

app.use(cors());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/news", news);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
 res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});
