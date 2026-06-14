// Settings.tsx — account, brand and integrations
import type { ReactNode } from 'react';
import { Icon, type IconName } from '../lib/icons';
import { DATA } from '../lib/data';

type Theme = 'light' | 'dark';

function Row({ icon, title, sub, right }: { icon: IconName; title: string; sub: string; right: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 4px', borderBottom: '1px solid var(--border-soft)' }}>
      <div className="metric__ico ico-brand" style={{ width: 36, height: 36 }}>
        <Icon name={icon} size={18} />
      </div>
      <div style={{ flex: 1 }}>
        <b style={{ fontSize: 13.5, fontWeight: 700 }}>{title}</b>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>
      </div>
      {right}
    </div>
  );
}

export function Settings({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div className="panel">
        <div className="panel__head">
          <h3>Perfil do instrutor</h3>
        </div>
        <div className="panel__body">
          <Row icon="user" title={DATA.instructor.name} sub={`${DATA.instructor.cred} · ${DATA.instructor.city}`} right={<button className="btn btn--ghost btn--sm">Editar</button>} />
          <Row
            icon="palette"
            title="Cor da marca"
            sub="Usada nos seus anúncios e link público"
            right={
              <div style={{ display: 'flex', gap: 6 }}>
                {['#2563EB', '#F59E0B', '#10B981'].map((c) => (
                  <span key={c} style={{ width: 22, height: 22, borderRadius: 6, background: c }} />
                ))}
              </div>
            }
          />
          <Row
            icon={theme === 'dark' ? 'moon' : 'sun'}
            title="Tema da interface"
            sub="Alterna entre claro e escuro"
            right={
              <div className="seg" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
                <button className={theme === 'light' ? 'on' : ''} style={{ color: theme === 'light' ? undefined : 'var(--text-muted)' }} onClick={() => setTheme('light')}>
                  Claro
                </button>
                <button className={theme === 'dark' ? 'on' : ''} style={{ color: theme === 'dark' ? undefined : 'var(--text-muted)' }} onClick={() => setTheme('dark')}>
                  Escuro
                </button>
              </div>
            }
          />
        </div>
      </div>
      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel__head">
          <h3>Integrações</h3>
        </div>
        <div className="panel__body">
          <Row
            icon="whatsapp"
            title="WhatsApp Business"
            sub="Conectado · respostas automáticas ativas"
            right={
              <span className="badge badge--up">
                <Icon name="check" size={11} /> Ativo
              </span>
            }
          />
          <Row
            icon="calendar"
            title="Google Agenda"
            sub="Sincroniza seus compromissos"
            right={
              <span className="badge badge--up">
                <Icon name="check" size={11} /> Ativo
              </span>
            }
          />
          <Row icon="mail" title="E-mail transacional" sub="Confirmações e lembretes automáticos" right={<span className="badge badge--muted">Configurar</span>} />
        </div>
      </div>
    </div>
  );
}
