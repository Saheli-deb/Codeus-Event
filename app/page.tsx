
// import Navbar from '@/components/Navbar'
// import IntroOverlay from '@/components/intro/IntroOverlay'
// import Hero from '@/components/Hero'
// import FloatingMiniSliders from '@/components/FloatingMiniSliders'
// import FunEvents from '@/components/FunEvents'
// import RingRow from '@/components/RingRow'
// import Prizes from '@/components/Prizes'
// import SubEvents from '@/components/SubEvents'
// import FAQ from '@/components/FAQ'
// import Footer from '@/components/Footer'

// export default function Page() {
//   // 👇 You can edit numbers here (they render as tel: links)
//   const POC = [
//     { name: 'Tanisha Chakrabarti', phone: '+91 98765 43210' },
//     { name: 'Souptik Biswas',      phone: '+91 98765 43211' },
//     { name: 'Saheli Deb',          phone: '+91 86172 24294' },
//     { name: 'Anwesha Ghosh',       phone: '+91 98765 43213' },
//   ]

//   return (
//     <main>
//       <IntroOverlay />
//       <Navbar />
//       <Hero />

//       {/* Decorative sliders + sections */}
//       <FloatingMiniSliders />
//       <FunEvents />
//       <RingRow />
//       <SubEvents />
//       <FAQ />
//       <Prizes />

//       {/* Register & brochure */}
//       <section id="register" className="max-w-6xl mx-auto px-4 py-12">
//         <h3 className="font-hpTitle text-gold text-3xl md:text-4xl mb-4">
//           Register & Brochure
//         </h3>
//         <div className="flex flex-wrap gap-3">
//           <a className="btn" href="/register" target="_blank" rel="noreferrer">
//             Register Now
//           </a>
//           <a
//             className="btn"
//             href="https://drive.google.com/drive/folders/1Yx3ba8Pfisp_8DZToa9Pu4-VlhjgL4zl"
//             download
//           >
//             Download Brochure
//           </a>
//         </div>
//       </section>

//       {/* ✨ NEW: POC section at the very end */}
//       <section
//         id="poc"
//         className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
//       >
//         <div className="hp-card relative overflow-visible p-6 sm:p-8">
//           {/* soft halo */}
//           <div
//             aria-hidden
//             className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
//             style={{
//               background:
//                 'radial-gradient(380px 180px at 50% 10%, rgba(212,175,55,.18), transparent 60%)',
//               filter: 'blur(10px)',
//             }}
//           />
//           <h2 className="font-hpTitle text-gold text-3xl sm:text-4xl mb-6 text-center">
//             Point of Contact (POC)
//           </h2>

//           <ul className="grid sm:grid-cols-2 gap-4">
//             {POC.map((p) => (
//               <li
//                 key={p.name}
//                 className="group flex items-center justify-between gap-3 rounded-xl border border-gold/30 bg-black/25 px-4 py-3"
//               >
//                 {/* Glowing name */}
//                 <span
//                   className="text-cream text-lg font-semibold"
//                   style={{
//                     textShadow:
//                       '0 0 6px rgba(212,175,55,.35), 0 0 14px rgba(212,175,55,.22)',
//                   }}
//                 >
//                   {p.name}
//                 </span>

