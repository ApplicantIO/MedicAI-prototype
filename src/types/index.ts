export type ThemeMode = 'light' | 'dark' | 'system'
export type ProRole = 'pharmacy' | 'clinic' | 'doctor'
export type OrderStatus = 'accepted' | 'preparing' | 'ready' | 'delivered'
export type AppointmentStatus = 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled'
export type UrgencyLevel = 'low' | 'medium' | 'high'
export type ConsultType = 'offline' | 'online'
export type DeliveryMode = 'pickup' | 'delivery'
export type PaymentMethod = 'card' | 'cash'

export interface Doctor {
  id: string
  name: string
  specialty: string
  experienceYears: number
  clinicId: string
  rating: number
  reviewCount: number
  priceOffline: number
  priceOnline: number
  onlineNow: boolean
  distanceKm: number
  bio: string
}

export interface Clinic {
  id: string
  name: string
  type: 'clinic' | 'hospital'
  rating: number
  distanceKm: number
  address: string
  hours: string
  services: string[]
  doctorIds: string[]
  description: string
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  hours: string
  distanceKm: number
  rating: number
  promoted: boolean
}

export interface Drug {
  id: string
  name: string
  category: string
  basePrice: number
}

export interface PharmacyDrugOffer {
  pharmacyId: string
  drugId: string
  price: number
  inStock: boolean
  stock: number
}

export interface Review {
  id: string
  doctorId: string
  author: string
  rating: number
  text: string
  date: string
}

export interface RegionStat {
  id: string
  name: string
  visits: number
  topSpecialty: string
}

export interface OrderItem {
  drugId: string
  quantity: number
}

export interface Order {
  id: string
  pharmacyId: string
  items: OrderItem[]
  status: OrderStatus
  deliveryMode: DeliveryMode
  paymentMethod: PaymentMethod
  createdAt: string
  chat: ChatMessage[]
}

export interface Appointment {
  id: string
  doctorId: string
  clinicId: string
  type: ConsultType
  date: string
  time: string
  status: AppointmentStatus
  code: string
  patientName: string
}

export interface ChatMessage {
  id: string
  from: 'user' | 'provider' | 'system'
  text: string
  at: string
}

export interface CartItem {
  drugId: string
  pharmacyId: string
  quantity: number
}

export interface AIMessage {
  id: string
  role: 'ai' | 'user'
  text: string
}

export interface AIResult {
  directions: string[]
  urgency: UrgencyLevel
  specialist: string
  selfCare: string[]
  emergency?: boolean
  emergencyNote?: string
}

export interface ConsultSummary {
  appointmentId: string
  summary: string
  prescriptionDrugIds: string[]
}

export interface InventoryRow {
  drugId: string
  price: number
  stock: number
}

export interface MessageThread {
  id: string
  title: string
  role: ProRole
  messages: ChatMessage[]
}

export interface MapPin {
  id: string
  type: 'clinic' | 'hospital' | 'pharmacy'
  name: string
  x: number
  y: number
  refId: string
}
