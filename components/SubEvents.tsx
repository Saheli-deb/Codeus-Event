
'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'

type EventKey = 'hoggen' | 'codeus' | 'codewho'

type Slide = {
  title: string
  body: string
  img: string
}

/** 
 * Put these JPG/PNG files in /public.
 * Swap names later – filenames are only placeholders.
 */
const data: Record<EventKey, Slide[]> = {
  hoggen: [
    {
      title: 'Defense Against Dark Prompts — Introduction',
      body:
        'Generative AI track focused on multimodal prompting, retrieval-augmented generation, and creative content with strong safety practices.',
      img: '/hoggen-1.jpg',
    },
    {
      title: 'Technologies to use',
      body:
        'Python, LangChain/LangGraph, vector DBs, open-weight models, guardrails, evaluation suites, and prompt tools.',
      img: '/hoggen-2.jpg',
    },
    {
      title: 'Format & judging',
      body:
        'Small teams, quick sprints, live demos. Judged on usefulness, originality, resilience, and safe outputs.',
      img: '/hoggen-3.jpg',
    },
  ],
  codeus: [
    {
      title: 'The Chamber of Agents — Introduction',
      body:
        'Agentic AI track: build tool-using, multi-step agents with planning, memory, and reliable execution.',
      img: '/codeus-1.jpg',
    },
    {
      title: 'Technologies to use',
      body:
        'Python/TypeScript, LangGraph, function/tool calling, schedulers, evaluation harnesses, vector memory, observability.',
      img: '/codeus-2.jpg',
    },
    {
      title: 'Format & judging',
      body:
        'Design clarity, robustness, safety, and end-to-end reliability. Live tasks to validate agent behaviors.',
      img: '/codeus-3.jpg',
    },
  ],
  codewho: [
    {
      title: 'Charms Without Wands  — Introduction',
      body:
        'No-code/low-code track: assemble powerful workflows with visual builders, templates, and connectors.',
      img: '/codewho-1.jpg',
    },
    {
      title: 'Technologies to use',
      body:
        'Make/Zapier/N8n, low-code LLM blocks, vector stores as plugins, off-the-shelf evals, content safety filters.',
      img: '/codewho-2.jpg',
    },
    {
      title: 'Format & judging',
      body:
        'Speed, usability, and polish. Extra points for accessible UX and safe defaults.',
      img: '/codewho-3.jpg',
    },
  ],
}

export default function SubEvents() {
  const [eventKey, setEventKey] = useState<EventKey>('hoggen')
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const slides = useMemo(() => data[eventKey], [eventKey])

  const to = (i: number) => setIndex((i + slides.length) % slides.length)
  const next = () => to(index + 1)
  const prev = () => to(index - 1)

  // Reset to first slide when switching event
  useEffect(() => {
    setIndex(0)
  }, [eventKey])

  // autoplay only when in view & not hovering
  useEffect(() => {
    let id: number | undefined
    const el = wrapRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting
        if (inView && !hovering) {
          id = window.setInterval(next, 5000)
        } else {
          if (id) window.clearInterval(id)
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.25 }
    )
    io.observe(el)

    return () => {
      if (id) window.clearInterval(id)
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hovering, eventKey])

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, eventKey])

  // touch swipe
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let startX = 0
    let dx = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      dx = 0
    }
    const onTouchMove = (e: TouchEvent) => {
      dx = e.touches[0].clientX - startX
    }
    const onTouchEnd = () => {
      if (Math.abs(dx) > 40) (dx > 0 ? prev() : next())
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, eventKey])

  return (
    <section id="subevents" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="font-hpTitle text-gold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Sub-Events</h2>

      {/* Event tabs - mobile responsive */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
        <Tab
          label="Defense Against Dark Prompts"
          shortLabel="Gen AI"
          active={eventKey === 'hoggen'}
          onClick={() => setEventKey('hoggen')}
        />
        <Tab
          label="The Chamber of Agents"
          shortLabel="Agentic AI"
          active={eventKey === 'codeus'}
          onClick={() => setEventKey('codeus')}
        />
        <Tab
          label="Charms Without Wands"
          shortLabel="No-Code"
          active={eventKey === 'codewho'}
          onClick={() => setEventKey('codewho')}
        />
      </div>

      {/* Slider card */}
      <div
        ref={wrapRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="
          relative rounded-2xl overflow-hidden
          border border-gold/25 bg-black/35
          backdrop-blur-md
          shadow-[0_0_40px_rgba(212,175,55,0.15)]
        "
      >
        {/* Background image of active slide */}
        <div className="absolute inset-0 -z-10">
          <Image
            key={`${eventKey}-${slides[index].img}`}
            src={slides[index].img}
            alt=""
            fill
            priority
            className="object-cover opacity-40 transition-opacity duration-500"
          />
          {/* vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/50 to-transparent" />

        {/* Slide content - mobile responsive */}
        <div className="relative px-4 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8 min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="hidden sm:block shrink-0 h-8 sm:h-10 w-1.5 rounded-full bg-gradient-to-b from-gold/60 to-transparent" />
            <div className="w-full">
              <h3 className="text-cream font-semibold text-lg sm:text-xl md:text-2xl drop-shadow leading-tight">
                {slides[index].title}
              </h3>
              <p className="mt-2 text-cream/90 max-w-3xl leading-relaxed text-sm sm:text-base">
                {slides[index].body}
              </p>
            </div>
          </div>
        </div>

        {/* arrows - mobile responsive */}
        <button
          aria-label="Previous"
          onClick={prev}
          className="
            group absolute left-2 sm:left-3 top-1/2 -translate-y-1/2
            h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-gold/40 bg-black/60
            backdrop-blur hover:bg-gold/15 transition
            flex items-center justify-center
            shadow-[0_0_18px_rgba(212,175,55,0.25)]
            z-10
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-cream/90 sm:w-[22px] sm:h-[22px]">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="
            group absolute right-2 sm:right-3 top-1/2 -translate-y-1/2
            h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-gold/40 bg-black/60
            backdrop-blur hover:bg-gold/15 transition
            flex items-center justify-center
            shadow-[0_0_18px_rgba(212,175,55,0.25)]
            z-10
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-cream/90 sm:w-[22px] sm:h-[22px]">
            <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>

        {/* dots - mobile responsive */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => to(i)}
              className={`
                h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition z-10
                ${i === index ? 'bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'bg-cream/35 hover:bg-cream/70'}
              `}
            />
          ))}
        </div>

        {/* subtle outer glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-[20px] bg-gradient-to-b from-gold/10 to-transparent blur-lg" />
      </div>
    </section>
  )
}

function Tab({
  label,
  shortLabel,
  active,
  onClick,
}: {
  label: string
  shortLabel?: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition flex-1 sm:flex-none text-center
        text-sm sm:text-base
        ${active
          ? 'border-gold bg-gold/10 text-cream shadow-[0_0_16px_rgba(212,175,55,0.35)]'
          : 'border-gold/35 text-cream hover:bg-gold/10'}
      `}
      title={label}
    >
      <span className="sm:hidden">{shortLabel || label}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