//                 {/* Clickable phone (glow on hover) */}
//                 <a
//                   href={`tel:${p.phone.replace(/\s+/g, '')}`}
//                   className="ml-auto rounded-full border border-gold/50 px-3 py-1.5 text-sm text-gold transition
//                              hover:shadow-[0_0_18px_rgba(212,175,55,.45)] hover:bg-gold/10"
//                 >
//                   {p.phone}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* tiny sparkle line */}
//           <div className="hp-sparkle-line h-[2px] mt-6 opacity-70" />
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }
import Navbar from '@/components/Navbar'
import IntroOverlay from '@/components/intro/IntroOverlay'
import Hero from '@/components/Hero'
import FloatingMiniSliders from '@/components/FloatingMiniSliders'
import FunEvents from '@/components/FunEvents'
import RingRow from '@/components/RingRow'
import Prizes from '@/components/Prizes'
import SubEvents from '@/components/SubEvents'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Page() {
  // 👇 You can edit numbers here (they render as tel: links)
  const POC = [
    { name: 'Tanisha Chakrabarti', phone: '+91 90070 65860' },
    { name: 'Souptik Biswas',      phone: '+91 90622 12729' },
    { name: 'Saheli Deb',          phone: '+91 86172 24294' },
    { name: 'Anwesha Ghosh',       phone: '+91 90077 19690' },
  ]

  return (
    <main className="w-full min-h-screen relative overflow-x-hidden">
      <IntroOverlay />
      <Navbar />
      <Hero />

      {/* Decorative sliders + sections */}
      <FloatingMiniSliders />
      <FunEvents />
      <RingRow />
      <SubEvents />
      <FAQ />
      <Prizes />

      {/* Register & brochure */}
      <section id="register" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h3 className="font-hpTitle text-gold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
          Register & Brochure
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <a className="btn w-full sm:w-auto" href="/register" target="_blank" rel="noreferrer">
            Register Now
          </a>
          <a
            className="btn w-full sm:w-auto"
            href="/brochure.pdf"
            download
          >
            Download Brochure
          </a>
        </div>
      </section>

      {/* ===== Venue Map (Godrej Genesis) ===== */}
      <section id="venue" className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="font-hpTitle text-gold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Venue: Godrej Genesis</h2>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-[rgba(212,175,55,0.45)]
            shadow-[0_10px_35px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,220,140,0.12)]
            bg-[rgba(18,14,8,0.7)]
          "
        >
          {/* soft golden halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_40px_6px_rgba(212,175,55,0.15)]"
          />

          {/* API-free Google Maps embed (query-based) */}
          <iframe
            title="Godrej Genesis on Google Maps"
            aria-label="Map showing Godrej Genesis building"
            src={'https://www.google.com/maps?q=Godrej%20Genesis%2C%20Kolkata&z=16&output=embed'}
            className="block w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* floating info pill */}
          <div
            className="absolute left-2 sm:left-4 top-2 sm:top-4 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[15px] font-semibold
                       text-[#ffe29a] border border-[rgba(212,175,55,0.5)]
                       bg-[rgba(28,20,12,0.85)] backdrop-blur-sm"
          >
            📍 <span className="hidden xs:inline">Godrej Genesis, Sector V, Kolkata</span>
            <span className="xs:hidden">Godrej Genesis</span>
          </div>

          {/* actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4">
            <a
              className="btn rounded-full px-4 sm:px-5 py-2 w-full sm:w-auto text-center"
              href="https://www.google.com/maps/dir/?api=1&destination=Godrej%20Genesis%2C%20Kolkata"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
            <a
              className="btn rounded-full px-4 sm:px-5 py-2 w-full sm:w-auto text-center"
              href="https://maps.google.com/?q=Godrej%20Genesis%2C%20Kolkata"
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </section>

      {/* ✨ POC section */}
      <section
        id="poc"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-12 sm:pb-16"
      >
        <div className="hp-card relative overflow-visible p-4 sm:p-6 lg:p-8">
          {/* soft halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
            style={{
              background:
                'radial-gradient(380px 180px at 50% 10%, rgba(212,175,55,.18), transparent 60%)',
              filter: 'blur(10px)',
            }}
          />
          <h2 className="font-hpTitle text-gold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-center">
            Point of Contact (POC)
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {POC.map((p) => (
              <li
                key={p.name}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 rounded-xl border border-gold/30 bg-black/25 px-3 sm:px-4 py-3"
              >
                {/* Glowing name */}
                <span
                  className="text-cream text-base sm:text-lg font-semibold"
                  style={{
                    textShadow:
                      '0 0 6px rgba(212,175,55,.35), 0 0 14px rgba(212,175,55,.22)',
                  }}
                >
                  {p.name}
                </span>

                {/* Clickable phone (glow on hover) */}
                <a
                  href={`tel:${p.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto sm:ml-auto rounded-full border border-gold/50 px-3 py-1.5 text-xs sm:text-sm text-gold transition text-center
                             hover:shadow-[0_0_18px_rgba(212,175,55,.45)] hover:bg-gold/10"
                >
                  {p.phone}
                </a>
              </li>
            ))}
          </ul>

          {/* tiny sparkle line */}
          <div className="hp-sparkle-line h-[2px] mt-6 opacity-70" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
