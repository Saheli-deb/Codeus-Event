
// 'use client'

// import { useMemo } from 'react'

// type Prize = {
//   label: string
//   amount: number
//   max: number
//   color: string
//   mask?: boolean   // show XXXX instead of the amount
// }

// const formatINR = (n: number) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(n)

// export default function Prizes() {
//   const presets = useMemo<Prize[]>(
//     () => [
//       { label: 'Champion',    amount: 10000, max: 10000, color: 'from-yellow-300/30 to-yellow-500/10', mask: true },
//       { label: 'Runner-up',   amount:  5000, max: 10000, color: 'from-amber-200/30 to-amber-500/10',  mask: true },
//       { label: 'Third Place', amount:  2000, max: 10000, color: 'from-orange-200/30 to-orange-500/10', mask: true },
//     ],
//     []
//   )

//   return (
//     <section id="prizes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
//       <h3 className="font-hpTitle text-gold text-2xl sm:text-3xl md:text-4xl drop-shadow mb-2">Prize Distribution</h3>
//       <p className="opacity-90 max-w-2xl text-sm sm:text-base">Top teams take home the cauldron of gold.</p>

//       <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {presets.map((p) => (
//           <div
//             key={p.label}
//             className="relative rounded-2xl border border-gold/30 shadow-glow p-4 sm:p-5 bg-gradient-to-br card-3d animate-bob"
//           >
//             <div className={`absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br ${p.color}`} />

//             <div className="relative z-10">
//               <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 sm:gap-3">
//                 <div className="font-hpTitle text-gold text-xl sm:text-2xl">{p.label}</div>
//                 <div className="text-cream text-base sm:text-lg font-semibold">
//                   {p.mask ? 'XXXX' : formatINR(p.amount)}
//                 </div>
//               </div>

//               <div className="mt-3 sm:mt-4 text-xs sm:text-sm opacity-85 leading-relaxed">
//                 Includes swag, certificates & spotlight on our socials.
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
'use client'

import { useMemo } from 'react'

type Prize = {
  label: string
  amount: number
  max: number
  color: string
}

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

export default function Prizes() {
  const presets = useMemo<Prize[]>(
    () => [
      { label: 'Champion',    amount: 4000, max: 10000, color: 'from-yellow-300/30 to-yellow-500/10' },
      { label: 'Runner-up',   amount: 2000, max: 10000, color: 'from-amber-200/30 to-amber-500/10' },
      { label: 'Third Place', amount: 1000, max: 10000, color: 'from-orange-200/30 to-orange-500/10' },
    ],
    []
  )

  return (
    <section id="prizes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <h3 className="font-hpTitle text-gold text-2xl sm:text-3xl md:text-4xl drop-shadow mb-2">Prize Distribution</h3>
      <p className="opacity-90 max-w-2xl text-sm sm:text-base">Top teams take home the cauldron of gold.</p>

      <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((p) => (
          <div
            key={p.label}
            className="relative rounded-2xl border border-gold/30 shadow-glow p-4 sm:p-5 bg-gradient-to-br card-3d animate-bob"
          >
            <div className={`absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br ${p.color}`} />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 sm:gap-3">
                <div className="font-hpTitle text-gold text-xl sm:text-2xl">{p.label}</div>
                <div className="text-cream text-base sm:text-lg font-semibold">
                  {formatINR(p.amount)}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 text-xs sm:text-sm opacity-85 leading-relaxed">
                Includes swag, certificates & spotlight on our socials.
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
