import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ClinicAppointmentsPage() {
  const role = useMedicStore((s) => s.proRole)
  const appointments = useMedicStore((s) => s.appointments)
  const setStatus = useMedicStore((s) => s.setAppointmentStatus)
  const rows = appointments.filter((appointment) =>
    role === 'hospital' ? appointment.clinicId === 'c6' : role === 'clinic' ? appointment.clinicId !== 'c6' : true,
  )

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{role === 'hospital' ? 'Shifoxona qabullari' : 'Qabullar'}</h1>
      <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2">Kod</th>
              <th className="px-3 py-2">Bemor</th>
              <th className="px-3 py-2">Shifokor</th>
              <th className="px-3 py-2">Sana</th>
              <th className="px-3 py-2">Holat</th>
              <th className="px-3 py-2">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const d = doctorsSeed.find((x) => x.id === a.doctorId)
              return (
                <tr key={a.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-3 font-mono text-xs">{a.code}</td>
                  <td className="px-3 py-3">{a.patientName}</td>
                  <td className="px-3 py-3">{d?.name}</td>
                  <td className="px-3 py-3">
                    {a.date} {a.time}
                  </td>
                  <td className="px-3 py-3">
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
                  </td>
                  <td className="px-3 py-3">
                    {a.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => setStatus(a.id, 'confirmed')}>
                          Tasdiqlash
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setStatus(a.id, 'rejected')}>
                          Rad
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
