"use client";
import React from "react";

export default function PlusThree() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <main>
      <h1 className="text-2xl font-bold text-center">{count}</h1>
      <button
        type="button"
        onClick={handleClick}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        +3
      </button>
    </main>
  );
}
