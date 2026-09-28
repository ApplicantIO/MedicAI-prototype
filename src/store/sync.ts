import { APP_CONFIG } from '@/config'
import { useMedicStore } from './medic-store'

let channel: BroadcastChannel | null = null

export function initStoreSync() {
  if (typeof window === 'undefined') return

  try {
    channel = new BroadcastChannel(APP_CONFIG.broadcastChannel)
    channel.onmessage = () => {
      void useMedicStore.persist.rehydrate()
    }
  } catch {
    channel = null
  }

  window.addEventListener('storage', (e) => {
    if (e.key === APP_CONFIG.storageKey) {
      void useMedicStore.persist.rehydrate()
    }
  })

  useMedicStore.subscribe(() => {
    channel?.postMessage({ t: Date.now() })
  })
}
