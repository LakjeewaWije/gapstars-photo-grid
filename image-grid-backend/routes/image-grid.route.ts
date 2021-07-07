// var express = require('express')
import express, { Request, Response } from "express";
import ImageGridController from "../controllers/image-grid.controller";
import ImageInterface from "../interfaces/image.interface";
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


  const grid = await ImageGridController.getGrid();
  console.log(grid);

  if (grid) {
    res.status(200).send(grid);
  } else {
    res.status(500).send({ error: `fetching grid failed`, data: [] });
  }
});

/**
 * Add Grid
 */
 router.post("/", async function (req: Request, res: Response) {
  const data: ImageInterface [] = req.body;
  const grid = await ImageGridController.createGrid(data);
  // console.log("creating this record grid", grid);
  if (grid) {
    res.status(200).send(grid);
  } else {
    res
      .status(500)
      .send({ error: `grid creation failed for data `, data: data });
  }
});

module.exports = router;
