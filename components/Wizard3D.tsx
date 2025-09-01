// 'use client'
// import { useRef } from 'react'
// import Image from 'next/image'

// /**
//  * 3D parallax card with a “golden snitch” orbit.
//  * Put a transparent PNG at /public/harry.png (or change src below).
//  */
// export default function Wizard3D() {
//   const boxRef = useRef<HTMLDivElement>(null)

//   const onMove = (e: React.MouseEvent | React.TouchEvent) => {
//     const el = boxRef.current
//     if (!el) return
//     const r = el.getBoundingClientRect()
//     const p = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
//     const x = (p.clientX - r.left) / r.width - 0.5
//     const y = (p.clientY - r.top) / r.height - 0.5
//     el.style.setProperty('--rx', `${-y * 10}deg`)
//     el.style.setProperty('--ry', `${x * 12}deg`)
//   }
//   const onLeave = () => {
//     const el = boxRef.current
//     if (!el) return
//     el.style.setProperty('--rx', `0deg`)
//     el.style.setProperty('--ry', `0deg`)
//   }

//   return (
//     <div
//       className="group relative mx-auto w-[200px] xs:w-[230px] sm:w-[260px] md:w-[300px] aspect-[3/4]
//                  [perspective:1000px]"
//       onMouseMove={onMove}
//       onMouseLeave={onLeave}
//       onTouchMove={onMove}
//       onTouchEnd={onLeave}
//     >
//       <div
//         ref={boxRef}
//         className="relative h-full w-full rounded-2xl overflow-visible
//                    [transform-style:preserve-3d]
//                    transition-transform duration-200
//                    shadow-glow"
//         style={{ transform: 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))' }}
//       >
//         {/* Frame / glass */}
//         <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/40 bg-gradient-to-br from-gold/5 to-transparent [transform:translateZ(2px)]" />

//         {/* The wizard image */}
//         <Image
//           src="/harry.png"
//           alt="Harry Potter"
//           fill
//           className="object-contain [transform:translateZ(30px)] pointer-events-none"
//           priority
//         />

//         {/* Subtle shine */}
//         <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60
//                         transition-opacity duration-300
//                         bg-[radial-gradient(600px_200px_at_20%_10%,rgba(255,255,255,0.25),transparent_60%)]
//                         [transform:translateZ(35px)]" />

//         {/* Golden snitch orbiting */}
//         <div className="snitch [transform:translateZ(70px)]" />
//       </div>
//     </div>
//   )
// }

'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

/**
 * 3D parallax card with inertial tilt + snitch orbit + floor shadow.
 * Put your PNG at /public/harry.png (transparent background looks best).
 */
