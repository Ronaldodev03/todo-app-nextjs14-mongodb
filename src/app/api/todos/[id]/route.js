import Todo from "@/app/models/todo";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const body = await req.json();
    const todoData = body.newTodo;
    const updateTodoData = await Todo.findByIdAndUpdate(id, {
      ...todoData,
    });

    return NextResponse.json({ message: "Todo Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await Todo.findByIdAndDelete(params.id); // this is a method from mongoose
    return NextResponse.json({ message: "Todo Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
