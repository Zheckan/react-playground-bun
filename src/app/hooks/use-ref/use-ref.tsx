'use client';

import { useEffect, useRef, useState } from 'react';

const MIN_SCORE = 0;
const MAX_SCORE = 100;

export default function UseRefPage() {
  const [nickname, setNickname] = useState('');
  const [score, setScore] = useState(65);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousScoreRef = useRef<number | null>(null);
  const peakScoreRef = useRef(score);

  if (score > peakScoreRef.current) {
    peakScoreRef.current = score;
  }

  useEffect(() => {
    previousScoreRef.current = score;
  }, [score]);

  const previousScore = previousScoreRef.current;
  const changeFromPrevious = previousScore === null ? 0 : score - previousScore;

  const handleFocusNickname = () => {
    inputRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Core hook</p>
          <h1 className="text-4xl font-semibold">useRef keeps mutable values around renders</h1>
          <p className="text-sm text-white/70">
            This page shows the two most common reasons to reach for refs: reading a DOM element directly and
            storing data that updates without causing a re-render loop.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-white/50">DOM node reference</p>
            <p className="text-sm text-white/70">
              The button grabs <code>inputRef.current</code> and calls <code>focus()</code> on the actual input node—no extra state needed.
            </p>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Nickname
              <input
                ref={inputRef}
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Type and then blur to test..."
                className="rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-base text-white outline-none transition focus:border-white/60"
              />
            </label>
            <div className="flex flex-wrap gap-3 text-sm">
              <button
                type="button"
                onClick={handleFocusNickname}
                className="rounded-full bg-white px-5 py-2 text-black"
              >
                Focus input
              </button>
              <span className="text-white/50">
                Current value: {nickname.trim() === '' ? '—' : nickname}
              </span>
            </div>
          </article>

          <article className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-white/50">Mutable value reference</p>
            <p className="text-sm text-white/70">
              The slider writes to state, but refs remember the previous choice and the all-time peak without triggering renders.
            </p>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Favorite score: <strong className="text-white text-xl">{score}</strong>
              <input
                type="range"
                min={MIN_SCORE}
                max={MAX_SCORE}
                value={score}
                onChange={(event) => setScore(Number(event.target.value))}
                className="w-full accent-white"
              />
            </label>
            <dl className="space-y-2 text-sm text-white/70">
              <div className="flex items-center justify-between">
                <dt className="text-white/50">Previous selection</dt>
                <dd className="font-mono text-lg text-white">
                  {previousScore === null ? '—' : previousScore}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-white/50">Change</dt>
                <dd className="font-mono text-lg text-white">{changeFromPrevious >= 0 ? '+' : ''}{changeFromPrevious}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-white/50">Peak this session</dt>
                <dd className="font-mono text-lg text-white">{peakScoreRef.current}</dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-wide text-white/50 mb-3">Takeaways</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Refs give you the same object across renders, perfect for storing DOM nodes, timers, or any mutable value.</li>
            <li>Reading or writing <code>ref.current</code> does not re-render the component, so it is safe for frequently changing data.</li>
            <li>Combine refs with state: let state drive the UI, and let refs keep extra context that should not trigger updates.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
