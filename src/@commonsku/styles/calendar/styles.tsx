import { DraggableProvided, DraggableStateSnapshot, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";

export const draggableChildWrapperProps = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, props: {[key: string]: any;}={}) => {
  const { style, ...rest } = props;
  return {
    style: {
      userSelect: "none",
      padding: 16,
      margin: "0 0 8px 0",
      minHeight: "50px",
      backgroundColor: snapshot.isDragging
        ? "#263B4A"
        : "#456C86",
      color: "white",
      ...provided.draggableProps.style,
      ...style,
    },
    ref: provided.innerRef,
    ...provided.draggableProps,
    ...provided.dragHandleProps,
    ...rest,
  };
};

export const droppableChildWrapperProps = (provided: DroppableProvided, snapshot: DroppableStateSnapshot, props: {[key: string]: any;}={}) => {
  const { style, ...rest } = props;
  return {
    style: {
      background: snapshot.isDraggingOver
        ? "lightblue"
        : "unset",
      padding: 4,
      width: '100%',
      minHeight: 500,
      maxHeight: 500,
      ...style,
    },
    ref: provided.innerRef,
    ...provided.droppableProps,
    ...rest,
  };
};
