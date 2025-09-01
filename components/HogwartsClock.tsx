'use client'
import { useEffect, useState } from 'react'

/** Hogwarts-style analog clock (SVG = sharp, responsive) */
export default function HogwartsClock({ size = 320 }: { size?: number }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // angles
  const s = now.getSeconds()
  const m = now.getMinutes()
  const h = now.getHours() % 12
  const secA = s * 6
  const minA = m * 6 + s * 0.1
  const hrA  = h * 30 + m * 0.5

  const R = 150 // drawing radius

  return (
    <div className="w-full flex justify-center">
      {/* hanging “chain” */}
      <div className="relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-1 rounded-full bg-gold/70 shadow-[0_0_12px_rgba(212,175,55,.45)]" />
        <svg
          viewBox="-160 -160 320 360"
          width={size} height={size + 40}
          className="drop-shadow-[0_10px_30px_rgba(0,0,0,.45)]"
          aria-label="Hogwarts Clock"
        >
          {/* bezel */}
          <defs>
            <radialGradient id="bezel" cx="50%" cy="45%">
              <stop offset="0%"  stopColor="#f6e39f"/>
              <stop offset="55%" stopColor="#d4af37"/>
              <stop offset="100%" stopColor="#8d6f1f"/>
            </radialGradient>
            <radialGradient id="face" cx="50%" cy="50%">
              <stop offset="0%"  stopColor="#1a1208"/>
              <stop offset="70%" stopColor="#2a2112"/>
              <stop offset="100%" stopColor="#0b0907"/>
            </radialGradient>
            <radialGradient id="glass" cx="30%" cy="20%">
              <stop offset="0%" stopColor="rgba(255,255,255,.35)"/>
              <stop offset="70%" stopColor="rgba(255,255,255,0)"/>
            </radialGradient>
          </defs>

          {/* outer ring */}
          <circle r={R} fill="url(#bezel)" />
          {/* inner lip */}
          <circle r={R-10} fill="#0b0907" />

          {/* clock face */}
          <circle r={R-18} fill="url(#face)" />

          {/* tick marks (12 big + 60 small) */}
          {Array.from({length:60}).map((_,i)=> {
            const a = (i * 6) * Math.PI/180
            const out = R-26
            const len = i%5===0 ? 12 : 6
            const x1 = Math.sin(a) * (out)
            const y1 = -Math.cos(a) * (out)
            const x2 = Math.sin(a) * (out-len)
            const y2 = -Math.cos(a) * (out-len)
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i%5===0 ? '#d4af37' : 'rgba(255,255,255,.55)'}
                strokeWidth={i%5===0 ? 3 : 1.4} />
            )
          })}

          {/* roman numerals */}
          {[
            {t:'XII',a:0},{t:'III',a:90},{t:'VI',a:180},{t:'IX',a:270}
          ].map(({t,a})=>{
            const rad = a*Math.PI/180
            const x = Math.sin(rad)*(R-48)
            const y = -Math.cos(rad)*(R-48)
            return (
              <text key={t} x={x} y={y+6}
                fill="#d4af37" fontFamily="Cinzel, serif" fontSize="20"
                textAnchor="middle">{t}</text>
            )
          })}

          {/* hands */}
          {/* hour */}
          <g transform={`rotate(${hrA})`}>
            <rect x={-5} y={-10} width={10} height={R-85} rx={6} fill="#d4af37" />
          </g>
          {/* minute */}
          <g transform={`rotate(${minA})`}>
            <rect x={-3.5} y={-20} width={7} height={R-55} rx={5} fill="#f6f2e7" />
          </g>
          {/* second */}
          <g transform={`rotate(${secA})`}>
            <rect x={-2} y={-30} width={4} height={R-40} fill="#e74c3c" />
          </g>

          {/* center cap */}
          <circle r="6.5" fill="#d4af37" />

          {/* glass highlight */}
          <ellipse cx="-30" cy="-40" rx="95" ry="55" fill="url(#glass)"/>
        </svg>
      </div>
    </div>
  )
}
