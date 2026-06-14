// Vendas.tsx
import { useEffect, useState } from 'react';
import { Icon } from '../lib/icons';
import { Avatar, SrcBadge } from '../components/ui';
import { DATA, type KanbanCard } from '../lib/data';

function KCard({ c }: { c: KanbanCard }) {
  return (
    <div className="kcard">
      <div className="kcard__top">
        <Avatar name={c.name} size={28} />
        <b>{c.name}</b>
        {c.hot && (
          <span className="kcard__src">
            <Icon name="flame" size={15} style={{ color: 'var(--amber)' }} />
          </span>
        )}
      </div>
      <p>{c.note}</p>
      <div className="kcard__foot">
        <SrcBadge src={c.src} />
        <span className="tag">{c.tag}</span>
        <span style={{ marginLeft: 'auto' }}>{c.age}</span>
      </div>
    </div>
  );
}

export function Vendas({ mobile }: { mobile: boolean }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowToast(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ height: mobile ? 'auto' : '100%', display: 'flex', flexDirection: 'column' }}>
      {showToast && (
        <div className="toast">
          <div className="toast__ico">
            <Icon name="whatsapp" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b>Nova oportunidade no WhatsApp</b>
            <p>Camila Souza quer saber o valor do pacote de 1ª habilitação.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--success btn--sm" style={{ height: 30 }}>
                Responder
              </button>
              <button className="btn btn--ghost btn--sm" style={{ height: 30 }} onClick={() => setShowToast(false)}>
                Depois
              </button>
            </div>
          </div>
          <button className="iconbtn" style={{ width: 26, height: 26, position: 'absolute', top: 8, right: 8, border: 'none', background: 'none' }} onClick={() => setShowToast(false)}>
            <Icon name="x" size={15} />
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <span className="badge badge--brand" style={{ height: 26, fontSize: 12.5 }}>
          <Icon name="target" size={13} /> 10 negócios ativos
        </span>
        <span className="badge badge--up" style={{ height: 26, fontSize: 12.5 }}>
          <Icon name="checkbig" size={13} /> R$ 2.430 fechados na semana
        </span>
        <div style={{ flex: 1 }} />
        {!mobile && (
          <button className="btn btn--ghost btn--sm">
            <Icon name="plus" size={16} /> Adicionar lead
          </button>
        )}
      </div>

      <div className="kanban">
        {DATA.kanban.map((col) => (
          <div className="kcol" key={col.id}>
            <div className="kcol__head">
              <span className="dot" style={{ background: col.color }} />
              <b>{col.title}</b>
              <span className="ct num">{col.cards.length}</span>
            </div>
            <div className="kcol__body">
              {col.cards.map((c, i) => (
                <KCard key={i} c={c} />
              ))}
              <button className="btn btn--ghost btn--sm btn--block" style={{ borderStyle: 'dashed', color: 'var(--text-muted)' }}>
                <Icon name="plus" size={15} /> Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* chat history */}
      <div className="panel" style={{ marginTop: 18 }}>
        <div className="panel__head">
          <h3>Histórico de conversas</h3>
          <span className="badge badge--up">
            <Icon name="whatsapp" size={12} /> WhatsApp integrado
          </span>
        </div>
        <div className="panel__body" style={{ padding: 8 }}>
          <div className="chatlist">
            {DATA.chats.map((c, i) => (
              <div className="chatrow" key={i}>
                <Avatar name={c.name} size={40} />
                <div className="chatrow__body">
                  <div className="chatrow__top">
                    <b>{c.name}</b>
                    <span className="t">{c.when}</span>
                  </div>
                  <p>{c.last}</p>
                </div>
                {c.unread && <span className="unread" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
