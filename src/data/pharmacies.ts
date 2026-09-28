import type { Pharmacy } from '@/types'

export const pharmaciesSeed: Pharmacy[] = [
  { id: 'p1', name: 'Dori Plus', address: 'Yunusobod, 3-mavze', hours: '08:00 – 22:00', distanceKm: 0.8, rating: 4.6, promoted: true },
  { id: 'p2', name: 'Salomat Dorixona', address: 'Mirzo Ulugʻbek, Buyuk ipak yoʻli', hours: '09:00 – 21:00', distanceKm: 1.4, rating: 4.5, promoted: false },
  { id: 'p3', name: 'Farm Servis', address: 'Chilonzor, Bunyodkor', hours: '08:00 – 23:00', distanceKm: 2.1, rating: 4.4, promoted: true },
  { id: 'p4', name: 'Hayot Farm', address: 'Yakkasaroy, Shota Rustaveli', hours: '09:00 – 20:00', distanceKm: 2.9, rating: 4.3, promoted: false },
  { id: 'p5', name: 'Med Express', address: 'Sergeli, Qipchoq', hours: '10:00 – 22:00', distanceKm: 3.5, rating: 4.2, promoted: false },
  { id: 'p6', name: 'Oila Dorixona', address: 'Olmazor, Qoratosh', hours: '08:30 – 21:30', distanceKm: 4.0, rating: 4.5, promoted: false },
  { id: 'p7', name: 'Zdorovie Plus', address: 'Mirobod, Boshlik', hours: '09:00 – 19:00', distanceKm: 4.8, rating: 4.1, promoted: false },
  { id: 'p8', name: 'Tez Farm', address: 'Uchtepa, Fidokor', hours: '08:00 – 24:00', distanceKm: 5.5, rating: 4.0, promoted: false },
]
