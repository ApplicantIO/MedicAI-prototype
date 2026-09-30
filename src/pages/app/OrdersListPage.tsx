import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function OrdersListPage() {
  const orders = useMedicStore((state) => state.orders)

  if (orders.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-4 text-center">
        <Package size={28} strokeWidth={1.5} className="text-[var(--muted)]" />
        <h1 className="mt-3 text-lg font-semibold">{uz.order.noOrders}</h1>
        <Button className="mt-4" asChild><Link to="/app/pharmacy">{uz.order.openPharmacy}</Link></Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-4">
      <h1 className="text-xl font-semibold">{uz.order.myOrders}</h1>
      <div className="mt-4 divide-y divide-[var(--border)]">
        {orders.map((order) => {
          const pharmacy = pharmaciesSeed.find((item) => item.id === order.pharmacyId)
          const total = order.items.reduce((sum, item) => {
            const drug = drugsSeed.find((entry) => entry.id === item.drugId)
            return sum + (drug?.basePrice ?? 0) * item.quantity
          }, 0)
          return (
            <Link key={order.id} to={`/app/orders/${order.id}`} className="block py-3 transition-colors hover:bg-[var(--surface)]">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{pharmacy?.name}</span>
                    <Badge>{uz.order.status[order.status]}</Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-[var(--muted)]">{new Date(order.createdAt).toLocaleDateString('uz-UZ')} · {order.deliveryMode === 'delivery' ? uz.order.delivery : uz.order.pickup} · {order.items.length} {uz.order.itemCount} · {total.toLocaleString('uz-UZ')} {uz.order.currency}</p>
                </div>
                <ArrowRight size={18} className="mt-1 shrink-0 text-[var(--muted)]" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}