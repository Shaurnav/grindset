import { Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.scss";

export type TaskProps = {
  description: string,
  status: string,
  id: number,
  index: number,
};

export default function Task({description, id, status, index}: TaskProps ) {

  return (
    <Draggable draggableId={description} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div 
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef} 
          className={styles.issueContainer}
        >
          <p>{description}</p>
        </div>     
      )}
    </Draggable>
  );
};

