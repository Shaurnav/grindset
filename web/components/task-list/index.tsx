import { Droppable } from "react-beautiful-dnd";
import styles from './styles.module.scss'
import { TaskProps } from "./task";
import Task from "./task";
import { IColumn, ITask, ITasks } from "@/components/Interfaces";

export type TaskListProps = {
  tasks: ITask[],
  column: IColumn,
  index: number,
}

export default function TaskList({tasks, column, index}: TaskListProps) {

  return (
    <Droppable droppableId={column.id}>
      {provided => (
        <div className={styles.list}>
          <div className={styles.title}>
            {column.title}
          </div>
          <div className={styles.tasks}
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${column.id}`}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index}/>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};