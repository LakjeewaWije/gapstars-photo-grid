import React, { useEffect, useState } from "react";
import ImageInterface from "../interfaces/image.interface";
import { Box } from "@material-ui/core";
function EditGrid() {
  const [images, setImages] = useState<ImageInterface[] | []>();
  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    console.log("IMages loaded",images)
  }, [images]);

  const getImages = async () => {
    const rawData = await fetch(
      "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json"
    );
    const data = await rawData.json();
    const images: ImageInterface[] = data.entries;
    console.log("Fetched data ", data);
    setImages(images);
  };
  return (
    <div className="EditGrid">
      <h1>Edit your Grid here!</h1>
      <Box
        display="flex"
        p={3}
        flexDirection="row"
        m={1}
        justifyContent="center"
        bgcolor="background.paper"
      >
        <Box width="40%" style={{height: "86vh",overflowY: "auto"}}>
          <div >Select From :</div>
          {images?.map((img) => (
            <span  key={img.id}>
              <img style={{width:"30%",padding:"1%"}}  src={img.picture} alt={img.message} />
            </span>
          ))}
        </Box>
        <Box width="60%">
          <div>Drop Here :</div>
        </Box>
      </Box>
    </div>
  );
}

export default EditGrid;
