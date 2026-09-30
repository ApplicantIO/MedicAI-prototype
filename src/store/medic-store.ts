import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_CONFIG } from '@/config'
import { appointmentsSeed } from '@/data/appointments'
import { ordersSeed } from '@/data/orders'
import { couriersSeed } from '@/data/couriers'
import { pharmaciesSeed } from '@/data/pharmacies'
import { drugsSeed } from '@/data/drugs'
import { doctorsSeed } from '@/data/doctors'
import { hospitalBedsSeed } from '@/data/hospital-beds'
import { proMessagesSeed } from '@/data/pro-messages'
import type {
  AIMessage,
  AIResult,
  Appointment,
  AppointmentStatus,
  CartItem,
  ConsultSummary,
  InventoryRow,
  HospitalBed,
  MessageThread,
  Order,
  OrderStatus,
  ProRole,
  ThemeMode,
} from '@/types'
import type { AIScenario } from '@/data/ai-scenarios'
import { uz } from '@/content/uz'

export interface AIChatState {
  scenarioId: string | null
  stepIndex: number
  messages: AIMessage[]
  severity: number
  multiselect: string[]
  result: AIResult | null
  finished: boolean
}

export interface MedicState {
  theme: ThemeMode
  welcomeDone: boolean
  proRole: ProRole
  proLoggedIn: boolean
  demoAccelerator: boolean
  promotedPharmacies: Record<string, boolean>
  cart: CartItem[]
  orders: Order[]
  appointments: Appointment[]
  inventory: InventoryRow[]
  inventoryConnected: boolean
  inventorySyncedAt: string | null
  providerProfile: { name: string; phone: string }
  demoLicensePlan: string
  doctorAvailability: Record<string, boolean>
  clinicDoctorInvites: { id: string; name: string; specialty: string; contact: string; status: 'sent' }[]
  pharmacyPartners: Record<string, boolean>
  hospitalBeds: HospitalBed[]
  proMessages: MessageThread[]
  savedDoctorIds: string[]
  aiHistory: { id: string; scenarioId: string; at: string }[]
  aiChat: AIChatState
  consultSummaries: ConsultSummary[]
  doctorScheduleSlotMinutes: number
  doctorBreakEnabled: boolean
  resetDemo: () => void
  setTheme: (t: ThemeMode) => void
  setWelcomeDone: (v: boolean) => void
  setProRole: (r: ProRole) => void
  setProLoggedIn: (v: boolean) => void
  setDemoAccelerator: (v: boolean) => void
  setPromoted: (pharmacyId: string, v: boolean) => void
  addToCart: (item: CartItem) => void
  updateCartQty: (drugId: string, pharmacyId: string, qty: number) => void
  clearCart: () => void
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'chat' | 'status'>) => string
  advanceOrder: (id: string) => void
  setOrderStatus: (id: string, status: OrderStatus) => void
  assignCourier: (orderId: string, courierId: string) => void
  markDelivered: (orderId: string) => void
  markFailed: (orderId: string, reason: string) => void
  retryOrder: (orderId: string) => void
  addOrderMessage: (id: string, text: string, from: 'user' | 'provider') => void
  addAppointment: (a: Omit<Appointment, 'id' | 'code' | 'status'>) => string
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void
  updateInventory: (drugId: string, patch: Partial<InventoryRow>) => void
  setInventoryConnected: (v: boolean, at?: string) => void
  setProviderProfile: (profile: { name: string; phone: string }) => void
  setDemoLicensePlan: (plan: string) => void
  setDoctorAvailability: (doctorId: string, available: boolean) => void
  inviteClinicDoctor: (invite: { name: string; specialty: string; contact: string }) => void
  removeClinicDoctorInvite: (inviteId: string) => void
  setPharmacyPartner: (pharmacyId: string, partner: boolean) => void
  setHospitalBed: (bedId: string, status: HospitalBed['status'], patientName?: string) => void
  addProMessage: (threadId: string, text: string) => void
  removeProMessage: (threadId: string, messageId: string) => void
  toggleSavedDoctor: (id: string) => void
  resetAIChat: () => void
  setAIChat: (patch: Partial<AIChatState>) => void
  pushAIMessage: (msg: AIMessage) => void
  completeAI: (scenario: AIScenario, result: AIResult) => void
  addConsultSummary: (s: ConsultSummary) => void
  setDoctorSchedule: (slotMinutes: number, breakEnabled: boolean) => void
}

