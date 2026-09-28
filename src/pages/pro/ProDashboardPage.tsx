import { Link } from 'react-router-dom'
import { Activity, ArrowRight, CalendarDays, Package, Users } from 'lucide-react'
import { useMedicStore } from '@/store/medic-store'
import { doctorsSeed } from '@/data/doctors'
import { uz } from '@/content/uz'
import type { ProRole } from '@/types'

const roleTitles: Record<ProRole, string> = {
  pharmacy: 'Dorixona boshqaruvi',
  clinic: 'Klinika boshqaruvi',
  hospital: 'Shifoxona boshqaruvi',
  doctor: 'Shifokor kabineti',
}

const roleLinks: Record<ProRole, { label: string; to: string }[]> = {
  pharmacy: [
    { label: 'Buyurtmalarni ko‘rish', to: '/pro/panel/pharmacy/orders' },
    { label: 'Omborni boshqarish', to: '/pro/panel/pharmacy/inventory' },
    { label: 'Savdo hisoboti', to: '/pro/panel/pharmacy/reports' },
    { label: 'Reklama sozlamalari', to: '/pro/panel/pharmacy/ads' },
  ],
  clinic: [
    { label: 'Qabullarni boshqarish', to: '/pro/panel/clinic/appointments' },
    { label: 'Shifokorlar jamoasi', to: '/pro/panel/clinic/doctors' },
    { label: 'Hudud va hamkorlar', to: '/pro/panel/clinic/network' },
  ],
  hospital: [
    { label: 'Yotoq oʻrinlari', to: '/pro/panel/hospital/beds' },
    { label: 'Qabul va joylashtirish', to: '/pro/panel/hospital/admissions' },
    { label: 'Qabullar jadvali', to: '/pro/panel/clinic/appointments' },
  ],
  doctor: [
    { label: 'Konsultatsiyalar', to: '/pro/panel/doctor/consultations' },
    { label: 'Ish jadvali', to: '/pro/panel/doctor/schedule' },
    { label: 'Bemorlar', to: '/pro/panel/doctor/patients' },
  ],
}

export function ProDashboardPage() {
  const role = useMedicStore((s) => s.proRole)
  const orders = useMedicStore((s) => s.orders)
  const appointments = useMedicStore((s) => s.appointments)
  const inventory = useMedicStore((s) => s.inventory)
  const beds = useMedicStore((s) => s.hospitalBeds)
  const today = new Date().toISOString().slice(0, 10)
  const roleAppointments = role === 'hospital'
    ? appointments.filter((a) => a.clinicId === 'c6')
    : role === 'clinic'
      ? appointments.filter((a) => a.clinicId !== 'c6')
      : role === 'doctor'
        ? appointments.filter((a) => a.doctorId === 'd1')
        : appointments
  const todayAppointments = roleAppointments.filter((a) => a.date === today && !['cancelled', 'rejected'].includes(a.status))
  const pendingAppointments = roleAppointments.filter((a) => a.status === 'pending')
  const lowStock = inventory.filter((row) => row.stock <= 10)

  const stats = role === 'pharmacy'
    ? [
        { label: 'Faol buyurtmalar', value: orders.filter((o) => o.status !== 'delivered').length, icon: Package },
        { label: 'Tayyorlash kerak', value: orders.filter((o) => o.status === 'accepted').length, icon: Activity },
        { label: 'Kam qolgan dorilar', value: lowStock.length, icon: Package },
      ]
    : role === 'hospital'
      ? [
          { label: 'Bugungi murojaatlar', value: todayAppointments.length, icon: CalendarDays },
          { label: 'Band yotoqlar', value: beds.filter((b) => b.status === 'occupied').length, icon: Users },
          { label: 'Boʻsh yotoqlar', value: beds.filter((b) => b.status === 'available').length, icon: Activity },
        ]
      : role === 'doctor'
        ? [
            { label: 'Bugungi qabullar', value: todayAppointments.length, icon: CalendarDays },
            { label: 'Tasdiq kutmoqda', value: pendingAppointments.length, icon: Activity },
            { label: 'Jami bemorlar', value: new Set(roleAppointments.map((a) => a.patientName)).size, icon: Users },
          ]
        : [
            { label: 'Bugungi qabullar', value: todayAppointments.length, icon: CalendarDays },
            { label: 'Tasdiq kutmoqda', value: pendingAppointments.length, icon: Activity },
            { label: 'Jamoa shifokorlari', value: doctorsSeed.filter((d) => d.clinicId !== 'c6').length, icon: Users },
          ]

  const activity = role === 'pharmacy'
    ? orders.slice(0, 4).map((o) => ({ title: `Buyurtma ${o.id}`, meta: uz.order.status[o.status], to: '/pro/panel/pharmacy/orders' }))
    : roleAppointments.slice(0, 4).map((a) => ({ title: a.patientName, meta: `${a.date} · ${a.time} · ${uz.appointments.status[a.status]}`, to: role === 'doctor' ? '/pro/panel/doctor/consultations' : role === 'hospital' ? '/pro/panel/hospital/admissions' : '/pro/panel/clinic/appointments' }))

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Bugungi umumiy koʻrinish</p>
        <h1 className="mt-1 text-2xl font-semibold">{roleTitles[role]}</h1>
      </div>

      <section aria-label="Asosiy koʻrsatkichlar" className="grid grid-cols-12 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="kpi-stripe col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-6 xl:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-[var(--muted)]">{label}</span>
              <Icon size={18} strokeWidth={1.5} className="text-[var(--muted)]" />
            </div>
            <div className="mt-2 text-3xl font-semibold">{value}</div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 xl:col-span-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Soʻnggi faollik</h2>
            <Link className="text-sm text-[var(--accent)]" to={roleLinks[role][0]!.to}>Barchasi</Link>
          </div>
          <div className="divide-y divide-[var(--border)] rounded-[var(--radius-card)] border border-[var(--border)]">
            {activity.map((item, i) => (
              <Link key={`${item.title}-${i}`} to={item.to} className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 hover:bg-[var(--surface)]">
                <span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
                <span className="shrink-0 text-xs text-[var(--muted)]">{item.meta}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="col-span-12 xl:col-span-5">
          <h2 className="mb-3 text-base font-semibold">Tezkor amallar</h2>
          <div className="grid grid-cols-12 gap-2">
            {roleLinks[role].map((link) => (
              <Link key={link.to} to={link.to} className="col-span-12 flex min-h-12 items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3 text-sm hover:bg-[var(--surface)] sm:col-span-6 xl:col-span-12">
                {link.label}<ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
          {role === 'pharmacy' && lowStock.length > 0 && (
            <p className="mt-3 rounded-[var(--radius-card)] border border-[var(--status-warn)]/40 px-3 py-2 text-xs text-[var(--muted)]">
              Omborda {lowStock.length} ta mahsulot kam qolgan. Qoldiqni tekshiring.
            </p>
          )}
          {role === 'clinic' && (
            <p className="mt-3 text-xs text-[var(--muted)]">Hamkorlar, jamoa va qabul holatlari demo maʼlumotlar asosida yangilanadi.</p>
          )}
          {role === 'hospital' && (
            <p className="mt-3 text-xs text-[var(--muted)]">Yotoq holatlari demo maket. Shoshilinch yordam uchun 103 ga murojaat qiling.</p>
          )}
          {role === 'doctor' && (
            <p className="mt-3 text-xs text-[var(--muted)]">Bemor yozuvlari maxfiy. Bu prototipdagi maʼlumotlar namuna hisoblanadi.</p>
          )}
        </section>
      </div>
    </div>
  )
}
