/** Deterministic slot generation from doctor id + date string */
export function hashSeed(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

const SLOT_TIMES = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
]

export function getDaySlots(doctorId: string, dateIso: string): { time: string; available: boolean }[] {
  const seed = hashSeed(`${doctorId}:${dateIso}`)
  return SLOT_TIMES.map((time, idx) => {
    const blocked = (seed + idx * 7) % 5 === 0 || (seed + idx) % 11 === 0
    return { time, available: !blocked }
  })
}

export function nextSevenDays(from = new Date()): string[] {
  const days: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(from)
    d.setDate(from.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function formatUzDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('uz-UZ', { weekday: 'short', day: 'numeric', month: 'short' })
}
