import { pharmaciesSeed } from '@/data/pharmacies'
import { useMedicStore } from '@/store/medic-store'
import { Switch } from '@/components/ui/switch'

export function PharmacyAdsPage() {
  const promoted = useMedicStore((s) => s.promotedPharmacies)
  const setPromoted = useMedicStore((s) => s.setPromoted)

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Reklama</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Faollashtirilgan dorixonalar qidiruvda yuqorida va «Reklama» belgisi bilan chiqadi.
      </p>
      <div className="space-y-3">
        {pharmaciesSeed.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3"
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-[var(--muted)]">{p.address}</div>
            </div>
            <Switch checked={!!promoted[p.id]} onCheckedChange={(v) => setPromoted(p.id, v)} />
          </div>
        ))}
      </div>
    </div>
  )
}
