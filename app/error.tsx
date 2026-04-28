"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-muted">Something broke</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          We hit an error.
        </h1>
        <p className="mt-2 text-sm text-muted">
          Try refreshing — most things are still working in the background.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
