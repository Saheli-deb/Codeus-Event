

'use client'
import Wizard3D from '@/components/Wizard3D'
import SparklesBehind from '@/components/SparklesBehind'

export default function Hero() {
  return (
    <header
      id="about"
      className={`
        relative
        max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
        py-8 sm:py-10
        grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start
        mb-10 md:mb-12
      `}
    >
      {/* Left: Title & copy */}
      <div>
        <h1 className="font-hpTitle text-gold text-[36px] sm:text-6xl md:text-[64px] leading-tight drop-shadow mb-4">
          Main Event: The Triwizard Trials
        </h1>

        <p className="max-w-[60ch] text-[15px] sm:text-base opacity-95">
          The Triwizard Trials is a Hogwarts-inspired AI challenge with three magical
          events—Defence Against Dark Prompts (Generative AI), The Chambers of Agents
          (Agentic AI), and Charms Without Wands (No-Code AI). A blend of creativity,
          problem-solving, and innovation, the Trials crown the most brilliant minds
          as the Triwizard Champions of AI.
        </p>

        {/* CTA Card */}
        <div className="mt-6">
          <div className="cta-card relative rounded-2xl p-4 sm:p-5 pt-12 overflow-visible">

            {/* === PIN + RIBBON (pushed to the right; sits above Brochure) === */}
            <div className="pin-wrap" aria-hidden>
              <span className="magic-pin">
                <span className="pin-head" />
                <span className="pin-cap" />
                <span className="pin-shaft" />
                <span className="pin-thread" />
                <span className="pin-glow" />
                <span className="pin-shadow" />
              </span>
              <div className="cta-ribbon ribbon-pill">13–14 Sept · IEM IEDC-ECE</div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <a
                href="/register"
                className="btn-cta h-12 px-6 text-base sm:text-lg flex-1 sm:flex-none sm:min-w-[220px] justify-center"
                aria-label="Register for The Triwizard Trials"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M13.5 5.5L18.5 10.5L10 19H5V14L13.5 5.5ZM4 4L6 6L4 8L2 6L4 4ZM20 2L22 4L20 6L18 4L20 2ZM22 12L20 14L18 12L20 10L22 12Z"/>
                  </svg>
                  Register Now
                </span>
                <span aria-hidden className="btn-cta__glow" />
                <span aria-hidden className="btn-cta__shine" />
              </a>

              <div className="flex-1 flex flex-wrap gap-3">
                <a className="btn rounded-full h-12 px-4 whitespace-nowrap" href="#subevents">
                  Explore Sub-Events
                </a>
                <a
                  className="btn rounded-full h-12 px-4 whitespace-nowrap"
                  // href="https://drive.google.com/drive/folders/1Yx3ba8Pfisp_8DZToa9Pu4-VlhjgL4zl?usp=share_link"
                   href="/brochure.pdf"
                  download
                >
                  Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: card with sparkles behind */}
      <div className="relative hero-stack w-full flex justify-center">
        <SparklesBehind count={20} durationSec={6} intensity={1.05} />
        <div className="relative z-10 w-full max-w-[420px]">
          <Wizard3D />
        </div>
      </div>

      {/* Scoped styles for pin + ribbon placement and animation */}
      <style jsx>{`
        /* Position the ribbon near the right edge, visually above "Brochure" */
        .pin-wrap{
          position: absolute;
          right: 10px;     /* mobile: near the right */
          top: -16px;      /* floats above the buttons */
          width: max-content;
          transform-origin: 18px -8px; /* pivot near the pin head */
          animation: sway 4.8s ease-in-out infinite;
          z-index: 6;
          pointer-events: none; /* decoration only */
        }
        /* ≥640px (sm): push further right so it sits above the Brochure button area */
        @media (min-width: 640px){
          .pin-wrap{ right: 6px; top: -18px; }
        }
        /* ≥1024px (lg): sit tightly above the far-right button */
        @media (min-width: 1024px){
          .pin-wrap{ right: -6px; top: -20px; }
        }

        .ribbon-pill{
          position: relative;
          display: inline-block;
          border-radius: 9999px;
          padding: 8px 14px;
          font-weight: 800;
          letter-spacing: .2px;
          background: linear-gradient(180deg, rgba(34,27,18,.92), rgba(26,20,12,.88));
          color: #f5d882;
          box-shadow:
            0 8px 18px rgba(0,0,0,.55),
            inset 0 0 0 1px rgba(212,175,55,.35),
            inset 0 -2px 10px rgba(255,214,120,.08);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(212,175,55,.25);
        }

        /* --- Hogwarts-y pin --- */
        .magic-pin{
          position: absolute;
          left: 10px;
          top: -16px;
          width: 22px; height: 36px;
        }
        .pin-head{
          position: absolute;
          left: 2px; top: 0;
          width: 18px; height: 18px; border-radius: 9999px;
          background: radial-gradient(circle at 35% 35%, #fffbe0 0, #ffe6a8 40%, #d4b24a 72%, #8c6a17 100%);
          box-shadow:
            0 2px 6px rgba(0,0,0,.55),
            0 0 10px rgba(212,175,55,.75),
            0 0 20px rgba(212,175,55,.45);
        }
        .pin-cap{
          position: absolute;
          left: 6px; top: 14px;
          width: 10px; height: 4px; border-radius: 3px;
          background: linear-gradient(180deg, #a88319, #f1d06b 50%, #a88319);
          box-shadow: 0 1px 2px rgba(0,0,0,.4);
        }
        .pin-shaft{
          position: absolute;
          left: 10px; top: 15px;
          width: 2px; height: 30px; border-radius: 1px;
          background: linear-gradient(180deg, #b08a1f, #f2d06a 40%, #b08a1f 100%);
          transform: rotate(15deg);
          box-shadow: 0 0 6px rgba(212,175,55,.45);
        }
        /* subtle thread that "stitches" the ribbon to the card */
        .pin-thread{
          position: absolute;
          left: 17px; top: 12px;
          width: 1px; height: 26px;
          background: rgba(0,0,0,.55);
          transform: rotate(13deg);
          filter: blur(.2px);
          opacity: .6;
        }
        .pin-glow{
          position: absolute;
          left: -10px; top: -8px; right: -8px; bottom: 10px;
          border-radius: 16px;
          background: radial-gradient(38px 26px at 50% 18%, rgba(255,235,170,.55), transparent 60%);
          filter: blur(6px);
          animation: twinkle 2.8s ease-in-out infinite;
        }
        .pin-shadow{
          position: absolute;
          left: 12px; top: 18px; width: 16px; height: 12px;
          background: radial-gradient(14px 10px at 0 100%, rgba(0,0,0,.48), transparent 72%);
          transform: translateY(16px) translateX(6px) rotate(12deg);
          filter: blur(1px);
          opacity: .85;
        }

        /* gentle sway for the entire pill (keeps text readable) */
        @keyframes sway {
          0%   { transform: rotate(-4.5deg) translateX(-1px) }
          50%  { transform: rotate(4.5deg)  translateX(1px) }
          100% { transform: rotate(-4.5deg) translateX(-1px) }
        }
        @keyframes twinkle { 
          0%,100% { opacity:.55 } 
          50% { opacity:.95 } 
        }

        @media (prefers-reduced-motion: reduce){
          .pin-wrap{ animation:none }
          .pin-glow{ animation:none }
        }
      `}</style>
    </header>
  )
}
// 'use client'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import Wizard3D from '@/components/Wizard3D'
// import SparklesBehind from '@/components/SparklesBehind'

