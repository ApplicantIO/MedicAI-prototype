import { Link } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function AppointmentsPage() {
  const appointments = useMedicStore((s) => s.appointments)
  const setStatus = useMedicStore((s) => s.setAppointmentStatus)
  const upcoming = appointments.filter((a) => !['completed', 'cancelled', 'rejected'].includes(a.status))
  const past = appointments.filter((a) => ['completed', 'cancelled', 'rejected'].includes(a.status))

  const statusVariant = (s: string) => {
    if (s === 'confirmed') return 'ok' as const
    if (s === 'pending') return 'warn' as const
    if (s === 'rejected' || s === 'cancelled') return 'danger' as const
    return 'default' as const
  }

  const list = (items: typeof appointments) =>
    items.map((a) => {
      const d = doctorsSeed.find((x) => x.id === a.doctorId)
      return (
        <div key={a.id} className="rounded-[var(--radius-card)] border border-[var(--border)] p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-medium">{d?.name ?? a.doctorId}</div>
              <div className="text-xs text-[var(--muted)]">
                {a.date} · {a.time} · {a.type === 'online' ? 'Onlayn' : 'Oflayn'}
              </div>
              <div className="mt-1 text-xs font-mono">{a.code}</div>
            </div>
            <Badge variant={statusVariant(a.status)}>
              {uz.appointments.status[a.status as keyof typeof uz.appointments.status]}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {a.status === 'confirmed' && a.type === 'online' && (
              <Button size="sm" asChild>
                <Link to={`/app/consult/${a.id}`}>{uz.appointments.connect}</Link>
              </Button>
            )}
            {(a.status === 'pending' || a.status === 'confirmed') && (
              <Button size="sm" variant="outline" onClick={() => setStatus(a.id, 'cancelled')}>
                {uz.appointments.cancel}
              </Button>
            )}
          </div>
        </div>
      )
    })

  return (
    <div className="px-4 pb-6 pt-4">
      <h1 className="mb-4 text-xl font-semibold">{uz.appointments.title}</h1>
      <h2 className="mb-2 text-sm font-medium text-[var(--muted)]">{uz.appointments.upcoming}</h2>
      <div className="mb-6 space-y-2">{list(upcoming)}</div>
      <h2 className="mb-2 text-sm font-medium text-[var(--muted)]">{uz.appointments.past}</h2>
      <div className="space-y-2">{list(past)}</div>
    </div>
  )
}
