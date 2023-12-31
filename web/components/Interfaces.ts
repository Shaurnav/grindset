export interface ITask {
	description: string;
	id: string;
}
export interface ITasks {
	[taskName: string]: ITask;
}
export interface IColumn {
	id: string;
	title: string;
	taskIds: string[];
}
export interface IColumns {
	[columnName: string]: IColumn;
}
export interface IData {
	tasks: ITasks;
	columns: IColumns;
	columnOrder: string[];
}