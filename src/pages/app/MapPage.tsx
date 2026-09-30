import { useState } from 'react'
import { mapPinsSeed } from '@/data/map-pins'
import { uz } from '@/content/uz'

export function MapPage() {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'hospital' | 'pharmacy'>('all')
  const pins = mapPinsSeed.filter((p) => filter === 'all' || p.type === filter)

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-5 text-xl font-semibold">{uz.map.title}</h1>
      <div className="scrollbar-hidden mb-4 flex gap-2 overflow-x-auto">
        {(['all', 'clinic', 'pharmacy', 'hospital'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-11 shrink-0 rounded-[var(--radius-input)] border px-3 text-xs ${
              filter === f ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'
            }`}
          >
            {f === 'all'
              ? uz.clinics.all
              : f === 'clinic'
                ? uz.map.filterClinic
                : f === 'pharmacy'
                  ? uz.map.filterPharmacy
                  : uz.map.filterHospital}
          </button>
        ))}
      </div>
      <div className="relative h-72 overflow-hidden border-y border-[var(--border)] bg-[var(--surface)]">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-8 grid-rows-5 opacity-60">
          {Array.from({ length: 40 }, (_, index) => <span key={index} className="border-b border-r border-[var(--border)]" />)}
        </div>
        {pins.map((p) => (
          <div
            key={p.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            title={p.name}
          >
            <span
              className={`h-3 w-3 rounded-full border-2 border-[var(--bg)] ${
                'bg-[var(--fg)]'
              }`}
            />
            <span className="mt-0.5 max-w-[72px] truncate bg-[var(--bg)] px-1 text-[9px]">
              {p.name}
            </span>
          </div>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-[var(--border)]">
        {pins.map((p) => (
          <li key={p.id} className="flex justify-between gap-3 py-2.5 text-sm">
            <span className="truncate">{p.name}</span>
            <span className="text-xs text-[var(--muted)]">
              {p.type === 'clinic'
                ? uz.map.filterClinic
                : p.type === 'hospital'
                  ? uz.map.filterHospital
                  : uz.map.filterPharmacy}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