export default function Wizard3D() {
  const boxRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()

  // target + current rotation (deg)
  const target = useRef({ rx: 0, ry: 0 })
  const current = useRef({ rx: 0, ry: 0 })

  const updateTilt = (clientX: number, clientY: number) => {
    const el = boxRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (clientX - r.left) / r.width - 0.5
    const y = (clientY - r.top) / r.height - 0.5
    target.current.ry = x * 18 // yaw
    target.current.rx = -y * 14 // pitch
  }

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    const p = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    updateTilt(p.clientX, p.clientY)
  }

  const onLeave = () => {
    target.current = { rx: 0, ry: 0 }
  }

  // inertial/spring smoothing
  useEffect(() => {
    const tick = () => {
      const el = boxRef.current
      if (!el) return
      // critically damped spring-ish
      const k = 0.12
      const d = 0.85
      const vx = (target.current.rx - current.current.rx) * k
      const vy = (target.current.ry - current.current.ry) * k
      current.current.rx = current.current.rx * d + vx
      current.current.ry = current.current.ry * d + vy

      const rx = current.current.rx
      const ry = current.current.ry

      el.style.setProperty('--rx', `${rx.toFixed(3)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(3)}deg`)
      el.style.setProperty('--shadow-x', `${(ry / 18) * 16}px`)
      el.style.setProperty('--shadow-y', `${(rx / 14) * 12 + 10}px`)
      el.style.setProperty('--snitch-tilt', `${ry / 18}turn`)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onMove}
      onTouchEnd={onLeave}
      className={`
        group relative mx-auto
        w-[180px] xs:w-[200px] sm:w-[240px] md:w-[270px] lg:w-[320px]
        aspect-[3/4] [perspective:1000px] sm:[perspective:1200px]
      `}
    >
      <div
        ref={boxRef}
        className={`
          card3d relative h-full w-full rounded-2xl overflow-visible
          [transform-style:preserve-3d]
          transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)]
          will-change-transform
        `}
      >
        {/* Floor shadow (reacts to tilt) */}
        <div className="floor-shadow" aria-hidden />

        {/* Back plate (deep) */}
        <div className="backplate" aria-hidden />

        {/* Frame / rim */}
        <div className="frame" aria-hidden />

        {/* Wizard / crest image */}
        <div className="img-wrap">
          <Image
            src="/harry.png"
            alt="Hogwarts crest / wizard"
            fill
            className="object-contain select-none pointer-events-none"
            priority
          />
        </div>

        {/* Shine sweep */}
        <div className="shine" aria-hidden />

        {/* Floating spark flecks */}
        <div className="spark s1" />
        <div className="spark s2" />
        <div className="spark s3" />

        {/* Golden snitch (3D orbit) */}
        <div className="snitch-orbit" aria-hidden>
          <div className="snitch">
            <span className="wing left" />
            <span className="wing right" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .card3d{
          transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0);
        }

        /* floor shadow */
        .floor-shadow{
          position:absolute; left: 50%; bottom: -14px;
          width: 72%; height: 26px;
          transform: translateX(calc(-50% + var(--shadow-x,0px))) translateY(var(--shadow-y,10px));
          background: radial-gradient(60% 100% at 50% 50%, rgba(0,0,0,.45), rgba(0,0,0,0));
          filter: blur(6px);
          opacity:.6;
          pointer-events:none;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          z-index: 0;
        }

        /* deep back plate */
        .backplate{
          position:absolute; inset:0; border-radius: 18px;
          transform: translateZ(6px);
          background:
            radial-gradient(140% 60% at 10% 10%, rgba(255,224,140,.08), transparent 55%),
            radial-gradient(120% 80% at 90% 20%, rgba(212,175,55,.07), transparent 60%),
            rgba(18,14,8,.55);
          border: 1px solid rgba(212,175,55,.30);
          box-shadow:
            inset 0 0 0 1px rgba(255,220,140,.08),
            inset 0 16px 40px rgba(255,215,115,.05);
        }

        /* outer frame/rim */
        .frame{
          position:absolute; inset:-6px; border-radius:24px;
          transform: translateZ(10px);
          background: linear-gradient(180deg, rgba(212,175,55,.25), rgba(140,110,30,.18));
          box-shadow:
            0 10px 30px rgba(0,0,0,.45),
            inset 0 0 0 1px rgba(255,220,140,.2);
        }

        /* image layer high above */
        .img-wrap{
          position:absolute; inset:8% 6% 8% 6%;
          transform: translateZ(40px);
        }

        /* shine sweep (on hover) */
        .shine{
          position:absolute; inset:0; border-radius: 18px;
          transform: translateZ(44px);
          pointer-events:none; overflow:hidden;
        }
        .shine::before{
          content:'';
          position:absolute; left:-40%; top:-10%;
          width:60%; height:140%;
          background: linear-gradient(100deg, rgba(255,255,255,.0) 0%,
            rgba(255,255,255,.20) 45%, rgba(255,255,255,.0) 70%);
          transform: rotate(12deg);
          opacity:0; filter: blur(1px);
          transition: opacity .25s ease;
        }
        .card3d:hover .shine::before{ opacity: .9; animation: sweep 1.6s ease forwards }
        @keyframes sweep{
          from{ transform: translateX(0) rotate(12deg) }
          to{ transform: translateX(320%) rotate(12deg) }
        }

        /* little spark flecks at different depths */
        .spark{
          position:absolute; width:6px; height:6px; border-radius:9999px;
          background:#ffe082;
          box-shadow: 0 0 10px #ffe082, 0 0 18px rgba(255,210,120,.45);
          animation: twinkle 2.6s ease-in-out infinite;
          pointer-events:none;
        }
        .s1{ left: 12%; top: 14%; transform: translateZ(50px); animation-delay:.2s }
        .s2{ right: 10%; top: 28%; transform: translateZ(28px); animation-delay:.9s }
        .s3{ left: 24%; bottom: 16%; transform: translateZ(36px); animation-delay:1.6s }
        @keyframes twinkle{ 0%,100%{opacity:.25; transform:scale(.7)} 50%{opacity:1; transform:scale(1)} }

        /* snitch orbit */
        .snitch-orbit{
          position:absolute; inset:0;
          transform: translateZ(70px) rotateY(var(--snitch-tilt,0turn));
          pointer-events:none;
        }
        .snitch{
          position:absolute; left:50%; top:50%;
          width:18px; height:18px; margin:-9px 0 0 -9px;
          border-radius:9999px;
          background: radial-gradient(circle at 30% 30%, #fff7c9, #ffd86f 45%, #d4af37 75%, #7c5a15 100%);
          box-shadow:
            0 2px 6px rgba(0,0,0,.55),
            0 0 12px rgba(255,224,140,.85);
          animation: orbit 5.6s linear infinite;
        }
        .wing{
          position:absolute; top:50%; width:22px; height:6px; margin-top:-3px;
          background: linear-gradient(90deg, rgba(255,255,255,.85), rgba(255,255,255,0));
          border-radius: 6px 0 0 6px;
          filter: drop-shadow(0 0 6px rgba(255,255,255,.6));
          opacity:.9;
        }
        .wing.left{ right:100%; transform-origin: 100% 50%; transform: rotate(8deg); }
        .wing.right{ left:100%; transform-origin: 0% 50%; transform: rotate(-8deg) scaleX(-1); }
        @keyframes orbit{
          0%   { transform: rotate(0deg) translateX(120px) rotate(0deg) }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg) }
        }

        /* hover pop */
        .card3d:hover{
          transform: translateZ(4px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
        }

        @media (prefers-reduced-motion: reduce){
          .card3d, .card3d:hover{ transition: none }
          .snitch{ animation: none }
          .shine::before{ animation: none }
          .spark{ animation: none }
        }
      `}</style>
    </div>
  )
}
