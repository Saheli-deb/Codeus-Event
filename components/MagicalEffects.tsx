'use client';
import { useEffect, useState } from 'react';

type Spark = { left: string; x: string; dur: string };

export default function MagicalEffects() {
  const [sparks, setSparks] = useState<Spark[] | null>(null); // render nothing on server

  useEffect(() => {
    const arr = Array.from({ length: 28 }, () => ({
      left: `${Math.random() * 100}vw`,
      x: `${(Math.random() * 60 - 30).toFixed(2)}px`,
      dur: `${(18 + Math.random() * 18).toFixed(2)}s`,
    }));
    setSparks(arr);
  }, []);

  if (!sparks) return null;

  return (
    <>
      <div className="twinkle-layer" />
      {sparks.map((p, i) => {
        const style: React.CSSProperties & Record<string, string> = {
          left: p.left,
          ['--x']: p.x,
          ['--dur']: p.dur,
        };
        return <i key={i} className="particle" style={style} />;
      })}
    </>
  );
}
