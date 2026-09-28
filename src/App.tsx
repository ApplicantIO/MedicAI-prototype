import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useThemeEffect } from '@/hooks/use-theme'
import { useDemoAccelerator } from '@/hooks/use-demo-accelerator'
import { DemoPanel } from '@/components/DemoPanel'
import { HubPage } from '@/pages/hub/HubPage'
import { SplitDemoPage } from '@/pages/hub/SplitDemoPage'
import { AppShell } from '@/layouts/AppShell'
import { ProShell } from '@/layouts/ProShell'
import { WelcomePage } from '@/pages/app/WelcomePage'
import { HomePage } from '@/pages/app/HomePage'
import { AIChatPage } from '@/pages/app/AIChatPage'
import { AIResultPage } from '@/pages/app/AIResultPage'
import { DoctorsPage } from '@/pages/app/DoctorsPage'
import { DoctorProfilePage } from '@/pages/app/DoctorProfilePage'
import { BookPage } from '@/pages/app/BookPage'
import { AppointmentsPage } from '@/pages/app/AppointmentsPage'
import { ConsultPage } from '@/pages/app/ConsultPage'
import { PharmacySearchPage } from '@/pages/app/PharmacySearchPage'
import { CartPage } from '@/pages/app/CartPage'
import { OrderTrackPage } from '@/pages/app/OrderTrackPage'
import { ClinicsPage } from '@/pages/app/ClinicsPage'
import { MapPage } from '@/pages/app/MapPage'
import { ProfilePage } from '@/pages/app/ProfilePage'
import { ProLoginPage } from '@/pages/pro/ProLoginPage'
import { PharmacyOrdersPage } from '@/pages/pro/pharmacy/PharmacyOrdersPage'
import { PharmacyInventoryPage } from '@/pages/pro/pharmacy/PharmacyInventoryPage'
import { PharmacyAdsPage } from '@/pages/pro/pharmacy/PharmacyAdsPage'
import { PharmacyReportsPage } from '@/pages/pro/pharmacy/PharmacyReportsPage'
import { ClinicAppointmentsPage } from '@/pages/pro/clinic/ClinicAppointmentsPage'
import { ClinicStatsPage } from '@/pages/pro/clinic/ClinicStatsPage'
import { DoctorSchedulePage } from '@/pages/pro/doctor/DoctorSchedulePage'
import { DoctorPatientsPage } from '@/pages/pro/doctor/DoctorPatientsPage'
import { DoctorConsultationsPage } from '@/pages/pro/doctor/DoctorConsultationsPage'
import { ClinicDoctorsPage } from '@/pages/pro/clinic/ClinicDoctorsPage'
import { ClinicNetworkPage } from '@/pages/pro/clinic/ClinicNetworkPage'
import { HospitalBedsPage } from '@/pages/pro/hospital/HospitalBedsPage'
import { HospitalAdmissionsPage } from '@/pages/pro/hospital/HospitalAdmissionsPage'
import { ProDashboardPage } from '@/pages/pro/ProDashboardPage'
import { ProMessagesPage } from '@/pages/pro/ProMessagesPage'
import { ProLicensePage } from '@/pages/pro/ProLicensePage'
import { ProSettingsPage } from '@/pages/pro/ProSettingsPage'
import { useMedicStore } from '@/store/medic-store'

function ProGuard({ children }: { children: React.ReactNode }) {
  const loggedIn = useMedicStore((s) => s.proLoggedIn)
  if (!loggedIn) return <Navigate to="/pro" replace />
  return <>{children}</>
}

function WelcomeGuard({ children }: { children: React.ReactNode }) {
  const welcomeDone = useMedicStore((s) => s.welcomeDone)
  const loc = useLocation()
  if (!welcomeDone && loc.pathname === '/app') {
    return <Navigate to="/app/welcome" replace />
  }
  return <>{children}</>
}

export default function App() {
  useThemeEffect()
  useDemoAccelerator()

  return (
    <>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/demo" element={<SplitDemoPage />} />

        <Route path="/app" element={<AppShell />}>
          <Route path="welcome" element={<WelcomePage />} />
          <Route
            index
            element={
              <WelcomeGuard>
                <HomePage />
              </WelcomeGuard>
            }
          />
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
        </Route>

        <Route path="/pro" element={<ProLoginPage />} />
        <Route
          path="/pro/panel"
          element={
            <ProGuard>
              <ProShell />
            </ProGuard>
          }
        >
          <Route path="pharmacy/orders" element={<PharmacyOrdersPage />} />
          <Route path="pharmacy/inventory" element={<PharmacyInventoryPage />} />
          <Route path="pharmacy/ads" element={<PharmacyAdsPage />} />
          <Route path="pharmacy/reports" element={<PharmacyReportsPage />} />
          <Route path="pharmacy" element={<ProDashboardPage />} />
          <Route path="clinic" element={<ProDashboardPage />} />
          <Route path="clinic/appointments" element={<ClinicAppointmentsPage />} />
          <Route path="clinic/stats" element={<ClinicStatsPage />} />
          <Route path="clinic/doctors" element={<ClinicDoctorsPage />} />
          <Route path="clinic/network" element={<ClinicNetworkPage />} />
          <Route path="hospital" element={<ProDashboardPage />} />
          <Route path="hospital/beds" element={<HospitalBedsPage />} />
          <Route path="hospital/admissions" element={<HospitalAdmissionsPage />} />
          <Route path="doctor/schedule" element={<DoctorSchedulePage />} />
          <Route path="doctor/patients" element={<DoctorPatientsPage />} />
          <Route path="doctor/consultations" element={<DoctorConsultationsPage />} />
          <Route path="doctor" element={<ProDashboardPage />} />
          <Route path="messages" element={<ProMessagesPage />} />
          <Route path="license" element={<ProLicensePage />} />
          <Route path="settings" element={<ProSettingsPage />} />
          <Route index element={<ProDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoPanel />
    </>
  )
}
