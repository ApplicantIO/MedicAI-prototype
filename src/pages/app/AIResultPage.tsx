import { Link, Navigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer'
import { initials } from '@/lib/avatar'

export function AIResultPage() {
  const result = useMedicStore((s) => s.aiChat.result)
  if (!result) return <Navigate to="/app/ai" replace />

  const urgencyColor =
    result.urgency === 'high' ? 'danger' : result.urgency === 'medium' ? 'warn' : 'ok'
  const specialist = result.specialist.trim().toLowerCase()
  const matchingDoctors = specialist
    ? doctorsSeed.filter((d) => {
        const doctorSpecialty = d.specialty.toLowerCase()
        return doctorSpecialty.includes(specialist) || specialist.includes(doctorSpecialty)
      })
    : []
  const fallbackDoctors = doctorsSeed.filter((d) => d.specialty.toLowerCase().includes('terapevt'))
  const suggested = (matchingDoctors.length ? matchingDoctors : fallbackDoctors.length ? fallbackDoctors : doctorsSeed).slice(0, 3)

  return (
    <div className="px-4 pb-8 pt-5">
      <h1 className="text-xl font-semibold">{uz.aiResult.title}</h1>
      <MedicalDisclaimer compact className="mt-2" />

      {result.emergency && (
        <div className="mt-4 border-y border-[var(--border)] py-3">
          <Badge variant="danger">{uz.aiResult.emergency}</Badge>
          <p className="mt-2 text-sm">{result.emergencyNote ?? uz.call103}</p>
          <a href="tel:103" className="mt-2 inline-flex min-h-11 items-center rounded-[var(--radius-input)] border border-[var(--border)] px-3 text-sm font-medium hover:bg-[var(--surface)]">
            {uz.aiResult.call103}
          </a>
        </div>
      )}

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.directions}</h2>
        <ul className="divide-y divide-[var(--border)]">
          {result.directions.map((d) => (
            <li key={d} className="py-2.5 text-sm">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="text-sm">
          <span className="text-[var(--muted)]">{uz.aiResult.urgency}: </span>
          <Badge variant={urgencyColor as 'ok' | 'warn' | 'danger'}>
            {uz.aiResult.urgencyLabels[result.urgency]}
          </Badge>
        </div>
        <span className="text-sm font-medium">{result.specialist}</span>
      </div>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.selfCare}</h2>
        <ul className="divide-y divide-[var(--border)] text-sm text-[var(--muted)]">
          {result.selfCare.map((s) => (
            <li key={s} className="py-2">{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">{uz.aiResult.doctors}</h2>
        <div className="divide-y divide-[var(--border)]">
          {suggested.map((d) => (
            <Link
              key={d.id}
              to={`/app/doctors/${d.id}`}
              className="flex items-center gap-3 py-3"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-xs font-medium text-[var(--muted)]"
              >
                {initials(d.name)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{d.name}</div>
                <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                  {d.specialty} · <Star size={12} strokeWidth={1.5} className="fill-current" /> {d.rating}
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
