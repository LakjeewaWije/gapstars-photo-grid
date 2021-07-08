import express from "express";
import { DatabaseMongoDB } from "./providers/Database.provider.mongodb";
var bodyParser = require("body-parser");
var cors = require("cors");
// initiate express instance
const app = express();
// port
const PORT = 8042;

// allow cors
app.use(cors());
app.options('*', cors());
// parse application/json
app.use(bodyParser.json());

// routes
var imageGridRoutes = require('./routes/image-grid.route');
app.use('/api/grid', imageGridRoutes);

// initialize mongo db
DatabaseMongoDB.init();

const path = require('path')
app.use('/', express.static(path.join(__dirname, '/../../image-grid-frontend/build')))

// defualt route
app.get("/health", (req, res) => res.send("Gapstars ImageGrid Server v0.1"));
app.listen(PORT,'0.0.0.0', () => {
  console.log(
    `⚡️[server]: Gapstars ImageGrid Server is running at http://0.0.0.0:${PORT}`
  );
});
