import { useNavigate } from 'react-router-dom'
import { uz } from '@/content/uz'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import type { ProRole } from '@/types'

export function ProLoginPage() {
  const setProRole = useMedicStore((s) => s.setProRole)
  const setProLoggedIn = useMedicStore((s) => s.setProLoggedIn)
  const navigate = useNavigate()

  const enter = (role: ProRole) => {
    setProRole(role)
    setProLoggedIn(true)
    const path =
      role === 'pharmacy'
        ? '/pro/panel/pharmacy/orders'
        : role === 'clinic'
          ? '/pro/panel/clinic/appointments'
          : '/pro/panel/doctor/schedule'
    navigate(path)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--surface)] p-4">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg)] p-6">
        <h1 className="text-xl font-semibold">{uz.pro.login}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{uz.pro.desktopHint}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Button onClick={() => enter('pharmacy')}>{uz.pro.rolePharmacy}</Button>
          <Button variant="outline" onClick={() => enter('clinic')}>
            {uz.pro.roleClinic}
          </Button>
          <Button variant="outline" onClick={() => enter('doctor')}>
            {uz.pro.roleDoctor}
          </Button>
        </div>
      </div>
    </div>
  )
}
