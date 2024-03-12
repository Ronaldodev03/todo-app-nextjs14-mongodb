"use client";

import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

/* same structure than the schema */
const startingTodo = {
  description: "",
  active: false,
};

const Input = () => {
  const [formData, setFormData] = useState(startingTodo);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  /* handleChange of the input */
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* submit */
  const handleKeyDown = async (e) => {
    // Verifica si la tecla presionada es Enter y el input no está vacío
    if (e.key === "Enter" && formData.description.trim()) {
      const res = await fetch(
        "https://todo-app-nextjs14-mongodb.vercel.app/api/todos",
        {
          method: "POST",
          body: JSON.stringify({ formData }),
          "content-type": "application/json",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create Todo");
      }
      setFormData(startingTodo);
      router.refresh();
    }
    if (e.key === "Enter" && !formData.description.trim()) {
      setOpen(true);
    }
  };

  /* submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.trim()) {
      const res = await fetch(
        "https://todo-app-nextjs14-mongodb.vercel.app/api/todos",
        {
          method: "POST",
          body: JSON.stringify({ formData }),
          "content-type": "application/json",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create Todo");
      }
      setFormData(startingTodo);
      router.refresh();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div className=" relative mb-4 shadow-lg ">
        {/* circle */}
        <div
          onClick={handleSubmit}
          className="absolute text-3xl text-gray-300 dark:text-gray-500 rounded-full cursor-pointer left-6 top-3 hover:text-blue-500 dark:hover:text-blue-500"
        >
          <CiCirclePlus className=" scale-125 " />
        </div>

        {/* input */}
        <input
          value={formData.description}
          name="description"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Create a new todo..."
          className=" dark:bg-[#25273d] pl-[4.5rem] w-full py-4 rounded-md text-black dark:text-[#c8cbe7]  outline-none "
        />
      </div>

      {/* modal */}
      <Modal open={open}>
        <p className=" text-center pb-6 font-bold text-black dark:text-[#c8cbe7] uppercase text-xl">
          Invalid input
        </p>
        <button
          className="text-white font-semibold px-10 rounded-md py-2 bg-gradient-to-r from-[#57ddff] to-[#3a7bfd]  mx-auto   transition-all duration-200"
          onClick={() => setOpen(false)}
        >
          Go Back
        </button>
      </Modal>
    </>
  );
};

export default Input;
