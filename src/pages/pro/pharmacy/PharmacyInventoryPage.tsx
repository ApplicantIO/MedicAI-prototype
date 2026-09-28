import { useState } from 'react'
import { useMedicStore } from '@/store/medic-store'
import { drugsSeed } from '@/data/drugs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function PharmacyInventoryPage() {
  const inventory = useMedicStore((s) => s.inventory)
  const updateInventory = useMedicStore((s) => s.updateInventory)
  const connected = useMedicStore((s) => s.inventoryConnected)
  const syncedAt = useMedicStore((s) => s.inventorySyncedAt)
  const setInventoryConnected = useMedicStore((s) => s.setInventoryConnected)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [query, setQuery] = useState('')
  const lowStockCount = inventory.filter((row) => row.stock <= 10).length
  const visibleInventory = inventory.filter((row) => {
    const drug = drugsSeed.find((item) => item.id === row.drugId)
    return drug?.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  const startConnect = () => {
    setStep(1)
    setProgress(0)
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv)
          setInventoryConnected(true)
          setStep(2)
          return 100
        }
        return p + 10
      })
    }, 200)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Ombor</h1>
        <div className="text-sm text-[var(--muted)]">
          {connected ? (
            <>Ulandi · {syncedAt ? new Date(syncedAt).toLocaleString('uz-UZ') : ''}</>
          ) : (
            'Ulanmagan'
          )}
        </div>
      </div>

      {!connected && step === 0 && (
        <div className="mb-6 rounded-[var(--radius-card)] border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--muted)]">Maʼlumotlarni ulash (demo wizard)</p>
          <Button className="mt-3" onClick={startConnect}>
            Fayl yuklash (soxta)
          </Button>
        </div>
      )}
      {step === 1 && (
        <div className="mb-6">
          <div className="h-2 overflow-hidden rounded-full bg-[var(--surface)]">
            <div className="h-full bg-[var(--accent)] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">Yuklanmoqda… {progress}%</p>
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ombordan dori qidirish…" className="max-w-md" />
        <span className={`text-xs ${lowStockCount ? 'text-[var(--status-warn)]' : 'text-[var(--muted)]'}`}>
          Kam qoldiq: {lowStockCount}
        </span>
      </div>

      <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2 font-medium">Dori</th>
              <th className="px-3 py-2 font-medium">Narx</th>
              <th className="px-3 py-2 font-medium">Qoldiq</th>
            </tr>
          </thead>
          <tbody>
            {visibleInventory.slice(0, 20).map((row) => {
              const d = drugsSeed.find((x) => x.id === row.drugId)
              return (
                <tr key={row.drugId} className={`border-b border-[var(--border)] ${row.stock <= 10 ? 'bg-[var(--status-warn)]/5' : ''}`}>
                  <td className="px-3 py-2">{d?.name}{row.stock <= 10 && <span className="ml-2 text-[11px] text-[var(--status-warn)]">Kam qoldi</span>}</td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      className="h-9 w-28"
                      value={row.price}
                      onChange={(e) => updateInventory(row.drugId, { price: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      className="h-9 w-20"
                      value={row.stock}
                      onChange={(e) => updateInventory(row.drugId, { stock: Number(e.target.value) })}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
