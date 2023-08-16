import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'
import { IColumns, IData, ITasks } from "@/components/Interfaces";
const supabaseUrl = 'https://ytxaxnjhovynzpvqqicj.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const StatusOptions = {
  UNFINISHED: 'Unfinished',
  INPROGRESS: 'In progress',
  REVIEWING: 'Reviewing',
  DONE: 'Done',
};

// const initialData = {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { data: tasks } = await supabase
	.from('tasks')
	.select('*');

	let {data: columns } = await supabase
	.from('columns')
	.select('*');

	let initialDataTasks: ITasks = {};
	let initalDataColumns: IColumns = {};
	const initialDataColumnOrder = ["column-1", "column-2", "column-3", "column-4"];

	tasks?.map(({id, description}) => { initialDataTasks[id] = {id, description}});
	columns?.map(({id, title, taskIds}) => { initalDataColumns[id] = {id, title, taskIds}});

	const initialData: IData = {
		tasks: initialDataTasks,
		columns: initalDataColumns,
		columnOrder: initialDataColumnOrder
	};

  return res.status(200).json(initialData);
}