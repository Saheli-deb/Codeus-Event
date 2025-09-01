
// import './globals.css'
// import type { Metadata, Viewport } from 'next'
// import MagicalEffects from '@/components/MagicalEffects'

// export const metadata: Metadata = {
//   title: 'Code & Cauldrons — Code & Clause',
//   description:
//     'Hogwarts-style AI festival featuring Generative AI (HOGGEN), Agentic AI (CODEUS), and No-Code (CODE WHO?).',
// }

// export const viewport: Viewport = {
//   themeColor: '#0f0d13',
//   colorScheme: 'dark',
//   width: 'device-width',
//   initialScale: 1,
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen font-hpText">
//         {/* Only the moving background */}
//         <div className="bg-pan" />

//         {/* Magical sparkles, twinkles, butterflies */}
//         <MagicalEffects />

//         {children}
//       </body>
//     </html>
//   )
// }
// app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next'
import MagicalEffects from '@/components/MagicalEffects'
import AudioController from '@/components/AudioController' // ⬅️ NEW

export const metadata: Metadata = {
  title: 'Code & Cauldrons — Code & Clause',
  description:
    'Hogwarts-style AI festival featuring Generative AI (HOGGEN), Agentic AI (CODEUS), and No-Code (CODE WHO?).',
}

export const viewport: Viewport = {
  themeColor: '#0f0d13',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Mobile viewport and preloads */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#0f0d13" />
        <meta name="color-scheme" content="dark" />
        <link rel="preload" href="/audio/theme.mp3" as="audio" />
      </head>
      <body className="min-h-screen font-hpText overflow-x-hidden">
        {/* Moving background */}
        <div className="bg-pan" />

        {/* Magical sparkles, twinkles, butterflies */}
        <MagicalEffects />

        {/* Global site music toggle (starts after Skip via custom event) */}
        <AudioController />

        <div className="relative w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
