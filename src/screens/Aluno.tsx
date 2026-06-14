// Aluno.tsx — public booking flow overlay
import { useState } from 'react';
import { Icon } from '../lib/icons';
import { DATA } from '../lib/data';

export function PublicFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState<number | null>(null);
  const [name, setName] = useState('');

  const d = DATA.pubDays[day];
  const selectedTime = time != null ? DATA.pubTimes[time].t : null;

  return (
    <div className="pubscrim" onClick={onClose}>
      <div className="pub" onClick={(e) => e.stopPropagation()}>
        <div className="pub__bar">
          <Icon name="lock" size={12} />
          <span className="u">agenda.me/{DATA.instructor.handle}</span>
          <button className="iconbtn" style={{ width: 24, height: 24, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff' }} onClick={onClose}>
            <Icon name="x" size={14} />
          </button>
        </div>

        <div className="pub__head">
          <div className="avatar" style={{ width: 46, height: 46, fontSize: 17, background: 'linear-gradient(150deg,#2563EB,#1D4ED8)' }}>
            RM
          </div>
          <div style={{ flex: 1 }}>
            <h3>{DATA.instructor.name}</h3>
            <p>
              {DATA.instructor.role} · {DATA.instructor.city}
            </p>
          </div>
          <span className="badge badge--up">
            <Icon name="star" size={11} fill /> 4,9
          </span>
        </div>

        <div className="pub__body">
          <div className="steps">
            <div className={`s ${step >= 0 ? (step > 0 ? 'done' : 'on') : ''}`} />
            <div className={`s ${step >= 1 ? (step > 1 ? 'done' : 'on') : ''}`} />
            <div className={`s ${step >= 2 ? 'done' : ''}`} />
          </div>

          {step === 0 && (
            <div className="reveal">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "'Space Grotesk',sans-serif" }}>Escolha o melhor dia</div>
              <div className="dayscroll">
                {DATA.pubDays.map((pd, i) => (
                  <button
                    key={i}
                    className={`daypill ${day === i ? 'on' : ''}`}
                    onClick={() => {
                      setDay(i);
                      setTime(null);
                    }}
                  >
                    <span>{pd.d}</span>
                    <b>{pd.n}</b>
                    <span>{pd.m}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "'Space Grotesk',sans-serif" }}>Horários disponíveis</div>
              <div className="timegrid">
                {DATA.pubTimes.map((pt, i) => (
                  <button key={i} className={`timeslot ${time === i ? 'on' : ''}`} disabled={pt.off} onClick={() => setTime(i)}>
                    {pt.t}
                  </button>
                ))}
              </div>
              <button className="btn btn--primary btn--block btn--lg" style={{ marginTop: 20 }} disabled={time == null} onClick={() => setStep(1)}>
                Continuar <Icon name="chevright" size={17} />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="reveal">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, fontFamily: "'Space Grotesk',sans-serif" }}>Confirme seus dados</div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label>Seu nome</label>
                <input className="input" placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label>WhatsApp</label>
                <div className="input-wrap">
                  <Icon name="whatsapp" />
                  <input className="input" placeholder="(19) 9 9999-9999" />
                </div>
              </div>
              <div className="confnote" style={{ background: 'var(--brand-soft)', borderColor: 'rgba(37,99,235,0.3)' }}>
                <Icon name="calendar" size={20} style={{ color: 'var(--brand-on-soft)' }} />
                <div>
                  <b style={{ fontSize: 13 }}>
                    {d.d}, {d.n} de junho · {selectedTime}
                  </b>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Aula prática · 1 hora · ponto de encontro combinado por WhatsApp</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setStep(0)}>
                  Voltar
                </button>
                <button className="btn btn--primary" style={{ flex: 1.6 }} onClick={() => setStep(2)}>
                  Reservar horário
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="success-ring">
                <Icon name="check" size={42} strokeWidth={2.6} />
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 700 }}>Horário reservado!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: '8px 0 4px', lineHeight: 1.5 }}>
                {name ? `${name.split(' ')[0]}, sua` : 'Sua'} aula com {DATA.instructor.first} está confirmada para
                <br />
                <b style={{ color: 'var(--text)' }}>
                  {d.d}, {d.n} de junho às {selectedTime}
                </b>
                .
              </p>
              <div className="confnote">
                <Icon name="whatsapp" size={20} style={{ color: 'var(--emerald)' }} />
                <div>
                  <b style={{ fontSize: 12.5 }}>Confirmação enviada por WhatsApp</b>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Você recebe um lembrete 2h antes da aula.</div>
                </div>
              </div>
              <div className="confnote">
                <Icon name="mail" size={20} style={{ color: 'var(--brand-on-soft)' }} />
                <div>
                  <b style={{ fontSize: 12.5 }}>E-mail de confirmação enviado</b>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Com os detalhes e opção de reagendar.</div>
                </div>
              </div>
              <button className="btn btn--ghost btn--block" style={{ marginTop: 18 }} onClick={onClose}>
                Fechar pré-visualização
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
