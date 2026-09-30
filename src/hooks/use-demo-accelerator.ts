import { useEffect } from 'react'
import { APP_CONFIG } from '@/config'
import { useMedicStore } from '@/store/medic-store'

export function useDemoAccelerator() {
  const enabled = useMedicStore((s) => s.demoAccelerator)
  const orders = useMedicStore((s) => s.orders)
  const advanceOrder = useMedicStore((s) => s.advanceOrder)

  useEffect(() => {
    if (!enabled) return
    const isActive = (status: (typeof orders)[number]['status']) =>
      status !== 'delivered' && status !== 'failed' && status !== 'cancelled'
    const active = orders.filter((order) => isActive(order.status))
    if (active.length === 0) return

    const id = window.setInterval(() => {
      const latest = useMedicStore.getState().orders.find((order) => isActive(order.status))
      if (latest) advanceOrder(latest.id)
    }, APP_CONFIG.demoOrderStepMs)

    return () => window.clearInterval(id)
  }, [enabled, orders, advanceOrder])
}
