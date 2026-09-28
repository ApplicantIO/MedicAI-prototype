import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { Button } from '@/components/ui/button'
import type { DeliveryMode, PaymentMethod } from '@/types'

export function CartPage() {
  const cart = useMedicStore((s) => s.cart)
  const updateCartQty = useMedicStore((s) => s.updateCartQty)
  const placeOrder = useMedicStore((s) => s.placeOrder)
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState<DeliveryMode>('pickup')
  const [pay, setPay] = useState<PaymentMethod>('card')

  if (cart.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-[var(--muted)]">{uz.cart.empty}</p>
        <Button className="mt-4" asChild>
          <Link to="/app/pharmacy">{uz.pharmacy.title}</Link>
        </Button>
      </div>
    )
  }

  const pharmacyId = cart[0]!.pharmacyId
  const total = cart.reduce((s, c) => {
    const d = drugsSeed.find((x) => x.id === c.drugId)
    return s + (d?.basePrice ?? 0) * c.quantity
  }, 0)

  return (
    <div className="px-4 pb-8 pt-4">
      <h1 className="mb-4 text-xl font-semibold">{uz.cart.title}</h1>
      <div className="space-y-2">
        {cart.map((c) => {
          const d = drugsSeed.find((x) => x.id === c.drugId)
          const p = pharmaciesSeed.find((x) => x.id === c.pharmacyId)
          return (
            <div key={`${c.drugId}-${c.pharmacyId}`} className="flex items-center gap-3 border-b border-[var(--border)] py-3">
              <div className="flex-1">
                <div className="text-sm font-medium">{d?.name}</div>
                <div className="text-xs text-[var(--muted)]">{p?.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded border border-[var(--border)]"
                  onClick={() => updateCartQty(c.drugId, c.pharmacyId, c.quantity - 1)}
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{c.quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded border border-[var(--border)]"
                  onClick={() => updateCartQty(c.drugId, c.pharmacyId, c.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5">
        <div className="mb-2 text-sm font-medium">Yetkazib berish</div>
        <div className="flex gap-2">
          {(['pickup', 'delivery'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setDelivery(m)}
              className={`flex-1 rounded-[var(--radius-input)] border py-2 text-sm ${
                delivery === m ? 'border-[var(--fg)]' : 'border-[var(--border)]'
              }`}
            >
              {m === 'pickup' ? uz.cart.pickup : uz.cart.delivery}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium">Toʻlov</div>
        <div className="flex gap-2">
          {(['card', 'cash'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPay(m)}
              className={`flex-1 rounded-[var(--radius-input)] border py-2 text-sm ${
                pay === m ? 'border-[var(--fg)]' : 'border-[var(--border)]'
              }`}
            >
              {m === 'card' ? uz.cart.payCard : uz.cart.payCash}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold">
        <span>Jami</span>
        <span>{total.toLocaleString('uz-UZ')} soʻm</span>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={() => {
          const oid = placeOrder({
            pharmacyId,
            items: cart.map((c) => ({ drugId: c.drugId, quantity: c.quantity })),
            deliveryMode: delivery,
            paymentMethod: pay,
          })
          navigate(`/app/orders/${oid}`)
        }}
      >
        {uz.cart.placeOrder}
      </Button>
    </div>
  )
}
