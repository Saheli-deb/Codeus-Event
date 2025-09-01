
// 'use client'
// import { useEffect, useRef, useState } from 'react'

// const pickSrc = () =>
//   typeof window !== 'undefined' && window.matchMedia('(orientation: portrait)').matches
//     ? '/video/intro-vertical.mp4' // tall version you exported from Canva
//     : '/video/intro.mp4'          // wide version

// export default function IntroOverlay(){
//   const [show, setShow] = useState(false)
//   const [src, setSrc] = useState<string>('')       // we set the exact file in JS
//   const vidRef = useRef<HTMLVideoElement>(null)

//   useEffect(()=>{
//     if (typeof window === 'undefined') return
//     const seen = sessionStorage.getItem('introSeen')
//     if (!seen) {
//       setShow(true)
//       const first = pickSrc()
//       setSrc(first)
//     }
//     // Optional: if they rotate BEFORE closing, keep same src (no mid-play swaps)
//     const onResize = () => { if (!src) setSrc(pickSrc()) }
//     window.addEventListener('orientationchange', onResize)
//     window.addEventListener('resize', onResize)
//     return () => {
//       window.removeEventListener('orientationchange', onResize)
//       window.removeEventListener('resize', onResize)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Try autoplay (muted + playsInline) once src is ready
//   useEffect(()=>{
//     const v = vidRef.current
//     if (!v || !src) return
//     v.muted = true
//     v.playsInline = true
//     v.autoplay = true
//     v.src = src
//     v.load()
//     v.play().catch(()=>{/* mobile may delay, we still show skip */})

//     // Fallback to wide if portrait file fails to load
//     const onErr = () => {
//       if (src !== '/video/intro.mp4') setSrc('/video/intro.mp4')
//     }
//     v.addEventListener('error', onErr)
//     return () => v.removeEventListener('error', onErr)
//   }, [src])

//   const finish = ()=>{
//     setShow(false)
//     try { sessionStorage.setItem('introSeen','1') } catch {}
//   }

//   const skip = ()=>{
//     vidRef.current?.pause()
//     // 🔊 start site music on this user gesture
//     try { window.dispatchEvent(new CustomEvent('start-music')) } catch {}
//     finish()
//   }

//   if(!show) return null

//   return (
//     <div
//       className="fixed inset-0 z-[100] bg-black"
//       role="dialog" aria-label="Intro video"
//       // prevent the page from “sliding” behind on Android
//       style={{ touchAction: 'none' }}
//     >
//       {/* blurred poster backfill so portrait 'contain' looks premium */}
//       <div
//         className="pointer-events-none absolute inset-0 bg-[url('/video/intro-poster.jpg')] bg-cover bg-center opacity-45 blur-xl"
//         aria-hidden="true"
//       />

//       {/* Video: contain on phones to keep baked-in text fully visible */}
//       <video
//         ref={vidRef}
//         className="absolute inset-0 w-full h-full portrait:object-contain landscape:object-cover object-center bg-black"
//         loop
//         preload="metadata"
//         poster="/video/intro-poster.jpg"
//         onEnded={finish}
//         controls={false}
//       />

//       {/* Controls (safe-area aware) */}
//       <div className="absolute left-0 right-0 bottom-4 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
//         <button onClick={skip} className="btn">Skip Intro</button>
//       </div>
//     </div>
//   )
// }
// 'use client'

// import { useEffect, useRef, useState } from 'react'

// /** Pick file by current orientation (computed once, or before src is set). */
// const pickSrc = (portrait: boolean) =>
//   portrait ? '/video/intro-vertical.mp4' : '/video/intro.mp4'

// export default function IntroOverlay() {
//   const [show, setShow] = useState(false)
//   const [src, setSrc] = useState<string>('') // which file to play
//   const [isPortrait, setIsPortrait] = useState(false)
//   const vidRef = useRef<HTMLVideoElement>(null)

//   // Show once per session & pick the file
//   useEffect(() => {
//     if (typeof window === 'undefined') return
//     const seen = sessionStorage.getItem('introSeen')
//     if (!seen) {
//       setShow(true)
//       const portrait = window.matchMedia('(orientation: portrait)').matches
//       setIsPortrait(portrait)
//       setSrc(pickSrc(portrait))
//     }

//     // If user rotates BEFORE src is chosen, pick once (avoid swapping mid-play).
//     const onMaybePick = () => {
//       if (!src) {
//         const portrait = window.matchMedia('(orientation: portrait)').matches
//         setIsPortrait(portrait)
//         setSrc(pickSrc(portrait))
//       }
//     }
//     window.addEventListener('orientationchange', onMaybePick, { passive: true })
//     window.addEventListener('resize', onMaybePick, { passive: true })

