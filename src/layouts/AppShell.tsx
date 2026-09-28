import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Activity, Home, Stethoscope, Pill, User } from 'lucide-react'
import { uz } from '@/content/uz'
import { cn } from '@/lib/cn'

const tabs = [
  { to: '/app', end: true, label: uz.tabs.home, icon: Home },
  { to: '/app/ai', label: uz.tabs.ai, icon: Activity },
  { to: '/app/doctors', label: uz.tabs.doctor, icon: Stethoscope },
  { to: '/app/pharmacy', label: uz.tabs.pharmacy, icon: Pill },
  { to: '/app/profile', label: uz.tabs.profile, icon: User },
]

export function AppShell() {
  const loc = useLocation()
  const hideTab =
    loc.pathname === '/app/welcome' ||
    loc.pathname.startsWith('/app/book') ||
    loc.pathname.startsWith('/app/consult') ||
    loc.pathname.startsWith('/app/cart') ||
    loc.pathname.startsWith('/app/orders') ||
    loc.pathname === '/app/ai/result'
  const reserveDemoPanelSpace = loc.pathname !== '/app/ai' && loc.pathname !== '/app/welcome'


  const content = (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg)] text-[var(--fg)]">
      <div className={`min-h-0 flex-1 overflow-y-auto scrollbar-thin ${reserveDemoPanelSpace ? 'pb-14' : ''}`}>
        <Outlet />
      </div>
      {!hideTab && (
        <nav className="safe-pb border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="flex h-14 items-stretch justify-around px-1">
            {tabs.map(({ to, end, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex min-w-[56px] flex-col items-center justify-center gap-0.5 text-[11px] transition-colors',
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={1.5} />
                    <span>{label}</span>
                    {isActive && <span className="mt-0.5 h-1 w-1 rounded-full bg-[var(--accent)]" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  )

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--surface)] md:p-4">
      <div className="app-shell-frame">{content}</div>
    </div>
  )
}