// const BROCHURE_URL =
//   'https://drive.google.com/drive/folders/1Yx3ba8Pfisp_8DZToa9Pu4-VlhjgL4zl?usp=share_link'
// const COUNTDOWN_KEY = 'tt.countdownStart'
// const AUTOOPEN_KEY = 'tt.brochureOpenedOnce'
// const HOURS = 36
// const MS = 1000

// export default function Hero() {
//   // ----- countdown state -----
//   const [now, setNow] = useState<number>(Date.now())
//   const [startedAt, setStartedAt] = useState<number | null>(null)
//   const tickRef = useRef<number | null>(null)

//   // establish a stable start time (persisted per-browser)
//   useEffect(() => {
//     if (typeof window === 'undefined') return
//     const saved = window.localStorage.getItem(COUNTDOWN_KEY)
//     if (saved) {
//       setStartedAt(Number(saved))
//     } else {
//       const t = Date.now()
//       window.localStorage.setItem(COUNTDOWN_KEY, String(t))
//       setStartedAt(t)
//     }
//   }, [])

//   // 1Hz ticker
//   useEffect(() => {
//     if (!startedAt) return
//     tickRef.current = window.setInterval(() => setNow(Date.now()), 1 * MS)
//     return () => {
//       if (tickRef.current) window.clearInterval(tickRef.current)
//     }
//   }, [startedAt])

