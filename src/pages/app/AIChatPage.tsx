import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { AI_SCENARIOS, INITIAL_AI_CHIPS, matchScenario, type AIScenario } from '@/data/ai-scenarios'
import { APP_CONFIG } from '@/config'
import { Button } from '@/components/ui/button'
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer'

export function AIChatPage() {
  const navigate = useNavigate()
  const aiChat = useMedicStore((s) => s.aiChat)
  const setAIChat = useMedicStore((s) => s.setAIChat)
  const pushAIMessage = useMedicStore((s) => s.pushAIMessage)
  const resetAIChat = useMedicStore((s) => s.resetAIChat)
  const completeAI = useMedicStore((s) => s.completeAI)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const didInit = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiChat.messages, typing])

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    if (aiChat.messages.length === 0 && aiChat.scenarioId === null) {
      pushAIMessage({
        id: `m${Date.now()}`,
        role: 'ai',
        text: 'Salom! Asosiy shikoyatingiz nima? Chip tanlang yoki yozing.',
      })
    }
  }, [aiChat.messages.length, aiChat.scenarioId, pushAIMessage])

  const scenario: AIScenario | null = aiChat.scenarioId
    ? AI_SCENARIOS.find((s) => s.id === aiChat.scenarioId) ?? null
    : null

  const currentStep = scenario?.steps[aiChat.stepIndex]

  const delay = () =>
    APP_CONFIG.aiTypingMinMs +
    Math.random() * (APP_CONFIG.aiTypingMaxMs - APP_CONFIG.aiTypingMinMs)

  const advance = async (userText: string, chip?: string) => {
    pushAIMessage({ id: `u${Date.now()}`, role: 'user', text: userText })
    setInput('')
    setTyping(true)
    await new Promise((r) => setTimeout(r, delay()))

    let sc = scenario
    let stepIdx = aiChat.stepIndex

    if (!sc) {
      sc = matchScenario(userText, chip)
      setAIChat({ scenarioId: sc.id, stepIndex: 0 })
      // First step of matched scenario might be the greeting we already answered
      if (sc.steps.length > 1 && sc.steps[0]!.kind === 'chips') {
        stepIdx = 1
        setAIChat({ scenarioId: sc.id, stepIndex: 1 })
      } else {
        stepIdx = 0
      }
    } else {
      stepIdx = aiChat.stepIndex + 1
      setAIChat({ stepIndex: stepIdx })
    }

    setTyping(false)

    if (stepIdx >= sc.steps.length) {
      completeAI(sc, sc.result)
      navigate('/app/ai/result')
      return
    }

    const next = sc.steps[stepIdx]!
    pushAIMessage({ id: `a${Date.now()}`, role: 'ai', text: next.aiMessage })
  }

  const onSliderDone = () => {
    if (!currentStep || currentStep.kind !== 'slider') return
    void advance(`${aiChat.severity}/10`)
  }

  return (
    <div className="flex h-full min-h-[70vh] flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <h1 className="text-base font-semibold">{uz.ai.title}</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            resetAIChat()
            pushAIMessage({
              id: `m${Date.now()}`,
              role: 'ai',
              text: 'Salom! Asosiy shikoyatingiz nima? Chip tanlang yoki yozing.',
            })
          }}
        >
          {uz.ai.restart}
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {aiChat.messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                m.role === 'user'
                  ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]'
                  : 'bg-[var(--surface)] text-[var(--fg)]'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 px-2">
            <span className="typing-dot h-2 w-2 rounded-full bg-[var(--muted)]" />
            <span className="typing-dot h-2 w-2 rounded-full bg-[var(--muted)]" />
            <span className="typing-dot h-2 w-2 rounded-full bg-[var(--muted)]" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-[var(--border)] px-4 py-3">
        <MedicalDisclaimer className="mb-2" />

        {!scenario && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {INITIAL_AI_CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                disabled={typing}
                onClick={() => void advance(c, c)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs hover:border-[var(--accent)]"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {currentStep?.kind === 'chips' && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {currentStep.chips?.map((c) => (
              <button
                key={c}
                type="button"
                disabled={typing}
                onClick={() => void advance(c)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs hover:border-[var(--accent)]"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {currentStep?.kind === 'multiselect' && (
          <div className="mb-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {currentStep.multiselectOptions?.map((o) => {
                const on = aiChat.multiselect.includes(o)
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() =>
                      setAIChat({
                        multiselect: on
                          ? aiChat.multiselect.filter((x) => x !== o)
                          : [...aiChat.multiselect, o],
                      })
                    }
                    className={`rounded-full border px-3 py-1 text-xs ${
                      on ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)]'
                    }`}
                  >
                    {o}
                  </button>
                )
              })}
            </div>
            <Button
              size="sm"
              disabled={typing || aiChat.multiselect.length === 0}
              onClick={() => void advance(aiChat.multiselect.join(', '))}
            >
              {uz.ai.send}
            </Button>
          </div>
        )}

        {currentStep?.kind === 'slider' && (
          <div className="mb-2">
            <div className="mb-1 flex justify-between text-xs text-[var(--muted)]">
              <span>{currentStep.sliderLabel ?? uz.ai.severity}</span>
              <span>{aiChat.severity}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={aiChat.severity}
              onChange={(e) => setAIChat({ severity: Number(e.target.value) })}
              className="w-full accent-[var(--accent)]"
            />
            <Button size="sm" className="mt-2" disabled={typing} onClick={onSliderDone}>
              {uz.ai.send}
            </Button>
          </div>
        )}

        {(currentStep?.kind === 'text' || !currentStep) && (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (!input.trim() || typing) return
              void advance(input.trim())
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={uz.ai.placeholder}
              className="min-h-11 flex-1 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm outline-none focus:border-[var(--fg)]"
            />
            <Button type="submit" disabled={!input.trim() || typing}>
              {uz.ai.send}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
