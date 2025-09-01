// app/ClientWizard.tsx
'use client'
import dynamic from 'next/dynamic'
const WizardAvatar = dynamic(() => import('@/components/WizardAvatar'), { ssr: false })
export default function ClientWizard() { return <WizardAvatar /> }