function initialPromoted(): Record<string, boolean> {
  return Object.fromEntries(pharmaciesSeed.map((p) => [p.id, p.promoted]))
}

function initialInventory(): InventoryRow[] {
  return drugsSeed.map((d) => ({
    drugId: d.id,
    price: d.basePrice,
    stock: 3 + (d.id.charCodeAt(2) % 18),
  }))
}

function initialDoctorAvailability(): Record<string, boolean> {
  return Object.fromEntries(doctorsSeed.map((doctor) => [doctor.id, doctor.onlineNow]))
}

function initialPharmacyPartners(): Record<string, boolean> {
  return Object.fromEntries(pharmaciesSeed.map((pharmacy) => [pharmacy.id, ['p1', 'p3'].includes(pharmacy.id)]))
}

function emptyAIChat(): AIChatState {
  return {
    scenarioId: null,
    stepIndex: 0,
    messages: [],
    severity: 5,
    multiselect: [],
    result: null,
    finished: false,
  }
}

function cloneSeed<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

const DELIVERY_FLOW: OrderStatus[] = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered']
const PICKUP_FLOW: OrderStatus[] = ['accepted', 'preparing', 'ready', 'delivered']
const ORDER_EVENT_TEXT: Record<OrderStatus, string> = {
  accepted: uz.order.events.accepted,
  preparing: uz.order.events.preparing,
  ready: uz.order.events.ready,
  out_for_delivery: uz.order.events.outForDelivery,
  delivered: uz.order.events.delivered,
  failed: uz.order.events.failed,
  cancelled: uz.order.events.cancelled,
}

function normalizeOrder(order: Order, seed?: Order): Order {
  const inDelivery = order.deliveryMode === 'delivery'
  const flow = inDelivery ? DELIVERY_FLOW : PICKUP_FLOW
  let history: OrderStatus[]
  if (order.status === 'failed' && inDelivery) history = [...DELIVERY_FLOW.slice(0, -1), 'failed']
  else if (order.status === 'cancelled') history = ['accepted', 'cancelled']
  else {
    const statusIndex = flow.indexOf(order.status)
    history = statusIndex < 0 ? ['accepted'] : flow.slice(0, statusIndex + 1)
  }
  const events = order.events?.length
    ? order.events
    : history.map((status, index) => ({
        id: `oe-${order.id}-legacy-${status}`,
        at: new Date(Date.parse(order.createdAt) + index * 60_000).toISOString(),
        status,
        text: ORDER_EVENT_TEXT[status],
      }))
  const isInTransit = order.status === 'out_for_delivery' || order.status === 'delivered' || order.status === 'failed'

  return {
    ...seed,
    ...order,
    priority: order.priority ?? seed?.priority ?? 'standard',
    address: order.address ?? seed?.address,
    pickupCode: order.pickupCode ?? (order.deliveryMode === 'pickup' && order.status === 'ready' ? seed?.pickupCode : undefined),
    courierId: order.courierId ?? (isInTransit ? seed?.courierId ?? null : null),
    etaMinutes: order.etaMinutes ?? (order.status === 'out_for_delivery' ? seed?.etaMinutes ?? 30 : null),
    events,
    deliveredAt: order.deliveredAt ?? (order.status === 'delivered' ? seed?.deliveredAt ?? order.createdAt : null),
    failReason: order.failReason ?? (order.status === 'failed' ? seed?.failReason ?? uz.order.failureReasons.noAnswer : null),
  }
}

