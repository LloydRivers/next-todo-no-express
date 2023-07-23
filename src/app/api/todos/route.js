import { getSearchParam } from "@/utils/getSearchParam.js";
import { todos } from "@data/data.js";
export const GET = async (request) => {
  const id = getSearchParam(request);
  if (!id) {
    return new Response(JSON.stringify(todos), {
      headers: { "content-type": "application/json" },
    });
  } else {
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(todo), {
      headers: { "content-type": "application/json" },
    });
  }
};

export const POST = async (request) => {
  const { task, description, priority, completed } = await request.json();
  const newId = todos.length + 1;
  const newTodo = { id: newId, task, description, priority, completed };

  todos.push(newTodo);
  return new Response(JSON.stringify(todos), {
    headers: { "content-type": "application/json" },
  });
};

export const PUT = async (request) => {
  const id = getSearchParam(request);
  const { task, description, priority, completed } = await request.json();
  const todo = todos.find((todo) => todo.id === Number(id));
  console.log(id);

  if (!todo) {
    return new Response("Not found", { status: 404 });
  }

  todo.task = task;
  todo.description = description;
  todo.priority = priority;
  todo.completed = completed;

  return new Response(JSON.stringify(todo), {
    headers: { "content-type": "application/json" },
  });
};

export const DELETE = async (request) => {
  const id = getSearchParam(request);
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (todoIndex === -1) {
    return new Response("Not found", { status: 404 });
  }

  todos.splice(todoIndex, 1);

  return new Response(JSON.stringify(todos), {
    headers: { "content-type": "application/json" },
  });
};
