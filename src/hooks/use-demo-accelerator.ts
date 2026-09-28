import { useEffect } from 'react'
import { APP_CONFIG } from '@/config'
import { useMedicStore } from '@/store/medic-store'

export function useDemoAccelerator() {
  const enabled = useMedicStore((s) => s.demoAccelerator)
  const orders = useMedicStore((s) => s.orders)
  const advanceOrder = useMedicStore((s) => s.advanceOrder)

  useEffect(() => {
    if (!enabled) return
    const active = orders.filter((o) => o.status !== 'delivered')
    if (active.length === 0) return

    const id = window.setInterval(() => {
      const latest = useMedicStore.getState().orders.find((o) => o.status !== 'delivered')
      if (latest) advanceOrder(latest.id)
    }, APP_CONFIG.demoOrderStepMs)

    return () => window.clearInterval(id)
  }, [enabled, orders, advanceOrder])
}
