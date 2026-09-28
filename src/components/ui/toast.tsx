import * as ToastPrimitive from '@radix-ui/react-toast'
import { cn } from '@/lib/cn'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type ToastItem = { id: string; title: string }

const ToastCtx = createContext<(title: string) => void>(() => {})

export function useToast() {
  return useContext(ToastCtx)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((title: string) => {
    const id = String(Date.now())
    setItems((prev) => [...prev, { id, title }])
  }, [])

  return (
    <ToastCtx.Provider value={toast}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {items.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            duration={3000}
            onOpenChange={(open) => {
              if (!open) setItems((prev) => prev.filter((x) => x.id !== t.id))
            }}
            className={cn(
              'fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100%-2rem))] items-center rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm shadow-[var(--shadow-elevated)]',
            )}
          >
            <ToastPrimitive.Title>{t.title}</ToastPrimitive.Title>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </ToastCtx.Provider>
  )
}
