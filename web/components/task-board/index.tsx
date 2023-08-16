import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { IData } from '../Interfaces';
import TaskList from '../task-list';
import React from 'react';

export default function TaskBoard() {
  const [state, setState] = useState<IData>();

  useEffect(() => {
    fetch('/api/taskdata')
      .then((res) => res.json())
      .then((data) => setState(data))
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type} = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
    
    const start = state?.columns[source.droppableId];
    const finish = state?.columns[destination.droppableId];
    
    if (start === finish && start) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newState = {
        ...state,
        columns: {
          ...state?.columns,
          [newColumn.id]: newColumn,
        }
      };
  

      setState(newState);
      return;
    }

    if (!start || !finish) {
      return;
    }

    //Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish, 
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,  
      }
    }


    setState(newState);
  }

  return (          
    <DragDropContext onDragEnd={onDragEnd}>
      <React.StrictMode>
        <div className={styles.taskBoardContainer}>
          {state?.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => state.tasks[taskId]
            );

            return (
              <TaskList
                key={column.id}
                column={column}
                tasks={tasks}
                index={index}
              />
            );
          })}
        </div>
      </React.StrictMode>
    </DragDropContext>
  );
}