//   const { remainingMs, isUnlocked, h, m, s } = useMemo(() => {
//     if (!startedAt) return { remainingMs: HOURS * 3600 * MS, isUnlocked: false, h: 36, m: 0, s: 0 }
//     const endsAt = startedAt + HOURS * 3600 * MS
//     const left = Math.max(0, endsAt - now)
//     const isDone = left <= 0
//     const totalSec = Math.floor(left / 1000)
//     const hh = Math.floor(totalSec / 3600)
//     const mm = Math.floor((totalSec % 3600) / 60)
//     const ss = totalSec % 60
//     return { remainingMs: left, isUnlocked: isDone, h: hh, m: mm, s: ss }
//   }, [startedAt, now])

//   // auto-open once when unlocked
//   useEffect(() => {
//     if (typeof window === 'undefined') return
//     if (!isUnlocked) return
//     const openedAlready = window.localStorage.getItem(AUTOOPEN_KEY) === '1'
//     if (openedAlready) return
//     try {
//       window.localStorage.setItem(AUTOOPEN_KEY, '1')
//       // attempt new tab, then fallback to same-tab
//       const w = window.open(BROCHURE_URL, '_blank', 'noopener,noreferrer')
//       if (!w) window.location.href = BROCHURE_URL
//     } catch {
//       window.location.href = BROCHURE_URL
//     }
//   }, [isUnlocked])

//   const pad = (n: number) => n.toString().padStart(2, '0')

//   return (
//     <header
//       id="about"
//       className={`
//         relative
//         max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
//         py-6 sm:py-8 md:py-10
//         grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-start
//         mb-8 md:mb-10 lg:mb-12
//       `}
//     >
//       {/* Left: Title & copy */}
//       <div>
//         <h1 className="font-hpTitle text-gold text-[28px] xs:text-[32px] sm:text-5xl md:text-6xl lg:text-[64px] leading-tight drop-shadow mb-3 sm:mb-4">
//           Main Event: The Triwizard Trials
//         </h1>

//         <p className="max-w-[60ch] text-sm sm:text-[15px] md:text-base opacity-95 leading-relaxed">
//           The Triwizard Trials is a Hogwarts-inspired AI challenge with three magical
//           events—Defence Against Dark Prompts (Generative AI), The Chambers of Agents
//           (Agentic AI), and Charms Without Wands (No-Code AI). A blend of creativity,
//           problem-solving, and innovation, the Trials crown the most brilliant minds
//           as the Triwizard Champions of AI.
//         </p>

//         {/* CTA Card */}
//         <div className="mt-6">
//           <div className="cta-card relative rounded-2xl p-4 sm:p-5 pt-12 overflow-visible">

