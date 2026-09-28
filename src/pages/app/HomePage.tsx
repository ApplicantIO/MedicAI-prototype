import { Link } from 'react-router-dom'
import { Activity, Stethoscope, Pill, Building2, MapPin, ChevronRight } from 'lucide-react'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { pharmaciesSeed } from '@/data/pharmacies'
import { clinicsSeed } from '@/data/clinics'
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer'
import { initials, avatarColor } from '@/lib/avatar'

export function HomePage() {
  const appointments = useMedicStore((s) => s.appointments)
  const upcoming = appointments.find((a) => a.status === 'confirmed' || a.status === 'pending')
  const doctor = upcoming ? doctorsSeed.find((d) => d.id === upcoming.doctorId) : null
  const nearby = [
    ...clinicsSeed.slice(0, 1).map((c) => ({ type: 'klinika', name: c.name, meta: `${c.distanceKm} km` })),
    ...pharmaciesSeed.slice(0, 1).map((p) => ({ type: 'dorixona', name: p.name, meta: `${p.distanceKm} km` })),
    ...doctorsSeed.slice(0, 1).map((d) => ({ type: 'shifokor', name: d.name, meta: d.specialty })),
  ]

  return (
    <div className="px-4 pb-6 pt-5">
      <h1 className="text-xl font-semibold">{uz.home.greeting}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">{uz.disclaimerShort}</p>

      <Link
        to="/app/ai"
        className="mt-5 flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
          <Activity size={24} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="font-semibold">{uz.home.aiCta}</div>
          <div className="text-sm text-[var(--muted)]">{uz.home.aiCtaSub}</div>
        </div>
        <ChevronRight size={18} className="text-[var(--muted)]" />
      </Link>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          { to: '/app/doctors', icon: Stethoscope, label: uz.home.quick.doctor },
          { to: '/app/pharmacy', icon: Pill, label: uz.home.quick.pharmacy },
          { to: '/app/clinics', icon: Building2, label: uz.home.quick.clinic },
          { to: '/app/map', icon: MapPin, label: uz.home.quick.map },
        ].map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] border border-[var(--border)] py-3 text-center"
          >
            <q.icon size={20} strokeWidth={1.5} />
            <span className="text-[11px]">{q.label}</span>
          </Link>
        ))}
      </div>

      {upcoming && doctor && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold">{uz.home.upcoming}</h2>
          <Link
            to="/app/appointments"
            className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-3"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold"
              style={{ background: avatarColor(doctor.id) }}
            >
              {initials(doctor.name)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{doctor.name}</div>
              <div className="text-xs text-[var(--muted)]">
                {upcoming.date} · {upcoming.time} · {upcoming.code}
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">{uz.home.nearby}</h2>
        <div className="space-y-2">
          {nearby.map((n) => (
            <div
              key={n.name}
              className="flex items-center justify-between rounded-[var(--radius-card)] border border-[var(--border)] px-3 py-2.5"
            >
              <div>
                <div className="text-sm font-medium">{n.name}</div>
                <div className="text-xs capitalize text-[var(--muted)]">{n.type}</div>
              </div>
              <span className="text-xs text-[var(--muted)]">{n.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </div>
  )
}
