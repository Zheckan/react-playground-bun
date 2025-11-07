'use client';
import { useState } from 'react';

export function UseStatePage() {
  const [number, setNumber] = useState(() => createRandomNumber());

  function createRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Number: {number}</p>
      <button
        type="button"
        onClick={() => setNumber(createRandomNumber())}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Increment
      </button>
    </div>
  );
}
