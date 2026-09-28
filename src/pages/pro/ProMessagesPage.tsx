import { useState } from 'react'
import { ArrowLeft, Send, Trash2 } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'

export function ProMessagesPage() {
  const role = useMedicStore((s) => s.proRole)
  const allThreads = useMedicStore((s) => s.proMessages)
  const threads = allThreads.filter((thread) => thread.role === role)
  const addMessage = useMedicStore((s) => s.addProMessage)
  const removeMessage = useMedicStore((s) => s.removeProMessage)
  const [selectedId, setSelectedId] = useState<string | null>(threads[0]?.id ?? null)
  const [text, setText] = useState('')
  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0]

  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected || !text.trim()) return
    addMessage(selected.id, text.trim())
    setText('')
  }

  return (
    <div className="space-y-5">
      <header><p className="text-xs text-[var(--muted)]">Mijozlar va hamkorlar bilan yozishmalar</p><h1 className="mt-1 text-2xl font-semibold">Xabarlar</h1></header>
      <div className="grid min-h-[560px] grid-cols-12 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
        <aside className={`${selected ? 'hidden md:block' : 'col-span-12'} md:col-span-4 md:border-r md:border-[var(--border)]`}>
          <div className="border-b border-[var(--border)] px-4 py-3 text-sm font-medium">Suhbatlar</div>
          {threads.map((thread) => {
            const last = thread.messages.at(-1)
            return <button key={thread.id} type="button" onClick={() => setSelectedId(thread.id)} className={`block min-h-16 w-full border-b border-[var(--border)] px-4 py-3 text-left ${selected?.id === thread.id ? 'bg-[var(--surface)]' : ''}`}><span className="block truncate text-sm font-medium">{thread.title}</span><span className="mt-1 block truncate text-xs text-[var(--muted)]">{last?.text ?? 'Suhbatni boshlang'}</span></button>
          })}
        </aside>
        <section className={`${selected ? 'col-span-12' : 'hidden'} flex min-h-[560px] flex-col md:col-span-8`}>
          {selected ? <>
            <header className="flex h-14 items-center gap-3 border-b border-[var(--border)] px-4"><button type="button" aria-label="Suhbatlar roʻyxati" onClick={() => setSelectedId(null)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--surface)] md:hidden"><ArrowLeft size={18}/></button><div className="truncate text-sm font-semibold">{selected.title}</div></header>
            <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--bg)] p-4">
              {selected.messages.map((message) => <div key={message.id} className={`flex items-center gap-2 ${message.from === 'provider' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.from === 'provider' ? 'bg-[var(--primary-btn-bg)] text-[var(--primary-btn-fg)]' : 'bg-[var(--surface)] text-[var(--fg)]'}`}><p>{message.text}</p><time className="mt-1 block text-[10px] opacity-70">{new Date(message.at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</time></div>{message.from === 'provider' && <button type="button" aria-label="Yuborilgan xabarni oʻchirish" onClick={() => removeMessage(selected.id, message.id)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--surface)]"><Trash2 size={14}/></button>}</div>)}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-[var(--border)] p-3"><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Xabar yozing…" className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm outline-none focus:border-[var(--fg)]"/><Button type="submit" disabled={!text.trim()} aria-label="Xabar yuborish"><Send size={16}/><span className="hidden sm:inline">Yuborish</span></Button></form>
            <p className="px-4 pb-3 text-[11px] text-[var(--muted)]">Demo javob avtomatik yaratiladi. Maxfiy tibbiy maʼlumot yubormang.</p>
          </> : <div className="flex flex-1 items-center justify-center p-6 text-sm text-[var(--muted)]">Suhbatni tanlang</div>}
        </section>
      </div>
    </div>
  )
}
