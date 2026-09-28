import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { doctorsSeed } from '@/data/doctors'
import { clinicsSeed } from '@/data/clinics'
import { uz } from '@/content/uz'
import { getDaySlots, nextSevenDays } from '@/lib/slots'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import type { ConsultType } from '@/types'

export function BookPage() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const doctor = doctorsSeed.find((d) => d.id === id)
  const addAppointment = useMedicStore((s) => s.addAppointment)

  const [type, setType] = useState<ConsultType>(sp.get('type') === 'online' ? 'online' : 'offline')
  const days = nextSevenDays()
  const [date, setDate] = useState(days[0]!)
  const [time, setTime] = useState<string | null>(null)
  const [done, setDone] = useState<{ code: string; id: string } | null>(null)

  const slots = useMemo(() => (doctor ? getDaySlots(doctor.id, date) : []), [date, doctor])

  if (!doctor) return <div className="p-4">Topilmadi</div>
  const clinic = clinicsSeed.find((c) => c.id === doctor.clinicId)!

  if (done) {
    return (
      <div className="flex flex-col items-center px-4 py-12 text-center">
        <div className="mb-4 text-4xl text-[var(--status-ok)]">✓</div>
        <h1 className="text-xl font-semibold">{uz.book.success}</h1>
        <p className="mt-2 text-[var(--muted)]">
          {uz.book.code}: <strong>{done.code}</strong>
        </p>
        <Button className="mt-6" asChild>
          <Link to="/app/appointments">{uz.book.toAppointments}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 pb-8 pt-4">
      <h1 className="text-xl font-semibold">{uz.book.title}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {doctor.name} · {doctor.specialty}
      </p>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-medium">{uz.book.type}</h2>
        <div className="flex gap-2">
          {(['offline', 'online'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 rounded-[var(--radius-input)] border py-2.5 text-sm ${
                type === t ? 'border-[var(--fg)] font-medium' : 'border-[var(--border)]'
              }`}
            >
              {t === 'offline' ? uz.book.offline : uz.book.online}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-medium">{uz.book.date}</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setDate(d)
                setTime(null)
              }}
              className={`shrink-0 rounded-[var(--radius-input)] border px-3 py-2 text-xs ${
                date === d ? 'border-[var(--fg)] font-medium' : 'border-[var(--border)]'
              }`}
            >
              {d.slice(5)}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-medium">{uz.book.time}</h2>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((s) => (
            <button
              key={s.time}
              type="button"
              disabled={!s.available}
              onClick={() => setTime(s.time)}
              className={`rounded-[var(--radius-input)] border py-2 text-xs disabled:opacity-30 ${
                time === s.time ? 'border-[var(--fg)] font-medium' : 'border-[var(--border)]'
              }`}
            >
              {s.time}
            </button>
          ))}
        </div>
      </section>

      <Button
        className="mt-8 w-full"
        disabled={!time}
        onClick={() => {
          if (!time) return
          const aid = addAppointment({
            doctorId: doctor.id,
            clinicId: clinic.id,
            type,
            date,
            time,
            patientName: 'Demo Foydalanuvchi',
          })
          const appt = useMedicStore.getState().appointments.find((a) => a.id === aid)
          setDone({ code: appt?.code ?? '', id: aid })
        }}
      >
        {uz.book.confirm}
      </Button>
    </div>
  )
}
