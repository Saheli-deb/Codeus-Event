
'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'

type EventKey = 'gen-ai' | 'agentic-ai' | 'no-code'
type Member = { name: string; whatsapp: string; year: string }
type FormState = {
  collegeName: string
  teamName: string
  leader: { name: string; email: string; whatsapp: string; phone: string; year: string }
  member1: Member
  member2: Member
  member3: Member
  transactionId: string
}

const emptyMember: Member = { name: '', whatsapp: '', year: '1st year' }
const emptyForm: FormState = {
  collegeName: '',
  teamName: '',
  leader: { name: '', email: '', whatsapp: '', phone: '', year: '1st year' },
  member1: { ...emptyMember },
  member2: { ...emptyMember },
  member3: { ...emptyMember },
  transactionId: '',
}

const LS_FORM = 'reg.form.v3'
const LS_EVENTS = 'reg.form.v3.events'
const LS_SIZE = 'reg.form.v3.size'

/* ----------------------
   Reusable components (HOISTED)
   ---------------------- */

type InputProps = {
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
}
const Input = React.memo(function Input({
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = true,
  autoComplete = 'off',
}: InputProps) {
  return (
    <div className="hp-card p-1 rounded-xl">
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-2 outline-none text-cream/95"
        autoComplete={autoComplete}
        spellCheck={false}
        required={required}
      />
    </div>
  )
})

type YearProps = {
  name: string
  value: string
  onChange: (v: string) => void
}
const Year = React.memo(function Year({ name, value, onChange }: YearProps) {
  return (
    <div className="hp-card p-1 rounded-xl">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent px-3 py-2 outline-none"
      >
        <option>1st year</option>
        <option>2nd year</option>
        <option>3rd year</option>
        <option>4th year</option>
        <option>PG</option>
      </select>
    </div>
  )
})

