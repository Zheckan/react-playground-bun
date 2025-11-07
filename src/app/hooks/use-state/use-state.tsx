'use client';

import { useState } from 'react';

const STEP_PRESETS = [1, 5, 10];
const MIN_GOAL = 5;
const MAX_GOAL = 40;

export default function UseStatePage() {
  const [label, setLabel] = useState('Focus streak');
  const [count, setCount] = useState(12);
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(20);

  const progress = Math.min(100, Math.round((count / goal) * 100));

  const increment = () => setCount((value) => value + step);
  const decrement = () => setCount((value) => Math.max(0, value - step));
  const reset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Stateful basics</p>
          <h1 className="text-4xl font-semibold">useState drives the interactive bits</h1>
          <p className="text-sm text-white/70">
            Change the counter label, tweak the step, and move the goal slider.
            Every control writes to its own piece of state and React re-renders the UI immediately.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Tracker</p>
            <div className="space-y-1">
              <p className="text-sm text-white/60">Label</p>
              <h2 className="text-3xl font-semibold">{label}</h2>
            </div>
            <p className="font-mono text-7xl font-semibold">{count}</p>
            <p className="text-sm text-white/60">
              Goal: <strong className="text-white">{goal}</strong> · Progress: {progress}%
            </p>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={decrement}
                className="flex-1 rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/70"
              >
                − Step
              </button>
              <button
                type="button"
                onClick={increment}
                className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
              >
                + Step
              </button>
            </div>
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-2xl border border-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50"
            >
              Reset state
            </button>
          </article>

          <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">State controls</p>
            <div className="space-y-4 text-sm text-white/70">
              <label className="flex flex-col gap-2">
                Rename tracker
                <input
                  type="text"
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                  className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-base text-white outline-none transition focus:border-white/60"
                />
              </label>

              <div className="space-y-2">
                <span>Step presets</span>
                <div className="flex flex-wrap gap-2">
                  {STEP_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setStep(preset)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        preset === step ? 'bg-white text-black' : 'border border-white/30 text-white/70'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  Current step
                  <span className="text-base font-semibold tracking-normal text-white">{step}</span>
                </div>
              </div>

              <label className="flex flex-col gap-2">
                Goal ({goal})
                <input
                  type="range"
                  min={MIN_GOAL}
                  max={MAX_GOAL}
                  value={goal}
                  onChange={(event) => setGoal(Number(event.target.value))}
                  className="w-full accent-white"
                />
              </label>
            </div>
            <p className="text-xs text-white/60">
              Each value above is stored with <code>useState</code>. Updating any of them triggers exactly one render,
              and React diffing updates only the pieces of UI that changed.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
