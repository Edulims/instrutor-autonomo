// Dashboard.tsx
import { Icon } from '../lib/icons';
import { Avatar, Ring, Spark, SrcBadge } from '../components/ui';
import { DATA, type Metric } from '../lib/data';

function MetricCard({ m, i }: { m: Metric; i: number }) {
  return (
    <div className="metric reveal" style={{ animationDelay: `${i * 70}ms` }}>
      <div className="metric__top">
        <div className={`metric__ico ico-${m.tone}`}>
          <Icon name={m.icon} size={20} />
        </div>
        {m.delta && (
          <span className={`badge ${m.up === true ? 'badge--up' : m.up === false ? 'badge--down' : 'badge--amber'}`}>
            {m.up === true && <Icon name="trendup" size={12} />}
            {m.delta}
          </span>
        )}
      </div>
      <div className="metric__label">{m.label}</div>
      {m.ring ? (
        <div className="ring-wrap" style={{ marginTop: 8 }}>
          <Ring value={Number(m.value)} size={72} stroke={8} />
          <div className="metric__sub" style={{ marginTop: 0 }}>
            {m.sub}
          </div>
        </div>
      ) : (
        <>
          <div className="metric__val num">{m.value}</div>
          <div className="metric__sub">{m.sub}</div>
          {m.spark && <Spark data={m.spark} />}
        </>
      )}
    </div>
  );
}

export function Dashboard({ mobile, goTo }: { mobile: boolean; goTo: (id: string) => void }) {
  return (
    <div>
      {!mobile && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Bom dia, {DATA.instructor.first} 👋</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginTop: 5 }}>Terça, 10 de junho · você tem 7 aulas e 3 leads esperando resposta.</p>
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn--ghost btn--sm" onClick={() => goTo('gestao')}>
            <Icon name="calendar" size={16} /> Ver agenda
          </button>
          <button className="btn btn--primary btn--sm" style={{ marginLeft: 8 }} onClick={() => goTo('vendas')}>
            <Icon name="zap" size={16} /> Atender leads
          </button>
        </div>
      )}

      <div className="metrics">
        {DATA.metrics.map((m, i) => (
          <MetricCard key={m.id} m={m} i={i} />
        ))}
      </div>

      <div className="grid2">
        <div className="panel reveal" style={{ animationDelay: '300ms' }}>
          <div className="panel__head">
            <h3>Aulas de hoje</h3>
            <button className="lk" onClick={() => goTo('gestao')}>
              Abrir agenda →
            </button>
          </div>
          <div className="panel__body" style={{ paddingTop: 6, paddingBottom: 6 }}>
            {DATA.todayClasses.map((c, i) => (
              <div className="tline" key={i}>
                <div className="tline__time num">
                  {c.time}
                  <small>{c.dur}</small>
                </div>
                <div className="tline__bar" style={{ background: c.tone }} />
                <div className="tline__body">
                  <b>{c.name}</b>
                  <span>{c.kind}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel reveal" style={{ animationDelay: '380ms' }}>
          <div className="panel__head">
            <h3>Leads recentes</h3>
            <span className="badge badge--up">
              <span className="num">+3 novos</span>
            </span>
          </div>
          <div className="panel__body" style={{ paddingTop: 6, paddingBottom: 6 }}>
            {DATA.recentLeads.map((l, i) => (
              <div className="leadrow" key={i}>
                <Avatar name={l.name} size={36} />
                <div className="leadrow__txt">
                  <b>{l.name}</b>
                  <span>{l.when}</span>
                </div>
                <SrcBadge src={l.src} />
              </div>
            ))}
            <button className="btn btn--ghost btn--sm btn--block" style={{ marginTop: 12 }} onClick={() => goTo('vendas')}>
              Ver funil de vendas <Icon name="chevright" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
