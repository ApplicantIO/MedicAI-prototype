import { Link } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { AI_SCENARIOS } from '@/data/ai-scenarios'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export function ProfilePage() {
  const theme = useMedicStore((s) => s.theme)
  const setTheme = useMedicStore((s) => s.setTheme)
  const aiHistory = useMedicStore((s) => s.aiHistory)
  const savedDoctorIds = useMedicStore((s) => s.savedDoctorIds)
  const resetDemo = useMedicStore((s) => s.resetDemo)

  return (
    <div className="px-4 pb-8 pt-4">
      <h1 className="text-xl font-semibold">{uz.profile.title}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">{uz.profile.user}</p>

      <div className="mt-6 flex min-h-12 items-center justify-between border-y border-[var(--border)] py-2">
        <span className="text-sm">{uz.profile.darkMode}</span>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
        />
      </div>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">{uz.profile.history}</h2>
        {aiHistory.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">{uz.profile.empty}</p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {aiHistory.slice(0, 5).map((h) => {
              const s = AI_SCENARIOS.find((x) => x.id === h.scenarioId)
              return (
                <li key={h.id} className="py-2.5 text-sm">
                  {s?.chipLabel ?? h.scenarioId} · {new Date(h.at).toLocaleDateString('uz-UZ')}
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">{uz.profile.saved}</h2>
        {savedDoctorIds.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">{uz.profile.empty}</p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {savedDoctorIds.map((id) => {
              const d = doctorsSeed.find((x) => x.id === id)
              return (
                <Link
                  key={id}
                  to={`/app/doctors/${id}`}
                  className="block py-2.5 text-sm"
                >
                  {d?.name}
                </Link>
              )
            })}
          </ul>
        )}
      </section>

      <Button variant="outline" className="mt-8 w-full" onClick={() => resetDemo()}>
        {uz.profile.reset}
      </Button>

      <Link to="/app/orders" className="mt-4 block text-center text-sm text-[var(--fg)]">
        {uz.order.myOrders} →
      </Link>
      <Link to="/app/appointments" className="mt-3 block text-center text-sm text-[var(--muted)]">
        {uz.appointments.title} →
      </Link>
    </div>
  )
}
