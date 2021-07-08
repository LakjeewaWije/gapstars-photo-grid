import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageInterface from "../interfaces/image.interface";

function ImageGrid() {
  const history = useHistory();
  const [images, setImages] = useState<ImageInterface[] | []>([]);
  const getSavedImages = async () => {
    // process.env.BASE_URL;
    const URL = `${process.env.REACT_APP_BASE_URL}/api/grid`;
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
        <div style={{ textAlign: "end", padding: 5 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push("/edit");
            }}
          >
            Edit Grid {"---->"}
          </Button>
        </div>
      </Box>
      <Box flexDirection="column">
        <div className="grid-container">
          {images?.length ? images.map((val, ind) => (
            <div key={ind} className="grid-item">
              <p>
                {ind + 1} . {val.id}
              </p>
              <img src={val.picture} style={{ width: 200, padding: "1%" }} />
            </div>
          )): <p style={{ textAlign: "center" }}>No Favs to display :(</p>}
        </div>
      </Box>
    </Box>
  );
}

export default ImageGrid;
