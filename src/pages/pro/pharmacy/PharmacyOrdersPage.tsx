import { useState } from 'react'
import { MapPin, Truck } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { couriersSeed } from '@/data/couriers'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Order, OrderStatus } from '@/types'

const COLUMNS: OrderStatus[] = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered']

export function PharmacyOrdersPage() {
  const orders = useMedicStore((state) => state.orders)
  const advanceOrder = useMedicStore((state) => state.advanceOrder)
  const assignCourier = useMedicStore((state) => state.assignCourier)
  const markDelivered = useMedicStore((state) => state.markDelivered)
  const markFailed = useMedicStore((state) => state.markFailed)
  const [courierByOrder, setCourierByOrder] = useState<Record<string, string>>({})
  const today = new Date().toDateString()
  const todayNew = orders.filter((order) => new Date(order.createdAt).toDateString() === today).length
  const onTheWay = orders.filter((order) => order.status === 'out_for_delivery').length
  const failed = orders.filter((order) => order.status === 'failed')
  const delivered = orders.filter((order) => order.status === 'delivered').length
  const metrics = [
    { label: uz.order.todayNew, value: todayNew },
    { label: uz.order.onTheWay, value: onTheWay },
    { label: uz.order.failed, value: failed.length },
    { label: uz.order.delivered, value: delivered },
  ]

  const renderOrder = (order: Order) => {
    const courier = couriersSeed.find((item) => item.id === order.courierId)
    const selectedCourier = courierByOrder[order.id] ?? order.courierId ?? couriersSeed[0]!.id
    return (
      <article key={order.id} className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] p-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-xs text-[var(--muted)]">{order.id}</span>
          {order.priority === 'express' && <Badge variant="promoted">{uz.order.priorityExpress}</Badge>}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge>{order.deliveryMode === 'delivery' ? uz.order.delivery : uz.order.pickup}</Badge>
          {order.priority !== 'express' && <Badge>{uz.order.priorityStandard}</Badge>}
        </div>
        <ul className="mt-2 space-y-1 text-sm">
          {order.items.map((item) => (
            <li key={item.drugId} className="leading-snug">
              {drugsSeed.find((drug) => drug.id === item.drugId)?.name} × {item.quantity}
            </li>
          ))}
        </ul>
        {order.deliveryMode === 'delivery' && order.address && (
          <p className="mt-2 flex gap-1.5 text-xs text-[var(--muted)]"><MapPin size={14} className="shrink-0" />{order.address}</p>
        )}
        {order.deliveryMode === 'delivery' && (courier || order.etaMinutes != null) && (
          <p className="mt-2 flex gap-1.5 text-xs text-[var(--muted)]">
            <Truck size={14} className="shrink-0" />
            {courier?.name ?? uz.order.noCourier}{order.etaMinutes != null ? ` · ${order.etaMinutes} ${uz.order.minutes}` : ''}
          </p>
        )}
        {(order.status === 'accepted' || order.status === 'preparing') && (
          <Button size="sm" className="mt-3 w-full" onClick={() => advanceOrder(order.id)}>{uz.order.nextStatus}</Button>
        )}
        {order.status === 'ready' && order.deliveryMode === 'delivery' && (
          <div className="mt-3 space-y-2">
            <label className="sr-only" htmlFor={`courier-${order.id}`}>{uz.order.selectCourier}</label>
            <select
              id={`courier-${order.id}`}
              value={selectedCourier}
              onChange={(event) => setCourierByOrder((current) => ({ ...current, [order.id]: event.target.value }))}
              className="h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-2 text-xs"
            >
              {couriersSeed.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.vehicle}</option>)}
            </select>
            <Button size="sm" className="w-full" onClick={() => assignCourier(order.id, selectedCourier)}>{uz.order.assignCourier}</Button>
          </div>
        )}
        {order.status === 'ready' && order.deliveryMode === 'pickup' && (
          <Button size="sm" className="mt-3 w-full" onClick={() => markDelivered(order.id)}>{uz.order.customerPickup}</Button>
        )}
        {order.status === 'out_for_delivery' && (
          <div className="mt-3 grid grid-cols-1 gap-2">
            <Button size="sm" onClick={() => markDelivered(order.id)}>{uz.order.markDelivered}</Button>
            <Button size="sm" variant="outline" onClick={() => markFailed(order.id, uz.order.failureReasons.noAnswer)}>{uz.order.failedAction}</Button>
          </div>
        )}
        {order.status === 'failed' && order.failReason && (
          <p className="mt-2 text-xs text-[var(--status-danger)]">{order.failReason}</p>
        )}
      </article>
    )
  }

  return (
    <div className="min-w-0">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--muted)]">{uz.order.logistics}</p>
          <h1 className="mt-1 text-xl font-semibold">{uz.order.logistics}</h1>
        </div>
      </header>
      <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between gap-2 rounded-[var(--radius-input)] border border-[var(--border)] px-3 py-2.5">
            <span className="text-xs text-[var(--muted)]">{metric.label}</span>
            <span className="text-lg font-semibold tabular-nums">{metric.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="grid min-w-[1120px] grid-cols-5 gap-3">
          {COLUMNS.map((column) => {
            const columnOrders = orders.filter((order) => order.status === column)
            return (
              <section key={column} className="min-w-0 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-2.5">
                <header className="mb-3 flex items-center justify-between gap-2 px-0.5">
                  <h2 className="text-xs font-semibold">{uz.order.status[column]}</h2>
                  <span className="text-xs tabular-nums text-[var(--muted)]">{columnOrders.length}</span>
                </header>
                <div className="space-y-2">
                  {columnOrders.map(renderOrder)}
                  {columnOrders.length === 0 && <p className="px-1 py-2 text-xs text-[var(--muted)]">{uz.order.emptyColumn}</p>}
                </div>
              </section>
            )
          })}
        </div>
      </div>
      <section className="mt-4 rounded-[var(--radius-card)] border border-[var(--border)] p-3">
        <header className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{uz.order.failed}</h2>
          <span className="text-xs text-[var(--muted)]">{failed.length}</span>
        </header>
        {failed.length > 0 ? (
          <div className="mt-2 divide-y divide-[var(--border)]">
            {failed.map((order) => (
              <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <span className="font-mono text-xs text-[var(--muted)]">{order.id}</span>
                <span className="min-w-0 flex-1 text-xs">{order.failReason}</span>
                <Badge variant="danger">{uz.order.status.failed}</Badge>
              </div>
            ))}
          </div>
        ) : <p className="mt-2 text-xs text-[var(--muted)]">{uz.order.noFailedOrders}</p>}
      </section>
    </div>
  )
}
