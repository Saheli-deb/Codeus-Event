'use client'
import dynamic from 'next/dynamic'
import ClientOnly from './ClientOnly'

const FloatingMiniSliders = dynamic(() => import('./FloatingMiniSliders'), { ssr: false });

export default function FloatingMiniSlidersClient() {
  return (
    <ClientOnly>
      <FloatingMiniSliders />
    </ClientOnly>
  );
}
