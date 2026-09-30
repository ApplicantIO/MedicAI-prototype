import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { Button } from '@/components/ui/button'
import type { DeliveryMode, OrderPriority, PaymentMethod } from '@/types'

export function CartPage() {
  const cart = useMedicStore((s) => s.cart)
  const updateCartQty = useMedicStore((s) => s.updateCartQty)
  const placeOrder = useMedicStore((s) => s.placeOrder)
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState<DeliveryMode>('pickup')
  const [pay, setPay] = useState<PaymentMethod>('card')
  const [priority, setPriority] = useState<OrderPriority>('standard')
  const [address, setAddress] = useState('')

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
                  className="h-11 w-11 rounded-[var(--radius-input)] border border-[var(--border)]"
                  onClick={() => updateCartQty(c.drugId, c.pharmacyId, c.quantity - 1)}
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{c.quantity}</span>
                <button
                  type="button"
                  className="h-11 w-11 rounded-[var(--radius-input)] border border-[var(--border)]"
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
        <div className="mb-2 text-sm font-medium">{uz.order.delivery}</div>
        <div className="flex gap-2">
          {(['pickup', 'delivery'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setDelivery(m)}
              className={`min-h-11 flex-1 rounded-[var(--radius-input)] border px-2 text-sm ${
                delivery === m ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'
              }`}
            >
              {m === 'pickup' ? uz.cart.pickup : uz.cart.delivery}
            </button>
          ))}
        </div>
      </div>

      {delivery === 'delivery' && (
        <div className="mt-4">
          <label htmlFor="delivery-address" className="mb-2 block text-sm font-medium">{uz.order.address}</label>
          <input
            id="delivery-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="min-h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm text-[var(--fg)]"
            placeholder={uz.cart.addressPlaceholder}
          />
        </div>
      )}

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium">{uz.order.priorityStandard} / {uz.order.priorityExpress}</div>
        <div className="flex gap-2">
          {(['standard', 'express'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPriority(value)}
              className={`min-h-11 flex-1 rounded-[var(--radius-input)] border px-3 text-sm ${
                priority === value ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'
              }`}
            >
              {value === 'express' ? uz.order.priorityExpress : uz.order.priorityStandard}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium">{uz.cart.payment}</div>
        <div className="flex gap-2">
          {(['card', 'cash'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPay(m)}
              className={`min-h-11 flex-1 rounded-[var(--radius-input)] border px-2 text-sm ${
                pay === m ? 'border-[var(--fg)] bg-[var(--surface)]' : 'border-[var(--border)]'
              }`}
            >
              {m === 'card' ? uz.cart.payCard : uz.cart.payCash}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold">
        <span>{uz.order.total}</span>
        <span>{total.toLocaleString('uz-UZ')} {uz.order.currency}</span>
      </div>

      <Button
        className="mt-4 w-full"
        disabled={delivery === 'delivery' && !address.trim()}
        onClick={() => {
          const oid = placeOrder({
            pharmacyId,
            items: cart.map((c) => ({ drugId: c.drugId, quantity: c.quantity })),
            deliveryMode: delivery,
            paymentMethod: pay,
            priority,
            address: delivery === 'delivery' ? address.trim() : undefined,
          })
          navigate(`/app/orders/${oid}`)
        }}
      >
        {uz.cart.placeOrder}
      </Button>
    </div>
  )
}
