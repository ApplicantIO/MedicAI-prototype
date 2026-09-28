import { Link, Navigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer'
import { initials, avatarColor } from '@/lib/avatar'

export function AIResultPage() {
  const result = useMedicStore((s) => s.aiChat.result)
  if (!result) return <Navigate to="/app/ai" replace />

  const urgencyColor =
    result.urgency === 'high' ? 'danger' : result.urgency === 'medium' ? 'warn' : 'ok'
  const suggested = doctorsSeed
    .filter((d) => d.specialty.toLowerCase().includes(result.specialist.toLowerCase().slice(0, 5)) || true)
    .slice(0, 3)

  return (
    <div className="px-4 pb-8 pt-5">
      <h1 className="text-xl font-semibold">{uz.aiResult.title}</h1>
      <MedicalDisclaimer className="mt-2" />

      {result.emergency && (
        <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--status-danger)] bg-[var(--status-danger)]/5 p-4">
          <div className="font-semibold text-[var(--status-danger)]">Shoshilinch</div>
          <p className="mt-1 text-sm">{result.emergencyNote ?? uz.call103}</p>
          <a
            href="tel:103"
            className="mt-3 inline-flex h-11 items-center justify-center rounded-[var(--radius-input)] bg-[var(--status-danger)] px-4 text-sm font-semibold text-white"
          >
            103 ga qoʻngʻiroq
          </a>
        </div>
      )}

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.directions}</h2>
        <ul className="space-y-1.5">
          {result.directions.map((d) => (
            <li key={d} className="rounded-[var(--radius-input)] border border-[var(--border)] px-3 py-2 text-sm">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="text-sm">
          <span className="text-[var(--muted)]">{uz.aiResult.urgency}: </span>
          <Badge variant={urgencyColor as 'ok' | 'warn' | 'danger'}>
            {uz.aiResult.urgencyLabels[result.urgency]}
          </Badge>
        </div>
        <div className="text-sm">
          <span className="text-[var(--muted)]">{uz.aiResult.specialist}: </span>
          <span className="font-medium">{result.specialist}</span>
        </div>
      </div>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.selfCare}</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
          {result.selfCare.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.doctors}</h2>
        <div className="space-y-2">
          {suggested.map((d) => (
            <Link
              key={d.id}
              to={`/app/doctors/${d.id}`}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-3"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold"
                style={{ background: avatarColor(d.id) }}
              >
                {initials(d.name)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-[var(--muted)]">
                  {d.specialty} · ★ {d.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-2">
        <Button asChild>
          <Link to="/app/doctors">{uz.aiResult.book}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/app/doctors">{uz.aiResult.online}</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/app/pharmacy">{uz.aiResult.pharmacy}</Link>
        </Button>
      </div>
    </div>
  )
}
