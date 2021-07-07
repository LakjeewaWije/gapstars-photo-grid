import ImageInterface from "../interfaces/image.interface";
import { Schema, model } from "mongoose";
const ImageSchema = new Schema<ImageInterface>(
    {
      id: { type: String, required: true },
      message: { type: String},
      picture: { type: String, required: true },
      pictureSmall: { type: String},
      pictureMedium: { type: String},
      pictureStored: { type: String},
      timestamp: { type: Date, required: true }
    },
  );
  
  export const ImageGridDao = model<ImageInterface>("grid", ImageSchema);