//             {/* === PIN + RIBBON === */}
//             <div className="pin-wrap" aria-hidden>
//               <span className="magic-pin">
//                 <span className="pin-head" />
//                 <span className="pin-cap" />
//                 <span className="pin-shaft" />
//                 <span className="pin-thread" />
//                 <span className="pin-glow" />
//                 <span className="pin-shadow" />
//               </span>
//             <div className="cta-ribbon ribbon-pill text-xs sm:text-sm">13–14 Sept · IEM IEDC-ECE</div>
//             </div>

//             <div className="flex flex-col items-stretch gap-3 mt-2">
//               <a
//                 // href="/register"
//                 className="btn-cta h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base md:text-lg w-full justify-center"
//                 aria-label="Register for The Triwizard Trials"
//               >
//                 <span className="relative z-10 flex items-center gap-2 font-semibold">
//                   {/* 🔒 lock icon */}
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                     <path d="M12 2a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 9V7a3 3 0 0 1 6 0v4H9z"/>
//                   </svg>
//                   Register Now
//                 </span>
//                 <span aria-hidden className="btn-cta__glow" />
//                 <span aria-hidden className="btn-cta__shine" />
//               </a>

//               {/* Mobile-friendly action buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 w-full">
//                 <a className="btn rounded-full h-10 sm:h-12 px-4 text-center text-sm sm:text-base whitespace-nowrap" href="#subevents">
//                   Explore Sub-Events
//                 </a>

//                 {/* coming soon pill - mobile responsive */}
//                 {/* <div className="soon-pill h-10 sm:h-12 px-3 sm:px-4 rounded-full flex items-center gap-2 sm:gap-3 select-none text-xs sm:text-sm">
//                   <span className="font-semibold">Brochure & Registration</span>
//                   <span className="opacity-90">coming soon</span>
//                 </div> */}

//                 {/* countdown display - mobile responsive */}
//                 {!isUnlocked ? (
//                   <div className="countdown-pill flex-col sm:flex-row gap-1 sm:gap-2" role="timer" aria-live="polite">
//                     <span className="cd-label text-xs sm:text-sm">Unlocks in</span>
//                     <span className="cd-time text-sm sm:text-base" aria-label={`${h} hours ${m} minutes ${s} seconds`}>
//                       {pad(h)}:<span className="colon">:</span>{pad(m)}:<span className="colon">:</span>{pad(s)}
//                     </span>
//                   </div>
//                 ) : (
//                   <a
//                     href={BROCHURE_URL}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="btn rounded-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap text-center"
//                     title="Brochure is now available"
//                   >
//                     Open Brochure
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right: card with sparkles behind */}
//       <div className="relative hero-stack w-full flex justify-center">
//         <SparklesBehind count={20} durationSec={6} intensity={1.05} />
//         <div className="relative z-10 w-full max-w-[420px]">
//           <Wizard3D />
//         </div>
//       </div>

//       {/* Scoped styles for pin + ribbon placement and animation */}
//       <style jsx>{`
//         /* Position the ribbon near the right edge */
//         .pin-wrap{
//           position: absolute;
//           right: 10px;
//           top: -16px;
//           width: max-content;
//           transform-origin: 18px -8px;
//           animation: sway 4.8s ease-in-out infinite;
//           z-index: 6;
//           pointer-events: none;
//         }
//         @media (min-width: 640px){ .pin-wrap{ right: 6px; top: -18px; } }
//         @media (min-width: 1024px){ .pin-wrap{ right: -6px; top: -20px; } }

//         .ribbon-pill{
//           position: relative;
//           display: inline-block;
//           border-radius: 9999px;
//           padding: 8px 14px;
//           font-weight: 800;
//           letter-spacing: .2px;
//           background: linear-gradient(180deg, rgba(34,27,18,.92), rgba(26,20,12,.88));
//           color: #f5d882;
//           box-shadow:
//             0 8px 18px rgba(0,0,0,.55),
//             inset 0 0 0 1px rgba(212,175,55,.35),
//             inset 0 -2px 10px rgba(255,214,120,.08);
//           backdrop-filter: blur(2px);
//           border: 1px solid rgba(212,175,55,.25);
//         }

