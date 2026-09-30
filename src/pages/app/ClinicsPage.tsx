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
      <h1 className="mb-5 text-xl font-semibold">{uz.clinics.title}</h1>
      <div className="mb-4 flex gap-2">
        {(['all', 'clinic', 'hospital'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-11 rounded-[var(--radius-input)] border px-3 text-xs ${
              filter === f ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'
            }`}
          >
            {f === 'all' ? uz.clinics.all : f === 'clinic' ? uz.clinics.filterClinic : uz.clinics.filterHospital}
          </button>
        ))}
      </div>
      <div className="divide-y divide-[var(--border)]">
        {list.map((c) => (
          <div key={c.id} className="flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{c.name}</div>
              <div className="truncate text-xs text-[var(--muted)]">
                {c.type === 'clinic' ? uz.clinics.filterClinic : uz.clinics.filterHospital} · {c.address} · {c.distanceKm} km
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[var(--muted)]"><Star size={12} />{c.rating}</span>
            {c.doctorIds[0] && <Button size="sm" variant="outline" asChild><Link to={`/app/book/${c.doctorIds[0]}`}>{uz.clinics.book}</Link></Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
