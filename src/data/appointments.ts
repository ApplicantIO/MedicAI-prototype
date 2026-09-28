import type { Appointment } from '@/types'

const today = new Date()
const d = (offset: number) => {
  const x = new Date(today)
  x.setDate(today.getDate() + offset)
  return x.toISOString().slice(0, 10)
}

export const appointmentsSeed: Appointment[] = [
  { id: 'a1', doctorId: 'd2', clinicId: 'c2', type: 'offline', date: d(1), time: '10:00', status: 'confirmed', code: 'QBL-4821', patientName: 'Demo Foydalanuvchi' },
  { id: 'a2', doctorId: 'd3', clinicId: 'c1', type: 'online', date: d(0), time: '15:00', status: 'pending', code: 'QBL-7732', patientName: 'Demo Foydalanuvchi' },
  { id: 'a3', doctorId: 'd4', clinicId: 'c3', type: 'offline', date: d(3), time: '11:30', status: 'confirmed', code: 'QBL-1190', patientName: 'Demo Foydalanuvchi' },
  { id: 'a4', doctorId: 'd1', clinicId: 'c1', type: 'online', date: d(-2), time: '09:00', status: 'completed', code: 'QBL-3301', patientName: 'Demo Foydalanuvchi' },
  { id: 'a5', doctorId: 'd6', clinicId: 'c2', type: 'offline', date: d(-5), time: '14:30', status: 'completed', code: 'QBL-8820', patientName: 'Demo Foydalanuvchi' },
  { id: 'a6', doctorId: 'd9', clinicId: 'c3', type: 'online', date: d(2), time: '16:00', status: 'pending', code: 'QBL-5512', patientName: 'Demo Foydalanuvchi' },
  { id: 'a7', doctorId: 'd10', clinicId: 'c4', type: 'offline', date: d(-1), time: '10:30', status: 'cancelled', code: 'QBL-0044', patientName: 'Demo Foydalanuvchi' },
  { id: 'a8', doctorId: 'd11', clinicId: 'c1', type: 'offline', date: d(5), time: '09:30', status: 'confirmed', code: 'QBL-6678', patientName: 'Demo Foydalanuvchi' },
]