//         /* Hogwarts-y pin */
//         .magic-pin{ position:absolute; left:10px; top:-16px; width:22px; height:36px; }
//         .pin-head{
//           position:absolute; left:2px; top:0; width:18px; height:18px; border-radius:9999px;
//           background: radial-gradient(circle at 35% 35%, #fffbe0 0, #ffe6a8 40%, #d4b24a 72%, #8c6a17 100%);
//           box-shadow: 0 2px 6px rgba(0,0,0,.55), 0 0 10px rgba(212,175,55,.75), 0 0 20px rgba(212,175,55,.45);
//         }
//         .pin-cap{ position:absolute; left:6px; top:14px; width:10px; height:4px; border-radius:3px; background:linear-gradient(180deg,#a88319,#f1d06b 50%,#a88319); box-shadow:0 1px 2px rgba(0,0,0,.4); }
//         .pin-shaft{ position:absolute; left:10px; top:15px; width:2px; height:30px; border-radius:1px; background:linear-gradient(180deg,#b08a1f,#f2d06a 40%,#b08a1f); transform:rotate(15deg); box-shadow:0 0 6px rgba(212,175,55,.45); }
//         .pin-thread{ position:absolute; left:17px; top:12px; width:1px; height:26px; background:rgba(0,0,0,.55); transform:rotate(13deg); filter:blur(.2px); opacity:.6; }
//         .pin-glow{ position:absolute; left:-10px; top:-8px; right:-8px; bottom:10px; border-radius:16px; background:radial-gradient(38px 26px at 50% 18%, rgba(255,235,170,.55), transparent 60%); filter:blur(6px); animation: twinkle 2.8s ease-in-out infinite; }
//         .pin-shadow{ position:absolute; left:12px; top:18px; width:16px; height:12px; background: radial-gradient(14px 10px at 0 100%, rgba(0,0,0,.48), transparent 72%); transform: translateY(16px) translateX(6px) rotate(12deg); filter: blur(1px); opacity:.85; }

//         /* Countdown + "coming soon" styling */
//         .soon-pill{
//           background: linear-gradient(180deg, rgba(34,27,18,.92), rgba(26,20,12,.88));
//           color:#f5d882; border:1px solid rgba(212,175,55,.25);
//           box-shadow: 0 8px 18px rgba(0,0,0,.55), inset 0 0 0 1px rgba(212,175,55,.28);
//           backdrop-filter: blur(2px);
//         }
//         .countdown-pill{
//           display:flex; align-items:center; gap:.6rem;
//           height: 48px; padding: 0 14px;
//           border-radius: 9999px;
//           background: linear-gradient(180deg, rgba(41,31,20,.92), rgba(30,23,15,.9));
//           color:#f8e7b3; border:1px solid rgba(212,175,55,.28);
//           box-shadow: 0 8px 18px rgba(0,0,0,.55), inset 0 0 0 1px rgba(212,175,55,.2);
//         }
//         .cd-label{ font-weight:700; letter-spacing:.2px; opacity:.95; }
//         .cd-time{
//           font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
//           font-weight: 800; letter-spacing: .5px;
//           text-shadow: 0 0 10px rgba(212,175,55,.35);
//         }
//         .cd-time .colon{ opacity:.5 }

//         /* gentle sway for the pill */
//         @keyframes sway { 0%{transform:rotate(-4.5deg) translateX(-1px)} 50%{transform:rotate(4.5deg) translateX(1px)} 100%{transform:rotate(-4.5deg) translateX(-1px)} }
//         @keyframes twinkle { 0%,100% { opacity:.55 } 50% { opacity:.95 } }

//         @media (prefers-reduced-motion: reduce){
//           .pin-wrap{ animation:none }
//           .pin-glow{ animation:none }
//         }
//       `}</style>
//     </header>
//   )
// }
