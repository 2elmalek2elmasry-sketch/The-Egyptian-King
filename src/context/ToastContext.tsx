import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Toast { id: number; message: string; type: "success" | "error" | "info"; }
interface ToastContextValue { toasts: Toast[]; showToast: (message: string, type?: Toast["type"]) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);
let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 3500);
  }, []);
  return <ToastContext.Provider value={{ toasts, showToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
