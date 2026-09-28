import { useEffect } from 'react'
import { useMedicStore } from '@/store/medic-store'

export function useThemeEffect() {
  const theme = useMedicStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    const apply = (dark: boolean) => {
      root.classList.toggle('dark', dark)
    }
    if (theme === 'dark') apply(true)
    else if (theme === 'light') apply(false)
    else {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mq.matches)
      const fn = () => apply(mq.matches)
      mq.addEventListener('change', fn)
      return () => mq.removeEventListener('change', fn)
    }
  }, [theme])
}
