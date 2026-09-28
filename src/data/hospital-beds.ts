import type { HospitalBed } from '@/types'

export const hospitalBedsSeed: HospitalBed[] = [
  { id: 'A-01', ward: 'Terapiya', status: 'occupied', patientName: 'Demo Bemor' },
  { id: 'A-02', ward: 'Terapiya', status: 'available' },
  { id: 'A-03', ward: 'Terapiya', status: 'cleaning' },
  { id: 'A-04', ward: 'Terapiya', status: 'available' },
  { id: 'B-01', ward: 'Kardiologiya', status: 'occupied', patientName: 'N. Karimova' },
  { id: 'B-02', ward: 'Kardiologiya', status: 'available' },
  { id: 'B-03', ward: 'Kardiologiya', status: 'available' },
  { id: 'C-01', ward: 'Kuzatuv', status: 'occupied', patientName: 'A. Sobirov' },
  { id: 'C-02', ward: 'Kuzatuv', status: 'cleaning' },
  { id: 'C-03', ward: 'Kuzatuv', status: 'available' },
  { id: 'C-04', ward: 'Kuzatuv', status: 'available' },
  { id: 'C-05', ward: 'Kuzatuv', status: 'occupied', patientName: 'M. Islomova' },
]