'use client';

import { memo, useCallback, useRef, useState } from 'react';

const MIN_SCORE = 0;
const MAX_SCORE = 120;

type ActionButtonProps = {
  title: string;
  description: string;
  onAction: () => void;
  variant: 'stable' | 'inline';
};

const ActionButton = memo(function ActionButton({
  title,
  description,
  onAction,
  variant,
}: ActionButtonProps) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const accentClass =
    variant === 'stable'
      ? 'bg-emerald-400 text-black hover:bg-emerald-300'
      : 'bg-rose-400 text-black hover:bg-rose-300';

  const tagClass =
    variant === 'stable'
      ? 'text-emerald-300 bg-emerald-500/10'
      : 'text-rose-300 bg-rose-500/10';

  return (
    <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
        <span className={`rounded-full px-3 py-1 ${tagClass}`}>
          {variant === 'stable' ? 'useCallback' : 'inline handler'}
        </span>
        <span className="text-white/50">
          renders: <strong className="text-white">{renderCountRef.current}</strong>
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${accentClass}`}
      >
        Add step to score
      </button>
    </article>
  );
});

export default function UseCallbackPage() {
  const [score, setScore] = useState(42);
  const [step, setStep] = useState(4);
  const [note, setNote] = useState('Type here to force re-renders.');

  const stableIncrement = useCallback(() => {
    setScore((value) => Math.min(MAX_SCORE, value + step));
  }, [step]);

  const inlineIncrement = () => {
    setScore((value) => Math.min(MAX_SCORE, value + step));
  };

  const decrement = () => {
    setScore((value) => Math.max(MIN_SCORE, value - step));
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Event memoization
          </p>
          <h1 className="text-4xl font-semibold">useCallback keeps handlers stable</h1>
          <p className="text-sm text-white/70">
            The left button receives a function wrapped in <code>useCallback</code>, so a memoized child
            does not re-render when unrelated state changes. The right button gets an inline function and
            re-renders every time.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Scoreboard</p>
            <p className="text-6xl font-semibold">{score}</p>
            <p className="text-sm text-white/60">
              Step size: <strong className="text-white">{step}</strong>
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={decrement}
                className="flex-1 rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/70"
              >
                Subtract step
              </button>
              <button
                type="button"
                onClick={stableIncrement}
                className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
              >
                Add step
              </button>
            </div>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Adjust step
              <input
                type="range"
                min={1}
                max={10}
                value={step}
                onChange={(event) => setStep(Number(event.target.value))}
                className="w-full accent-white"
              />
            </label>
          </article>

          <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Unrelated edits</p>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Notes
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={5}
                className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/60"
              />
            </label>
            <p className="text-xs text-white/60">
              Every keystroke re-renders the parent component. Only the child that receives an inline
              function notices, because the prop reference changes on each render.
            </p>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <ActionButton
            variant="stable"
            title="Stable handler"
            description="Wrapped in useCallback, so React.memo sees the same function reference until the step slider changes."
            onAction={stableIncrement}
          />
          <ActionButton
            variant="inline"
            title="Inline handler"
            description="Declared inline, so a new function is created every render and the memoized child keeps re-rendering."
            onAction={inlineIncrement}
          />
        </section>
      </div>
    </main>
  );
}
