/* this is a route of the backend => api/todo */

/* imported from models */
import Todo from "@/app/models/todo";

import { NextResponse } from "next/server";

/* for creating a new todo*/
/* data will come from a form the input "Create a new todo..." */
export async function POST(req) {
  try {
    const body = await req.json();
    const todoData = body.formData;
    await Todo.create(todoData); // this is a method from mongoose
    return NextResponse.json({ message: "Todo Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* for getting all the todos*/
export async function GET() {
  try {
    const todos = await Todo.find(); // this is a method from mongoose
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* delete many */
export const DELETE = async (req) => {
  try {
    await Todo.deleteMany({
      active: true,
    });

    return NextResponse.json({ message: "Todo List Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
