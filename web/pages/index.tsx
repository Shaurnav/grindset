import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/header'
import Task from '@/components/task-list/task'
import TaskList from '@/components/task-list'
import React, { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { IData } from '@/components/Interfaces'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
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
        <div className={inter.className}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header/>
          <main className={styles.main}>
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
          </main>
        </div>
      </React.StrictMode>
    </DragDropContext>
        
  );
}
