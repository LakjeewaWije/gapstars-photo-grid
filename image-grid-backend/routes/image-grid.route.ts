// var express = require('express')
import express, { Request, Response } from "express";

var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: () => void) {
  console.log("Time: ", Date.now());
  next();
});

/**
 * Get saved grid
 */
router.get("/", async function (req: Request, res: Response) {
  const grid = [{
    "id": 204900001,
    "message": "",
    "picture": "https://placeimg.com/2560/2560/any",
    "pictureSmall": "",
    "pictureMedium": "",
    "pictureStored": "",
    "timestamp": 1578391381
},
{
    "id": 204900002,
    "message": "",
    "picture": "https://placeimg.com/2560/2560/any",
    "pictureSmall": "",
    "pictureMedium": "",
    "pictureStored": "",
    "timestamp": 1578391381
},
{
    "id": 204900003,
    "message": "",
    "picture": "https://placeimg.com/2560/2560/any",
    "pictureSmall": "",
    "pictureMedium": "",
    "pictureStored": "",
    "timestamp": 1578391381
}]
  console.log(grid);

  if (grid) {
    // res.send(todo);
    res.status(200).send(grid);
  } else {
    res.status(500).send({ error: `fetching grid failed`, data: [] });
  }
});
module.exports = router;
