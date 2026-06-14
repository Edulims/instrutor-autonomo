// ui.tsx — shared building blocks
import { Icon, type IconName } from '../lib/icons';

export function Avatar({ name, size = 34, color }: { name: string; size?: number; color?: string }) {
  const initials = name.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase();
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: color || `linear-gradient(150deg, hsl(${hue} 62% 52%), hsl(${(hue + 28) % 360} 62% 42%))`,
      }}
    >
      {initials}
    </div>
  );
}

export function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} fill={i <= n} style={{ color: i <= n ? 'var(--amber)' : 'var(--border)' }} />
      ))}
    </span>
  );
}

// Donut/ring progress
export function Ring({ value = 80, size = 78, stroke = 9, color = 'var(--amber)' }: { value?: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="ring__track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
      <circle
        className="ring__val"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        stroke={color}
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text className="ring__txt" x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={size * 0.26}>
        {value}%
      </text>
    </svg>
  );
}

// Transit ad creative placeholder — abstract, clearly a mock
export function AdMock({
  hue = 214,
  tagline = '',
  brand = 'Ricardo Mendes',
  logoColor,
  small = false,
  hideBrand = false,
}: {
  hue?: number;
  tagline?: string;
  brand?: string;
  logoColor?: string;
  small?: boolean;
  hideBrand?: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(150deg, hsl(${hue} 70% 46%), hsl(${(hue + 24) % 360} 72% 32%))`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: small ? 12 : 16,
        overflow: 'hidden',
      }}
    >
      {/* abstract road motif */}
      <svg viewBox="0 0 200 150" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}>
        <path d="M20 150 L85 40 L115 40 L180 150 Z" fill="rgba(255,255,255,0.5)" />
        <path d="M97 150 L99 40 L101 40 L103 150 Z" fill="rgba(255,255,255,0.9)" strokeDasharray="6 8" />
        <circle cx="160" cy="34" r="26" fill="rgba(255,255,255,0.35)" />
      </svg>
      {hideBrand ? (
        <div />
      ) : (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: small ? 16 : 20, height: small ? 16 : 20, borderRadius: 5, background: logoColor || '#fff', display: 'grid', placeItems: 'center' }}>
            <Icon name="car" size={small ? 10 : 13} style={{ color: `hsl(${hue} 70% 40%)` }} />
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: small ? 10 : 12, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '-0.01em' }}>
            Autoescola {brand.split(' ')[0]}
          </span>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <div style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: small ? 15 : 21, lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.2)', maxWidth: '85%' }}>
          {tagline}
        </div>
        {!small && (
          <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: `hsl(${hue} 70% 38%)`, fontWeight: 700, fontSize: 11, padding: '5px 11px', borderRadius: 999, fontFamily: "'Space Grotesk',sans-serif" }}>
            Fale no WhatsApp <Icon name="whatsapp" size={12} />
          </div>
        )}
      </div>
    </div>
  );
}

// Mini sparkline bars
export function Spark({ data = [] }: { data?: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="spark">
      {data.map((v, i) => (
        <span key={i} className={i >= data.length - 3 ? 'hi' : ''} style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
}

export function SrcBadge({ src }: { src: string }) {
  const map: Record<string, { cls: string; icon: IconName }> = {
    WhatsApp: { cls: 'badge--up', icon: 'whatsapp' },
    Instagram: { cls: 'badge--brand', icon: 'sparkles' },
    Indicação: { cls: 'badge--amber', icon: 'users' },
  };
  const m = map[src] || { cls: 'badge--muted', icon: 'user' };
  return (
    <span className={`badge ${m.cls}`}>
      <Icon name={m.icon} size={11} />
      {src}
    </span>
  );
}
