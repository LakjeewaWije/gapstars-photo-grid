import express from "express";
var bodyParser = require("body-parser");
var cors = require("cors");
// initiate express instance
const app = express();
// port
const PORT = 8000;

// allow cors
app.use(cors());
// parse application/json
app.use(bodyParser.json());

// routes
var imageGridRoutes = require('./routes/image-grid.route');
app.use('/api/grid', imageGridRoutes);

// defualt route
app.get("/", (req, res) => res.send("Gapstars ImageGrid Server v0.1"));
app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Gapstars ImageGrid Server is running at http://localhost:${PORT}`
  );
});
