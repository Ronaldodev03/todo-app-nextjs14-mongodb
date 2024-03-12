"use client";
import { IoMdClose } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Reorder } from "framer-motion";

const TodoList = ({ todo }) => {
  const [list, setList] = useState([]); // reversed data from db
  const [activeTodo, setActiveTodo] = useState("");
  const [filter, setFilter] = useState("all"); // estado para el filtro

  const data = todo.todos; // data from db
  const router = useRouter();

  /* filter of the controls */
  const filteredTodos = () => {
    switch (filter) {
      case "active":
        return list.filter((todo) => !todo.active);
      case "completed":
        return list.filter((todo) => todo.active);
      default:
        return list;
    }
  };

  /* delete many */
  const deleteCompletedTodo = async () => {
    const res = await fetch(
      `https://todo-app-nextjs14-mongodb.vercel.app/api/todos`,

      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  /* todos activos */
  useEffect(() => {
    if (!list?.length) return;
    const newList = list?.filter((item) => item.active === false);
    setActiveTodo(newList);
  }, [list]);

  /* for rendering the array of data coming from db in reverse w/o having hydration error */
  useEffect(() => {
    if (Array.isArray(data)) {
      setList([...data].reverse());
    }
  }, [data]);

  /* toglgle completed */
  const toggleCheck = async (id) => {
    const newTodo = list.find((item) => item._id === id);

    if (newTodo) {
      newTodo.active = !newTodo.active;
    }

    const res = await fetch(
      `https://todo-app-nextjs14-mongodb.vercel.app/api/todos/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ newTodo }),
        "content-type": "application/json",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  /* delete one*/
  const deleteTodo = async (id) => {
    const res = await fetch(
      `https://todo-app-nextjs14-mongodb.vercel.app/api/todos/${id}`,

      { method: "DELETE" }
    );
    if (res.ok) {
      router.refresh();
    }
  };

  /* send reorder list to db */
  const saveOrder = async () => {
    try {
      const res = await fetch(
        "https://todo-app-nextjs14-mongodb.vercel.app/api/todos/reorder",
        {
          method: "POST",
          body: JSON.stringify({ list }),
          "Content-Type": "application/json",
        }
      );

      if (!res.ok) {
        console.log("fail to reorder");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="shadow-lg rounded-md">
        {!filteredTodos() ? (
          /* if no Todos */
          <div className=" border-b dark:border-b-[#393a4b]">
            <div
              className={`w-full py-4 text-center bg-white text-gray-500 dark:bg-[#25273d] rounded-t-md`}
            >
              No Todos
            </div>
          </div>
        ) : (
          /* if Todos */
          <Reorder.Group
            values={list}
            onReorder={setList}
            className="transition-all"
          >
            {filteredTodos().map((todo, index) => {
              return (
                <Reorder.Item key={todo._id} value={todo} onDragEnd={saveOrder}>
                  <div className=" group relative border-b dark:border-b-[#393a4b] ">
                    {/* circle */}
                    <div
                      onClick={() => toggleCheck(todo._id)}
                      className={`
                ${
                  !todo.active
                    ? "text-gray-300 bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:text-gray-500 dark:bg-gradient-to-r dark:from-[#25273e] dark:to-[#25273e] hover:text-blue-500 dark:hover:text-blue-500"
                    : ""
                } 
                absolute bg-gradient-to-r from-[#57ddff] to-[#3a7bfd]  dark:text-[#25273d]  text-3xl rounded-full left-6 top-3 cursor-pointer transition-all
             `}
                    >
                      <CiCircleCheck
                        className={`scale-125 ${todo.active && "scale-150"} `}
                      />
                    </div>

                    {/* text */}
                    <div
                      className={`pl-[4.5rem] w-full py-4 bg-white dark:bg-[#25273d] text-black dark:text-[#c8cbe7] cursor-pointer transition-all
           ${index === 0 && " rounded-t-md"}
           ${todo.active && " line-through text-gray-300 dark:text-gray-700 "} 
            
            `}
                    >
                      {todo.description}
                    </div>

                    {/* x for removing */}
                    <div
                      onClick={() => deleteTodo(todo._id)}
                      className={`absolute right-6 top-3 cursor-pointer hidden group-hover:block transition-all text-gray-300 dark:text-gray-700 z-20 `}
                    >
                      <IoMdClose fontSize={30} fontWeight={100} />
                    </div>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}

        {/* constrols */}
        <div
          className={`dark:bg-[#25273d] px-[1.5rem] w-full py-4 bg-white rounded-b-md flex justify-between text-gray-400`}
        >
          <p>
            {activeTodo?.length} items {activeTodo?.length ? "left" : ""}
          </p>

          {/* desktop */}
          <div className=" gap-3 font-bold hidden sm:flex ">
            <p
              onClick={() => setFilter("all")}
              className={` cursor-pointer hover:text-gray-600 dark:hover:text-[#c8cbe7] transition-all  ${
                filter === "all" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              All
            </p>
            <p
              onClick={() => setFilter("active")}
              className={` cursor-pointer hover:text-gray-600 dark:hover:text-[#c8cbe7] transition-all  ${
                filter === "active" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Active
            </p>
            <p
              onClick={() => setFilter("completed")}
              className={` cursor-pointer hover:text-gray-600 dark:hover:text-[#c8cbe7] transition-all  ${
                filter === "completed" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Completed
            </p>
          </div>
          <p
            onClick={deleteCompletedTodo}
            className=" cursor-pointer hover:text-gray-700 dark:hover:text-[#c8cbe7] transition-all"
          >
            Clear completed
          </p>
        </div>
      </div>

      {/* mobile */}
      <div
        className={`  flex gap-3 sm:hidden px-[1.5rem] w-full py-4 bg-white dark:bg-[#25273d] rounded-md justify-between text-gray-400  font-bold shadow-lg mt-4`}
      >
        <p
          onClick={() => setFilter("all")}
          className={` cursor-pointer hover:text-gray-600 transition-all  ${
            filter === "all" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          All
        </p>
        <p
          onClick={() => setFilter("active")}
          className={` cursor-pointer hover:text-gray-600 transition-all  ${
            filter === "active" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Active
        </p>
        <p
          onClick={() => setFilter("completed")}
          className={` cursor-pointer hover:text-gray-600 transition-all  ${
            filter === "completed" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Completed
        </p>
      </div>
    </>
  );
};

export default TodoList;
