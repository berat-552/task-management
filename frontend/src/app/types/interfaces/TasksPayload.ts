import { Task } from "./Task";

export interface TasksPayload {
  tasks: Task[];
  status: number;
  quantity: number;
}
