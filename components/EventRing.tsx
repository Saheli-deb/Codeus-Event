
// 'use client'

// import Image from 'next/image'
// import { useEffect, useMemo, useRef, useState } from 'react'

// type Props = {
//   images?: string[]
//   title?: string
//   speedSec?: number
// }

// export default function EventRing({ images, title, speedSec = 18 }: Props) {
//   const wrapRef = useRef<HTMLDivElement>(null)
//   const trackRef = useRef<HTMLDivElement>(null)
//   const [paused, setPaused] = useState(false)

//   // ensure ≥6 panels for a nice cylinder
//   const PANELS = useMemo(() => {
//     const base = images?.length ? images : ['/hoggen.jpg', '/codeus.jpg', '/codewho.jpg']
//     const out: string[] = []
//     while (out.length < 6) out.push(...base)
//     return out.slice(0, 6)
//   }, [images])

//   useEffect(() => {
//     const wrap = wrapRef.current
//     const track = trackRef.current
//     if (!wrap || !track) return

//     const panels = Array.from(track.querySelectorAll<HTMLDivElement>('[data-panel]'))
//     const count = panels.length

//     const compute = () => {
//       const w = wrap.clientWidth
//       const radius = Math.min(Math.max(w * 0.32, 160), 360)
//       panels.forEach((el, i) => {
//         const angle = (360 / count) * i
//         el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`
//       })
//     }

//     compute()
//     const onResize = () => compute()
//     window.addEventListener('resize', onResize, { passive: true })
//     return () => window.removeEventListener('resize', onResize)
//   }, [])

//   return (
//     <div className="relative w-full select-none">
//       {/* Title above the ring */}
//       {title && (
//         <div className="mb-2 text-center font-hpTitle text-gold text-sm sm:text-base md:text-lg drop-shadow">
//           {title}
//         </div>
//       )}

//       <div
//         ref={wrapRef}
//         className="
//           relative mx-auto
//           h-[180px] sm:h-[200px] md:h-[220px]
//           w-full
//           flex items-center justify-center
//           [perspective:1200px]
//           animate-bob
//         "
//       >
//         {/* little ground shadow */}
//         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[55%] h-[14px] rounded-full bg-black/35 blur-[6px] opacity-60" />

//         {/* slight tilt → hollow cylinder feel */}
//         <div className="[transform-style:preserve-3d] [transform:rotateX(14deg)] h-full w-full flex items-center justify-center">
//           <div
//             ref={trackRef}
//             className="relative h-[88%] w-full [transform-style:preserve-3d]"
//             style={{
//               animation: `ring-spin ${speedSec}s linear infinite`,
//               animationPlayState: paused ? 'paused' : 'running',
//             }}
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => setPaused(false)}
//             onTouchStart={() => setPaused(true)}
//             onTouchEnd={() => setPaused(false)}
//           >
//             {PANELS.map((src, i) => (
//               <div
//                 key={i}
//                 data-panel
//                 className="
//                   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//                   w-[150px] h-[100px]
//                   xs:w-[170px] xs:h-[114px]
//                   sm:w-[190px] sm:h-[128px]
//                   md:w-[210px] md:h-[142px]
//                   rounded-xl overflow-hidden
//                   border border-gold/45 shadow-glow
//                   bg-black/25 backdrop-blur-[1px]
//                   [transform-style:preserve-3d]
//                   will-change-transform
//                 "
//               >
//                 <Image src={src} alt={title ?? 'Event artwork'} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  images?: string[]
  title?: string
  speedSec?: number
  /** negative animation delay (seconds) so each ring starts at a different angle */
  phaseOffsetSec?: number
}

export default function EventRing({
  images,
  title,
  speedSec = 24,
  phaseOffsetSec = 0,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  // Build 6 panels for a nice cylinder
  const PANELS = useMemo(() => {
    const base = images?.length ? images : ['/hoggen.jpg', '/codeus.jpg', '/codewho.jpg']
    const out: string[] = []
    while (out.length < 6) out.push(...base)
    return out.slice(0, 6)
  }, [images])

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const panels = Array.from(track.querySelectorAll<HTMLDivElement>('[data-panel]'))
    const count = panels.length

    const compute = () => {
      const w = wrap.clientWidth
      // slightly tighter radius on desktop -> avoids crowding
      const radius = Math.min(Math.max(w * 0.28, 140), 300)
      panels.forEach((el, i) => {
        const angle = (360 / count) * i
        el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`
      })
    }
    compute()
    const onResize = () => compute()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="relative w-full max-w-[420px] mx-auto ring-glow select-none">
      {title && (
        <div className="mb-2 text-center font-hpTitle text-gold text-sm sm:text-base md:text-lg drop-shadow">
          {title}
        </div>
      )}

      <div
        ref={wrapRef}
        className="
          relative mx-auto
          h-[170px] sm:h-[190px] md:h-[205px]
          w-full
          flex items-center justify-center
          [perspective:1200px]
          animate-bob
        "
      >
        {/* soft ground shadow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[55%] h-[12px] rounded-full bg-black/35 blur-[6px] opacity-60" />

        {/* hollow feel via small tilt */}
        <div className="[transform-style:preserve-3d] [transform:rotateX(10deg)] h-full w-full flex items-center justify-center">
          <div
            ref={trackRef}
            className="relative h-[88%] w-full [transform-style:preserve-3d]"
            style={{
              animation: `ring-spin ${speedSec}s linear infinite`,
              animationDelay: `-${phaseOffsetSec}s`,       // <<< different phase for each ring
              animationPlayState: paused ? 'paused' : 'running',
              willChange: 'transform',
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {PANELS.map((src, i) => (
              <div
                key={i}
                data-panel
                className="
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[145px] h-[96px]
                  xs:w-[165px] xs:h-[110px]
                  sm:w-[185px] sm:h-[124px]
                  md:w-[200px] md:h-[136px]
                  rounded-xl overflow-hidden
                  border border-gold/45 shadow-glow
                  bg-black/25 backdrop-blur-[1px]
                  [transform-style:preserve-3d]
                  will-change-transform
                "
              >
                <Image src={src} alt={title ?? 'Event artwork'} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
