import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { uz } from '@/content/uz'
import { doctorsSeed } from '@/data/doctors'
import { initials, avatarColor } from '@/lib/avatar'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const specialties = Array.from(new Set(doctorsSeed.map((d) => d.specialty)))

export function DoctorsPage() {
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState<string | null>(null)
  const [sort, setSort] = useState<'rating' | 'price' | 'distance'>('rating')
  const [onlineOnly, setOnlineOnly] = useState(false)

  const list = useMemo(() => {
    let arr = [...doctorsSeed]
    if (q) arr = arr.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.specialty.toLowerCase().includes(q.toLowerCase()))
    if (spec) arr = arr.filter((d) => d.specialty === spec)
    if (onlineOnly) arr = arr.filter((d) => d.onlineNow)
    arr.sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'price') return a.priceOffline - b.priceOffline
      return a.distanceKm - b.distanceKm
    })
    return arr
  }, [q, spec, sort, onlineOnly])

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-3 text-xl font-semibold">{uz.doctors.title}</h1>
      <Input placeholder={uz.doctors.search} value={q} onChange={(e) => setQ(e.target.value)} className="mb-3" />
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSpec(null)}
          className={`shrink-0 rounded-full border px-3 py-1 text-xs ${!spec ? 'border-[var(--fg)]' : 'border-[var(--border)]'}`}
        >
          Hammasi
        </button>
        {specialties.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSpec(s)}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs ${spec === s ? 'border-[var(--fg)]' : 'border-[var(--border)]'}`}
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
              className={`rounded-full px-2.5 py-1 text-xs ${sort === k ? 'bg-[var(--surface)] font-medium' : 'text-[var(--muted)]'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs">
          <span>{uz.doctors.onlineOnly}</span>
          <Switch checked={onlineOnly} onCheckedChange={setOnlineOnly} />
        </label>
      </div>
      <div className="space-y-2">
        {list.map((d) => (
          <Link
            key={d.id}
            to={`/app/doctors/${d.id}`}
            className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-3"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{ background: avatarColor(d.id) }}
            >
              {initials(d.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{d.name}</div>
              <div className="text-xs text-[var(--muted)]">
                {d.specialty} · {d.experienceYears} {uz.doctors.experience}
              </div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">
                ★ {d.rating} · {d.distanceKm} km · {d.priceOffline.toLocaleString('uz-UZ')} {uz.doctors.from}
              </div>
            </div>
            {d.onlineNow && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--status-ok)]" title="Online" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
