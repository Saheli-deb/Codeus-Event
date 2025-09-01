// 'use client'
// import { useEffect, useRef, useState } from 'react'

// export default function AudioController(){
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const [enabled, setEnabled] = useState(false)

//   useEffect(()=>{
//     const a = new Audio('/audio/theme.mp3') // put your track at public/audio/theme.mp3
//     a.loop = true
//     a.preload = 'auto'
//     a.volume = 0.35
//     audioRef.current = a

//     // restore preference
//     const pref = typeof window !== 'undefined' ? localStorage.getItem('musicOn') : null
//     if (pref === '1') setEnabled(true)

//     // start on Skip Intro (user gesture)
//     const start = async () => {
//       try {
//         setEnabled(true)
//         localStorage.setItem('musicOn','1')
//         await a.play()
//       } catch {}
//     }
//     window.addEventListener('start-music', start as any)

//     return () => {
//       window.removeEventListener('start-music', start as any)
//       a.pause()
//     }
//   }, [])

//   // react to toggle changes
//   useEffect(()=>{
//     const a = audioRef.current
//     if (!a) return
//     if (enabled) {
//       a.play().catch(()=>{})
//       localStorage.setItem('musicOn','1')
//     } else {
//       a.pause()
//       localStorage.setItem('musicOn','0')
//     }
//   }, [enabled])

//   // simple floating chip
//   return (
//     <div className="fixed right-3 bottom-3 z-[60]">
//       <button
//         onClick={()=>setEnabled(v=>!v)}
//         className="px-3 py-2 rounded-xl border border-gold/40 bg-black/40 text-cream backdrop-blur hover:bg-gold/15 transition"
//         aria-pressed={enabled}
//         aria-label={enabled ? 'Turn music off' : 'Turn music on'}
//       >
//         {enabled ? '🎵 Music: On' : '🎵 Music: Off'}
//       </button>
//     </div>
//   )
// }
'use client'
import { useEffect, useRef, useState } from 'react'

export default function AudioController(){
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(()=>{
    const a = new Audio('/audio/theme.mp3') // ensure this exists
    a.loop = true
    a.preload = 'auto'
    a.volume = 0.35
    audioRef.current = a

    // Restore remembered preference
    const pref = typeof window !== 'undefined' ? localStorage.getItem('musicOn') : null
    if (pref === '1') setEnabled(true)

    // Start on custom event (Skip Intro triggers this)
    const onStartMusic = async () => {
      try {
        setEnabled(true)
        localStorage.setItem('musicOn','1')
        await a.play()
      } catch {}
    }
    window.addEventListener('start-music', onStartMusic as any)

    // Also start on FIRST user interaction anywhere (gesture required by browsers)
    const firstInteract = async () => {
      if (enabled) { cleanupInteracts(); return }
      try {
        setEnabled(true)
        localStorage.setItem('musicOn','1')
        await a.play()
      } catch {}
      cleanupInteracts()
    }
    const cleanupInteracts = () => {
      window.removeEventListener('pointerdown', firstInteract)
      window.removeEventListener('keydown', firstInteract)
      window.removeEventListener('touchstart', firstInteract)
    }
    window.addEventListener('pointerdown', firstInteract, { passive: true })
    window.addEventListener('keydown', firstInteract)
    window.addEventListener('touchstart', firstInteract, { passive: true })

    return () => {
      window.removeEventListener('start-music', onStartMusic as any)
      cleanupInteracts()
      a.pause()
    }
  }, [])

  // React to manual toggle
  useEffect(()=>{
    const a = audioRef.current
    if (!a) return
    if (enabled) {
      a.play().catch(()=>{})
      localStorage.setItem('musicOn','1')
    } else {
      a.pause()
      localStorage.setItem('musicOn','0')
    }
  }, [enabled])

  return (
    <div className="fixed right-3 bottom-3 z-[60]">
      <button
        onClick={()=>setEnabled(v=>!v)}
        className="px-3 py-2 rounded-xl border border-gold/40 bg-black/40 text-cream backdrop-blur hover:bg-gold/15 transition"
        aria-pressed={enabled}
        aria-label={enabled ? 'Turn music off' : 'Turn music on'}
      >
        {enabled ? '🎵 Music: On' : '🎵 Music: Off'}
      </button>
    </div>
  )
}
