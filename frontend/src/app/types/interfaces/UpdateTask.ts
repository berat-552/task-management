import Priority from "../enums/Priority";

export interface UpdateTask {
  title: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  priority: Priority;
}