function withOrderEvent(order: Order, status: OrderStatus, text: string, patch: Partial<Order> = {}): Order {
  const at = new Date().toISOString()
  const eventId = `oe-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  return {
    ...order,
    ...patch,
    status,
    events: [...(order.events ?? []), { id: eventId, at, status, text }],
    chat: [...order.chat, { id: `cm-${eventId}`, from: 'system', text, at }],
  }
}

export const useMedicStore = create<MedicState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      welcomeDone: false,
      proRole: 'pharmacy',
      proLoggedIn: false,
      demoAccelerator: false,
      promotedPharmacies: initialPromoted(),
      cart: [],
      orders: cloneSeed(ordersSeed),
      appointments: cloneSeed(appointmentsSeed),
      inventory: initialInventory(),
      inventoryConnected: false,
      inventorySyncedAt: null,
      providerProfile: { name: 'Medic AI hamkor', phone: '+998 90 000 00 00' },
      demoLicensePlan: 'start',
      doctorAvailability: initialDoctorAvailability(),
      clinicDoctorInvites: [],
      pharmacyPartners: initialPharmacyPartners(),
      hospitalBeds: cloneSeed(hospitalBedsSeed),
      proMessages: cloneSeed(proMessagesSeed),
      savedDoctorIds: [],
      aiHistory: [],
      aiChat: emptyAIChat(),
      consultSummaries: [],
      doctorScheduleSlotMinutes: 30,
      doctorBreakEnabled: true,

      resetDemo: () =>
        set({
          welcomeDone: false,
          proLoggedIn: false,
          demoAccelerator: false,
          promotedPharmacies: initialPromoted(),
          cart: [],
          orders: cloneSeed(ordersSeed),
          appointments: cloneSeed(appointmentsSeed),
          inventory: initialInventory(),
          inventoryConnected: false,
          inventorySyncedAt: null,
          providerProfile: { name: 'Medic AI hamkor', phone: '+998 90 000 00 00' },
          demoLicensePlan: 'start',
          doctorAvailability: initialDoctorAvailability(),
          clinicDoctorInvites: [],
          pharmacyPartners: initialPharmacyPartners(),
          hospitalBeds: cloneSeed(hospitalBedsSeed),
          proMessages: cloneSeed(proMessagesSeed),
          savedDoctorIds: [],
          aiHistory: [],
          aiChat: emptyAIChat(),
          consultSummaries: [],
        }),

      setTheme: (theme) => set({ theme }),
      setWelcomeDone: (welcomeDone) => set({ welcomeDone }),
      setProRole: (proRole) => set({ proRole }),
      setProLoggedIn: (proLoggedIn) => set({ proLoggedIn }),
      setDemoAccelerator: (demoAccelerator) => set({ demoAccelerator }),
      setPromoted: (pharmacyId, v) =>
        set((s) => ({ promotedPharmacies: { ...s.promotedPharmacies, [pharmacyId]: v } })),

      addToCart: (item) =>
        set((s) => {
          const existing = s.cart.find((c) => c.drugId === item.drugId && c.pharmacyId === item.pharmacyId)
          if (existing) {
            return {
              cart: s.cart.map((c) =>
                c.drugId === item.drugId && c.pharmacyId === item.pharmacyId
                  ? { ...c, quantity: c.quantity + item.quantity }
                  : c,
              ),
            }
          }
          return { cart: [...s.cart, item] }
        }),

      updateCartQty: (drugId, pharmacyId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((c) => !(c.drugId === drugId && c.pharmacyId === pharmacyId))
              : s.cart.map((c) =>
                  c.drugId === drugId && c.pharmacyId === pharmacyId ? { ...c, quantity: qty } : c,
                ),
        })),

      clearCart: () => set({ cart: [] }),

      placeOrder: (order) => {
        const id = `o${Date.now()}`
        const at = new Date().toISOString()
        const pickupCode = order.deliveryMode === 'pickup'
          ? String(Math.floor(1000 + Math.random() * 9000))
          : undefined
        const acceptedEvent = { id: `oe-${id}-accepted`, at, status: 'accepted' as const, text: uz.order.events.accepted }
        const newOrder: Order = {
          ...order,
          id,
          status: 'accepted',
          createdAt: at,
          priority: order.priority ?? 'standard',
          pickupCode: order.deliveryMode === 'pickup' ? pickupCode : undefined,
          courierId: order.courierId ?? null,
          etaMinutes: order.etaMinutes ?? null,
          deliveredAt: null,
          failReason: null,
          events: [acceptedEvent],
          chat: [{ id: `cm-${id}-accepted`, from: 'system', text: acceptedEvent.text, at }],
        }
        set((s) => ({ orders: [newOrder, ...s.orders], cart: [] }))
        return id
      },

      advanceOrder: (id) => {
        const order = get().orders.find((o) => o.id === id)
        if (!order) return
        const flow = order.deliveryMode === 'delivery' ? DELIVERY_FLOW : PICKUP_FLOW
        const idx = flow.indexOf(order.status)
        if (idx < 0 || idx >= flow.length - 1) return
        const nextStatus = flow[idx + 1]!
        if (nextStatus === 'out_for_delivery' && order.deliveryMode === 'delivery') {
          get().assignCourier(id, order.courierId ?? couriersSeed[0]!.id)
          return
        }
        get().setOrderStatus(id, nextStatus)
      },

      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((order) => {
            if (order.id !== id) return order
            const text = ORDER_EVENT_TEXT[status] ?? uz.order.systemMessage
            return withOrderEvent(order, status, text, status === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
          }),
        })),

      assignCourier: (orderId, courierId) =>
        set((s) => ({
          orders: s.orders.map((order) => {
            if (order.id !== orderId || order.deliveryMode !== 'delivery' || order.status !== 'ready') return order
            const etaMinutes = Math.floor(15 + Math.random() * 31)
            return withOrderEvent(order, 'out_for_delivery', uz.order.events.courierAssigned, {
              courierId,
              etaMinutes,
              failReason: null,
            })
          }),
        })),

      markDelivered: (orderId) =>
        set((s) => ({
          orders: s.orders.map((order) => {
            const canDeliver = order.deliveryMode === 'pickup'
              ? order.status === 'ready'
              : order.status === 'out_for_delivery'
            if (order.id !== orderId || !canDeliver) return order
            const at = new Date().toISOString()
            return withOrderEvent(order, 'delivered', uz.order.podNote, { deliveredAt: at, etaMinutes: null })
          }),
        })),

      markFailed: (orderId, reason) =>
        set((s) => ({
          orders: s.orders.map((order) => {
            if (order.id !== orderId || order.status !== 'out_for_delivery') return order
            const failReason = reason.trim() || uz.order.events.failed
            return withOrderEvent(order, 'failed', `${uz.order.events.failed}: ${failReason}`, {
              failReason,
              etaMinutes: null,
            })
          }),
        })),

      retryOrder: (orderId) =>
        set((s) => ({
          orders: s.orders.map((order) => {
            if (order.id !== orderId || order.status !== 'failed' || order.deliveryMode !== 'delivery') return order
            return withOrderEvent(order, 'out_for_delivery', uz.order.events.retry, {
              etaMinutes: 30,
              failReason: null,
            })
          }),
        })),

      addOrderMessage: (id, text, from) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  chat: [...o.chat, { id: `cm${Date.now()}`, from, text, at: new Date().toISOString() }],
                }
              : o,
          ),
        })),

      addAppointment: (a) => {
        const id = `a${Date.now()}`
        const code = `QBL-${Math.floor(1000 + Math.random() * 9000)}`
        const appointment: Appointment = { ...a, id, code, status: 'pending' }
        set((s) => ({ appointments: [appointment, ...s.appointments] }))
        return id
      },

      setAppointmentStatus: (id, status) =>
        set((s) => ({
          appointments: s.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
        })),

      updateInventory: (drugId, patch) =>
        set((s) => ({
          inventory: s.inventory.map((row) => (row.drugId === drugId ? { ...row, ...patch } : row)),
        })),

      setInventoryConnected: (inventoryConnected, at) =>
        set({ inventoryConnected, inventorySyncedAt: at ?? new Date().toISOString() }),
      setProviderProfile: (providerProfile) => set({ providerProfile }),
      setDemoLicensePlan: (demoLicensePlan) => set({ demoLicensePlan }),

      setDoctorAvailability: (doctorId, available) =>
        set((s) => ({ doctorAvailability: { ...s.doctorAvailability, [doctorId]: available } })),

      inviteClinicDoctor: (invite) =>
        set((s) => ({ clinicDoctorInvites: [{ ...invite, id: `invite-${Date.now()}`, status: 'sent' }, ...s.clinicDoctorInvites] })),

      removeClinicDoctorInvite: (inviteId) =>
        set((s) => ({ clinicDoctorInvites: s.clinicDoctorInvites.filter((invite) => invite.id !== inviteId) })),

      setPharmacyPartner: (pharmacyId, partner) =>
        set((s) => ({ pharmacyPartners: { ...s.pharmacyPartners, [pharmacyId]: partner } })),

      setHospitalBed: (bedId, status, patientName) =>
        set((s) => ({
          hospitalBeds: s.hospitalBeds.map((bed) =>
            bed.id === bedId
              ? { ...bed, status, patientName: status === 'occupied' ? patientName || 'Yangi bemor' : undefined }
              : bed,
          ),
        })),

      addProMessage: (threadId, text) => {
        const response = 'Xabaringiz qabul qilindi. Tez orada javob beramiz.'
        const at = new Date().toISOString()
        set((s) => ({
          proMessages: s.proMessages.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  messages: [
                    ...thread.messages,
                    { id: `msg-${Date.now()}`, from: 'provider', text, at },
                    { id: `reply-${Date.now()}`, from: 'system', text: response, at },
                  ],
                }
              : thread,
          ),
        }))
      },

      removeProMessage: (threadId, messageId) =>
        set((s) => ({
          proMessages: s.proMessages.map((thread) =>
            thread.id === threadId
              ? { ...thread, messages: thread.messages.filter((message) => message.id !== messageId) }
              : thread,
          ),
        })),

      toggleSavedDoctor: (id) =>
        set((s) => ({
          savedDoctorIds: s.savedDoctorIds.includes(id)
            ? s.savedDoctorIds.filter((x) => x !== id)
            : [...s.savedDoctorIds, id],
        })),

      resetAIChat: () => set({ aiChat: emptyAIChat() }),

      setAIChat: (patch) => set((s) => ({ aiChat: { ...s.aiChat, ...patch } })),

      pushAIMessage: (msg) => set((s) => ({ aiChat: { ...s.aiChat, messages: [...s.aiChat.messages, msg] } })),

      completeAI: (scenario, result) =>
        set((s) => ({
          aiChat: { ...s.aiChat, result, finished: true, scenarioId: scenario.id },
          aiHistory: [
            { id: `h${Date.now()}`, scenarioId: scenario.id, at: new Date().toISOString() },
            ...s.aiHistory,
          ],
        })),

      addConsultSummary: (summary) => set((s) => ({ consultSummaries: [...s.consultSummaries, summary] })),

      setDoctorSchedule: (doctorScheduleSlotMinutes, doctorBreakEnabled) =>
        set({ doctorScheduleSlotMinutes, doctorBreakEnabled }),
    }),
    {
      name: APP_CONFIG.storageKey,
      version: 1,
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<MedicState>
        const appointments = persisted.appointments ?? currentState.appointments
        const savedIds = new Set(appointments.map((appointment) => appointment.id))
        const persistedOrders = persisted.orders ?? currentState.orders
        const savedOrderIds = new Set(persistedOrders.map((order) => order.id))
        const seedOrders = new Map(currentState.orders.map((order) => [order.id, order]))
        return {
          ...currentState,
          ...persisted,
          orders: [
            ...persistedOrders.map((order) => normalizeOrder(order, seedOrders.get(order.id))),
            ...currentState.orders.filter((order) => !savedOrderIds.has(order.id)),
          ],
          appointments: [...appointments, ...currentState.appointments.filter((appointment) => !savedIds.has(appointment.id))],
        }
      },
      partialize: (s) => ({
        theme: s.theme,
        welcomeDone: s.welcomeDone,
        proRole: s.proRole,
        proLoggedIn: s.proLoggedIn,
        demoAccelerator: s.demoAccelerator,
        promotedPharmacies: s.promotedPharmacies,
        cart: s.cart,
        orders: s.orders,
        appointments: s.appointments,
        inventory: s.inventory,
        inventoryConnected: s.inventoryConnected,
        inventorySyncedAt: s.inventorySyncedAt,
        providerProfile: s.providerProfile,
        demoLicensePlan: s.demoLicensePlan,
        doctorAvailability: s.doctorAvailability,
        clinicDoctorInvites: s.clinicDoctorInvites,
        pharmacyPartners: s.pharmacyPartners,
        hospitalBeds: s.hospitalBeds,
        proMessages: s.proMessages,
        savedDoctorIds: s.savedDoctorIds,
        aiHistory: s.aiHistory,
        aiChat: s.aiChat,
        consultSummaries: s.consultSummaries,
        doctorScheduleSlotMinutes: s.doctorScheduleSlotMinutes,
        doctorBreakEnabled: s.doctorBreakEnabled,
      }),
    },
  ),
)
