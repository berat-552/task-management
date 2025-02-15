import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import { isValidObjectId } from "../util/isValidObjectId";

//@desc Retrieve all tasks for user
//@route GET /api/v1/tasks/:id
//@access Private
const getTasks: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      throw new Error("Id not provided");
    }

    const tasks = await Task.find({ userId: id });

    if (!tasks) {
      res.status(404);
      throw new Error("Tasks not found");
    }

    res.json({ status: 200, quantity: tasks.length, tasks });
  }
);

//@desc Retrieve single task for user
//@route GET /api/v1/tasks/task/:id
//@access Private
const getTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const task = isValidObjectId(id) ? await Task.findById(id) : null;

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ status: 200, task });
  }
);

//@desc Retrieve a specified number of tasks for a user
//@route GET /api/v1/tasks/:id/:qty
//@access Private
const getTasksByQuantity: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const numberWanted = parseInt(req.params.qty);

    const tasks = await Task.find({ userId: id });

    if (!tasks.length) {
      res.status(404);
      throw new Error("Tasks not found");
    }

    if (numberWanted > tasks.length) {
      res.status(200).json({
        status: "Partial Content",
        message: `Requested ${numberWanted} tasks, but user has a total of ${tasks.length} tasks`,
        availableTasks: tasks,
      });
      return;
    }

    const quantityOfTasks = tasks.slice(0, numberWanted);

    res.json({ status: 200, quantity: numberWanted, quantityOfTasks });
  }
);

//@desc Search for tasks belonging to a user
//@route GET /api/v1/tasks/search/:id?q=exampleQuery
//@access Private
const searchTasks: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const searchQuery = req.query.q?.toString().trim();

    if (!searchQuery) {
      res.status(400);
      throw new Error("Please provide a search query");
    }

    const searchedTasks = await Task.find({
      userId: id,
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }, // case insensitive
        { content: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (!searchedTasks || searchedTasks.length === 0) {
      res.status(404);
      throw new Error(`No match for search query '${searchQuery}' found`);
    }

    res.json({ status: 200, searchQuery, searchedTasks });
  }
);

//@desc Create Task
//@route POST /api/v1/tasks
//@access Private
const createTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, completed, user_id, dueDate, priority } = req.body;

    if (typeof completed !== "boolean") {
      res.status(400);
      throw new Error(
        "Invalid value for property 'complete', please provide a boolean value"
      );
    }

    const task = await Task.create({
      userId: user_id,
      title,
      content,
      priority,
      completed,
      dueDate,
    });

    if (task) {
      res.json({ status: 201, message: "Task created successfully", task });
    } else {
      res.status(400);
      throw new Error("Invalid task data");
    }
  }
);

//@desc Update Task
//@route PUT /api/v1/tasks/:id
//@access Private
const updateTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // task id
    const id = req.params.id;

    const { title, content, completed, dueDate, priority } = req.body;

    const taskExists = isValidObjectId(id) ? await Task.findById(id) : null;

    if (!taskExists) {
      res.status(404);
      throw new Error("Task not found");
    }

    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        content,
        priority,
        completed,
        dueDate,
      },
      { new: true } // returns the updated document
    );
    res.json({ status: 200, updatedTask: task });
  }
);

//@desc Delete Task
//@route DELETE /api/v1/tasks/:id
//@access Private
const deleteTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const taskToDelete = await Task.findById(id);

    if (!taskToDelete) {
      res.status(400);
      throw new Error("Task to delete does not exist");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(500);
      throw new Error(`Error deleting task with id: ${id}`);
    }

    res.json({ status: 200, message: `Deleted task with id: ${id}` });
  }
);

export {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByQuantity,
  searchTasks,
};
