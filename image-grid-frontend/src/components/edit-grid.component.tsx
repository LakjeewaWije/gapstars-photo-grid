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
  useEffect(() => {
    getImages();
  }, []);

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
    
    const URL = "http://localhost:8000/api/grid";
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"images": images}),
    });
    const data = await res.json();
    console.log("Data is saved ",data);
    if (data.images.length > 0){
      history.push("/");
    }else{
      alert("Couldn't save your grid try again!");
    }
  };

  const getList = (id: any) => (id === "droppable" ? items : selected); // this.state[this.id2List[id]];

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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

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
            <div>Select From :</div>
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
                  style={{
                    background: "lightgrey",
                    padding: grid,
                    height: "70vh",
                    overflowY: "auto",
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
            <div style={{ textAlign: "center", padding: 5 }}>
              <Button
                color="primary"
                variant="contained"
                disabled={selected.length === 0}
                onClick={() => {
                  console.log("Save selected items ", selected);
                  saveSelectedImages(selected);
                }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Box>
      </DragDropContext>
    </div>
  );
}

export default EditGrid;
