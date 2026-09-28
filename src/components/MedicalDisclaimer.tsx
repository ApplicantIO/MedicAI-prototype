import { uz } from '@/content/uz'
import { cn } from '@/lib/cn'

export function MedicalDisclaimer({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <p className={cn('text-xs text-[var(--muted)] leading-[var(--line-body)]', className)}>
      {compact ? uz.disclaimerShort : uz.disclaimerMedical} {uz.call103}
    </p>
  )
}
