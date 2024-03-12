import React from "react";
import TodoList from "./TodoList";

/* getting the todos */
const getTodos = async () => {
  try {
    const res = await fetch(
      "https://todo-app-nextjs14-mongodb.vercel.app/api/todos",
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Failed to get todos", error);
  }
};

const TodoListWrapper = async () => {
  const todos = await getTodos();

  return <TodoList todo={todos} />;
};

export default TodoListWrapper;
