import { useState } from 'react'
import { mapPinsSeed } from '@/data/map-pins'
import { uz } from '@/content/uz'

export function MapPage() {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'hospital' | 'pharmacy'>('all')
  const pins = mapPinsSeed.filter((p) => filter === 'all' || p.type === filter)

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-2 text-xl font-semibold">{uz.map.title}</h1>
      <p className="mb-3 text-xs text-[var(--muted)]">{uz.map.mockNote}</p>
      <div className="scrollbar-hidden mb-3 flex gap-2 overflow-x-auto">
        {(['all', 'clinic', 'pharmacy', 'hospital'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-11 shrink-0 rounded-full border px-3 text-xs ${
              filter === f ? 'border-[var(--fg)]' : 'border-[var(--border)]'
            }`}
          >
            {f === 'all'
              ? 'Hammasi'
              : f === 'clinic'
                ? uz.map.filterClinic
                : f === 'pharmacy'
                  ? uz.map.filterPharmacy
                  : uz.map.filterHospital}
          </button>
        ))}
      </div>
      <div className="relative h-72 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]">
        {/* stylized grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {pins.map((p) => (
          <div
            key={p.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            title={p.name}
          >
            <span
              className={`h-3 w-3 rounded-full border-2 border-[var(--bg)] ${
                p.type === 'pharmacy'
                  ? 'bg-[var(--accent)]'
                  : p.type === 'hospital'
                    ? 'bg-[var(--status-danger)]'
                    : 'bg-[var(--fg)]'
              }`}
            />
            <span className="mt-0.5 max-w-[72px] truncate rounded bg-[var(--bg)]/90 px-1 text-[9px]">
              {p.name}
            </span>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {pins.map((p) => (
          <li key={p.id} className="flex justify-between text-sm">
            <span>{p.name}</span>
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
