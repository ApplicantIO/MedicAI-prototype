import { useState } from 'react'
import { Handshake, MapPinned } from 'lucide-react'
import { regionsSeed } from '@/data/regions'
import { pharmaciesSeed } from '@/data/pharmacies'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'

export function ClinicNetworkPage() {
  const [tab, setTab] = useState<'demand' | 'pharmacies'>('demand')
  const partners = useMedicStore((s) => s.pharmacyPartners)
  const setPartner = useMedicStore((s) => s.setPharmacyPartner)
  const totalDemand = regionsSeed.reduce((sum, region) => sum + region.visits, 0)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Tarmoq</h1>
      </header>
      <div className="grid grid-cols-12 gap-3 border-y border-[var(--border)]">
        <div className="col-span-12 py-3 sm:col-span-6">
          <div className="text-xs text-[var(--muted)]">AI murojaatlari (demo)</div>
          <div className="mt-1 text-xl font-semibold tabular-nums">{totalDemand}</div>
        </div>
        <div className="col-span-12 border-t border-[var(--border)] py-3 sm:col-span-6 sm:border-t-0">
          <div className="text-xs text-[var(--muted)]">Faol dorixona hamkorlari</div>
          <div className="mt-1 text-xl font-semibold tabular-nums">{Object.values(partners).filter(Boolean).length}</div>
        </div>
      </div>
      <div className="flex gap-2 border-b border-[var(--border)]">
        <button type="button" onClick={() => setTab('demand')} className={`min-h-11 border-b-2 px-3 text-sm ${tab === 'demand' ? 'border-[var(--fg)] font-medium' : 'border-transparent text-[var(--muted)]'}`}>Hududlar talabi</button>
        <button type="button" onClick={() => setTab('pharmacies')} className={`min-h-11 border-b-2 px-3 text-sm ${tab === 'pharmacies' ? 'border-[var(--fg)] font-medium' : 'border-transparent text-[var(--muted)]'}`}>Dorixona hamkorlari</button>
      </div>
      {tab === 'demand' ? (
        <section className="space-y-3">
          {regionsSeed.map((region) => (
            <article key={region.id} className="border-b border-[var(--border)] py-3 first:border-t">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3"><MapPinned size={18} strokeWidth={1.5} className="mt-0.5 text-[var(--muted)]" /><div><h2 className="text-sm font-semibold">{region.name}</h2><p className="mt-1 text-xs text-[var(--muted)]">Eng koʻp soʻralgan: {region.topSpecialty}</p></div></div>
                <span className="shrink-0 text-sm font-semibold">{region.visits} ta</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface)]"><div className="h-full rounded-full bg-[var(--fg)]" style={{ width: `${(region.visits / 34) * 100}%` }} /></div>
            </article>
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-12 gap-3">
          {pharmaciesSeed.map((pharmacy) => {
            const partner = !!partners[pharmacy.id]
            return (
              <article key={pharmacy.id} className="col-span-12 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] py-3 sm:col-span-6">
                <div className="flex min-w-0 items-start gap-3"><Handshake size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--muted)]" /><div className="min-w-0"><h2 className="truncate text-sm font-semibold">{pharmacy.name}</h2><p className="mt-1 truncate text-xs text-[var(--muted)]">{pharmacy.address} · {pharmacy.distanceKm} km</p></div></div>
                <Button size="sm" variant={partner ? 'outline' : 'default'} onClick={() => setPartner(pharmacy.id, !partner)}>{partner ? 'Hamkorlik bekor qilish' : 'Soʻrov yuborish'}</Button>
              </article>
            )
          })}
        </section>
      )}
    </div>
  )
}
