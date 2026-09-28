import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/cn'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/40', className)} {...props} />
}

export function SheetContent({
  side = 'bottom',
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: 'bottom' | 'right' }) {
  const sideClass =
    side === 'bottom'
      ? 'inset-x-0 bottom-0 rounded-t-[var(--radius-card)]'
      : 'inset-y-0 right-0 h-full w-full max-w-md rounded-l-[var(--radius-card)]'
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 border border-[var(--border)] bg-[var(--bg)] p-4 shadow-[var(--shadow-elevated)] focus:outline-none',
          sideClass,
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
