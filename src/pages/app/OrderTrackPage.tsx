import { useParams } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { pharmaciesSeed } from '@/data/pharmacies'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const STEPS = ['accepted', 'preparing', 'ready', 'delivered'] as const

export function OrderTrackPage() {
  const { id } = useParams()
  const order = useMedicStore((s) => s.orders.find((o) => o.id === id))
  const addOrderMessage = useMedicStore((s) => s.addOrderMessage)
  const [msg, setMsg] = useState('')

  if (!order) return <div className="p-4">Topilmadi</div>
  const pharmacy = pharmaciesSeed.find((p) => p.id === order.pharmacyId)
  const idx = STEPS.indexOf(order.status)

  return (
    <div className="px-4 pb-8 pt-4">
      <h1 className="text-xl font-semibold">{uz.order.title}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">{pharmacy?.name}</p>

      <div className="mt-6 flex justify-between">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                i <= idx
                  ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]'
                  : 'border border-[var(--border)] text-[var(--muted)]'
              }`}
            >
              {i + 1}
            </div>
            <span className="mt-1 text-center text-[10px] text-[var(--muted)]">
              {uz.order.status[s]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-1 text-sm">
        {order.items.map((it) => {
          const d = drugsSeed.find((x) => x.id === it.drugId)
          return (
            <div key={it.drugId} className="flex justify-between">
              <span>
                {d?.name} × {it.quantity}
              </span>
            </div>
          )
        })}
      </div>

      <h2 className="mb-2 mt-6 text-sm font-semibold">{uz.order.chat}</h2>
      <div className="mb-3 max-h-40 space-y-2 overflow-y-auto rounded-[var(--radius-card)] border border-[var(--border)] p-3">
        {order.chat.map((m) => (
          <div key={m.id} className={`text-sm ${m.from === 'user' ? 'text-right' : ''}`}>
            <span
              className={`inline-block rounded-xl px-2.5 py-1 ${
                m.from === 'user' ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]' : 'bg-[var(--surface)]'
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!msg.trim()) return
          addOrderMessage(order.id, msg.trim(), 'user')
          setMsg('')
          setTimeout(() => {
            addOrderMessage(order.id, 'Rahmat, tez orada javob beramiz (demo).', 'provider')
          }, 800)
        }}
      >
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="min-h-11 flex-1 rounded-[var(--radius-input)] border border-[var(--border)] px-3 text-sm"
          placeholder="Xabar…"
        />
        <Button type="submit">Yuborish</Button>
      </form>
    </div>
  )
}
