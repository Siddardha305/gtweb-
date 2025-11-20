// app/error.tsx
"use client";

import { useEffect } from "react";
import { useError } from "./context/ErrorProvider";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  const { setHasError } = useError();

  useEffect(() => {
    // Notify layout/navbar that an error is active
    setHasError(true);
    // disable background scrolling while error overlay is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // restore
      setHasError(false);
      document.body.style.overflow = prevOverflow;
    };
  }, [setHasError]);

  return (
    <div
      role="alert"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
    >
      <div className="max-w-3xl w-full bg-black/70 backdrop-blur-md border border-white/6 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-start gap-6">
          <div className="text-6xl font-bold">⚠️</div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-white/70 mb-4">
              {error?.message || "An unexpected error occurred."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#1e5de2] to-[#05d5fe] text-white shadow"
              >
                Try again
              </button>

              <button
                onClick={() => location.reload()}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 text-white"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>

        <details className="mt-6 text-xs text-white/60">
          <summary>Debug info (expand)</summary>
          <pre className="whitespace-pre-wrap mt-2 text-xs">{String(error.stack || error.message)}</pre>
        </details>
      </div>
    </div>
  );
}
