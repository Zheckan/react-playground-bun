'use client';

import { useMemo, useRef, useState } from 'react';

const MAX_INDEX = 45;

function expensiveFibonacci(index: number) {
  // Busy loop that makes the computation noticeably slow without memoization.
  const start = Date.now();
  while (Date.now() - start < 35) {
    Math.random();
  }

  if (index <= 1) return index;

  let previous = 0;
  let current = 1;
  for (let i = 2; i <= index; i += 1) {
    const next = previous + current;
    previous = current;
    current = next;
  }
  return current;
}

export default function UseMemoPage() {
  const [index, setIndex] = useState(32);
  const [note, setNote] = useState(
    'Typing here re-renders but should not re-run Fibonacci.',
  );
  const computeCountRef = useRef(0);
  const lastCountedIndexRef = useRef<number | null>(null);

  // This is the expensive computation
  /*
  if (lastCountedIndexRef.current !== index) {
    computeCountRef.current += 1;
    lastCountedIndexRef.current = index;
  }

  const fibonacciValue = expensiveFibonacci(index);
  */
  // This is the memoized computation
  const fibonacciValue = useMemo(() => {
    const value = expensiveFibonacci(index);

    if (lastCountedIndexRef.current !== index) {
      computeCountRef.current += 1;
      lastCountedIndexRef.current = index;
    }

    return value;
  }, [index]);

  const stats = useMemo(() => {
    const stringValue = fibonacciValue.toString();
    const digits = stringValue.length;
    const parity = fibonacciValue % 2 === 0 ? 'Even' : 'Odd';
    const digitSum = stringValue
      .split('')
      .reduce((sum, char) => sum + Number(char), 0);
    const lastDigit = stringValue.charAt(stringValue.length - 1);

    return {
      formatted: fibonacciValue.toLocaleString('en-US'),
      digits,
      parity,
      digitSum,
      lastDigit,
    };
  }, [fibonacciValue]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Expensive memo
          </p>
          <h1 className="text-4xl font-semibold">
            useMemo keeps heavy work cached
          </h1>
          <p className="text-sm text-white/70">
            Adjust the Fibonacci index to run the slow calculation. Then type in
            the note field: the component re-renders, yet the expensive function
            stays cached so the counter does not move.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">
              Fibonacci index <strong className="text-white">{index}</strong>
            </span>
            <input
              className="w-full accent-white"
              type="range"
              min={0}
              max={MAX_INDEX}
              value={index}
              onChange={(event) => setIndex(Number(event.target.value))}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">Unrelated state</span>
            <textarea
              className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/60"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
            />
            <span className="text-xs text-white/50">
              Every keystroke re-renders the page, but the memoized Fibonacci
              result remains cached.
            </span>
          </label>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Fibonacci #{index}
            </p>
            <p className="text-4xl font-semibold">{stats.formatted}</p>
            <dl className="grid grid-cols-2 gap-4 text-sm text-white/70">
              <div>
                <dt className="text-white/50">Digits</dt>
                <dd className="text-xl font-medium text-white">
                  {stats.digits}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Parity</dt>
                <dd className="text-xl font-medium text-white">
                  {stats.parity}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Digit sum</dt>
                <dd className="text-xl font-medium text-white">
                  {stats.digitSum}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Last digit</dt>
                <dd className="text-xl font-medium text-white">
                  {stats.lastDigit}
                </dd>
              </div>
            </dl>
          </article>

          <article className="space-y-3 rounded-3xl border border-white/15 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Expensive executions
            </p>
            <p className="text-5xl font-semibold">{computeCountRef.current}</p>
            <p className="text-sm text-white/70">
              The Fibonacci function only runs when <code>index</code> changes.
              Editing the note above re-renders the component but the memoized
              value keeps this counter steady.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
