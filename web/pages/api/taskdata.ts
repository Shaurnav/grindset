import type { NextApiRequest, NextApiResponse } from "next";
import { IColumns, IData, ITasks } from "@/components/Interfaces";
import supabase from '@/supabase'

const StatusOptions = {
  UNFINISHED: 'Unfinished',
  INPROGRESS: 'In progress',
  REVIEWING: 'Reviewing',
  DONE: 'Done',
};

// const trueData = {
// 	tasks: {
// 		"task-1": { id: "task-1", description: "Take out the garbage" },
// 		"task-2": { id: "task-2", description: "Watch my favorite show" },
// 		"task-3": { id: "task-3", description: "Charge my phone" },
// 		"task-4": { id: "task-4", description: "Cook dinner" },
// 	},
// 	columns: {
// 		"column-1": {
// 			id: "column-1",
// 			title: StatusOptions.UNFINISHED,
// 			taskIds: ["task-1", "task-2", "task-3", "task-4"],
// 		},
// 		"column-2": {
// 			id: "column-2",
// 			title: StatusOptions.INPROGRESS,
// 			taskIds: [],
// 		},
// 		"column-3": {
// 			id: "column-3",
// 			title: StatusOptions.REVIEWING,
// 			taskIds: [],
// 		},
//     "column-4": {
// 			id: "column-4",
// 			title: StatusOptions.DONE,
// 			taskIds: [],
// 		},
// 	},
//   columnOrder: ["column-1", "column-2", "column-3", "column-4"]
// };

const fetchData = async () => {
	let { data: tasks } = await supabase
	.from('tasks')
	.select('*');

	let {data: columns } = await supabase
	.from('columns')
	.select('*');

	let initialDataTasks: ITasks = {};
	let initalDataColumns: IColumns = {};
	const initialDataColumnOrder = ["column-1", "column-2", "column-3", "column-4"];

	tasks?.map(({id, description}) => { initialDataTasks[`task-${id}`] = {id: `task-${id}`, description}});
	columns?.map(({id, title, taskIds}) => { initalDataColumns[id] = {id, title, taskIds}});

	const initialData: IData = {
		tasks: initialDataTasks,
		columns: initalDataColumns,
		columnOrder: initialDataColumnOrder
	};

	return initialData;
};

const updateTasks = async (state: IData) => {
	let updatedDescriptions: {id: number, description: string}[] = [];

	for (const key in state.tasks) {
		const taskDBid = parseInt(state.tasks[key].id.split("task-")[1]);
		updatedDescriptions.push({ id: taskDBid, description: state.tasks[key].description});
	}

	//update tasks table
	const { data , error } = await supabase
	.from('tasks')
	.upsert(updatedDescriptions)
	.select();
	
	
	//update column.tasks column...
	const columnUpdatePromises = state.columnOrder.map(async (columnId) => {
		const { data, error } = await supabase
		.from('columns')
		.update({ taskIds: state.columns[columnId].taskIds})
		.eq('id', columnId)
		.select()

		return {data, error}
	});

	const updatedColumns = Promise.all(columnUpdatePromises);	
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'PUT') {
		await updateTasks(req.body);
	}  else if (req.method === 'POST') {
		const {data: addedTask, error: taskAddingError} = await supabase
		.from('tasks')
		.insert(req.body)
		.select();

		//if there was an error with added task
		if (addedTask === null) {
			return res.status(500).json(taskAddingError);
		}

		const addedTaskId = `task-${addedTask[0].id}`
		//unfinished column
		const {data: taskIdData, error: getColumnError} = await supabase
		.from('columns')
		.select('taskIds')
		.eq('id', 'column-1');

		const taskIds = taskIdData?.at(0)?.taskIds;

		if (taskIds === undefined) {
			return res.status(500).json(getColumnError);
		}

		taskIds.push(addedTaskId);
		//update said column...
		const {data: updatedColumn, error: columnUpdatingError} = await supabase
		.from('columns')
		.update({taskIds: taskIds})
		.eq('id', 'column-1')
		.select();

		if (updatedColumn === null) {
			return res.status(500).json(columnUpdatingError);
		} 
	}
	
	const data = await fetchData();

  return res.status(200).json(data);
}