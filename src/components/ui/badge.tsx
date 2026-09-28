import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-chip)] px-2.5 py-0.5 text-xs font-medium border',
  {
    variants: {
      variant: {
        default: 'border-[var(--border)] text-[var(--fg)] bg-[var(--surface)]',
        promoted: 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10',
        ok: 'border-[var(--status-ok)] text-[var(--status-ok)] bg-[var(--status-ok)]/10',
        warn: 'border-[var(--status-warn)] text-[var(--status-warn)] bg-[var(--status-warn)]/10',
        danger: 'border-[var(--status-danger)] text-[var(--status-danger)] bg-[var(--status-danger)]/10',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({ className, variant, ...props }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
