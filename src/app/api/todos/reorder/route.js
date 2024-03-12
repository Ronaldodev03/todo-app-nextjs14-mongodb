/* imported from models */
import Todo from "@/app/models/todo";

import { NextResponse } from "next/server";

/* reorder */
export async function POST(req) {
  try {
    const body = await req.json();
    const todosData = body.list.reverse();

    /*  // Obtener los todos actuales
    const currentTodos = await Todo.find();

    console.log("current:", currentTodos[0]._id.toString());
    console.log(todosData);

    // Asumiendo que currentTodos y todosData tienen la misma longitud
    for (let i = 0; i < currentTodos.length; i++) {
      const currentTodo = currentTodos[i];
      const newTodoData = todosData[i];

      // Comparar el _id de cada objeto
      if (currentTodo._id.toString() !== newTodoData._id) {
        console.log(newTodoData);

        const updateData = {
          _id: newTodoData._id,
          description: newTodoData.description,
          active: newTodoData.active,
        };

        console.log(updateData);
        console.log(currentTodo._id.toString());

        await Todo.findByIdAndUpdate(currentTodo._id, {
          ...updateData,
        });
      }
    } */

    await Todo.deleteMany();
    await Todo.insertMany(todosData);

    return NextResponse.json({ message: "Todo ordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
