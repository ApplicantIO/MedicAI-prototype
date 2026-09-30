import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { uz } from '@/content/uz'
import { drugsSeed, getOffersForDrug } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { useMedicStore } from '@/store/medic-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function PharmacySearchPage() {
  const [q, setQ] = useState('')
  const cart = useMedicStore((s) => s.cart)
  const addToCart = useMedicStore((s) => s.addToCart)
  const promoted = useMedicStore((s) => s.promotedPharmacies)

  const results = useMemo(() => {
    const drugs = drugsSeed.filter((d) => !q || d.name.toLowerCase().includes(q.toLowerCase()))
    const rows: {
      drugId: string
      drugName: string
      pharmacyId: string
      pharmacyName: string
      price: number
      inStock: boolean
      isPromo: boolean
      distance: number
    }[] = []
    for (const d of drugs.slice(0, 12)) {
      const offers = getOffersForDrug(d.id)
      for (const o of offers) {
        const p = pharmaciesSeed.find((x) => x.id === o.pharmacyId)
        if (!p) continue
        rows.push({
          drugId: d.id,
          drugName: d.name,
          pharmacyId: p.id,
          pharmacyName: p.name,
          price: o.price,
          inStock: o.inStock,
          isPromo: !!promoted[p.id],
          distance: p.distanceKm,
        })
      }
    }
    rows.sort((a, b) => {
      if (a.isPromo !== b.isPromo) return a.isPromo ? -1 : 1
      return a.price - b.price
    })
    return rows
  }, [q, promoted])

  return (
    <div className="px-4 pb-6 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{uz.pharmacy.title}</h1>
        <Link to="/app/cart" className="relative text-[var(--fg)]">
          <ShoppingCart size={22} strokeWidth={1.5} />
          {cart.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] px-1 text-[10px] text-[var(--fg)]">
              {cart.reduce((s, c) => s + c.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
      <Input placeholder={uz.pharmacy.search} value={q} onChange={(e) => setQ(e.target.value)} className="mb-4" />
      <div className="divide-y divide-[var(--border)]">
        {results.length === 0 && <p className="py-4 text-sm text-[var(--muted)]">{uz.pharmacy.empty}</p>}
        {results.map((r) => (
          <div
            key={`${r.drugId}-${r.pharmacyId}`}
            className="flex items-center gap-3 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{r.drugName}</span>
                {r.isPromo && <Badge variant="promoted">{uz.pharmacy.promoted}</Badge>}
              </div>
              <div className="text-xs text-[var(--muted)]">
                {r.pharmacyName} · {r.distance} {uz.pharmacy.distance}
              </div>
              <div className="truncate text-xs text-[var(--muted)]">
                {r.price.toLocaleString('uz-UZ')} {uz.order.currency} · {r.inStock ? uz.pharmacy.inStock : uz.pharmacy.outOfStock}
              </div>
            </div>
            <Button
              size="sm"
              disabled={!r.inStock}
              onClick={() => addToCart({ drugId: r.drugId, pharmacyId: r.pharmacyId, quantity: 1 })}
            >
              {uz.pharmacy.addCart}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
