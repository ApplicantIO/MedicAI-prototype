import { useMemo } from 'react'
import { BedDouble } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { HospitalBed } from '@/types'

const statusLabels: Record<HospitalBed['status'], string> = {
  available: 'Boʻsh',
  occupied: 'Band',
  cleaning: 'Tozalashda',
}

export function HospitalBedsPage() {
  const beds = useMedicStore((s) => s.hospitalBeds)
  const setBed = useMedicStore((s) => s.setHospitalBed)
  const wards = useMemo(() => Array.from(new Set(beds.map((bed) => bed.ward))), [beds])
  const available = beds.filter((bed) => bed.status === 'available').length
  const occupied = beds.filter((bed) => bed.status === 'occupied').length
  const cleaning = beds.filter((bed) => bed.status === 'cleaning').length

  const nextStatus = (bed: HospitalBed) => {
    if (bed.status === 'occupied') return setBed(bed.id, 'cleaning')
    if (bed.status === 'cleaning') return setBed(bed.id, 'available')
    return setBed(bed.id, 'cleaning')
  }

  return (
    <div className="space-y-5">
      <header><p className="text-xs text-[var(--muted)]">Palata va joy bandligini demo tarzda yuriting</p><h1 className="mt-1 text-2xl font-semibold">Yotoq oʻrinlari</h1></header>
      <div className="grid grid-cols-12 gap-3">
        {[['Boʻsh', available], ['Band', occupied], ['Tozalashda', cleaning]].map(([label, value]) => (
          <div key={label} className="kpi-stripe col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-4"><div className="text-xs text-[var(--muted)]">{label}</div><div className="mt-1 text-2xl font-semibold">{value}</div></div>
        ))}
      </div>
      <div className="space-y-6">
        {wards.map((ward) => (
          <section key={ward}>
            <h2 className="mb-3 text-base font-semibold">{ward}</h2>
            <div className="grid grid-cols-12 gap-3">
              {beds.filter((bed) => bed.ward === ward).map((bed) => (
                <article key={bed.id} className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-6 xl:col-span-4">
                  <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><BedDouble size={18} strokeWidth={1.5} className="text-[var(--muted)]"/><div><h3 className="text-sm font-semibold">Oʻrin {bed.id}</h3><p className="mt-1 text-xs text-[var(--muted)]">{bed.patientName ?? 'Bemor biriktirilmagan'}</p></div></div><Badge variant={bed.status === 'occupied' ? 'warn' : bed.status === 'cleaning' ? 'default' : 'ok'}>{statusLabels[bed.status]}</Badge></div>
                  <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => nextStatus(bed)}>{bed.status === 'occupied' ? 'Chiqarish · tozalash' : bed.status === 'cleaning' ? 'Tozalash tugadi' : 'Tozalashga yuborish'}</Button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="text-xs text-[var(--muted)]">Bemorlar va yotoq maʼlumotlari demo. Tibbiy ish yuritish tizimi emas.</p>
    </div>
  )
}
