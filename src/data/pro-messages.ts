import type { MessageThread } from '@/types'

const now = new Date().toISOString()

export const proMessagesSeed: MessageThread[] = [
  {
    id: 'msg-patient-1',
    title: 'Demo Foydalanuvchi',
    role: 'doctor',
    messages: [{ id: 'msg-1', from: 'user', text: 'Ertangi qabul vaqtini tasdiqlab bera olasizmi?', at: now }],
  },
  {
    id: 'msg-clinic-1',
    title: 'Sogʻlom Hayot Klinikasi',
    role: 'clinic',
    messages: [{ id: 'msg-2', from: 'user', text: 'Kardiolog qabuli uchun yangi soʻrov bor.', at: now }],
  },
  {
    id: 'msg-pharmacy-1',
    title: 'Dori Plus · buyurtma o1',
    role: 'pharmacy',
    messages: [{ id: 'msg-3', from: 'user', text: 'Buyurtma tayyor boʻlish vaqti qachon?', at: now }],
  },
  {
    id: 'msg-hospital-1',
    title: 'Qabul boʻlimi',
    role: 'hospital',
    messages: [{ id: 'msg-4', from: 'user', text: 'Kuzatuv palatasida joylar mavjud.', at: now }],
  },
]