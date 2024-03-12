"use client";

import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* same structure than the schema */
const startingTodo = {
  description: "",
  active: false,
};

const Input = () => {
  const [formData, setFormData] = useState(startingTodo);

  const router = useRouter();

  /* handleChange of the input */
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Asigna isAutoFilled a true si el input ha sido llenado
    if (value) setIsAutoFilled(true);
  };

  /* submit */
  const handleKeyDown = async (e) => {
    // Verifica si la tecla presionada es Enter y el input no está vacío
    if (e.key === "Enter" && formData.description.trim()) {
      const res = await fetch(
        "https://todo-nextjs14-mongodb.vercel.app/api/todos",
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
  };

  return (
    <div className=" relative mb-4 shadow-lg ">
      {/* circle */}
      <div className="absolute text-3xl text-gray-300 dark:text-gray-500 rounded-full left-6 top-3">
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
  );
};

export default Input;
