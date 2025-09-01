'use client'
import Image from 'next/image'

type StripProps = {
  images: string[]
  speedSec?: number
  direction?: 'left' | 'right'
  className?: string
}

function MiniStrip({
  images,
  speedSec = 20,
  direction = 'left',
  className = '',
}: StripProps) {
  // duplicate sequence for seamless loop
  const seq = [...images, ...images]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex gap-3 will-change-transform"
        style={{
          animation: `${direction === 'left' ? 'slideLeft' : 'slideRight'} ${speedSec}s linear infinite`,
          width: 'max-content',
        }}
      >
        {seq.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`
              relative rounded-xl overflow-hidden
              ring-1 ring-gold/30
              shadow-[0_0_12px_rgba(212,175,55,.25)]
              h-[82px] w-[136px]
              sm:h-[90px] sm:w-[150px]
              md:h-[96px] md:w-[164px]
              lg:h-[100px] lg:w-[176px]
              bg-black/20
            `}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 164px, 176px"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* scoped keyframes */}
      <style jsx>{`
        @keyframes slideLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default function FloatingMiniSliders() {
  // Put files with these names in /public/fun/ (or rename to match your own)
  const stripA = [
    '/fun/hall-01.jpg',
    '/fun/crest-grid.jpg',
    '/fun/hat-on-stool.jpg',
    '/fun/lumos-hands.jpg',
    '/fun/lanterns-01.jpg',
  ]
  const stripB = [
    '/fun/banners-01.jpg',
    '/fun/quidditch-stand.jpg',
    '/fun/wand-sparks.jpg',
    '/fun/owls-01.jpg',
    '/fun/library-01.jpg',
  ]
  const stripC = [
    '/fun/potions-01.jpg',
    '/fun/stairs-01.jpg',
    '/fun/castle-night.jpg',
    '/fun/candles-01.jpg',
    '/fun/broom-01.jpg',
  ]
  // Optional 4th strip
  // const stripD = [
  //   '/fun/scrolls-01.jpg',
  //   '/fun/herbology-01.jpg',
  //   '/fun/clocktower-01.jpg',
  //   '/fun/snitch-01.jpg',
  //   '/fun/forest-01.jpg',
  // ]

  return (
    <section
      aria-label="Decorative mini sliders"
      className="
        relative z-10
        max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
        mt-2 md:mt-4
        mb-6 md:mb-8 lg:mb-10
      "
    >
      <div className="space-y-3 sm:space-y-4">
        <MiniStrip images={stripA} speedSec={24} direction="left" />
        <MiniStrip images={stripB} speedSec={26} direction="right" className="opacity-95" />
        <MiniStrip images={stripC} speedSec={22} direction="left" className="opacity-90" />
        {/* <MiniStrip images={stripD} speedSec={28} direction="right" className="hidden md:block opacity-90" /> */}
      </div>
    </section>
  )
}
