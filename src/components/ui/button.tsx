import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-input)] text-sm font-semibold transition-[opacity,transform] duration-[var(--motion)] disabled:opacity-50 min-h-11 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)] hover:opacity-90',
        outline: 'border border-[var(--border)] bg-transparent text-[var(--fg)] hover:bg-[var(--surface)]',
        ghost: 'text-[var(--fg)] hover:bg-[var(--surface)]',
        accent: 'border border-[var(--border)] bg-transparent text-[var(--fg)] hover:bg-[var(--surface)]',
        link: 'text-[var(--accent)] underline-offset-4 hover:underline min-h-0 px-0',
      },
      size: {
        default: 'h-11 px-4',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-6',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
