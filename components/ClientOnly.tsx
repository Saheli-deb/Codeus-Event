'use client';

import { useEffect, useState, type ReactNode } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
  /** What to render while waiting for client mount (e.g., a skeleton) */
  fallback?: ReactNode;
  /** Optional delay (ms) before rendering children on the client */
  delay?: number;
  /** Optional hook when mounted on client */
  onMount?: () => void;
};

export default function ClientOnly({
  children,
  fallback = null,
  delay = 0,
  onMount,
}: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    const mount = () => {
      setMounted(true);
      onMount?.();
    };
    if (delay > 0) {
      t = window.setTimeout(mount, delay);
    } else {
      // next microtask keeps first paint deterministic
      Promise.resolve().then(mount);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [delay, onMount]);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}

/** Small helper if you prefer a hook */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}
