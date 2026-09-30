import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Package, Phone, Truck } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { couriersSeed } from '@/data/couriers'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { OrderStatus } from '@/types'

const PICKUP_STEPS = ['accepted', 'preparing', 'ready', 'delivered'] as const
const DELIVERY_STEPS = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered'] as const

export function OrderTrackPage() {
  const { id } = useParams()
  const order = useMedicStore((s) => s.orders.find((o) => o.id === id))
  const addOrderMessage = useMedicStore((s) => s.addOrderMessage)
  const retryOrder = useMedicStore((s) => s.retryOrder)
  const [msg, setMsg] = useState('')

  if (!order) return <div className="p-4 text-sm text-[var(--muted)]">{uz.order.notFound}</div>
  const pharmacy = pharmaciesSeed.find((p) => p.id === order.pharmacyId)
  const courier = couriersSeed.find((item) => item.id === order.courierId)
  const steps: readonly OrderStatus[] = order.deliveryMode === 'delivery' ? DELIVERY_STEPS : PICKUP_STEPS
  const activeStatus = order.status === 'failed' ? 'out_for_delivery' : order.status
  const activeIndex = steps.indexOf(activeStatus)
  const total = order.items.reduce((sum, item) => {
    const drug = drugsSeed.find((entry) => entry.id === item.drugId)
    return sum + (drug?.basePrice ?? 0) * item.quantity
  }, 0)
  const statusVariant = order.status === 'delivered'
    ? 'ok'
    : order.status === 'failed' || order.status === 'cancelled'
      ? 'danger'
      : 'default'

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-4">
      <Link to="/app/orders" className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]">
        <ArrowLeft size={16} /> {uz.order.myOrders}
      </Link>

      <header className="mt-3 border-b border-[var(--border)] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="mr-auto text-xl font-semibold">{uz.order.title} · {order.id}</h1>
          <Badge variant={statusVariant}>{uz.order.status[order.status]}</Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>{order.deliveryMode === 'delivery' ? uz.order.delivery : uz.order.pickup}</Badge>
          <Badge variant={order.priority === 'express' ? 'promoted' : 'default'}>
            {order.priority === 'express' ? uz.order.priorityExpress : uz.order.priorityStandard}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">{pharmacy?.name}</p>
      </header>

      <section className="mt-5 border-y border-[var(--border)] py-4">
        <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, index) => {
            const complete = activeIndex >= index
            return (
              <li key={step} className="min-w-0 text-center">
                <div className="flex items-center">
                  {index > 0 && <span className={`h-px flex-1 ${complete ? 'bg-[var(--fg)]' : 'bg-[var(--border)]'}`} />}
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${complete ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]' : 'border border-[var(--border)] text-[var(--muted)]'}`}>
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && <span className={`h-px flex-1 ${activeIndex > index ? 'bg-[var(--fg)]' : 'bg-[var(--border)]'}`} />}
                </div>
                <span className="mt-2 block text-[10px] leading-tight text-[var(--muted)]">{uz.order.status[step]}</span>
              </li>
            )
          })}
        </ol>
      </section>

      {order.deliveryMode === 'delivery' && (
        <section className="mt-6 border-b border-[var(--border)] pb-4">
          <h2 className="text-sm font-semibold">{uz.order.deliveryMap}</h2>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 bg-[var(--surface)] px-2 py-4 text-center">
            <div className="min-w-0">
              <MapPin size={18} className="mx-auto" />
              <p className="mt-1 truncate text-[10px] font-medium">{uz.order.pharmacyPoint}</p>
              <p className="truncate text-[10px] text-[var(--muted)]">{pharmacy?.name}</p>
            </div>
            <span className="w-4 border-t border-dashed border-[var(--muted)]" />
            <div className="min-w-0">
              <Truck size={18} className="mx-auto" />
              <p className="mt-1 truncate text-[10px] font-medium">{uz.order.courierPoint}</p>
              <p className="truncate text-[10px] text-[var(--muted)]">{courier?.name ?? uz.order.noCourier}</p>
            </div>
            <span className="w-4 border-t border-dashed border-[var(--muted)]" />
            <div className="min-w-0">
              <MapPin size={18} className="mx-auto text-[var(--muted)]" />
              <p className="mt-1 truncate text-[10px] font-medium">{uz.order.addressPoint}</p>
              <p className="truncate text-[10px] text-[var(--muted)]">{order.address}</p>
            </div>
          </div>
          <p className="mt-3 text-sm"><span className="text-[var(--muted)]">{uz.order.address}: </span>{order.address}</p>
        </section>
      )}

      {order.deliveryMode === 'delivery' && order.courierId && (
        <section className="mt-4 flex items-center gap-3 border-b border-[var(--border)] py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface)]"><Truck size={19} /></div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[var(--muted)]">{uz.order.courier}</p>
            <p className="truncate text-sm font-semibold">{courier?.name ?? uz.order.noCourier}</p>
            {courier && <p className="text-xs text-[var(--muted)]">{courier.vehicle} · {courier.phone}</p>}
          </div>
          {order.etaMinutes !== null && order.etaMinutes !== undefined && (
            <div className="text-right">
              <p className="text-xs text-[var(--muted)]">{uz.order.eta}</p>
              <p className="text-sm font-semibold">{order.etaMinutes} {uz.order.minutes}</p>
            </div>
          )}
          {courier && <a href={`tel:${courier.phone.replaceAll(' ', '')}`} aria-label={uz.order.callCourier} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-input)] border border-[var(--border)]"><Phone size={17} /></a>}
        </section>
      )}

      {order.deliveryMode === 'pickup' && order.status === 'ready' && order.pickupCode && (
        <section className="mt-4 flex flex-col items-center border-y border-[var(--border)] py-4 text-center">
          <p className="text-xs text-[var(--muted)]">{uz.order.pickupCode}</p>
          <p className="mt-1 font-mono text-4xl font-semibold tracking-[0.2em]">{order.pickupCode}</p>
          <div className="mt-4 bg-white p-2">
            <QRCodeSVG value={`medic-ai-order:${order.id}:${order.pickupCode}`} size={144} aria-label={uz.order.pickupQrLabel} />
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">{uz.order.showPickupCode}</p>
        </section>
      )}

      {order.status === 'failed' && (
        <section className="mt-4 border-y border-[var(--border)] py-3">
          <Badge variant="danger">{uz.order.failed}</Badge>
          {order.failReason && <p className="mt-2 text-sm text-[var(--muted)]">{order.failReason}</p>}
          <Button variant="outline" className="mt-3 w-full" onClick={() => retryOrder(order.id)}>{uz.order.retry}</Button>
        </section>
      )}

      <section className="mt-5">
        <h2 className="mb-3 text-sm font-semibold">{uz.order.timeline}</h2>
        <ol className="space-y-0 border-l border-[var(--border)] pl-4">
          {[...(order.events ?? [])].sort((a, b) => b.at.localeCompare(a.at)).map((event) => (
            <li key={event.id} className="relative pb-4 last:pb-0">
              <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg)] bg-[var(--fg)]" />
              <p className="text-sm">{event.text}</p>
              <time className="mt-0.5 block text-xs text-[var(--muted)]">{new Date(event.at).toLocaleString('uz-UZ', { dateStyle: 'medium', timeStyle: 'short' })}</time>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-5 border-t border-[var(--border)] pt-4">
        <h2 className="mb-2 text-sm font-semibold">{uz.order.items}</h2>
        <div className="divide-y divide-[var(--border)]">
          {order.items.map((item) => {
            const drug = drugsSeed.find((entry) => entry.id === item.drugId)
            return <div key={item.drugId} className="flex justify-between gap-3 py-2 text-sm"><span>{drug?.name} × {item.quantity}</span><span className="shrink-0 text-[var(--muted)]">{((drug?.basePrice ?? 0) * item.quantity).toLocaleString('uz-UZ')} {uz.order.currency}</span></div>
          })}
        </div>
        <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 text-sm font-semibold"><span>{uz.order.total}</span><span>{total.toLocaleString('uz-UZ')} {uz.order.currency}</span></div>
      </section>

      <section className="mt-5 border-t border-[var(--border)] pt-4">
        <h2 className="mb-2 text-sm font-semibold">{uz.order.chat}</h2>
        <div className="mb-3 max-h-48 space-y-2 overflow-y-auto rounded-[var(--radius-card)] border border-[var(--border)] p-3">
          {order.chat.map((message) => (
            <div key={message.id} className={`text-sm ${message.from === 'user' ? 'text-right' : ''}`}>
              <span className={`inline-block max-w-[90%] rounded-xl px-2.5 py-1 ${message.from === 'user' ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]' : 'bg-[var(--surface)]'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(event) => {
          event.preventDefault()
          if (!msg.trim()) return
          addOrderMessage(order.id, msg.trim(), 'user')
          setMsg('')
          window.setTimeout(() => addOrderMessage(order.id, uz.order.chatReply, 'provider'), 800)
        }}>
          <input value={msg} onChange={(event) => setMsg(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm" placeholder={uz.order.chatPlaceholder} />
          <Button type="submit">{uz.order.send}</Button>
        </form>
      </section>
    </div>
  )
}
