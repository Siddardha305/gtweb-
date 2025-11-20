// app/context/ErrorProvider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type ErrorContextType = {
  hasError: boolean;
  setHasError: (v: boolean) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  return (
    <ErrorContext.Provider value={{ hasError, setHasError }}>
      {children}
    </ErrorContext.Provider>
  );
}

// Hook for consumers
export function useError() {
  const ctx = useContext(ErrorContext);
  if (!ctx) {
    throw new Error("useError must be used within ErrorProvider");
  }
  return ctx;
}
