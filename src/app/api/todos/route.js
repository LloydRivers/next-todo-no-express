import { getSearchParam } from "@/utils/getSearchParam.js";
import { sendErrorResponse } from "@/utils/errorHandler.js";
import { connectToDatabase } from "@db/db.js";
import { Todo } from "@models/Todo.js";

export const GET = async (request) => {
  try {
    await connectToDatabase();
    const id = getSearchParam(request);
    if (!id) {
      const todos = await Todo.find();
      return new Response(JSON.stringify(todos), {
        headers: { "content-type": "application/json" },
      });
    } else {
      const todo = await Todo.findById(id);
      if (!todo) {
        return new Response("Not found", { status: 404 });
      }
      return new Response(JSON.stringify(todo), {
        headers: { "content-type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return sendErrorResponse("Error retrieving todos");
  }
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { task, description, priority, completed } = await request.json();
    const newTodo = new Todo({
      task,
      description,
      priority,
      completed,
    });

    const createdTodo = await newTodo.save();

    return new Response(JSON.stringify(createdTodo), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving todo:", error.message);
    return new Response(
      "Error saving todo. I am expecting a boolean and din't get one",
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    await connectToDatabase();
    const id = getSearchParam(request);
    const { task, description, priority, completed } = await request.json();

    const todo = await Todo.findById(id);

    if (!todo) {
      return new Response("Not found", { status: 404 });
    }

    todo.task = task;
    todo.description = description;
    todo.priority = priority;
    todo.completed = completed;

    const updatedTodo = await todo.save();

    return new Response(JSON.stringify(updatedTodo), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating todo:", error);

    return new Response("Error updating todo", { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    await connectToDatabase();
    const id = getSearchParam(request);

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return new Response("Not found", { status: 404 });
    }

    const todos = await Todo.find();

    return new Response(JSON.stringify(todos), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return sendErrorResponse("Error deleting todo", 500);
  }
};
