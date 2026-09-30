import { regionsSeed } from '@/data/regions'
import { useMedicStore } from '@/store/medic-store'

export function ClinicStatsPage() {
  const role = useMedicStore((s) => s.proRole)
  const allAppointments = useMedicStore((s) => s.appointments)
  const appointments = allAppointments.filter((appointment) =>
    role === 'hospital' ? appointment.clinicId === 'c6' : role === 'clinic' ? appointment.clinicId !== 'c6' : true,
  )
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length
  const pending = appointments.filter((a) => a.status === 'pending').length

  return (
    <div>
      <h1 className="mb-5 text-xl font-semibold">Statistika</h1>
      <div className="mb-6 grid grid-cols-12 gap-3 border-y border-[var(--border)]">
        {[
          { label: 'Jami qabullar', value: appointments.length },
          { label: 'Tasdiqlangan', value: confirmed },
          { label: 'Kutilmoqda', value: pending },
        ].map((k) => (
          <div key={k.label} className="col-span-12 py-3 md:col-span-4">
            <div className="text-xs text-[var(--muted)]">{k.label}</div>
            <div className="mt-1 text-xl font-semibold tabular-nums">{k.value}</div>
          </div>
        ))}
      </div>
      <h2 className="mb-3 text-sm font-semibold">Hududlar boʻyicha talab</h2>
      <div className="scrollbar-thin overflow-x-auto border-y border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2">Hudud</th>
              <th className="px-3 py-2">Tashrif</th>
              <th className="px-3 py-2">Top mutaxassislik</th>
            </tr>
          </thead>
          <tbody>
            {regionsSeed.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)]">
                <td className="px-3 py-3">{r.name}</td>
                <td className="px-3 py-3">{r.visits}</td>
                <td className="px-3 py-3">{r.topSpecialty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
