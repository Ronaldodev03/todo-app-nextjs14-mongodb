"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";

export default function List() {
  const [items, setItems] = useState([0, 1, 2, 3]);
  const [order, setOrder] = useState(items);

  const handleDragEnd = (event, info) => {
    console.log("fire");
    // Actualiza el estado con el nuevo orden solo cuando el usuario suelta el elemento
    setItems(order);
  };

  const handleDragStart = (index) => {
    console.log("fire");

    // Guarda el orden actual cuando el usuario comienza a arrastrar
    setOrder(items);
  };

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="flex flex-col text-center gap-1"
    >
      {items.map((item, index) => (
        <Reorder.Item
          onDragStart={(e, info) => handleDragStart(info.index)}
          onDragEnd={handleDragEnd}
          key={item}
          value={item}
          index={index}
          className="bg-black p-2"
        >
          <div>{item}</div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
