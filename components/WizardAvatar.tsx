// components/WizardAvatar.tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Group } from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei'

type Props = {
  modelUrl?: string
  orbitRadius?: number
  rotateSpeed?: number
  yBob?: number
  baseScale?: number
}

function WizardModel({ url, scale=1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url) as any
  return <primitive object={scene} scale={scale} />
}

export default function WizardAvatar({
  modelUrl = '/models/harry.glb',
  orbitRadius = 1.6,
  rotateSpeed = 0.35,
  yBob = 0.12,
  baseScale = 1,
}: Props) {
  const prefersReduce = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  // responsive scale
  const [scale, setScale] = useState(baseScale)
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth
      setScale(
        baseScale * (w < 420 ? 0.55 : w < 768 ? 0.7 : w < 1280 ? 0.9 : 1)
      )
    }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [baseScale])

  const Mover = () => {
    const ref = useRef<Group>(null)
    useFrame(({ clock }) => {
      if (!ref.current) return
      const t = clock.getElapsedTime()
      ref.current.position.x = Math.cos(t * rotateSpeed) * orbitRadius
      ref.current.position.z = Math.sin(t * rotateSpeed) * orbitRadius
      ref.current.position.y = yBob + Math.sin(t * 1.8) * yBob
      ref.current.rotation.y += 0.005
    })
    return (
      <group ref={ref}>
        <WizardModel url={modelUrl} scale={scale} />
      </group>
    )
  }

  return (
    <Canvas
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -15 }}
      gl={{ alpha: true, antialias: true }}
      dpr={prefersReduce ? 1 : [1, 1.5]}
      camera={{ position: [0, 1.6, 3.2], fov: 50, near: 0.1, far: 100 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.0} />
      <directionalLight position={[-2, 2, -1]} intensity={0.4} />

      {prefersReduce ? (
        <WizardModel url={modelUrl} scale={scale} />
      ) : (
        <Mover />
      )}

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} />
    </Canvas>
  )
}

// Preload default; harmless if the file isn’t there yet
useGLTF.preload('/models/harry.glb')