//     return () => {
//       window.removeEventListener('orientationchange', onMaybePick)
//       window.removeEventListener('resize', onMaybePick)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Autoplay muted once we know the src. Fallback to wide if portrait fails.
//   useEffect(() => {
//     const v = vidRef.current
//     if (!v || !src) return

//     // inline autoplay friendliness across Android/iOS/desktop
//     v.muted = true
//     v.playsInline = true
//     // @ts-ignore – allow the attribute for older iOS Safari
//     v.setAttribute('webkit-playsinline', 'true')
//     v.autoplay = true

//     // force reload when src changes on some Androids
//     v.src = src
//     v.load()
//     const tryPlay = () => v.play().catch(() => {/* user can press Skip */})
//     // try on canplay as well (Chrome mobile quirk)
//     v.addEventListener('canplay', tryPlay, { once: true })
//     tryPlay()

//     const onError = () => {
//       if (src !== '/video/intro.mp4') {
//         setIsPortrait(false)
//         setSrc('/video/intro.mp4')
//       }
//     }
//     v.addEventListener('error', onError)
//     return () => {
//       v.removeEventListener('error', onError)
//       v.removeEventListener('canplay', tryPlay)
//     }
//   }, [src])

//   const finish = () => {
//     setShow(false)
//     try { sessionStorage.setItem('introSeen', '1') } catch {}
//     try { window.dispatchEvent(new CustomEvent('start-music')) } catch {}
//   }

//   const skip = () => {
//     vidRef.current?.pause()
//     finish()
//   }

//   if (!show) return null

//   return (
//     <div
//       role="dialog"
//       aria-label="Intro video"
//       className="fixed inset-0 z-[100] bg-black"
//       // stop scroll chaining / pull-to-refresh on Android
//       style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
//     >
//       {/* Backfill: blurred poster so portrait 'contain' doesn’t show hard bars */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[url('/video/intro-poster.jpg')] bg-cover bg-center opacity-40 blur-xl z-[90]"
//       />

//       {/* Video – use dvh/dvw to avoid the Android URL-bar jump */}
//       <video
//         key={src} // ensure a full remount on src switch for stubborn devices
//         ref={vidRef}
//         className={`absolute left-0 top-0 w-[100svw] h-[100svh] object-center z-[95] ${
//           isPortrait ? 'object-contain' : 'object-cover'
//         }`}
//         style={{ backgroundColor: 'transparent' }}
//         loop
//         controls={false}
//         preload="metadata"
//         poster="/video/intro-poster.jpg"
//         onEnded={finish}
//         muted
//         playsInline
//         autoPlay
//         // keep users inside the overlay; reduce odd controls on mobile
//         disablePictureInPicture
//         controlsList="noplaybackrate nodownload nofullscreen noremoteplayback"
//       />

//       {/* Controls – safe-area aware, fully responsive & centered */}
//       <div
//         className="pointer-events-none fixed inset-x-0 z-[110] flex justify-center px-4"
//         style={{
//           bottom: 'max(20px, calc(env(safe-area-inset-bottom, 0px) + 20px))',
//         }}
//       >
//         <button
//           onClick={skip}
//           onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && skip()}
//           className="
//             pointer-events-auto rounded-full
//             px-5 py-3 sm:px-6 sm:py-3.5
//             w-[clamp(160px,50vw,280px)]
//             min-h-[44px]
//             text-[13px] sm:text-sm md:text-base font-semibold
//             text-white/95 bg-white/12 backdrop-blur-md
//             ring-1 ring-white/25 hover:bg-white/18 active:scale-[0.98]
//             transition shadow-lg shadow-black/30
//             focus:outline-none focus:ring-2 focus:ring-white/40
//           "
//         >
//           Skip Intro
//         </button>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useRef, useState } from 'react'

/** Decide which file to use (only for non-mobile). */
const pickSrc = (portrait: boolean) =>
  portrait ? '/video/intro-vertical.mp4' : '/video/intro.mp4'

/** Lightweight mobile detector: Android/iPhone OR coarse pointer + narrow width */
const isMobileDevice = () => {
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || ''
    const isAndroid = /android/i.test(ua)
    const isIPhone = /iphone|ipod/i.test(ua)
    // treat iPad as tablet → still show intro; so we don't include /ipad/i here
    if (isAndroid || isIPhone) return true
  }
  if (typeof window !== 'undefined') {
    // fallback: coarse pointer and small viewport (phones)
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    const narrow = window.matchMedia?.('(max-width: 900px)').matches
    if (coarse && narrow) return true
  }
  return false
}

