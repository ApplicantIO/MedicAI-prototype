import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import type { ThemeMode } from '@/types'

export function ProSettingsPage() {
  const theme = useMedicStore((s) => s.theme)
  const setTheme = useMedicStore((s) => s.setTheme)
  const resetDemo = useMedicStore((s) => s.resetDemo)
  const accelerator = useMedicStore((s) => s.demoAccelerator)
  const setAccelerator = useMedicStore((s) => s.setDemoAccelerator)
  const profile = useMedicStore((s) => s.providerProfile)
  const setProviderProfile = useMedicStore((s) => s.setProviderProfile)
  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [saved, setSaved] = useState(false)
  const themes: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: 'Yorugʻ' },
    { value: 'dark', label: 'Qorongʻi' },
    { value: 'system', label: 'Tizimga mos' },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <header><p className="text-xs text-[var(--muted)]">Hisob va ko‘rinish</p><h1 className="mt-1 text-2xl font-semibold">Sozlamalar</h1></header>
      <section className="rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
        <h2 className="text-base font-semibold">Tashkilot maʼlumoti (demo)</h2>
        <label className="mt-4 block text-sm font-medium" htmlFor="provider-name">Tashkilot nomi</label>
        <Input id="provider-name" className="mt-2" value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} />
        <label className="mt-4 block text-sm font-medium" htmlFor="provider-phone">Aloqa telefoni</label>
        <Input id="provider-phone" className="mt-2" value={phone} onChange={(event) => { setPhone(event.target.value); setSaved(false) }} />
        <Button className="mt-4" disabled={!name.trim() || !phone.trim()} onClick={() => { setProviderProfile({ name: name.trim(), phone: phone.trim() }); setSaved(true) }}>Maʼlumotni saqlash</Button>
        {saved && <p role="status" className="mt-3 text-sm text-[var(--status-ok)]">Demo maʼlumoti saqlandi.</p>}
        <p className="mt-3 text-xs text-[var(--muted)]">Maʼlumotlar shu brauzerda demo sifatida saqlanadi, rasmiy profilga yuborilmaydi.</p>
      </section>
      <section className="rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
        <h2 className="text-base font-semibold">Koʻrinish</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Panel mavzusini tanlang.</p>
        <div className="mt-4 grid grid-cols-12 gap-2">{themes.map((option) => <button key={option.value} type="button" onClick={() => setTheme(option.value)} className={`col-span-12 flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-input)] border px-3 text-sm sm:col-span-4 ${theme === option.value ? 'border-[var(--fg)] font-medium' : 'border-[var(--border)] text-[var(--muted)]'}`}>{option.value === 'dark' ? <Moon size={16}/> : <Sun size={16}/>} {option.label}</button>)}</div>
      </section>
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
        <div><h2 className="text-base font-semibold">Buyurtma tezlashtirgichi</h2><p className="mt-1 text-sm text-[var(--muted)]">Demo buyurtma holatini har 8 soniyada avtomatik oʻtkazadi.</p></div>
        <Switch checked={accelerator} onCheckedChange={setAccelerator} />
      </section>
      <section className="rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:p-5">
        <h2 className="text-base font-semibold">Demo maʼlumotlari</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Buyurtma, qabul va sozlamalarni boshlangʻich holatga qaytaradi.</p>
        <Button variant="outline" className="mt-4" onClick={resetDemo}>Demoni tiklash</Button>
      </section>
    </div>
  )
}