type EventPillProps = {
  k: EventKey
  label: string
  active: boolean
  onToggle: () => void
}
const EventPill = React.memo(function EventPill({ k, label, active, onToggle }: EventPillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-full border transition ${
        active
          ? 'border-gold bg-gold/10 text-cream shadow-[0_0_16px_rgba(212,175,55,0.35)]'
          : 'border-gold/35 text-cream hover:bg-gold/10'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
})

/* ----------------------
   Main form
   ---------------------- */

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [teamSize, setTeamSize] = useState<2 | 3>(2)
  const [events, setEvents] = useState<EventKey[]>([])
  const [submitting, setSubmitting] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const idFileRef = useRef<HTMLInputElement>(null)
  const payFileRef = useRef<HTMLInputElement>(null)

  const total = useMemo(
    () => (events.length === 1 ? 150 : events.length === 2 ? 300 : 0),
    [events]
  )

  // ---------- state helpers (pure, minimal updates) ----------
  const setRootField = useCallback((key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value } as FormState))
  }, [])

  const setLeaderField = useCallback((key: keyof FormState['leader'], value: string) => {
    setForm((prev) => ({ ...prev, leader: { ...prev.leader, [key]: value } }))
  }, [])

  const setMember = useCallback((n: 1 | 2 | 3, key: keyof Member, value: string) => {
    const idxKey = (['member1', 'member2', 'member3'] as const)[n - 1]
    setForm((prev) => ({
      ...prev,
      [idxKey]: { ...(prev as any)[idxKey], [key]: value },
    }) as FormState)
  }, [])

  const toggleEvent = useCallback((k: EventKey) => {
    setEvents((prev) => {
      const has = prev.includes(k)
      if (has) return prev.filter((x) => x !== k)
      if (prev.length >= 2) return prev // cap 2
      return [...prev, k]
    })
  }, [])

  // ---------- autosave / restore ----------
  useEffect(() => {
    try {
      const f = localStorage.getItem(LS_FORM)
      if (f) setForm(JSON.parse(f))
      const e = localStorage.getItem(LS_EVENTS)
      if (e) setEvents(JSON.parse(e))
      const s = Number(localStorage.getItem(LS_SIZE))
      if (s === 2 || s === 3) setTeamSize(s)
    } catch {}
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_FORM, JSON.stringify(form))
      } catch {}
    }, 200)
    return () => clearTimeout(t)
  }, [form])

  useEffect(() => {
    try {
      localStorage.setItem(LS_EVENTS, JSON.stringify(events))
    } catch {}
  }, [events])

  useEffect(() => {
    try {
      localStorage.setItem(LS_SIZE, JSON.stringify(teamSize))
    } catch {}
  }, [teamSize])

  // ---------- validation ----------
  const validate = (): string | null => {
    const req = (v: string, l: string) => (!v.trim() ? '${l} is required.' : null)
    for (const [v, l] of [
      [form.collegeName, 'College name'],
      [form.teamName, 'Team name'],
      [form.leader.name, 'Leader name'],
      [form.leader.email, 'Leader email'],
      [form.leader.whatsapp, 'Leader WhatsApp'],
      [form.leader.phone, 'Leader phone'],
      [form.member1.name, 'Member 1 name'],
      [form.member1.whatsapp, 'Member 1 WhatsApp'],
      [form.member2.name, 'Member 2 name'],
      [form.member2.whatsapp, 'Member 2 WhatsApp'],
    ] as const) {
      const e = req(v, l)
      if (e) return e
    }
    if (teamSize === 3 && (!form.member3.name.trim() || !form.member3.whatsapp.trim()))
      return 'Please complete Member 3 details.'
    if (events.length < 1 || events.length > 2) return 'Please select 1 or 2 events.'
    if (!form.transactionId.trim()) return 'Transaction ID is required.'
    if (!payFileRef.current?.files?.length) return 'Payment screenshot is required.'
    return null
  }

  // ---------- submit ----------
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) return alert(err)
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.set('collegeName', form.collegeName)
      fd.set('teamName', form.teamName)
      fd.set('leader.name', form.leader.name)
      fd.set('leader.email', form.leader.email)
      fd.set('leader.whatsapp', form.leader.whatsapp)
      fd.set('leader.phone', form.leader.phone)
      fd.set('leader.year', form.leader.year)
      fd.set('member1.name', form.member1.name)
      fd.set('member1.whatsapp', form.member1.whatsapp)
      fd.set('member1.year', form.member1.year)
      fd.set('member2.name', form.member2.name)
      fd.set('member2.whatsapp', form.member2.whatsapp)
      fd.set('member2.year', form.member2.year)
      if (teamSize === 3) {
        fd.set('member3.name', form.member3.name)
        fd.set('member3.whatsapp', form.member3.whatsapp)
        fd.set('member3.year', form.member3.year)
      }
      fd.set('teamSize', String(teamSize))
      events.forEach((k) => fd.append('events', k))
      fd.set('transactionId', form.transactionId)
      const idF = idFileRef.current?.files?.[0]
      const payF = payFileRef.current?.files?.[0]
      if (idF) fd.set('leader.idImage', idF)
      if (payF) fd.set('paymentScreenshot', payF)

      const res = await fetch('/api/register', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json?.message || 'Submit failed.')

      alert('Registration submitted! We will contact you soon.')
      localStorage.removeItem(LS_FORM)
      localStorage.removeItem(LS_EVENTS)
      localStorage.removeItem(LS_SIZE)
      setForm(emptyForm)
      setEvents([])
      setTeamSize(2)
      if (idFileRef.current) idFileRef.current.value = ''
      if (payFileRef.current) payFileRef.current.value = ''
      formRef.current?.reset()
    } catch (err: any) {
      alert(err?.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ---------- render ---------- */
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT */}
        <section className="hp-card p-4 sm:p-6">
          <h2 className="font-hpTitle text-gold text-2xl sm:text-3xl mb-4">Team & Leader</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">College name</label>
              <Input
                name="collegeName"
                value={form.collegeName}
                onChange={(v) => setRootField('collegeName', v)}
                placeholder="College name"
                autoComplete="organization"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Team name</label>
              <Input
                name="teamName"
                value={form.teamName}
                onChange={(v) => setRootField('teamName', v)}
                placeholder="Team name"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Leader name</label>
              <Input
                name="leader.name"
                value={form.leader.name}
                onChange={(v) => setLeaderField('name', v)}
                placeholder="Leader full name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Leader email (Gmail)</label>
              <Input
                name="leader.email"
                type="email"
                value={form.leader.email}
                onChange={(v) => setLeaderField('email', v)}
                placeholder="yourname@gmail.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Leader WhatsApp</label>
              <Input
                name="leader.whatsapp"
                value={form.leader.whatsapp}
                onChange={(v) => setLeaderField('whatsapp', v)}
                placeholder="10 digits"
                autoComplete="tel-national"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Leader phone</label>
              <Input
                name="leader.phone"
                value={form.leader.phone}
                onChange={(v) => setLeaderField('phone', v)}
                placeholder="10 digits"
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Leader year</label>
              <Year name="leader.year" value={form.leader.year} onChange={(v) => setLeaderField('year', v)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Leader college ID (image)</label>
              <div className="hp-card p-1 rounded-xl">
                <input
                  ref={idFileRef}
                  name="leader.idImage"
                  type="file"
                  accept="image/*"
                  className="w-full bg-transparent px-3 py-2 outline-none"
                />
              </div>
              <p className="text-xs opacity-80 mt-1">Carry your college ID on event day.</p>
            </div>
          </div>

          {/* Team strength */}
          <div className="mt-5">
            <label className="block text-sm mb-2">Team strength</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="teamSize" value="2" checked={teamSize === 2} onChange={() => setTeamSize(2)} />
                <span>2 members</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="teamSize" value="3" checked={teamSize === 3} onChange={() => setTeamSize(3)} />
                <span>3 members</span>
              </label>
            </div>
            <p className="text-xs text-gray-300 mt-1 italic">
                (Team size includes the leader.  
                Example: 2 members = Leader + 1 additional member,  
                3 members = Leader + 2 additional members.)
              </p>
          </div>
          
          {/* Members */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-cream">Member 1</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input name="member1.name" value={form.member1.name} onChange={(v) => setMember(1, 'name', v)} placeholder="Name" />
              <Input name="member1.whatsapp" value={form.member1.whatsapp} onChange={(v) => setMember(1, 'whatsapp', v)} placeholder="WhatsApp" autoComplete="tel-national" />
              <Year name="member1.year" value={form.member1.year} onChange={(v) => setMember(1, 'year', v)} />
            </div>

            <h3 className="font-semibold text-cream">Member 2</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input name="member2.name" value={form.member2.name} onChange={(v) => setMember(2, 'name', v)} placeholder="Name" />
              <Input name="member2.whatsapp" value={form.member2.whatsapp} onChange={(v) => setMember(2, 'whatsapp', v)} placeholder="WhatsApp" autoComplete="tel-national" />
              <Year name="member2.year" value={form.member2.year} onChange={(v) => setMember(2, 'year', v)} />
            </div>

            {teamSize === 3 && (
              <>
                <h3 className="font-semibold text-cream">Member 3</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input name="member3.name" value={form.member3.name} onChange={(v) => setMember(3, 'name', v)} placeholder="Name" />
                  <Input name="member3.whatsapp" value={form.member3.whatsapp} onChange={(v) => setMember(3, 'whatsapp', v)} placeholder="WhatsApp" autoComplete="tel-national" />
                  <Year name="member3.year" value={form.member3.year} onChange={(v) => setMember(3, 'year', v)} />
                </div>
              </>
            )}
          </div>
        </section>

        {/* RIGHT */}
        <section className="hp-card p-4 sm:p-6">
          <h2 className="font-hpTitle text-gold text-2xl sm:text-3xl mb-4">Events (choose up to 2)</h2>

          <div className="flex flex-wrap gap-3">
            <EventPill k="gen-ai" label="Defence Against Dark Prompts (Gen AI)" active={events.includes('gen-ai')} onToggle={() => toggleEvent('gen-ai')} />
            <EventPill k="agentic-ai" label="The Chambers of Agents (Agentic AI)" active={events.includes('agentic-ai')} onToggle={() => toggleEvent('agentic-ai')} />
            <EventPill k="no-code" label="Charms Without Wands (No-Code)" active={events.includes('no-code')} onToggle={() => toggleEvent('no-code')} />
          </div>

          <div className="mt-5 grid sm:grid-cols-[220px_1fr] gap-4 items-start">
            <div className="hp-card p-2 rounded-xl overflow-hidden">
              <Image src="/pay-qr.png" alt="Payment QR" width={400} height={400} className="w-full h-auto object-contain" priority />
            </div>
            <div>
              <p className="text-sm leading-relaxed">
                Fee: <b>₹150</b> for <b>1 event</b>, <b>₹300</b> for <b>2 events</b>.
                <br />
                Scan the <b>QR</b> to pay. Enter the <b>Transaction ID</b> and upload the <b>payment screenshot</b>.
              </p>

              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="hp-card p-1 rounded-xl">
                  <input ref={payFileRef} name="paymentScreenshot" type="file" accept="image/*" className="w-full bg-transparent px-3 py-2 outline-none" />
                </div>
                <Input name="transactionId" value={form.transactionId} onChange={(v) => setRootField('transactionId', v)} placeholder="Transaction ID / UPI Ref" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-1">Total payable</label>
            <div className="hp-card p-3 rounded-xl font-semibold">₹ {total}</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn" type="button" onClick={() => alert('Draft saved on this device.')}>Save Draft</button>
            <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit'}</button>
          </div>
        </section>
      </div>
    </form>
  )
}
