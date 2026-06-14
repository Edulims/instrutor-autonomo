// tweaks.tsx — floating "reshape the feel" panel + form-control helpers.
// Three expressive tweaks reshape the product's personality (not single-property
// pixel-pushing): brand identity, density, and corner language.
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

// ── useTweaks ───────────────────────────────────────────────
// Single source of truth for tweak values, persisted to localStorage so a
// reshaped look survives reloads.
export function useTweaks<T extends Record<string, string>>(defaults: T): [T, (key: keyof T, val: string) => void] {
  const [values, setValues] = useState<T>(() => {
    try {
      const saved = localStorage.getItem('iat:tweaks');
      if (saved) return { ...defaults, ...(JSON.parse(saved) as Partial<T>) };
    } catch {
      /* ignore malformed storage */
    }
    return defaults;
  });

  const setTweak = useCallback((key: keyof T, val: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem('iat:tweaks', JSON.stringify(next));
      } catch {
        /* storage may be unavailable */
      }
      return next;
    });
  }, []);

  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────
// Controlled floating shell: parent owns `open` and toggles it from the toolbar.
// Draggable by its header.
export function TweaksPanel({ title = 'Tweaks', open, onClose, children }: { title?: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX;
    const sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <div ref={dragRef} className="twk-panel" style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>{title}</b>
        <button className="twk-x" aria-label="Fechar tweaks" onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="twk-body">{children}</div>
    </div>
  );
}

// ── Layout helpers ──────────────────────────────────────────
export function TweakSection({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children }: { label: string; value?: ReactNode; children: ReactNode }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────
export interface RadioOption {
  value: string;
  label: string;
}

function TweakSelect({ label, value, options, onChange }: { label: string; value: string; options: RadioOption[]; onChange: (v: string) => void }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </TweakRow>
  );
}

export function TweakRadio({ label, value, options, onChange }: { label: string; value: string; options: RadioOption[]; onChange: (v: string) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  // Past a per-segment character budget, fall back to a dropdown rather than wrap.
  const maxLen = options.reduce((m, o) => Math.max(m, o.label.length), 0);
  const fitsAsSegments = maxLen <= (({ 2: 16, 3: 10 } as Record<number, number>)[options.length] ?? 0);
  if (!fitsAsSegments) {
    return <TweakSelect label={label} value={value} options={options} onChange={onChange} />;
  }

  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const n = options.length;

  const segAt = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return valueRef.current;
    const r = track.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return options[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev: PointerEvent) => {
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown} className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb" style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`, width: `calc((100% - 4px) / ${n})` }} />
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

// Relative-luminance contrast pick so a checkmark reads on any swatch.
function isLight(hex: string) {
  const h = hex.replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

function Check({ light }: { light: boolean }) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
    </svg>
  );
}

// TweakColor — curated single-color picker.
export function TweakColor({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const cur = value.toLowerCase();
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((c) => {
          const on = c.toLowerCase() === cur;
          return (
            <button key={c} type="button" className="twk-chip" role="radio" aria-checked={on} data-on={on ? '1' : '0'} aria-label={c} title={c} style={{ background: c }} onClick={() => onChange(c)}>
              {on && <Check light={isLight(c)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}
