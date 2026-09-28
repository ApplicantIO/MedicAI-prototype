import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { clinicsSeed } from '@/data/clinics'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'

export function ClinicsPage() {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'hospital'>('all')
  const list = clinicsSeed.filter((c) => filter === 'all' || c.type === filter)

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-3 text-xl font-semibold">{uz.clinics.title}</h1>
      <div className="mb-4 flex gap-2">
        {(['all', 'clinic', 'hospital'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-11 rounded-full border px-3 text-xs ${
              filter === f ? 'border-[var(--fg)]' : 'border-[var(--border)]'
            }`}
          >
            {f === 'all' ? 'Hammasi' : f === 'clinic' ? uz.clinics.filterClinic : uz.clinics.filterHospital}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {list.map((c) => (
          <div key={c.id} className="rounded-[var(--radius-card)] border border-[var(--border)] p-4">
            <div className="font-medium">{c.name}</div>
            <div className="mt-1 text-xs text-[var(--muted)]">
              {c.type === 'clinic' ? uz.clinics.filterClinic : uz.clinics.filterHospital} ·{' '}
              <span className="inline-flex items-center gap-1">
                <Star size={12} strokeWidth={1.5} className="fill-current" /> {c.rating}
              </span>{' '}
              · {c.distanceKm} km
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{c.address}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.services.slice(0, 4).map((s) => (
                <span key={s} className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
            {c.doctorIds[0] && (
              <Button className="mt-3 min-h-11 w-full" asChild>
                <Link to={`/app/book/${c.doctorIds[0]}`}>{uz.clinics.book}</Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
