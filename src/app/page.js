"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "../compoments/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
    };
    getTodos();
  }, []);

  const handleTodoToggle = (id) => {
    console.log(`Toggling todo with id ${id}`);
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <main>
      <div className="flex items-center justify-center w-screen h-screen font-medium">
        <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
            <div className="flex items-center mb-6">
              <svg
                className="h-8 w-8 text-indigo-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <h4 className="font-semibold ml-3 text-lg">
                The world needs another todo app
              </h4>
            </div>
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  id={todo._id}
                  task={todo.task}
                  completed={todo.completed}
                  onToggle={handleTodoToggle}
                />
              ))}
            </div>
            <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
              <svg
                className="w-5 h-5 text-gray-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
                type="text"
                placeholder="add a new task"
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
