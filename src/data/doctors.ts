import type { Doctor } from '@/types'

export const doctorsSeed: Doctor[] = [
  { id: 'd1', name: 'Aziza Rahimova', specialty: 'Terapevt', experienceYears: 12, clinicId: 'c1', rating: 4.8, reviewCount: 42, priceOffline: 120000, priceOnline: 90000, onlineNow: true, distanceKm: 1.2, bio: 'Umumiy kasalliklar va profilaktik tekshiruv.' },
  { id: 'd2', name: 'Jasur Karimov', specialty: 'Nevrolog', experienceYears: 15, clinicId: 'c2', rating: 4.9, reviewCount: 38, priceOffline: 180000, priceOnline: 140000, onlineNow: false, distanceKm: 2.4, bio: 'Bosh ogʻrigʻi va asab tizimi masalalari.' },
  { id: 'd3', name: 'Malika Tosheva', specialty: 'Kardiolog', experienceYears: 10, clinicId: 'c1', rating: 4.7, reviewCount: 29, priceOffline: 200000, priceOnline: 160000, onlineNow: true, distanceKm: 1.5, bio: 'Yurak-qon tomir sogʻligʻi.' },
  { id: 'd4', name: 'Bobur Nazarov', specialty: 'Pediatr', experienceYears: 8, clinicId: 'c3', rating: 4.6, reviewCount: 51, priceOffline: 130000, priceOnline: 100000, onlineNow: true, distanceKm: 3.1, bio: 'Bolalar kasalliklari va emlash maslahati.' },
  { id: 'd5', name: 'Dilnoza Ergasheva', specialty: 'Dermatolog', experienceYears: 9, clinicId: 'c4', rating: 4.5, reviewCount: 22, priceOffline: 150000, priceOnline: 120000, onlineNow: false, distanceKm: 4.0, bio: 'Teri va allergik holatlar.' },
  { id: 'd6', name: 'Sherzod Mirziyoyev', specialty: 'Gastroenterolog', experienceYears: 14, clinicId: 'c2', rating: 4.8, reviewCount: 33, priceOffline: 170000, priceOnline: 130000, onlineNow: false, distanceKm: 2.8, bio: 'Ovqat hazm qilish tizimi.' },
  { id: 'd7', name: 'Nigora Sattorova', specialty: 'Stomatolog', experienceYears: 11, clinicId: 'c5', rating: 4.4, reviewCount: 19, priceOffline: 140000, priceOnline: 0, onlineNow: false, distanceKm: 5.2, bio: 'Tish davolash va profilaktika.' },
  { id: 'd8', name: 'Otabek Yusupov', specialty: 'Terapevt', experienceYears: 6, clinicId: 'c6', rating: 4.3, reviewCount: 15, priceOffline: 100000, priceOnline: 80000, onlineNow: true, distanceKm: 6.0, bio: 'Oilaviy shifokor, kundalik maslahat.' },
  { id: 'd9', name: 'Gulbahor Aliyeva', specialty: 'Nevrolog', experienceYears: 7, clinicId: 'c3', rating: 4.6, reviewCount: 24, priceOffline: 175000, priceOnline: 135000, onlineNow: true, distanceKm: 3.4, bio: 'Migren va uyqu buzilishlari.' },
  { id: 'd10', name: 'Rustam Joʻrayev', specialty: 'Kardiolog', experienceYears: 18, clinicId: 'c4', rating: 4.9, reviewCount: 47, priceOffline: 220000, priceOnline: 180000, onlineNow: false, distanceKm: 4.5, bio: 'EKG va xavf baholash.' },
  { id: 'd11', name: 'Sevara Qodirova', specialty: 'Pediatr', experienceYears: 5, clinicId: 'c1', rating: 4.5, reviewCount: 18, priceOffline: 125000, priceOnline: 95000, onlineNow: true, distanceKm: 1.8, bio: 'Yangi tugʻilgan va kichik yosh bolalar.' },
  { id: 'd12', name: 'Farhod Bekmurodov', specialty: 'Dermatolog', experienceYears: 13, clinicId: 'c6', rating: 4.7, reviewCount: 31, priceOffline: 160000, priceOnline: 125000, onlineNow: false, distanceKm: 5.8, bio: 'Teri onkologiyasi skriningi (yoʻnalish).' },
]

export const SPECIALTIES = [
  'Terapevt',
  'Nevrolog',
  'Kardiolog',
  'Pediatr',
  'Dermatolog',
  'Gastroenterolog',
  'Stomatolog',
] as const
