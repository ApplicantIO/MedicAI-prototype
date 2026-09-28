import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { Badge } from '@/components/ui/badge'
import { uz } from '@/content/uz'

export function DoctorPatientsPage() {
  const allAppointments = useMedicStore((s) => s.appointments)
  const appointments = allAppointments.filter((appointment) => appointment.doctorId === 'd1')

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Bemorlar / qabullar</h1>
      <div className="space-y-2">
        {appointments.map((a) => {
          const d = doctorsSeed.find((x) => x.id === a.doctorId)
          return (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3"
            >
              <div>
                <div className="font-medium">{a.patientName}</div>
                <div className="text-xs text-[var(--muted)]">
                  {a.date} {a.time} · {d?.name} · {a.code}
                </div>
              </div>
              <Badge
                variant={
                  a.status === 'confirmed'
                    ? 'ok'
                    : a.status === 'pending'
                      ? 'warn'
                      : a.status === 'rejected' || a.status === 'cancelled'
                        ? 'danger'
                        : 'default'
                }
              >
                {uz.appointments.status[a.status as keyof typeof uz.appointments.status]}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
