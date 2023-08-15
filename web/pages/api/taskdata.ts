import type { NextApiRequest, NextApiResponse } from "next";

const StatusOptions = {
  UNFINISHED: 'Unfinished',
  INPROGRESS: 'In progress',
  REVIEWING: 'Reviewing',
  DONE: 'Done',
};

const initialData = {
	tasks: {
		"task-1": { id: "task-1", description: "Take out the garbage" },
		"task-2": { id: "task-2", description: "Watch my favorite show" },
		"task-3": { id: "task-3", description: "Charge my phone" },
		"task-4": { id: "task-4", description: "Cook dinner" },
	},
	columns: {
		"column-1": {
			id: "column-1",
			title: StatusOptions.UNFINISHED,
			taskIds: ["task-1", "task-2", "task-3", "task-4"],
		},
		"column-2": {
			id: "column-2",
			title: StatusOptions.INPROGRESS,
			taskIds: [],
		},
		"column-3": {
			id: "column-3",
			title: StatusOptions.REVIEWING,
			taskIds: [],
		},
    "column-4": {
			id: "column-4",
			title: StatusOptions.DONE,
			taskIds: [],
		},
	},
  columnOrder: ["column-1", "column-2", "column-3", "column-4"]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(initialData);
}