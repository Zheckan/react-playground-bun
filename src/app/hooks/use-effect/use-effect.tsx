'use client';
import { useEffect, useState } from 'react';

export default function UseEffectPage() {
  const [isCount, setIsCount] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isCount) return;

    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(intervalId); // runs only before this effect is called again
  }, [isCount]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Count: {count}</p>
      <button
        type="button"
        onClick={() => setIsCount(!isCount)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
        Start Counting
      </button>
    </div>
  );
}
