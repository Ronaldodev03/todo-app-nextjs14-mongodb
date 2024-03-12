/* imported from models */
import Todo from "@/app/models/todo";

import { NextResponse } from "next/server";

/* reorder */
export async function POST(req) {
  try {
    const body = await req.json();
    const todosData = body.list.reverse();

//buen approach solo si los objetos son ligeros y son pocos
    await Todo.deleteMany();
    await Todo.insertMany(todosData);

    return NextResponse.json({ message: "Todo ordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
