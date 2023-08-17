import { useState } from 'react';
import styles from './styles.module.scss'
import { IData } from '../Interfaces';

type TaskAddProps = {
  totalTasks: number,
  setTotalTasks: React.Dispatch<React.SetStateAction<number>>,
  state: IData | undefined,
  setState: React.Dispatch<React.SetStateAction<IData | undefined>>,
}

//we add task with this input field
//on enter we update the state
//we leverage our put request, no need for another post request?

export default function TaskAdd({state, setState, totalTasks, setTotalTasks}: TaskAddProps) {
  const [inputText, setInputText] = useState('');
 
  const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    const newTask = {description: inputText};

    fetch('/api/taskdata', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    }).then(
      response => response.json()
    ).then(
      data => console.log(data)
    );

    fetch('/api/taskdata')
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    })
    .then((data) => setState(data));

    setInputText('');
    setTotalTasks(totalTasks + 1);
  }

  return (
  <div className={styles.taskAddContainer}>
    <p>add task</p>
    <input 
      placeholder="Type a task and press enter..."
      type='text' 
      value={inputText} 
      onChange={event => setInputText(event.target.value)}  
      onKeyDown={handleEnter}
    />
  </div>
 ); 
}