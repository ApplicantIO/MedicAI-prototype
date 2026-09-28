import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { drugsSeed } from '@/data/drugs'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'

const SCRIPT = [
  { from: 'provider' as const, text: 'Salom, eshityapsizmi?' },
  { from: 'user' as const, text: 'Ha, eshityapman.' },
  { from: 'provider' as const, text: 'Belgilaringiz haqida qisqacha gapiring.' },
  { from: 'user' as const, text: 'Bir necha kundan beri bezovta qilmoqda.' },
  { from: 'provider' as const, text: 'Tushunarli. Tavsiya va retsept yozaman (demo).' },
]

export function ConsultPage() {
  const { id } = useParams()
  const appointment = useMedicStore((s) => s.appointments.find((a) => a.id === id))
  const addConsultSummary = useMedicStore((s) => s.addConsultSummary)
  const setStatus = useMedicStore((s) => s.setAppointmentStatus)
  const addToCart = useMedicStore((s) => s.addToCart)
  const [step, setStep] = useState(0)
  const [ended, setEnded] = useState(false)
  const doctor = doctorsSeed.find((d) => d.id === appointment?.doctorId)

  if (!appointment) return <div className="p-4">Topilmadi</div>

  const messages = SCRIPT.slice(0, step + 1)

  const endConsult = () => {
    const drugIds = ['dr1', 'dr10']
    addConsultSummary({
      appointmentId: appointment.id,
      summary: 'Demo konsultatsiya: umumiy holat baholandi, parhez va dam tavsiya etildi.',
      prescriptionDrugIds: drugIds,
    })
    setStatus(appointment.id, 'completed')
    setEnded(true)
  }

  if (ended) {
    const summary = useMedicStore.getState().consultSummaries.find((c) => c.appointmentId === appointment.id)
    return (
      <div className="px-4 py-8">
        <h1 className="text-xl font-semibold">{uz.consult.summary}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{summary?.summary}</p>
        <h2 className="mt-6 text-sm font-semibold">{uz.consult.prescription}</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {summary?.prescriptionDrugIds.map((id) => {
            const d = drugsSeed.find((x) => x.id === id)
            return <li key={id}>· {d?.name}</li>
          })}
        </ul>
        <Button
          className="mt-6 w-full"
          onClick={() => {
            summary?.prescriptionDrugIds.forEach((drugId) =>
              addToCart({ drugId, pharmacyId: 'p1', quantity: 1 }),
            )
          }}
          asChild
        >
          <Link to="/app/cart">{uz.consult.orderPharmacy}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[70vh] flex-col">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <div className="text-sm font-semibold">Onlayn · {doctor?.name}</div>
        <div className="text-xs text-[var(--muted)]">Video maket (demo)</div>
      </div>
      <div className="flex aspect-video items-center justify-center bg-[var(--surface)] text-sm text-[var(--muted)]">
        Video chaqiruv maketi
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.from === 'user'
                  ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]'
                  : 'bg-[var(--surface)]'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-[var(--border)] p-4">
        {step < SCRIPT.length - 1 ? (
          <Button className="flex-1" onClick={() => setStep((s) => s + 1)}>
            Keyingi
          </Button>
        ) : (
          <Button className="flex-1" onClick={endConsult}>
            {uz.consult.end}
          </Button>
        )}
      </div>
    </div>
  )
}
