import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageInterface from "../interfaces/image.interface";
import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

function EditGrid() {
  const [items, setImages] = useState<ImageInterface[] | []>([]);
  const [selected, setselected] = useState<ImageInterface[] | []>([]);
  const history = useHistory();

  const getSavedImages = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/api/grid`;
    const rawData = await fetch(URL);
    const data = await rawData.json();
    const images: ImageInterface[] = data.images;
    console.log("Fetched data ", images);
    setselected(images);
  };

  useEffect(() => {
    getSavedImages();
    getImages();
  }, []);

  useEffect(() => {
    console.log("Check for repeated items");
    if (items.length > 0) {
      if (selected.length > 0) {
        console.log("Here a difference");
        let arraytmp = items;
        selected.forEach((val, index) => {
          arraytmp = arrayRemove(arraytmp, val.id);
        });
        setImages(arraytmp);
      } else {
      }
    } else {
    }
  }, [selected]);

  function arrayRemove(arr: any, value: any) {
    return arr.filter(function (ele: any) {
      return ele.id != value;
    });
  }

  /**
   * Get all the images added by user
   */
  const getImages = async () => {
    const rawData = await fetch(
      "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json"
    );
    const data = await rawData.json();
    const images: ImageInterface[] = data.entries;
    console.log("Fetched data ", data);
    setImages(images);
  };

  const saveSelectedImages = async (images: ImageInterface[]) => {
    const URL = `${process.env.REACT_APP_BASE_URL}/api/grid`;
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images: images }),
    });
    const data = await res.json();
    console.log("Data is saved ", data);
    if (data.images.length > 0) {
      history.push("/");
    } else {
      alert("Removed your favs!");
    }
  };

  const getList = (id: any) => (id === "droppable" ? items : selected);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items: any = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable2") {
        setselected(items);
      } else {
        setImages(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setImages(result.droppable);
      setselected(result.droppable2);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          display="flex"
          p={3}
          flexDirection="row"
          m={1}
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box width="40%">
            <div>Drag Images From :</div>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    background: "lightgrey",
                    padding: grid,
                    height: "90vh",
                    overflowY: "auto",
                  }}
                >
                  {items.map((item: ImageInterface, index: any) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.id}
                          <img
                            style={{ width: "30%", padding: "1%" }}
                            src={item.picture}
                            alt={item.message}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
          <Box width="60%">
            <div>Drop Here :</div>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="grid-container"
                  style={{
                    minHeight: "30vh",
                  }}
                >
                  {selected.map((item: any, index: any) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="grid-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.id}
                          <img
                            style={{ width: "30%", padding: "1%" }}
                            src={item.picture}
                            alt={item.message}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div style={{ textAlign: "center", padding: 5, margin: 5 }}>
              <Button
                color="primary"
                style={{ margin: 4 }}
                variant="contained"
                onClick={() => {
                  console.log("Save selected items ", selected);
                  saveSelectedImages(selected);
                }}
              >
                Save
              </Button>
              <Button
                color="primary"
                style={{ margin: 4 }}
                variant="contained"
                onClick={() => {
                  history.push("/");
                }}
              >
                View Favourites
              </Button>
              <p style={{ color: "InfoText" }}>
                Instructions: Drag and drop your favourites images from left
                panel to right panel , also make sure to save :)
              </p>
            </div>
          </Box>
        </Box>
      </DragDropContext>
    </div>
  );
}

export default EditGrid;
