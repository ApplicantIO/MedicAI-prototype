import { uz } from '@/content/uz'
import { cn } from '@/lib/cn'

export function MedicalDisclaimer({ className, compact = true }: { className?: string; compact?: boolean }) {
  return (
    <p className={cn('text-[11px] leading-4 text-[var(--muted)]', className)}>
      {compact ? uz.disclaimerShort : uz.disclaimerMedical}
    </p>
  )
}
