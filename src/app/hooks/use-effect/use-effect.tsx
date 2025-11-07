'use client';

import { useEffect, useState } from 'react';

const MIN_DELAY_MS = 250;
const MAX_DELAY_MS = 1500;
const MIN_TARGET = 5;
const MAX_TARGET = 30;

export default function UseEffectPage() {
  const [isCounting, setIsCounting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [target, setTarget] = useState(12);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    if (!isCounting) return undefined;

    const intervalId = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, delay);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isCounting, delay]);

  useEffect(() => {
    if (!isCounting) return;
    if (seconds >= target) {
      setIsCounting(false);
      setSessionsCompleted((value) => value + 1);
    }
  }, [seconds, target, isCounting]);

  const toggleCounting = () => {
    if (seconds >= target) {
      setSeconds(0);
    }
    setIsCounting((value) => !value);
  };

  const reset = () => {
    setIsCounting(false);
    setSeconds(0);
    setSessionsCompleted(0);
  };

  const status = isCounting
    ? 'Counting...'
    : seconds >= target
      ? 'Session complete'
      : 'Paused';

  const progress = Math.min(100, Math.round((seconds / target) * 100));

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Side effects</p>
          <h1 className="text-4xl font-semibold">useEffect wires logic to the browser</h1>
          <p className="text-sm text-white/70">
            Starting the timer registers an interval; changing the delay or pausing tears it down.
            The hook keeps your UI in sync with real time while the cleanup prevents runaway timers.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Timer</p>
            <p className="text-sm text-white/60">{status}</p>
            <p className="font-mono text-7xl font-semibold">{seconds}s</p>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/60">
              Goal: <strong className="text-white">{target} seconds</strong> · Delay:{' '}
              <strong className="text-white">{delay} ms</strong>
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleCounting}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isCounting ? 'bg-rose-400 text-black hover:bg-rose-300' : 'bg-emerald-400 text-black hover:bg-emerald-300'
                }`}
              >
                {isCounting ? 'Pause interval' : 'Start interval'}
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/70"
              >
                Reset
              </button>
            </div>
          </article>

          <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Effect controls</p>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Delay per tick ({delay} ms)
              <input
                type="range"
                min={MIN_DELAY_MS}
                max={MAX_DELAY_MS}
                step={50}
                value={delay}
                onChange={(event) => setDelay(Number(event.target.value))}
                className="w-full accent-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Stop after ({target} sec)
              <input
                type="range"
                min={MIN_TARGET}
                max={MAX_TARGET}
                value={target}
                onChange={(event) => setTarget(Number(event.target.value))}
                className="w-full accent-white"
              />
            </label>
            <p className="text-xs text-white/60">
              Toggling the controls forces the effect to re-run, which clears the old interval and starts a
              new one with the latest configuration. That cleanup step prevents multiple timers from stacking up.
            </p>
          </article>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Effect takeaways</p>
          <dl className="space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <dt className="text-white/60">Sessions completed</dt>
              <dd className="font-mono text-2xl text-emerald-300">{sessionsCompleted}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/60">Status</dt>
              <dd className="font-mono text-2xl text-white">{status}</dd>
            </div>
          </dl>
          <p className="text-xs text-white/60">
            This pattern covers the two halves of <code>useEffect</code>: run some imperative work when dependencies
            change, and return a cleanup so the previous work stops before the next run. Timers, subscriptions, and
            event listeners all follow this rhythm.
          </p>
        </section>
      </div>
    </main>
  );
}