export default function IntroOverlay() {
  const [show, setShow] = useState(false)
  const [src, setSrc] = useState<string>('') // which file to play
  const [isPortrait, setIsPortrait] = useState(false)
  const vidRef = useRef<HTMLVideoElement>(null)

  // Show once per session on DESKTOP only
  useEffect(() => {
    if (typeof window === 'undefined') return

    // If it's a phone, skip intro entirely for this session
    if (isMobileDevice()) {
      try { sessionStorage.setItem('introSeen', '1') } catch {}
      // Optionally kick off any music/etc right away
      try { window.dispatchEvent(new CustomEvent('start-music')) } catch {}
      setShow(false)
      return
    }

    // Desktop path: show intro once per session
    const seen = sessionStorage.getItem('introSeen')
    if (!seen) {
      setShow(true)
      const portrait = window.matchMedia('(orientation: portrait)').matches
      setIsPortrait(portrait)
      setSrc(pickSrc(portrait))
    }

    // If user rotates BEFORE src is chosen, pick once (avoid swapping mid-play).
    const onMaybePick = () => {
      if (!src) {
        const portrait = window.matchMedia('(orientation: portrait)').matches
        setIsPortrait(portrait)
        setSrc(pickSrc(portrait))
      }
    }
    window.addEventListener('orientationchange', onMaybePick, { passive: true })
    window.addEventListener('resize', onMaybePick, { passive: true })

    return () => {
      window.removeEventListener('orientationchange', onMaybePick)
      window.removeEventListener('resize', onMaybePick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autoplay muted once we know the src. Fallback to wide if portrait fails.
  useEffect(() => {
    const v = vidRef.current
    if (!v || !src) return

    // inline autoplay friendliness across desktop/iOS
    v.muted = true
    v.playsInline = true
    // @ts-ignore – older iOS Safari
    v.setAttribute('webkit-playsinline', 'true')
    v.autoplay = true

    // force reload when src changes
    v.src = src
    v.load()
    const tryPlay = () => v.play().catch(() => {/* user can press Skip */})
    v.addEventListener('canplay', tryPlay, { once: true })
    tryPlay()

    const onError = () => {
      if (src !== '/video/intro.mp4') {
        setIsPortrait(false)
        setSrc('/video/intro.mp4')
      }
    }
    v.addEventListener('error', onError)
    return () => {
      v.removeEventListener('error', onError)
      v.removeEventListener('canplay', tryPlay)
    }
  }, [src])

  const finish = () => {
    setShow(false)
    try { sessionStorage.setItem('introSeen', '1') } catch {}
    try { window.dispatchEvent(new CustomEvent('start-music')) } catch {}
  }

  const skip = () => {
    vidRef.current?.pause()
    finish()
  }

  // If not showing (phones or already seen), render nothing
  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Intro video"
      className="fixed inset-0 z-[100] bg-black"
      // stop scroll chaining / pull-to-refresh on touch devices
      style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
    >
      {/* Backfill: blurred poster so portrait 'contain' doesn’t show hard bars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/video/intro-poster.jpg')] bg-cover bg-center opacity-40 blur-xl z-[90]"
      />

      {/* Video – use dvh/dvw to avoid the URL-bar jump */}
      <video
        key={src}
        ref={vidRef}
        className={`absolute left-0 top-0 w-[100svw] h-[100svh] object-center z-[95] ${
          isPortrait ? 'object-contain' : 'object-cover'
        }`}
        style={{ backgroundColor: 'transparent' }}
        loop
        controls={false}
        preload="metadata"
        poster="/video/intro-poster.jpg"
        onEnded={finish}
        muted
        playsInline
        autoPlay
        disablePictureInPicture
        controlsList="noplaybackrate nodownload nofullscreen noremoteplayback"
      />

      {/* Controls – safe-area aware, centered */}
      <div
        className="pointer-events-none fixed inset-x-0 z-[110] flex justify-center px-4"
        style={{
          bottom: 'max(20px, calc(env(safe-area-inset-bottom, 0px) + 20px))',
        }}
      >
        <button
          onClick={skip}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && skip()}
          className="
            pointer-events-auto rounded-full
            px-5 py-3 sm:px-6 sm:py-3.5
            w-[clamp(160px,50vw,280px)]
            min-h-[44px]
            text-[13px] sm:text-sm md:text-base font-semibold
            text-white/95 bg-white/12 backdrop-blur-md
            ring-1 ring-white/25 hover:bg-white/18 active:scale-[0.98]
            transition shadow-lg shadow-black/30
            focus:outline-none focus:ring-2 focus:ring-white/40
          "
        >
          Skip Intro
        </button>
      </div>
    </div>
  )
}
