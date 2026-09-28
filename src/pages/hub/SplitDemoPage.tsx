import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '@/layouts/AppShell'
import { useMedicStore } from '@/store/medic-store'
import { Button } from '@/components/ui/button'
import type { ProRole } from '@/types'
import { uz } from '@/content/uz'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/app/HomePage'
import { AIChatPage } from '@/pages/app/AIChatPage'
import { AIResultPage } from '@/pages/app/AIResultPage'
import { DoctorsPage } from '@/pages/app/DoctorsPage'
import { DoctorProfilePage } from '@/pages/app/DoctorProfilePage'
import { BookPage } from '@/pages/app/BookPage'
import { AppointmentsPage } from '@/pages/app/AppointmentsPage'
import { PharmacySearchPage } from '@/pages/app/PharmacySearchPage'
import { CartPage } from '@/pages/app/CartPage'
import { OrderTrackPage } from '@/pages/app/OrderTrackPage'
import { ClinicsPage } from '@/pages/app/ClinicsPage'
import { MapPage } from '@/pages/app/MapPage'
import { ProfilePage } from '@/pages/app/ProfilePage'
import { ConsultPage } from '@/pages/app/ConsultPage'
import { ClinicDoctorsPage } from '@/pages/pro/clinic/ClinicDoctorsPage'
import { ClinicNetworkPage } from '@/pages/pro/clinic/ClinicNetworkPage'
import { HospitalBedsPage } from '@/pages/pro/hospital/HospitalBedsPage'
import { HospitalAdmissionsPage } from '@/pages/pro/hospital/HospitalAdmissionsPage'
import { DoctorConsultationsPage } from '@/pages/pro/doctor/DoctorConsultationsPage'
import { ProDashboardPage } from '@/pages/pro/ProDashboardPage'
import { ProMessagesPage } from '@/pages/pro/ProMessagesPage'

function MiniApp() {
  return (
    <div className="phone-frame">
      <div className="phone-frame-inner">
        <div className="flex h-full min-h-0 flex-col bg-[var(--bg)]">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="ai" element={<AIChatPage />} />
              <Route path="ai/result" element={<AIResultPage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="doctors/:id" element={<DoctorProfilePage />} />
              <Route path="book/:id" element={<BookPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="consult/:id" element={<ConsultPage />} />
              <Route path="pharmacy" element={<PharmacySearchPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="orders/:id" element={<OrderTrackPage />} />
              <Route path="clinics" element={<ClinicsPage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="clinic/doctors" element={<ClinicDoctorsPage />} />
              <Route path="clinic/network" element={<ClinicNetworkPage />} />
              <Route path="hospital/beds" element={<HospitalBedsPage />} />
              <Route path="hospital/admissions" element={<HospitalAdmissionsPage />} />
              <Route path="doctor/consultations" element={<DoctorConsultationsPage />} />
              <Route path="messages" element={<ProMessagesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SplitDemoPage() {
  const role = useMedicStore((s) => s.proRole)
  const setProRole = useMedicStore((s) => s.setProRole)
  const setProLoggedIn = useMedicStore((s) => s.setProLoggedIn)

  // Ensure logged in for pro panel
  if (!useMedicStore.getState().proLoggedIn) {
    setProLoggedIn(true)
  }

  const roles: { id: ProRole; label: string }[] = [
    { id: 'pharmacy', label: uz.pro.rolePharmacy },
    { id: 'clinic', label: uz.pro.roleClinic },
    { id: 'hospital', label: uz.pro.roleHospital },
    { id: 'doctor', label: uz.pro.roleDoctor },
  ]

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--surface)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3">
        <Link to="/" className="text-[var(--muted)] hover:text-[var(--fg)]">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </Link>
        <span className="text-sm font-semibold">{uz.hub.splitDemo}</span>
        <div className="ml-auto flex flex-wrap gap-1">
          {roles.map((r) => (
            <Button
              key={r.id}
              size="sm"
              variant={role === r.id ? 'default' : 'outline'}
              onClick={() => setProRole(r.id)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-center">
        <div className="shrink-0">
          <p className="mb-2 text-center text-xs text-[var(--muted)]">Foydalanuvchi ilovasi</p>
          <MiniApp />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg)]">
          <p className="border-b border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)]">Pro panel</p>
          <div className="max-h-[844px] overflow-auto p-4">
            <ProDashboardPage />
          </div>
        </div>
      </div>
    </div>
  )
}
