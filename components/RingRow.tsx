
// 'use client'
// import EventRing from '@/components/EventRing'

// export default function RingRow() {
//   return (
//     <section
//       id="rings"
//       className="
//         relative z-10
//         -mt-8 md:-mt-10 lg:-mt-12
//         pb-6 md:pb-8
//       "
//     >
//       <div className="pointer-events-none absolute inset-0 ring-band" />

//       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Desktop/tablet: three fixed points with equal gaps */}
//         <div className="hidden md:grid grid-cols-3 gap-10 justify-items-center items-start">
//           <EventRing title="HOGGEN — Gen AI"    images={['/hoggen.jpg']} speedSec={26} phaseOffsetSec={0} />
//           <EventRing title="CODEUS — Agentic AI" images={['/codeus.jpg']} speedSec={28} phaseOffsetSec={5} />
//           <EventRing title="CODE WHO? — No-Code" images={['/codewho.jpg']} speedSec={30} phaseOffsetSec={10} />
//         </div>

//         {/* Mobile: one per row, still centered */}
//         <div className="md:hidden space-y-8">
//           <EventRing title="HOGGEN — Gen AI"    images={['/hoggen.jpg']} speedSec={22} phaseOffsetSec={0} />
//           <EventRing title="CODEUS — Agentic AI" images={['/codeus.jpg']} speedSec={22} phaseOffsetSec={4} />
//           <EventRing title="CODE WHO? — No-Code" images={['/codewho.jpg']} speedSec={22} phaseOffsetSec={8} />
//         </div>
//       </div>
//     </section>
//   )
// }
'use client'
import EventRing from '@/components/EventRing'

export default function RingRow() {
  return (
    <section
      id="rings"
      className="
        relative z-10
        mt-14 md:mt-16 lg:mt-20   /* push rings down away from Fun Events */
        pb-8 md:pb-10
      "
      aria-label="Rotating event rings"
    >
      {/* soft glow band behind the rings */}
      <div className="pointer-events-none absolute inset-0 ring-band" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop / tablet */}
        <div className="hidden md:grid grid-cols-3 gap-12 lg:gap-14 justify-items-center items-start">
          <EventRing
            title="Defense Against Dark Prompts"
            images={['/hoggen.jpg']}
            speedSec={26}
            phaseOffsetSec={0}
          />
          <EventRing
            title="The Chamber of Agents"
            images={['/codeus.jpg']}
            speedSec={28}
            phaseOffsetSec={5}
          />
          <EventRing
            title="Charms Without Wands (No-Code)"
            images={['/codewho.jpg']}
            speedSec={30}
            phaseOffsetSec={10}
          />
        </div>

        {/* Mobile: stacked with generous spacing between each block */}
        <div className="md:hidden space-y-12">
          <EventRing
            title="Defense Against Dark Prompts"
            images={['/hoggen.jpg']}
            speedSec={22}
            phaseOffsetSec={0}
          />
          <EventRing
            title="The Chamber of Agents"
            images={['/codeus.jpg']}
            speedSec={22}
            phaseOffsetSec={4}
          />
          <EventRing
            title="Charms Without Wands"
            images={['/codewho.jpg']}
            speedSec={22}
            phaseOffsetSec={8}
          />
        </div>
      </div>
    </section>
  )
}
