import { regionsSeed } from '@/data/regions'
import { useMedicStore } from '@/store/medic-store'

export function ClinicStatsPage() {
  const appointments = useMedicStore((s) => s.appointments)
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length
  const pending = appointments.filter((a) => a.status === 'pending').length

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Statistika</h1>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Jami qabullar', value: appointments.length },
          { label: 'Tasdiqlangan', value: confirmed },
          { label: 'Kutilmoqda', value: pending },
        ].map((k) => (
          <div key={k.label} className="kpi-stripe rounded-[var(--radius-card)] border border-[var(--border)] p-4">
            <div className="text-xs text-[var(--muted)]">{k.label}</div>
            <div className="mt-1 text-2xl font-semibold">{k.value}</div>
          </div>
        ))}
      </div>
      <h2 className="mb-3 text-sm font-semibold">Hududlar boʻyicha talab</h2>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
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
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.visits}</td>
                <td className="px-3 py-2">{r.topSpecialty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
