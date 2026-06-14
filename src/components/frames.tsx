// frames.tsx — MacBook frame + iPhone (reuses IOSDevice) + fit-to-viewport scaler
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { IOSDevice } from './ios-frame';

// Scales a fixed-size frame to fit the available viewport.
// Uses `zoom` (not `transform: scale`) so the scaled frame's layout footprint
// shrinks too, keeping it centered within the stage without overflow.
export function FitStage({ frameW, frameH, children, pad = 48 }: { frameW: number; frameH: number; children: ReactNode; pad?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth - pad * 2;
      const h = el.clientHeight - pad * 2;
      if (w <= 0 || h <= 0) return;
      setScale(Math.min(w / frameW, h / frameH, 1));
    };
    compute();
    const r1 = requestAnimationFrame(compute);
    const t1 = setTimeout(compute, 120);
    const t2 = setTimeout(compute, 400);
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [frameW, frameH, pad]);
  return (
    <div ref={ref} className="stage__viewport">
      <div className="scaler" style={{ width: frameW, height: frameH, zoom: scale } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

// MacBook — silver body, screen bezel, notch, hinge base
export function MacBook({ children }: { children: ReactNode }) {
  return (
    <div className="mac" style={{ width: 1520 }}>
      <div className="mac__screen" style={{ width: 1380 }}>
        <div className="mac__notch" />
        <div className="mac__cam" />
        <div className="mac__glass">{children}</div>
      </div>
      <div className="mac__notchbar">
        <div className="mac__indent" />
      </div>
      <div className="mac__base" />
    </div>
  );
}

// iPhone using the polished IOSDevice bezel — our app fills it.
export function IPhone({ children }: { children: ReactNode }) {
  return (
    <div className="phone-wrap">
      <IOSDevice width={402} height={874} dark>
        {children}
      </IOSDevice>
    </div>
  );
}
