import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-chip)] border px-2 py-0.5 text-[11px] font-medium leading-4',
  {
    variants: {
      variant: {
        default: 'border-[var(--border)] bg-transparent text-[var(--muted)]',
        promoted: 'border-[var(--border)] bg-transparent text-[var(--fg)]',
        ok: 'border-[var(--border)] bg-transparent text-[var(--status-ok)]',
        warn: 'border-[var(--border)] bg-transparent text-[var(--status-warn)]',
        danger: 'border-[var(--border)] bg-transparent text-[var(--status-danger)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({ className, variant, ...props }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
