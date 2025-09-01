
// 'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   const onNavClick = () => setOpen(false)

//   return (
//     <nav
//       className={`sticky top-0 z-50 border-b transition-all ${
//         scrolled ? 'backdrop-blur-sm border-gold/30' : 'bg-transparent border-gold/15'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Brand */}
//         <Link href="#" className="flex items-center gap-3">
//           <Image src="/logo.png" alt="Code & Clause" width={36} height={36} className="rounded-md" />
//           <span className="font-hpTitle text-lg sm:text-xl md:text-2xl text-gold font-black tracking-wide">
//           The Triwizard Trials
//           </span>
//         </Link>

//         {/* Desktop nav */}
//         <div className="hidden md:flex items-center gap-2">
//           <a href="#about" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10">About</a>
//           <a href="#subevents" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10">Sub-Events</a>
//           {/* <a href="#community" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10">Community</a> */}
//           {/* UPDATED: use Link to /register */}
//           {/* <Link href="/register" className="btn">Register</Link> */}
//         </div>

//         {/* Mobile menu button */}
//         <button
//           aria-label="Open menu"
//           className="md:hidden inline-flex items-center justify-center rounded-md border border-gold/30 px-3 py-2"
//           onClick={() => setOpen(v => !v)}
//         >
//           <span className="block w-5 h-0.5 bg-gold mb-1" />
//           <span className="block w-5 h-0.5 bg-gold mb-1" />
//           <span className="block w-5 h-0.5 bg-gold" />
//         </button>
//       </div>

//       {/* Mobile drawer */}
//       <div
//         className={`md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-gold/15 ${
//           open ? 'max-h-64' : 'max-h-0'
//         }`}
//       >
//         <div className="px-4 py-3 flex flex-col gap-2 bg-black/40 backdrop-blur-sm">
//           <a onClick={onNavClick} href="#about" className="px-3 py-2 rounded-lg border border-gold/25">About</a>
//           <a onClick={onNavClick} href="#subevents" className="px-3 py-2 rounded-lg border border-gold/25">Sub-Events</a>
//           {/* <a onClick={onNavClick} href="#community" className="px-3 py-2 rounded-lg border border-gold/25">Community</a> */}
//           {/* UPDATED: use Link to /register */}
//           <Link onClick={onNavClick} href="/register" className="btn w-full text-center">
//             {/* Register */}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onNavClick = () => setOpen(false)

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'backdrop-blur-sm bg-black/40 border-gold/30' : 'bg-transparent border-gold/15'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand - mobile responsive */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src="/logo.png" alt="The Triwizard Trials" width={32} height={32} className="sm:w-9 sm:h-9 rounded-md" />
          <span className="font-hpTitle text-base sm:text-lg md:text-xl lg:text-2xl text-gold font-black tracking-wide truncate">
            <span className="hidden xs:inline">The Triwizard Trials</span>
            <span className="xs:hidden">Triwizard Trials</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <a href="#about" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10 text-sm lg:text-base transition-colors">About</a>
          <a href="#subevents" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10 text-sm lg:text-base transition-colors">Sub-Events</a>
          <a href="#venue" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10 text-sm lg:text-base transition-colors">Venue</a>
          <a href="#faq" className="px-3 py-2 rounded-full border border-gold/30 hover:bg-gold/10 text-sm lg:text-base transition-colors">FAQ</a>
        </div>

        {/* Mobile: hamburger menu trigger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
        >
          <div className="flex flex-col gap-1">
            <span className={`block w-4 h-0.5 bg-gold transition-transform duration-200 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-4 h-0.5 bg-gold transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-gold transition-transform duration-200 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="mx-4 mb-3 rounded-lg border border-gold/25 bg-black/60 backdrop-blur-sm">
          <a
            onClick={onNavClick}
            href="#about"
            className="block px-4 py-3 border-b border-gold/15 hover:bg-gold/10 text-sm transition-colors"
          >
            About
          </a>
          <a
            onClick={onNavClick}
            href="#subevents"
            className="block px-4 py-3 border-b border-gold/15 hover:bg-gold/10 text-sm transition-colors"
          >
            Sub-Events
          </a>
          <a
            onClick={onNavClick}
            href="#venue"
            className="block px-4 py-3 border-b border-gold/15 hover:bg-gold/10 text-sm transition-colors"
          >
            Venue
          </a>
          <a
            onClick={onNavClick}
            href="#faq"
            className="block px-4 py-3 border-b border-gold/15 hover:bg-gold/10 text-sm transition-colors"
          >
            FAQ
          </a>
          <a
            onClick={onNavClick}
            href="#poc"
            className="block px-4 py-3 hover:bg-gold/10 text-sm transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
