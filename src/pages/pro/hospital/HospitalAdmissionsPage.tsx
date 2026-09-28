import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function HospitalAdmissionsPage() {
  const beds = useMedicStore((s) => s.hospitalBeds)
  const setBed = useMedicStore((s) => s.setHospitalBed)
  const [patient, setPatient] = useState('')
  const [ward, setWard] = useState('Terapiya')
  const [notice, setNotice] = useState('')
  const wards = Array.from(new Set(beds.map((bed) => bed.ward)))
  const occupied = beds.filter((bed) => bed.status === 'occupied')

  const admit = () => {
    const freeBed = beds.find((bed) => bed.ward === ward && bed.status === 'available')
    if (!freeBed) {
      setNotice(`${ward} boʻlimida boʻsh oʻrin yoʻq.`)
      return
    }
    setBed(freeBed.id, 'occupied', patient.trim())
    setNotice(`${patient.trim()} bemor ${freeBed.id} oʻringa joylashtirildi.`)
    setPatient('')
  }

  return (
    <div className="space-y-5">
      <header><p className="text-xs text-[var(--muted)]">Yangi kelgan bemorni boʻsh oʻringa joylashtirish</p><h1 className="mt-1 text-2xl font-semibold">Qabul va joylashtirish</h1></header>
      <section className="max-w-2xl rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
        <div className="flex items-center gap-2"><UserPlus size={18} strokeWidth={1.5}/><h2 className="text-base font-semibold">Yangi qabul</h2></div>
        <label className="mt-4 block text-sm font-medium" htmlFor="admission-name">Bemor ismi (demo)</label>
        <Input id="admission-name" className="mt-2" value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Masalan, A. Karimov" />
        <label className="mt-4 block text-sm font-medium" htmlFor="admission-ward">Boʻlim</label>
        <select id="admission-ward" value={ward} onChange={(event) => setWard(event.target.value)} className="mt-2 h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm">
          {wards.map((item) => <option key={item}>{item}</option>)}
        </select>
        <Button className="mt-4 w-full sm:w-auto" disabled={!patient.trim()} onClick={admit}>Boʻsh oʻringa joylashtirish</Button>
        {notice && <p role="status" className="mt-3 text-sm text-[var(--muted)]">{notice}</p>}
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">Statsionar bemorlar</h2><Badge variant="default">{occupied.length} ta</Badge></div>
        {occupied.length ? <div className="grid grid-cols-12 gap-3">{occupied.map((bed) => <article key={bed.id} className="col-span-12 flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-6 xl:col-span-4"><div><h3 className="text-sm font-medium">{bed.patientName}</h3><p className="mt-1 text-xs text-[var(--muted)]">{bed.ward} · Oʻrin {bed.id}</p></div><Badge variant="warn">Joylashtirildi</Badge></article>)}</div> : <p className="rounded-[var(--radius-card)] border border-[var(--border)] p-5 text-sm text-[var(--muted)]">Hozircha statsionarda bemor yoʻq.</p>}
      </section>
      <p className="text-xs text-[var(--muted)]">Namuna bemor maʼlumotlari. Shoshilinch yordam uchun 103 ga qoʻngʻiroq qiling.</p>
    </div>
  )
}
