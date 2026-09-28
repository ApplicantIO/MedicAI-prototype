import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronUp, Settings2 } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { uz } from '@/content/uz'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { AI_SCENARIOS } from '@/data/ai-scenarios'
import type { ProRole } from '@/types'

export function DemoPanel() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isWelcome = location.pathname === '/app/welcome'
  const isProPanel = location.pathname.startsWith('/pro/panel')
  const resetDemo = useMedicStore((s) => s.resetDemo)
  const accelerator = useMedicStore((s) => s.demoAccelerator)
  const setDemoAccelerator = useMedicStore((s) => s.setDemoAccelerator)
  const proRole = useMedicStore((s) => s.proRole)
  const setProRole = useMedicStore((s) => s.setProRole)
  const setProLoggedIn = useMedicStore((s) => s.setProLoggedIn)
  const resetAIChat = useMedicStore((s) => s.resetAIChat)
  const setAIChat = useMedicStore((s) => s.setAIChat)
  const pushAIMessage = useMedicStore((s) => s.pushAIMessage)

  const jumpScenario = (id: string) => {
    const s = AI_SCENARIOS.find((x) => x.id === id)
    if (!s) return
    resetAIChat()
    setAIChat({ scenarioId: s.id, stepIndex: 0 })
    pushAIMessage({ id: `m${Date.now()}`, role: 'ai', text: s.steps[0]!.aiMessage })
    navigate('/app/ai')
    setOpen(false)
  }

  if (isProPanel) return null

  return (
    <div
      className={`fixed z-50 flex gap-2 ${
        isWelcome
          ? 'left-3 top-3 flex-col-reverse items-start md:bottom-3 md:left-auto md:right-3 md:top-auto md:flex-col md:items-end'
          : 'bottom-[calc(3.5rem_+_max(12px,_env(safe-area-inset-bottom))_+_4px)] right-3 flex-col items-end md:bottom-3'
      }`}
    >
      {open && (
        <div className="w-72 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg)] p-3 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold">{uz.demoPanel.title}</span>
            <button type="button" onClick={() => setOpen(false)} className="text-[var(--muted)]">
              <ChevronUp size={16} />
            </button>
          </div>
          <p className="mb-3 text-[11px] text-[var(--muted)]">Prototype · demo maʼlumotlar</p>

          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs">{uz.demoPanel.accelerator}</span>
            <Switch checked={accelerator} onCheckedChange={setDemoAccelerator} />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-xs text-[var(--muted)]">{uz.demoPanel.role}</label>
            <select
              className="w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-2 py-1.5 text-sm"
              value={proRole}
              onChange={(e) => {
                const r = e.target.value as ProRole
                setProRole(r)
                setProLoggedIn(true)
                const path =
                  r === 'pharmacy'
                    ? '/pro/panel/pharmacy'
                    : r === 'clinic'
                      ? '/pro/panel/clinic'
                      : r === 'hospital'
                        ? '/pro/panel/hospital'
                        : '/pro/panel/doctor'
                navigate(path)
              }}
            >
              <option value="pharmacy">{uz.pro.rolePharmacy}</option>
              <option value="clinic">{uz.pro.roleClinic}</option>
              <option value="hospital">{uz.pro.roleHospital}</option>
              <option value="doctor">{uz.pro.roleDoctor}</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-xs text-[var(--muted)]">{uz.demoPanel.jumpAi}</label>
            <div className="flex flex-wrap gap-1">
              {AI_SCENARIOS.filter((s) => s.id !== 'general').slice(0, 5).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpScenario(s.id)}
                  className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] hover:border-[var(--accent)]"
                >
                  {s.chipLabel}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              resetDemo()
              navigate('/')
              setOpen(false)
            }}
          >
            {uz.demoPanel.reset}
          </Button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] shadow-[var(--shadow-elevated)] hover:text-[var(--fg)]"
        aria-label="Demo panel"
      >
        <Settings2 size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}
