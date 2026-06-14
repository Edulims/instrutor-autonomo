// Marketing.tsx
import { useState } from 'react';
import { Icon } from '../lib/icons';
import { Stars, AdMock } from '../components/ui';
import { DATA, type Creative } from '../lib/data';

const BRAND_COLORS = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#F43F5E', '#0EA5E9'];
const HUE_FROM_HEX: Record<string, number> = { '#2563EB': 214, '#F59E0B': 38, '#10B981': 160, '#8B5CF6': 266, '#F43F5E': 350, '#0EA5E9': 199 };

function PerfTag({ perf }: { perf: Creative['perf'] }) {
  const map: Record<Creative['perf'], string> = { Alta: 'badge--up', Média: 'badge--amber', Baixa: 'badge--down' };
  return (
    <span className={`badge ${map[perf]}`}>
      {perf === 'Alta' && <Icon name="flame" size={11} />}
      {perf}
    </span>
  );
}

function Drawer({ creative, onClose }: { creative: Creative; onClose: () => void }) {
  const [copy, setCopy] = useState(creative.tagline);
  const [color, setColor] = useState(BRAND_COLORS[0]);

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__head">
          <div style={{ flex: 1 }}>
            <h3>Personalizar criativo</h3>
            <p>
              {creative.name} · {creative.campaign}
            </p>
          </div>
          <button className="iconbtn" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="drawer__body">
          <div className="adpreview">
            <AdMock hue={HUE_FROM_HEX[color] ?? creative.hue} tagline={copy} logoColor={color} />
          </div>

          <div className="field">
            <label>Logo da marca</label>
            <div className="uploader">
              <Icon name="upload" size={20} />
              <div>
                <b style={{ color: 'var(--text)', fontWeight: 700 }}>Arraste seu logo</b> ou clique para enviar
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>PNG ou SVG · fundo transparente</span>
            </div>
          </div>

          <div className="field">
            <label>Cor da marca</label>
            <div className="swatches">
              {BRAND_COLORS.map((c) => (
                <button key={c} className={`swatch ${color === c ? 'on' : ''}`} style={{ background: c, color: c }} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>

          <div className="field">
            <label>Texto do anúncio (copy)</label>
            <textarea className="input" rows={3} value={copy} onChange={(e) => setCopy(e.target.value)} />
          </div>

          <div className="field">
            <label>Chamada para ação</label>
            <input className="input" defaultValue="Fale no WhatsApp agora" />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn--ghost btn--sm" style={{ flex: 1 }}>
              <Icon name="refresh" size={15} /> Solicitar ajuste
            </button>
            <button className="btn btn--ghost btn--sm" style={{ flex: 1 }}>
              <Icon name="download" size={15} /> Histórico
            </button>
          </div>
        </div>

        <div className="drawer__foot">
          <button className="btn btn--ghost" style={{ flex: 1 }} onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn--primary" style={{ flex: 1.4 }}>
            <Icon name="download" size={16} /> Baixar criativo
          </button>
        </div>
      </div>
    </>
  );
}

export function Marketing({ mobile }: { mobile: boolean }) {
  const [month, setMonth] = useState('Junho');
  const [campaign, setCampaign] = useState('Todas');
  const [active, setActive] = useState<Creative | null>(null);

  const months = ['Junho', 'Maio', 'Abril'];
  const camps = ['Todas', 'Captação', 'Conversão', 'Reativação'];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <div className="chiprow">
          {months.map((m) => (
            <button key={m} className={`chip ${month === m ? 'on' : ''}`} onClick={() => setMonth(m)}>
              <Icon name="calendar" size={14} />
              {m}
            </button>
          ))}
        </div>
        <span style={{ width: 1, height: 24, background: 'var(--border)' }} />
        <div className="chiprow">
          {camps.map((c) => (
            <button key={c} className={`chip ${campaign === c ? 'on' : ''}`} onClick={() => setCampaign(c)}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        {!mobile && (
          <button className="btn btn--primary btn--sm">
            <Icon name="plus" size={16} /> Novo anúncio
          </button>
        )}
      </div>

      <div className="creatives">
        {DATA.creatives.map((c, i) => (
          <div className="creative reveal" key={c.id} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="creative__img">
              <AdMock hue={c.hue} tagline={c.tagline} hideBrand />
              <div className="creative__tag">
                <span className="badge badge--muted" style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', border: 'none', backdropFilter: 'blur(4px)' }}>
                  {c.campaign}
                </span>
              </div>
              <div className="creative__perf">
                <PerfTag perf={c.perf} />
              </div>
            </div>
            <div className="creative__body">
              <div>
                <div className="creative__name">{c.name}</div>
                <div className="creative__meta">{c.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Stars n={c.rating} />
                <span style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>Recomendação</span>
              </div>
              <div className="creative__foot">
                <button className="btn btn--primary btn--sm" style={{ flex: 1 }} onClick={() => setActive(c)}>
                  <Icon name="palette" size={15} /> Personalizar
                </button>
                <button className="iconbtn" style={{ width: 34, height: 34 }}>
                  <Icon name="download" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {active && <Drawer creative={active} onClose={() => setActive(null)} />}
    </div>
  );
}
