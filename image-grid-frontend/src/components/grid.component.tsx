import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageInterface from "../interfaces/image.interface";

function ImageGrid() {
  const [images, setImages] = useState<ImageInterface[] | []>([]);
  const getSavedImages = async () => {
    const URL = "http://localhost:8000/api/grid";
    const rawData = await fetch(URL);
    const data = await rawData.json();
    const images: ImageInterface[] = data.images;
    console.log("Fetched data ", images);
    setImages(images);
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  return (
    <Box
      display="flex"
      p={3}
      flexDirection="column"
      m={1}
      justifyContent="center"
      bgcolor="background.paper"
    >
      <Box>
        <h1 style={{ textAlign: "center" }}>Your Favourites!</h1>
      </Box>
      <Box flexDirection="column">
        <div style={{ textAlign: "center" }}>
          {images.map((val, ind) => (
            <span key={ind}>
              <p>
                {ind + 1} . {val.id}
              </p>
              <img src={val.picture} style={{ width: 200, padding: "1%" }} />
            </span>
          ))}
        </div>
      </Box>
    </Box>
  );
}

export default ImageGrid;
