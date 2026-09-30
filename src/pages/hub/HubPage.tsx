import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Moon, Sun, Smartphone, Building2, Stethoscope, Pill, Hospital } from 'lucide-react'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer'

const cards = [
  { to: '/app', label: uz.hub.cards.app, icon: Smartphone, desc: uz.hub.cardDescriptions.app },
  {
    to: '/pro',
    label: uz.hub.cards.pharmacy,
    icon: Pill,
    desc: uz.hub.cardDescriptions.pharmacy,
    onClick: () => {},
    role: 'pharmacy' as const,
  },
  {
    to: '/pro',
    label: uz.hub.cards.clinic,
    icon: Building2,
    desc: uz.hub.cardDescriptions.clinic,
    role: 'clinic' as const,
  },
  {
    to: '/pro',
    label: uz.hub.cards.hospital,
    icon: Hospital,
    desc: uz.hub.cardDescriptions.hospital,
    role: 'hospital' as const,
  },
  {
    to: '/pro',
    label: uz.hub.cards.doctor,
    icon: Stethoscope,
    desc: uz.hub.cardDescriptions.doctor,
    role: 'doctor' as const,
  },
]

export function HubPage() {
  const theme = useMedicStore((s) => s.theme)
  const setTheme = useMedicStore((s) => s.setTheme)
  const setProRole = useMedicStore((s) => s.setProRole)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('dark')
  }

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs text-[var(--muted)]">
              {uz.prototype}
            </p>
            <h1 className="text-xl font-semibold">{uz.hub.title}</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">{uz.hub.subtitle}</p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Theme">
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </Button>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              onClick={() => {
                if (c.role) setProRole(c.role)
              }}
              className="group flex items-center gap-3 py-3 transition-colors hover:bg-[var(--surface)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-input)] bg-[var(--surface)] text-[var(--muted)]">
                <c.icon size={19} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-sm font-medium">{c.label}</div>
                <div className="text-xs text-[var(--muted)]">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 border-y border-[var(--border)] py-4 sm:flex-row sm:justify-between">
          <div>
            <div className="font-semibold">{uz.hub.scanQr}</div>
            <p className="mt-1 text-sm text-[var(--muted)]">{origin}/app</p>
            <Link to="/demo" className="mt-3 inline-block text-sm text-[var(--accent)] hover:underline">
              {uz.hub.splitDemo} →
            </Link>
          </div>
          <div className="rounded-lg bg-white p-3">
            <QRCodeSVG value={`${origin}/app`} size={112} level="M" />
          </div>
        </div>

        <div className="mt-6">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </div>
  )
}
