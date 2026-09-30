import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { uz } from '@/content/uz'
import { doctorsSeed } from '@/data/doctors'
import { initials } from '@/lib/avatar'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useMedicStore } from '@/store/medic-store'

const specialties = Array.from(new Set(doctorsSeed.map((d) => d.specialty)))

export function DoctorsPage() {
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState<string | null>(null)
  const [sort, setSort] = useState<'rating' | 'price' | 'distance'>('rating')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const availability = useMedicStore((s) => s.doctorAvailability)

  const list = useMemo(() => {
    let arr = [...doctorsSeed]
    if (q) arr = arr.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.specialty.toLowerCase().includes(q.toLowerCase()))
    if (spec) arr = arr.filter((d) => d.specialty === spec)
    if (onlineOnly) arr = arr.filter((d) => availability[d.id] ?? d.onlineNow)
    arr.sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'price') return a.priceOffline - b.priceOffline
      return a.distanceKm - b.distanceKm
    })
    return arr
  }, [q, spec, sort, onlineOnly, availability])

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-5 text-xl font-semibold">{uz.doctors.title}</h1>
      <Input placeholder={uz.doctors.search} value={q} onChange={(e) => setQ(e.target.value)} className="mb-4" />
      <div className="scrollbar-hidden mb-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSpec(null)}
          className={`min-h-11 shrink-0 rounded-[var(--radius-input)] border px-3 text-xs ${!spec ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'}`}
        >
          {uz.doctors.all}
        </button>
        {specialties.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSpec(s)}
            className={`min-h-11 shrink-0 rounded-[var(--radius-input)] border px-3 text-xs ${spec === s ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-1">
          {([
            ['rating', uz.doctors.sortRating],
            ['price', uz.doctors.sortPrice],
            ['distance', uz.doctors.sortDistance],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setSort(k)}
              className={`min-h-11 whitespace-nowrap rounded-[var(--radius-input)] px-2.5 text-xs ${sort === k ? 'border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)]' : 'text-[var(--muted)]'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs">
          <span>{uz.doctors.onlineOnly}</span>
          <Switch checked={onlineOnly} onCheckedChange={setOnlineOnly} />
        </label>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {list.length === 0 && (
          <p className="py-4 text-sm text-[var(--muted)]">{uz.doctors.noResults}</p>
        )}
        {list.map((d) => (
          <Link
            key={d.id}
            to={`/app/doctors/${d.id}`}
            className="flex min-h-16 items-center gap-3 py-3"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-xs font-medium text-[var(--muted)]"
            >
              {initials(d.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{d.name}</div>
              <div className="truncate text-xs text-[var(--muted)]">
                {d.specialty} · {d.experienceYears} {uz.doctors.experience} · <Star size={11} className="inline" /> {d.rating} · {d.distanceKm} km
              </div>
            </div>
            {(availability[d.id] ?? d.onlineNow) && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--status-ok)]" title={uz.doctors.available} />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
