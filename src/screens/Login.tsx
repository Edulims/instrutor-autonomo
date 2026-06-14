// Login.tsx
import { useState } from 'react';
import { Icon } from '../lib/icons';
import { Ring } from '../components/ui';

export function Login({ onLogin, mobile }: { onLogin: () => void; mobile: boolean }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('ricardo@autoescola.me');
  const [pass, setPass] = useState('demo1234');

  return (
    <div className="login">
      <div className="login__form">
        <div className="login__brand">
          <div className="topbar__logo" style={{ width: 40, height: 40 }}>
            <Icon name="car" size={22} style={{ color: '#fff' }} />
          </div>
          <div className="brandrow__txt">
            <b style={{ fontSize: 15 }}>Instrutores Autônomos</b>
            <span>Plataforma de Trânsito</span>
          </div>
        </div>

        <h2>Bem-vindo de volta.</h2>
        <p className="sub">Sua agenda, seus leads e seus anúncios em um só lugar — enquanto você foca no volante.</p>

        <div className="field">
          <label>E-mail</label>
          <div className="input-wrap">
            <Icon name="mail" />
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
        </div>
        <div className="field">
          <label>Senha</label>
          <div className="input-wrap">
            <Icon name="lock" />
            <input className="input" type={show ? 'text' : 'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
            <button className="eye" onClick={() => setShow((s) => !s)} aria-label="mostrar senha">
              <Icon name={show ? 'eyeoff' : 'eye'} size={17} />
            </button>
          </div>
        </div>

        <div className="row">
          <label className="checkrow">
            <input type="checkbox" defaultChecked /> Manter conectado
          </label>
          <button className="link">Esqueci minha senha</button>
        </div>

        <button className="btn btn--primary btn--lg btn--block" onClick={onLogin}>
          Entrar <Icon name="chevright" size={17} />
        </button>

        <div className="login__foot">
          Ainda não tem conta?{' '}
          <button className="link" onClick={onLogin}>
            Criar acesso gratuito
          </button>
        </div>
      </div>

      {!mobile && (
        <div className="login__aside">
          <div>
            <span className="badge badge--amber" style={{ background: 'rgba(245,158,11,0.18)', color: '#FBBF5A' }}>
              <Icon name="flame" size={12} /> Tempo de volante recuperado
            </span>
            <h3 style={{ marginTop: 18 }}>Enquanto você dá aula, a plataforma atende seus leads.</h3>
            <p className="lead">Responda no WhatsApp, organize a agenda e publique anúncios sem sair do carro. Tudo automático nos bastidores.</p>
          </div>

          <div className="previewcard">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Ring value={86} size={56} stroke={7} />
              <div>
                <div style={{ fontSize: 12, color: '#8DA0BE', fontWeight: 600 }}>Ocupação da semana</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, color: '#fff', marginTop: 2 }}>Acima da meta de 80%</div>
              </div>
            </div>
            <div className="statgrid">
              <div className="ministat">
                <div className="l">Leads do mês</div>
                <div className="v">64</div>
              </div>
              <div className="ministat">
                <div className="l">Alunos ativos</div>
                <div className="v">31</div>
              </div>
              <div className="ministat">
                <div className="l">Aulas hoje</div>
                <div className="v">7</div>
              </div>
              <div className="ministat">
                <div className="l">Resposta média</div>
                <div className="v" style={{ color: '#4FD6A8' }}>
                  2min
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#7C8AA3', fontSize: 12.5 }}>
            <Icon name="users" size={16} />
            <span>
              Mais de <b style={{ color: '#C9D5E8' }}>170 mil instrutores</b> credenciados podem se tornar autônomos.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
