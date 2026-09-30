import { useMedicStore } from '@/store/medic-store'
import { getDaySlots, nextSevenDays } from '@/lib/slots'
import { Switch } from '@/components/ui/switch'

export function DoctorSchedulePage() {
  const slotMin = useMedicStore((s) => s.doctorScheduleSlotMinutes)
  const breakEnabled = useMedicStore((s) => s.doctorBreakEnabled)
  const setDoctorSchedule = useMedicStore((s) => s.setDoctorSchedule)
  const days = nextSevenDays()
  const doctorId = 'd1'

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Jadval</h1>
      <div className="mb-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          Slot (daq)
          <select
            className="rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-1"
            value={slotMin}
            onChange={(e) => setDoctorSchedule(Number(e.target.value), breakEnabled)}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Tanaffus
          <Switch
            checked={breakEnabled}
            onCheckedChange={(v) => setDoctorSchedule(slotMin, v)}
          />
        </label>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {days.map((day) => {
          const slots = getDaySlots(doctorId, day, slotMin, breakEnabled)
          return (
            <div key={day} className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-3 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <div className="mb-2 text-sm font-semibold">{day}</div>
              <div className="flex flex-wrap gap-1">
                {slots.map((s) => (
                  <span
                    key={s.time}
                    className={`rounded px-1.5 py-0.5 text-[11px] ${
                      s.available
                        ? 'border border-[var(--border)] text-[var(--fg)]'
                          : 'text-[var(--muted)] line-through'
                    }`}
                  >
                    {s.time}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
