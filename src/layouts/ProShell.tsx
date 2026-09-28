import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Package,
  Users,
  LogOut,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import { useMedicStore } from '@/store/medic-store'
import { uz } from '@/content/uz'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'

const navByRole = {
  pharmacy: [
    { to: '/pro/panel/pharmacy/orders', label: 'Buyurtmalar', icon: ClipboardList },
    { to: '/pro/panel/pharmacy/inventory', label: 'Ombor', icon: Package },
    { to: '/pro/panel/pharmacy/ads', label: 'Reklama', icon: Megaphone },
  ],
  clinic: [
    { to: '/pro/panel/clinic/appointments', label: 'Qabullar', icon: Calendar },
    { to: '/pro/panel/clinic/stats', label: 'Statistika', icon: LayoutDashboard },
  ],
  doctor: [
    { to: '/pro/panel/doctor/schedule', label: 'Jadval', icon: Calendar },
    { to: '/pro/panel/doctor/patients', label: 'Bemorlar', icon: Users },
  ],
}

export function ProShell() {
  const role = useMedicStore((s) => s.proRole)
  const logout = useMedicStore((s) => s.setProLoggedIn)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const items = navByRole[role]

  const roleLabel =
    role === 'pharmacy' ? uz.pro.rolePharmacy : role === 'clinic' ? uz.pro.roleClinic : uz.pro.roleDoctor

  return (
    <div className="flex min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-60 border-r border-[var(--border)] bg-[var(--bg)] transition-transform md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 items-center border-b border-[var(--border)] px-4">
          <span className="text-sm font-semibold tracking-tight">Medic AI · {roleLabel}</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-[var(--radius-input)] px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-[var(--surface)] font-medium text-[var(--fg)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]',
                )
              }
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border)] p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-[var(--muted)]"
            onClick={() => {
              logout(false)
              navigate('/pro')
            }}
          >
            <LogOut size={16} strokeWidth={1.5} />
            Chiqish
          </Button>
        </div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-[var(--border)] px-4">
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface)] md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <div className="flex-1 text-sm text-[var(--muted)]">Pro panel · demo</div>
          <span className="hidden text-xs text-[var(--muted)] sm:inline">{uz.pro.desktopHint}</span>
        </header>
        <main className="mx-auto w-full max-w-[1280px] flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
