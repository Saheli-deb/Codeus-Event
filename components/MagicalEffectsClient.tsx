'use client'
import dynamic from 'next/dynamic'

// Load the actual component only on the client
const MagicalEffects = dynamic(() => import('./MagicalEffects'), { ssr: false });

export default function MagicalEffectsClient() {
  return <MagicalEffects />;
}
