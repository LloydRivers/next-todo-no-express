import { sendErrorResponse } from "@/utils/errorHandler.js";
import { connectToDatabase } from "@db/db.js";
import { Todo } from "@models/Todo.js";

// Handler to get by id.
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const todo_by_id = await Todo.findById(id);
    return new Response(JSON.stringify(todo_by_id), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return sendErrorResponse("Error retrieving todos");
  }
};

// Handler to update by id.
export const PUT = async (request, { params }) => {
  try {
    await connectToDatabase();
    const { id } = params;

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

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    const { id } = params;

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
    return sendErrorResponse("Error deleting todo");
  }
};
