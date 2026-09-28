import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ClinicAppointmentsPage() {
  const appointments = useMedicStore((s) => s.appointments)
  const setStatus = useMedicStore((s) => s.setAppointmentStatus)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Qabullar</h1>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
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
            {appointments.map((a) => {
              const d = doctorsSeed.find((x) => x.id === a.doctorId)
              return (
                <tr key={a.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-2 font-mono text-xs">{a.code}</td>
                  <td className="px-3 py-2">{a.patientName}</td>
                  <td className="px-3 py-2">{d?.name}</td>
                  <td className="px-3 py-2">
                    {a.date} {a.time}
                  </td>
                  <td className="px-3 py-2">
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
                  <td className="px-3 py-2">
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
