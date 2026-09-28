import { useMemo, useState } from 'react'
import { Check, Video } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { drugsSeed } from '@/data/drugs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { uz } from '@/content/uz'

export function DoctorConsultationsPage() {
  const appointments = useMedicStore((s) => s.appointments)
  const setStatus = useMedicStore((s) => s.setAppointmentStatus)
  const addSummary = useMedicStore((s) => s.addConsultSummary)
  const summaries = useMedicStore((s) => s.consultSummaries)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [note, setNote] = useState('Umumiy holat baholandi. Keyingi nazoratga yoziling.')
  const [drugId, setDrugId] = useState('dr1')
  const doctorId = 'd1'
  const doctor = doctorsSeed.find((item) => item.id === doctorId)
  const today = new Date().toISOString().slice(0, 10)
  const queue = useMemo(
    () => appointments.filter((item) => item.doctorId === doctorId && ['pending', 'confirmed'].includes(item.status)),
    [appointments],
  )
  const selected = appointments.find((item) => item.id === selectedId)

  const finishConsultation = () => {
    if (!selected || !note.trim()) return
    if (!summaries.some((summary) => summary.appointmentId === selected.id)) {
      addSummary({ appointmentId: selected.id, summary: note.trim(), prescriptionDrugIds: drugId ? [drugId] : [] })
    }
    setStatus(selected.id, 'completed')
    setSelectedId(null)
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs text-[var(--muted)]">Bugungi navbat va qabul xulosalari</p>
        <h1 className="mt-1 text-2xl font-semibold">Konsultatsiyalar</h1>
      </header>
      <div className="grid grid-cols-12 gap-5">
        <section className="col-span-12 space-y-2 xl:col-span-5">
          {queue.length === 0 && <p className="rounded-[var(--radius-card)] border border-[var(--border)] p-5 text-sm text-[var(--muted)]">Hozircha navbatda bemor yoʻq.</p>}
          {queue.map((appointment) => (
            <button key={appointment.id} type="button" onClick={() => setSelectedId(appointment.id)} className={`w-full rounded-[var(--radius-card)] border p-4 text-left ${selectedId === appointment.id ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'}`}>
              <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold">{appointment.patientName}</span><Badge variant={appointment.date === today ? 'warn' : 'default'}>{appointment.date === today ? 'Bugun' : appointment.date}</Badge></div>
              <p className="mt-1 text-xs text-[var(--muted)]">{appointment.time} · {appointment.type === 'online' ? 'Onlayn' : 'Oflayn'} · {appointment.code}</p>
            </button>
          ))}
        </section>
        <section className="col-span-12 xl:col-span-7">
          {selected ? (
            <div className="rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3"><div><p className="text-xs text-[var(--muted)]">{selected.type === 'online' ? 'Onlayn konsultatsiya' : 'Oflayn qabul'}</p><h2 className="mt-1 text-lg font-semibold">{selected.patientName}</h2><p className="text-sm text-[var(--muted)]">{doctor?.name} · {selected.date} · {selected.time}</p></div><Video size={20} strokeWidth={1.5} className="text-[var(--muted)]" /></div>
              <label className="mt-5 block text-sm font-medium" htmlFor="consult-note">Qabul xulosasi</label>
              <textarea id="consult-note" value={note} onChange={(event) => setNote(event.target.value)} rows={4} className="mt-2 w-full resize-y rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] p-3 text-sm outline-none focus:border-[var(--fg)]" placeholder="Qisqa tavsiya va keyingi qadamlar" />
              <label className="mt-4 block text-sm font-medium" htmlFor="consult-drug">Demo retsept</label>
              <select id="consult-drug" value={drugId} onChange={(event) => setDrugId(event.target.value)} className="mt-2 h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm">
                {drugsSeed.map((drug) => <option key={drug.id} value={drug.id}>{drug.name}</option>)}
                <option value="">Retsept kiritilmaydi</option>
              </select>
              <p className="mt-3 text-xs text-[var(--muted)]">Namuna maʼlumot. Tibbiy hujjat yoki haqiqiy retsept emas.</p>
              <Button className="mt-4 w-full" disabled={!note.trim()} onClick={finishConsultation}><Check size={16} /> Konsultatsiyani yakunlash</Button>
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">Xulosa kiritish uchun chap tomondan qabulni tanlang.</div>
          )}
        </section>
      </div>
      <section>
        <h2 className="mb-3 text-base font-semibold">Yakunlangan qabullar</h2>
        <div className="space-y-2">
          {appointments.filter((item) => item.doctorId === doctorId && item.status === 'completed').map((appointment) => (
            <div key={appointment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3">
              <div><p className="text-sm font-medium">{appointment.patientName}</p><p className="mt-1 text-xs text-[var(--muted)]">{appointment.date} · {appointment.time} · {appointment.code}</p></div>
              <Badge variant="ok">{uz.appointments.status.completed}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
