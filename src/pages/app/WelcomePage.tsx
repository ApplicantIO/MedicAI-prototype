import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'

export function WelcomePage() {
  const [i, setI] = useState(0)
  const setWelcomeDone = useMedicStore((s) => s.setWelcomeDone)
  const navigate = useNavigate()
  const slides = uz.welcome.slides

  const finish = () => {
    setWelcomeDone(true)
    navigate('/app', { replace: true })
  }

  return (
    <div className="flex h-full min-h-[70vh] flex-col px-5 py-8">
      <button type="button" onClick={finish} className="self-end text-sm text-[var(--muted)]">
        {uz.welcome.skip}
      </button>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--surface)] text-lg font-semibold text-[var(--muted)]">
          {i + 1}
        </div>
        <h1 className="text-xl font-semibold">{slides[i]!.title}</h1>
        <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">{slides[i]!.text}</p>
        <div className="mt-8 flex gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 w-6 rounded-full ${idx === i ? 'bg-[var(--fg)]' : 'bg-[var(--border)]'}`}
            />
          ))}
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          if (i < slides.length - 1) setI(i + 1)
          else finish()
        }}
      >
        {i < slides.length - 1 ? uz.welcome.next : uz.welcome.start}
      </Button>
    </div>
  )
}
