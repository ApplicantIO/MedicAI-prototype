/** Deterministic slot generation from doctor id + date string */
export function hashSeed(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function getDaySlots(
  doctorId: string,
  dateIso: string,
  slotMinutes = 30,
  breakEnabled = true,
): { time: string; available: boolean }[] {
  const seed = hashSeed(`${doctorId}:${dateIso}`)
  const shifts: [number, number][] = breakEnabled
    ? [[9 * 60, 12 * 60 - slotMinutes], [14 * 60, 17 * 60]]
    : [[9 * 60, 17 * 60]]
  const times = shifts.flatMap(([start, end]) => {
    const shiftTimes: string[] = []
    for (let minutes = start; minutes <= end; minutes += slotMinutes) {
      shiftTimes.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`)
    }
    return shiftTimes
  })
  return times.map((time, idx) => ({
    time,
    available: !((seed + idx * 7) % 5 === 0 || (seed + idx) % 11 === 0),
  }))
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
