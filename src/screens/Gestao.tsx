// Gestao.tsx
import { Fragment } from 'react';
import { Icon } from '../lib/icons';
import { DATA } from '../lib/data';

export function Gestao({ mobile, onOpenPublic }: { mobile: boolean; onOpenPublic: () => void }) {
  const dayCount = mobile ? 3 : 6;
  const days = DATA.days.slice(0, dayCount);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div className="chiprow">
          <button className="chip">
            <Icon name="chevleft" size={15} />
          </button>
          <button className="chip on">Esta semana</button>
          <button className="chip">
            <Icon name="chevright" size={15} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 14, marginLeft: 6, fontSize: 12, color: 'var(--text-muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--emerald-soft)', border: '1px dashed var(--emerald)' }} /> Livre
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--brand)' }} /> Agendada
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--surface-2)', border: '1px solid var(--border)' }} /> Bloqueada
          </span>
        </div>
        <div style={{ flex: 1 }} />
        {!mobile && (
          <button className="btn btn--ghost btn--sm">
            <Icon name="snooze" size={16} /> Bloquear horário
          </button>
        )}
      </div>

      <div className="agenda">
        <div className="cal">
          <div className="cal__head">
            <h3>Junho 2026</h3>
            <span className="badge badge--brand">Cat. AB</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{mobile ? 'Toque num horário' : 'Clique num slot livre para abrir'}</span>
          </div>
          <div className="cal__grid">
            <div className="cal__dayhead" />
            {days.map((d, i) => (
              <div className={`cal__dayhead ${d.today ? 'today' : ''}`} key={i}>
                <b>{d.n}</b>
                <span>{d.d}</span>
              </div>
            ))}
            {DATA.hours.map((h, hi) => (
              <Fragment key={hi}>
                <div className="cal__hour">{h}</div>
                {days.map((_, di) => {
                  const cell = DATA.grid[hi][di];
                  return (
                    <div className="cal__cell" key={di}>
                      {cell.s === 'free' && <button className="slot slot--free">Livre</button>}
                      {cell.s === 'booked' && (
                        <button className="slot slot--booked">
                          <b>{cell.n}</b>
                          <span>{cell.k}</span>
                        </button>
                      )}
                      {cell.s === 'blocked' && <div className="slot slot--blocked">—</div>}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <div className="linkcard reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="metric__ico ico-brand" style={{ background: 'var(--brand)', color: '#fff' }}>
                <Icon name="link" size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>Link de agendamento</h3>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>O aluno escolhe o horário sozinho</span>
              </div>
            </div>
            <div className="linkbox">
              <Icon name="link" size={15} style={{ color: 'var(--text-dim)' }} />
              <code>agenda.me/{DATA.instructor.handle}</code>
              <button className="iconbtn" style={{ width: 32, height: 32, border: 'none', background: 'var(--surface)' }}>
                <Icon name="copy" size={15} />
              </button>
            </div>
            <button className="btn btn--primary btn--block" onClick={onOpenPublic}>
              <Icon name="eye" size={16} /> Ver como o aluno vê
            </button>
            <p style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '12px 0 0', lineHeight: 1.5 }}>
              Reservas caem direto na sua agenda e o aluno recebe confirmação automática por WhatsApp e e-mail.
            </p>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel__head">
              <h3 style={{ fontSize: 14.5 }}>Próximos compromissos</h3>
            </div>
            <div className="panel__body" style={{ padding: 12 }}>
              {DATA.appointments.map((a, i) => (
                <div className="apptcard" key={i}>
                  <div className="apptcard__top">
                    <span className="apptcard__time num">{a.time}</span>
                    <b>{a.name}</b>
                    <span style={{ marginLeft: 'auto' }} className={`badge ${a.status === 'confirmada' ? 'badge--up' : 'badge--amber'}`}>
                      {a.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{a.kind}</div>
                  <div className="apptcard__foot">
                    <button className="btn btn--success btn--sm" style={{ flex: 1, height: 32 }}>
                      <Icon name="check" size={14} /> Marcar presença
                    </button>
                    <button className="btn btn--ghost btn--sm" style={{ flex: 1, height: 32 }}>
                      <Icon name="snooze" size={14} /> Reagendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
