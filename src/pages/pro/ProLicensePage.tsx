import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMedicStore } from '@/store/medic-store'
import { pharmaciesSeed } from '@/data/pharmacies'
import type { ProRole } from '@/types'

const options = [
  { id: 'start', title: 'Boshlangʻich', price: 'Bepul', description: 'Asosiy jadval va qabul boshqaruvi' },
  { id: 'plus', title: 'Plus', price: '250 000 soʻm / oy', description: 'Hisobotlar, jamoa vositalari va tezkor yordam' },
  { id: 'growth', title: 'Oʻsish', price: '450 000 soʻm / oy', description: 'Kengaytirilgan tahlil va reklama joylashuvi' },
]

const names: Record<ProRole, string> = { pharmacy: 'Dorixona', clinic: 'Klinika', hospital: 'Shifoxona', doctor: 'Shifokor' }

export function ProLicensePage() {
  const role = useMedicStore((s) => s.proRole)
  const selected = useMedicStore((s) => s.demoLicensePlan)
  const setLicensePlan = useMedicStore((s) => s.setDemoLicensePlan)
  const promoted = useMedicStore((s) => s.promotedPharmacies)
  const setPromoted = useMedicStore((s) => s.setPromoted)
  const [notice, setNotice] = useState('')

  return (
    <div className="space-y-5">
      <header><p className="text-xs text-[var(--muted)]">Tariflar va ko‘rinish sozlamalari</p><h1 className="mt-1 text-2xl font-semibold">Litsenziya va tariflar</h1></header>
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-4">
        <div><p className="text-xs text-[var(--muted)]">Joriy demo litsenziya</p><p className="mt-1 text-sm font-semibold">{names[role]} · namuna hisob</p><p className="mt-1 text-xs text-[var(--muted)]">Haqiqiy toʻlov yoki litsenziya rasmiylashtirilmaydi.</p></div><Badge variant="ok">Faol · demo</Badge>
      </section>
      <div className="grid grid-cols-12 gap-3">
        {options.map((option) => <article key={option.id} className={`col-span-12 rounded-[var(--radius-card)] border p-4 sm:col-span-6 xl:col-span-4 ${selected === option.id ? 'border-[var(--fg)]' : 'border-[var(--border)]'}`}><div className="flex items-center justify-between gap-3"><h2 className="font-semibold">{option.title}</h2>{selected === option.id && <Badge variant="default">Tanlangan</Badge>}</div><p className="mt-3 text-lg font-semibold">{option.price}</p><p className="mt-2 min-h-10 text-sm text-[var(--muted)]">{option.description}</p><Button variant={selected === option.id ? 'outline' : 'default'} className="mt-4 w-full" onClick={() => { setLicensePlan(option.id); setNotice(`${option.title} tarifi demo uchun tanlandi.`) }}>{selected === option.id ? 'Tanlangan tarif' : 'Tarifni tanlash'}</Button></article>)}
      </div>
      {role === 'pharmacy' && <section className="rounded-[var(--radius-card)] border border-[var(--border)] p-4"><h2 className="text-base font-semibold">Qidiruvda targʻib qilish</h2><p className="mt-1 text-sm text-[var(--muted)]">Demo dorixonada yuqori ko‘rinish holatini almashtiring.</p><div className="mt-4 space-y-3">{pharmaciesSeed.map((pharmacy) => { const active = !!promoted[pharmacy.id]; return <label key={pharmacy.id} className="flex min-h-11 items-center justify-between gap-3 border-t border-[var(--border)] pt-3 text-sm"><span>{pharmacy.name} · {active ? 'Faol' : 'Faol emas'}</span><input type="checkbox" checked={active} onChange={(event) => setPromoted(pharmacy.id, event.target.checked)} className="h-4 w-4 accent-[var(--fg)]"/></label> })}</div></section>}
      {notice && <p role="status" className="text-sm text-[var(--muted)]">{notice}</p>}
    </div>
  )
}
