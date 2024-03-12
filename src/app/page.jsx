import { Suspense } from "react";
import Input from "./components/Input";
import TodoListWrapper from "./components/TodoListWrapper";
import Loading from "./components/Loading";

export default function Home() {
  return (
    <div>
      {/* input form */}
      <Input />

      {/* todoList + controllers */}
      <Suspense fallback={<Loading />}>
        <TodoListWrapper />
      </Suspense>
    </div>
  );
}
