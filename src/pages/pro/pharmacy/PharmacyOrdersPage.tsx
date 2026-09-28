import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { OrderStatus } from '@/types'

const COLUMNS: OrderStatus[] = ['accepted', 'preparing', 'ready', 'delivered']

export function PharmacyOrdersPage() {
  const orders = useMedicStore((s) => s.orders)
  const advanceOrder = useMedicStore((s) => s.advanceOrder)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Buyurtmalar</h1>
      <div className="grid grid-cols-12 gap-4">
        {COLUMNS.map((col) => (
          <div key={col} className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-3 md:col-span-6 xl:col-span-3">
            <div className="mb-3 text-sm font-semibold">{uz.order.status[col]}</div>
            <div className="space-y-2">
              {orders
                .filter((o) => o.status === col)
                .map((o) => (
                  <div key={o.id} className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] p-3">
                    <div className="text-xs font-mono text-[var(--muted)]">{o.id}</div>
                    <ul className="mt-1 text-sm">
                      {o.items.map((it) => (
                        <li key={it.drugId}>
                          {drugsSeed.find((d) => d.id === it.drugId)?.name} × {it.quantity}
                        </li>
                      ))}
                    </ul>
                    <Badge className="mt-2" variant="default">
                      {o.deliveryMode === 'pickup' ? 'Olib ketish' : 'Yetkazish'}
                    </Badge>
                    {col !== 'delivered' && (
                      <Button size="sm" className="mt-2 w-full" onClick={() => advanceOrder(o.id)}>
                        Keyingi holat
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
