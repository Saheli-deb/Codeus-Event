// 'use client'

// import { useMemo, useState } from 'react'

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

//   // start sliders at numeric amounts
//   const [values, setValues] = useState<number[]>(() => presets.map(p => p.amount))

//   return (
//     <section id="prizes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
//       <h3 className="font-hpTitle text-gold text-3xl md:text-4xl drop-shadow mb-2">Prize Distribution</h3>
//       <p className="opacity-90 max-w-2xl">Top teams take home the cauldron of gold.</p>

//       <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {presets.map((p, i) => {
//           const percent = p.max ? Math.round((values[i] / p.max) * 100) : 0
//           return (
//             <div
//               key={p.label}
//               className="relative rounded-2xl border border-gold/30 shadow-glow p-5 bg-gradient-to-br card-3d animate-bob"
//             >
//               <div className={`absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br ${p.color}`} />

//               <div className="relative z-10">
//                 <div className="flex items-baseline justify-between gap-3">
//                   <div className="font-hpTitle text-gold text-2xl">{p.label}</div>
//                   <div className="text-cream text-lg">
//                     {p.mask ? 'XXXX' : formatINR(p.amount)}
//                   </div>
//                 </div>

//                 {/* Floatable slider card */}
//                 <div className="mt-4">
//                   <div className="relative h-10">
//                     {/* value bubble that tracks slider thumb */}
//                     <div
//                       className="absolute -top-2 translate-x-[-50%] px-2 py-[2px] rounded-md text-xs bg-black/50 border border-gold/30 shadow-glow"
//                       style={{ left: `calc(${percent}% )` }}
//                     >
//                       {percent}%
//                     </div>
//                     <input
//                       type="range"
//                       min={0}
//                       max={p.max}
//                       value={values[i]}
//                       onChange={(e) => {
//                         const v = Number(e.target.value)
//                         setValues((old) => old.map((x, idx) => (idx === i ? v : x)))
//                       }}
//                       className="w-full h-2 rounded-full appearance-none bg-black/30 accent-[#D4AF37] outline-none cursor-pointer"
//                       aria-label={`${p.label} prize slider`}
//                     />
//                   </div>
//                   <div className="mt-1 text-sm opacity-80">
//                     Current:{' '}
//                     <span className="font-semibold">
//                       {formatINR(values[i])}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4 text-sm opacity-85">
//                   Includes swag, certificates & spotlight on our socials.
//                 </div>
//               </div>
//             </div>
//           )
//         })}
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
  mask?: boolean   // show XXXX instead of the amount
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
      { label: 'Champion',    amount: 10000, max: 10000, color: 'from-yellow-300/30 to-yellow-500/10', mask: true },
      { label: 'Runner-up',   amount:  5000, max: 10000, color: 'from-amber-200/30 to-amber-500/10',  mask: true },
      { label: 'Third Place', amount:  2000, max: 10000, color: 'from-orange-200/30 to-orange-500/10', mask: true },
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
                  {p.mask ? 'XXXX' : formatINR(p.amount)}
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
