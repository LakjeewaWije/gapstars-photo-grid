import ImageInterface from "../interfaces/image.interface";
import { Schema, model } from "mongoose";
import GridInterface from "../interfaces/grid.interface";
const ImageSchema = new Schema<ImageInterface>(
    {
      id: { type: Number, required: true },
      message: { type: String},
      picture: { type: String, required: true },
      pictureSmall: { type: String},
      pictureMedium: { type: String},
      pictureStored: { type: String},
      timestamp: { type: Date, required: true }
    },
  );

  const GridSchema = new Schema<GridInterface>(
    {
      images: { type: [ImageSchema], required: true }
    },
  );
  
  export const ImageGridDao = model<GridInterface>("grids", GridSchema);