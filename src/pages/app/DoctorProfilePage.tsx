import { Link, useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { doctorsSeed } from '@/data/doctors'
import { clinicsSeed } from '@/data/clinics'
import { reviewsSeed } from '@/data/reviews'
import { uz } from '@/content/uz'
import { initials } from '@/lib/avatar'
import { Button } from '@/components/ui/button'
import { getDaySlots } from '@/lib/slots'
import { useMedicStore } from '@/store/medic-store'

export function DoctorProfilePage() {
  const { id } = useParams()
  const doctor = doctorsSeed.find((d) => d.id === id)
  const toggleSaved = useMedicStore((s) => s.toggleSavedDoctor)
  const slotMinutes = useMedicStore((s) => s.doctorScheduleSlotMinutes)
  const breakEnabled = useMedicStore((s) => s.doctorBreakEnabled)
  const saved = useMedicStore((s) => s.savedDoctorIds.includes(id ?? ''))
  if (!doctor) return <div className="p-4">Topilmadi</div>
  const clinic = clinicsSeed.find((c) => c.id === doctor.clinicId)
  const reviews = reviewsSeed.filter((r) => r.doctorId === doctor.id).slice(0, 3)
  const slots = getDaySlots(doctor.id, new Date().toISOString().slice(0, 10), slotMinutes, breakEnabled).filter((s) => s.available).slice(0, 4)

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-medium text-[var(--muted)]">
          {initials(doctor.name)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{doctor.name}</h1>
          <p className="text-sm text-[var(--muted)]">
            {doctor.specialty} · {doctor.experienceYears} {uz.doctors.experience}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm">
            <Star size={14} strokeWidth={1.5} className="fill-current" /> {doctor.rating} ({doctor.reviewCount}) · {doctor.distanceKm} km
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-[var(--muted)]">{doctor.bio}</p>
      {clinic && (
        <p className="mt-2 text-sm">
          <span className="text-[var(--muted)]">Klinika: </span>
          {clinic.name}
        </p>
      )}
      <div className="mt-4 flex gap-4 text-sm">
        <div>
          <div className="text-[var(--muted)]">Oflayn</div>
          <div className="font-semibold">{doctor.priceOffline.toLocaleString('uz-UZ')} soʻm</div>
        </div>
        <div>
          <div className="text-[var(--muted)]">Onlayn</div>
          <div className="font-semibold">{doctor.priceOnline.toLocaleString('uz-UZ')} soʻm</div>
        </div>
      </div>
      {slots.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-sm font-medium">Bugungi boʻsh vaqtlar</div>
          <div className="flex flex-wrap gap-2">
            {slots.map((s) => (
              <span key={s.time} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
                {s.time}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6 flex flex-col gap-2">
        <Button asChild>
          <Link to={`/app/book/${doctor.id}`}>{uz.book.title}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/app/book/${doctor.id}?type=online`}>{uz.aiResult.online}</Link>
        </Button>
        <Button variant="ghost" onClick={() => toggleSaved(doctor.id)}>
          {saved ? 'Saqlangan' : 'Saqlash'}
        </Button>
      </div>
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold">Sharhlar</h2>
        <div className="divide-y divide-[var(--border)]">
          {reviews.map((r) => (
            <div key={r.id} className="py-3 text-sm">
              <div className="font-medium">
                {r.author} · <Star size={12} strokeWidth={1.5} className="inline fill-current" /> {r.rating}
              </div>
              <p className="mt-1 text-[var(--muted)]">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
