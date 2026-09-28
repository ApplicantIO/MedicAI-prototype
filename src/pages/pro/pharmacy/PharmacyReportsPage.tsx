import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, ReceiptText } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { uz } from '@/content/uz'

export function PharmacyReportsPage() {
  const orders = useMedicStore((s) => s.orders)
  const inventory = useMedicStore((s) => s.inventory)
  const revenue = orders.reduce((sum, order) => sum + order.items.reduce((subtotal, item) => {
    const drugPrice = inventory.find((row) => row.drugId === item.drugId)?.price ?? drugsSeed.find((drug) => drug.id === item.drugId)?.basePrice ?? 0
    return subtotal + drugPrice * item.quantity
  }, 0), 0)
  const topProducts = useMemo(() => {
    const quantities = new Map<string, number>()
    orders.forEach((order) => order.items.forEach((item) => quantities.set(item.drugId, (quantities.get(item.drugId) ?? 0) + item.quantity)))
    return [...quantities.entries()].map(([drugId, quantity]) => ({ drug: drugsSeed.find((item) => item.id === drugId), quantity })).filter((item) => item.drug).sort((a, b) => b.quantity - a.quantity).slice(0, 5)
  }, [orders])
  const maxQuantity = topProducts[0]?.quantity ?? 1
  const statuses = ['accepted', 'preparing', 'ready', 'delivered'] as const

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs text-[var(--muted)]">Buyurtma va mahsulotlar kesimida</p><h1 className="mt-1 text-2xl font-semibold">Savdo hisoboti</h1></div><Badge variant="default">Demo maʼlumotlar</Badge></header>
      <div className="grid grid-cols-12 gap-3">
        {[
          { label: 'Buyurtmalar', value: orders.length, icon: ReceiptText },
          { label: 'Hisoblangan savdo', value: `${revenue.toLocaleString('uz-UZ')} soʻm`, icon: ArrowRight },
          { label: 'Kam qoldiq', value: inventory.filter((item) => item.stock <= 10).length, icon: Package },
        ].map(({ label, value, icon: Icon }) => <article key={label} className="kpi-stripe col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-6 xl:col-span-4"><div className="flex items-center justify-between gap-3"><span className="text-xs text-[var(--muted)]">{label}</span><Icon size={16} strokeWidth={1.5} className="text-[var(--muted)]"/></div><p className="mt-2 text-xl font-semibold">{value}</p></article>)}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 xl:col-span-7"><h2 className="mb-4 text-base font-semibold">Buyurtmalar holati</h2><div className="space-y-3">{statuses.map((status) => { const count = orders.filter((order) => order.status === status).length; const percent = orders.length ? (count / orders.length) * 100 : 0; return <div key={status}><div className="mb-1 flex justify-between text-sm"><span>{uz.order.status[status]}</span><span className="text-[var(--muted)]">{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-[var(--surface)]"><div className="h-full rounded-full bg-[var(--fg)]" style={{ width: `${percent}%` }}/></div></div>})}</div></section>
        <section className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 xl:col-span-5"><h2 className="mb-4 text-base font-semibold">Koʻp sotilgan mahsulotlar</h2><div className="space-y-4">{topProducts.map(({ drug, quantity }) => <div key={drug!.id}><div className="mb-1 flex justify-between gap-2 text-sm"><span className="truncate">{drug!.name}</span><span className="shrink-0 text-[var(--muted)]">{quantity} dona</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface)]"><div className="h-full rounded-full bg-[var(--fg)]" style={{ width: `${(quantity / maxQuantity) * 100}%` }}/></div></div>)}</div></section>
      </div>
      <div className="flex flex-wrap gap-2"><Button asChild><Link to="/pro/panel/pharmacy/orders">Buyurtmalarga oʻtish</Link></Button><Button variant="outline" asChild><Link to="/pro/panel/pharmacy/inventory">Omborni koʻrish</Link></Button></div>
      <p className="text-xs text-[var(--muted)]">Hisobotlar demo buyurtmalardan hisoblangan taxminiy summalar, buxgalteriya maʼlumoti emas.</p>
    </div>
  )
}
