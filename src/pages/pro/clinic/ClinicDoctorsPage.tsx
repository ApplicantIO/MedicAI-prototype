import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CalendarDays, Star, Trash2 } from 'lucide-react'
import { doctorsSeed } from '@/data/doctors'
import { clinicsSeed } from '@/data/clinics'
import { useMedicStore } from '@/store/medic-store'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { initials, avatarColor } from '@/lib/avatar'
import { SPECIALTIES } from '@/data/doctors'

export function ClinicDoctorsPage() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState<string>(SPECIALTIES[0])
  const [contact, setContact] = useState('')
  const appointments = useMedicStore((s) => s.appointments)
  const availability = useMedicStore((s) => s.doctorAvailability)
  const setAvailability = useMedicStore((s) => s.setDoctorAvailability)
  const invites = useMedicStore((s) => s.clinicDoctorInvites)
  const inviteDoctor = useMedicStore((s) => s.inviteClinicDoctor)
  const removeInvite = useMedicStore((s) => s.removeClinicDoctorInvite)
  const clinicDoctors = doctorsSeed.filter((doctor) => doctor.clinicId !== 'c6')

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--muted)]">Mutaxassislar va qabul holati</p>
          <h1 className="mt-1 text-2xl font-semibold">Shifokorlar jamoasi</h1>
        </div>
        <Button variant="outline" onClick={() => setInviteOpen((open) => !open)}>{inviteOpen ? 'Taklifni yopish' : 'Shifokorni taklif qilish'}</Button>
      </header>
      {inviteOpen && <form className="grid grid-cols-12 gap-3 rounded-[var(--radius-card)] border border-[var(--border)] p-4" onSubmit={(event) => { event.preventDefault(); if (!name.trim() || !contact.trim()) return; inviteDoctor({ name: name.trim(), specialty, contact: contact.trim() }); setName(''); setContact(''); setInviteOpen(false) }}>
        <label className="col-span-12 text-sm font-medium sm:col-span-6">Shifokor ismi<Input className="mt-2" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ism Familiya" required /></label>
        <label className="col-span-12 text-sm font-medium sm:col-span-6">Mutaxassislik<select value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="mt-2 h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--bg)] px-3 text-sm">{SPECIALTIES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="col-span-12 text-sm font-medium sm:col-span-8">Telefon yoki email<Input className="mt-2" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="+998… yoki email" required /></label>
        <div className="col-span-12 flex items-end sm:col-span-4"><Button type="submit" className="w-full">Taklif yuborish</Button></div>
        <p className="col-span-12 text-xs text-[var(--muted)]">Taklif demo roʻyxatiga saqlanadi; xabar haqiqatda yuborilmaydi.</p>
      </form>}
      {invites.length > 0 && <section><h2 className="mb-2 text-sm font-semibold">Yuborilgan takliflar</h2><div className="space-y-2">{invites.map((invite) => <div key={invite.id} className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] border border-[var(--border)] px-4 py-3"><div><p className="text-sm font-medium">{invite.name} · {invite.specialty}</p><p className="mt-1 text-xs text-[var(--muted)]">{invite.contact}</p></div><div className="flex items-center gap-3"><span className="text-xs text-[var(--muted)]">Demo taklif yuborildi</span><button type="button" aria-label={`${invite.name} taklifini olib tashlash`} onClick={() => removeInvite(invite.id)} className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--surface)]"><Trash2 size={16}/></button></div></div>)}</div></section>}
      <div className="grid grid-cols-12 gap-3">
        {clinicDoctors.map((doctor) => {
          const clinic = clinicsSeed.find((item) => item.id === doctor.clinicId)
          const todayAppointments = appointments.filter((item) => item.doctorId === doctor.id && item.date === new Date().toISOString().slice(0, 10)).length
          const enabled = availability[doctor.id] ?? doctor.onlineNow
          return (
            <article key={doctor.id} className="col-span-12 rounded-[var(--radius-card)] border border-[var(--border)] p-4 sm:col-span-6 xl:col-span-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: avatarColor(doctor.id) }}>
                  {initials(doctor.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-semibold">{doctor.name}</h2>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{doctor.specialty} · {doctor.experienceYears} yil</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[var(--muted)]"><Star size={12} className="fill-current" />{doctor.rating}</span>
              </div>
              <p className="mt-3 truncate text-xs text-[var(--muted)]">{clinic?.name}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]"><CalendarDays size={14} /> Bugun: {todayAppointments} qabul</span>
                <label className="flex items-center gap-2 text-xs">
                  <span>{enabled ? 'Qabulda' : 'Band'}</span>
                  <Switch checked={enabled} onCheckedChange={(value) => setAvailability(doctor.id, value)} />
                </label>
              </div>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to={`/app/doctors/${doctor.id}`}>Profilni koʻrish</Link>
              </Button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
