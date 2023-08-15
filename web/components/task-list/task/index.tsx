import { Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.scss";
import { ITask } from "@/components/Interfaces";

export type TaskProps = {
  task: ITask;
  index: number,
};

export default function Task({task, index}: TaskProps ) {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div 
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef} 
          className={styles.issueContainer}
        >
          <p>{task.description}</p>
        </div>     
      )}
    </Draggable>
  );
};

