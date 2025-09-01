'use client'
import { useEffect, useState } from 'react'

type Props = {
  count?: number
  durationSec?: number
  intensity?: number
}

type Spark = { r: number; a: number; d: number; s: number; delay: number }

export default function SparklesBehind({
  count = 18,
  durationSec = 6,
  intensity = 1,
}: Props) {
  const [items, setItems] = useState<Spark[] | null>(null)

  useEffect(() => {
    const arr: Spark[] = Array.from({ length: count }).map(() => ({
      r: 40 + Math.random() * 70,
      a: Math.random() * 360,
      d: durationSec * (0.75 + Math.random() * 0.6),
      s: 0.8 + Math.random() * 1.0,
      delay: -Math.random() * durationSec,
    }))
    setItems(arr)
  }, [count, durationSec])

  if (!items) return null

  return (
    <div
      className="pointer-events-none absolute inset-[-12%] z-0 overflow-visible"
      aria-hidden={true}
    >
      <div className="hero-auraglow" />
      {items.map((p, i) => {
        const style: React.CSSProperties & Record<string, string | number> = {
          ['--r']: `${p.r}%`,
          ['--a']: `${p.a}deg`,
          ['--d']: `${p.d}s`,
          ['--s']: p.s,
          ['--delay']: `${p.delay}s`,
          opacity: Math.min(1, 0.95 * intensity),
        }
        return <i key={i} className="hero-spark" style={style} />
      })}
    </div>
  )
}
