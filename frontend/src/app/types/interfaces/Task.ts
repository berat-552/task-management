import Priority from "../enums/Priority";

export interface Task {
  _id: string;
  title: string;
  content: string;
  userId: string;
  completed: boolean;
  dueDate: Date;
  priority: Priority;
}
