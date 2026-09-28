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
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface)] text-2xl font-bold text-[var(--accent)]">
          {i + 1}
        </div>
        <h1 className="text-2xl font-semibold">{slides[i]!.title}</h1>
        <p className="mt-3 max-w-xs text-[var(--muted)]">{slides[i]!.text}</p>
        <div className="mt-8 flex gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 w-6 rounded-full ${idx === i ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
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
        {i < slides.length - 1 ? 'Keyingi' : uz.welcome.start}
      </Button>
    </div>
  )
}
