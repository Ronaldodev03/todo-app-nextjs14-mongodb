import React from "react";
import TodoList from "./TodoList";

/* getting the todos */
const getTodos = async () => {
  try {
    const res = await fetch(
      "https:https://todo-app-nextjs14-mongodb-4z1xqftlq-ronaldodev03.vercel.app/api/todos",
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
