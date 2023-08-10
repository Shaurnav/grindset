import { Droppable } from "react-beautiful-dnd";
import styles from './styles.module.scss'
import { TaskProps } from "./task";
import Task from "./task";

export type TaskListProps = {
  tasks: TaskProps[],
  status: string,
}

export default function TaskList({tasks, status}: TaskListProps) {

  return (
    <Droppable key={status} droppableId={status}>
      {provided => (
        <div className={styles.list}>
          <div className={styles.title}>
            {status}
          </div>
          <div className={styles.tasks}
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${status}`}
          >
            {tasks.map((task) => (
              <Task {...task} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};