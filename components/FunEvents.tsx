// 'use client'

// export default function FunEvents() {
//   return (
//     <section id="fun-events" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
//       <h3 className="font-hpTitle text-gold text-3xl md:text-4xl drop-shadow mb-3">
//         Fun Events between Sessions
//       </h3>
//       <p className="opacity-90 max-w-2xl">
//         Between the main tracks, we’ll host quick mini-events. Win a round and you’ll
//         snag surprise gifts & goodies!
//       </p>

//       <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {[
//           { title: 'Wizarding Trivia', blurb: 'Rapid-fire AI & Hogwarts lore.' },
//           { title: 'Spellcasting Charades', blurb: 'Act it out—no words!' },
//           { title: 'Wand-Coding Dash', blurb: 'Tiny build challenges, blazing speed.' },
//         ].map((f, i) => (
//           <div
//             key={i}
//             className="relative rounded-2xl border border-gold/30 shadow-glow p-4 bg-black/10 backdrop-blur-[1px] card-3d"
//           >
//             <div className="text-lg font-hpTitle text-gold mb-1">{f.title}</div>
//             <div className="opacity-90">{f.blurb}</div>
//             <div className="mt-3 text-sm opacity-80">🏆 Gifts for every mini-event winner</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
'use client'

export default function FunEvents() {
  return (
    <section
      id="fun"
      className="max-w-6xl mx-auto px-4 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-14
                 mb-16 md:mb-24 lg:mb-28"
    >
      <h2 className="font-hpTitle text-gold text-3xl md:text-4xl lg:text-5xl drop-shadow">
        Fun Events between Sessions
      </h2>

      <p className="max-w-[56ch] text-cream/85 mt-2 md:mt-3">
        Between the main tracks, we’ll host quick mini-events. Win a round and you’ll snag surprise gifts & goodies!
      </p>

      {/* Decorative golden divider + badge to fill the “empty” upper space */}
      <div className="relative mt-6 md:mt-7 lg:mt-8 mb-6 md:mb-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-full" />
        <div className="absolute inset-0 -translate-y-1 flex justify-center items-start pointer-events-none">
          <span className="px-3 py-1 text-[11px] md:text-xs uppercase tracking-[0.15em]
                           bg-black/40 border border-gold/30 rounded-full shadow-glow
                           backdrop-blur-sm text-cream/90">
            Win Gifts & Goodies
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="rounded-2xl border border-gold/30 bg-black/40 shadow-glow p-5">
          <h4 className="font-bold text-cream">Wizarding Trivia</h4>
          <p className="text-cream/80 text-sm mt-1">Rapid-fire AI & Hogwarts lore.</p>
          <p className="text-cream/70 text-xs mt-3">🏆 Gifts for every mini-event winner</p>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-black/40 shadow-glow p-5">
          <h4 className="font-bold text-cream">Spellcasting Charades</h4>
          <p className="text-cream/80 text-sm mt-1">Act it out—no words!</p>
          <p className="text-cream/70 text-xs mt-3">🏆 Gifts for every mini-event winner</p>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-black/40 shadow-glow p-5">
          <h4 className="font-bold text-cream">Wand-Coding Dash</h4>
          <p className="text-cream/80 text-sm mt-1">Tiny build challenges, blazing speed.</p>
          <p className="text-cream/70 text-xs mt-3">🏆 Gifts for every mini-event winner</p>
        </div>
      </div>
    </section>
  )
}
