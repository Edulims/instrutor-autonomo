// App.tsx — root shell, control bar, routing
import { useState, type CSSProperties } from 'react';
import { Icon, type IconName } from './lib/icons';
import { DATA } from './lib/data';
import { Avatar } from './components/ui';
import { FitStage, MacBook, IPhone } from './components/frames';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio } from './components/tweaks';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { Marketing } from './screens/Marketing';
import { Vendas } from './screens/Vendas';
import { Gestao } from './screens/Gestao';
import { PublicFlow } from './screens/Aluno';
import { Settings } from './screens/Settings';

type Theme = 'light' | 'dark';
type Device = 'desktop' | 'mobile';

interface NavEntry {
  id: string;
  label: string;
  icon: IconName;
  group: number;
  badge?: string;
}

const NAV: NavEntry[] = [
  { id: 'dashboard', label: 'Início', icon: 'dashboard', group: 0 },
  { id: 'marketing', label: 'Marketing', icon: 'megaphone', group: 1 },
  { id: 'vendas', label: 'Vendas', icon: 'target', group: 1, badge: '3' },
  { id: 'gestao', label: 'Gestão', icon: 'calendar', group: 1 },
  { id: 'config', label: 'Configurações', icon: 'settings', group: 2 },
];
const TITLES: Record<string, { t: string; c: string }> = {
  dashboard: { t: 'Painel central', c: 'Visão geral do seu mês' },
  marketing: { t: 'Marketing & Criativos', c: 'Biblioteca de anúncios prontos' },
  vendas: { t: 'Vendas & Funil', c: 'Seus leads em cada etapa' },
  gestao: { t: 'Gestão & Agenda', c: 'Disponibilidade e compromissos' },
  config: { t: 'Configurações', c: 'Conta, marca e integrações' },
};
const MOBILE_TABS = ['dashboard', 'marketing', 'vendas', 'gestao'];

function navBtn(n: NavEntry, nav: string, setNav: (id: string) => void) {
  return (
    <button key={n.id} className={`navitem ${nav === n.id ? 'on' : ''}`} onClick={() => setNav(n.id)}>
      <Icon name={n.icon} size={19} fill={nav === n.id} />
      {n.label}
      {n.badge && <span className="nv-badge num">{n.badge}</span>}
    </button>
  );
}

function Shell({
  theme,
  setTheme,
  device,
  nav,
  setNav,
  openPublic,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  device: Device;
  nav: string;
  setNav: (id: string) => void;
  openPublic: () => void;
}) {
  const mobile = device === 'mobile';
  const screen = (() => {
    switch (nav) {
      case 'dashboard':
        return <Dashboard mobile={mobile} goTo={setNav} />;
      case 'marketing':
        return <Marketing mobile={mobile} />;
      case 'vendas':
        return <Vendas mobile={mobile} />;
      case 'gestao':
        return <Gestao mobile={mobile} onOpenPublic={openPublic} />;
      case 'config':
        return <Settings theme={theme} setTheme={setTheme} />;
      default:
        return null;
    }
  })();
  const meta = TITLES[nav];

  if (mobile) {
    return (
      <>
        <div className="app__main">
          <div className="mhead">
            <h1>{meta.t}</h1>
            <div className="grow" />
            <button className="iconbtn">
              <Icon name="search" size={18} />
            </button>
            <button className="iconbtn">
              <span className="dot" />
              <Icon name="bell" size={18} />
            </button>
          </div>
          <div className="app__scroll" key={nav}>
            {screen}
          </div>
        </div>
        <div className="bottomtab">
          {MOBILE_TABS.map((id) => {
            const n = NAV.find((x) => x.id === id)!;
            return (
              <button key={id} className={`tabbtn ${nav === id ? 'on' : ''}`} onClick={() => setNav(id)} style={{ position: 'relative' }}>
                <Icon name={n.icon} size={22} fill={nav === id} />
                {n.label}
                {n.badge && <span style={{ position: 'absolute', top: 4, right: '26%', width: 7, height: 7, borderRadius: 999, background: 'var(--amber)' }} />}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="app__sidebar">
        <div className="brandrow">
          <div className="brandrow__mark">
            <Icon name="car" size={20} style={{ color: '#fff' }} />
          </div>
          <div className="brandrow__txt">
            <b>Instrutores</b>
            <span>Plataforma de Trânsito</span>
          </div>
        </div>
        <div className="navlabel">Início</div>
        {NAV.filter((n) => n.group === 0).map((n) => navBtn(n, nav, setNav))}
        <div className="navlabel">Operação</div>
        {NAV.filter((n) => n.group === 1).map((n) => navBtn(n, nav, setNav))}
        <div className="sidebar__foot">
          {NAV.filter((n) => n.group === 2).map((n) => navBtn(n, nav, setNav))}
          <div style={{ height: 10 }} />
          <button className="userchip">
            <Avatar name={DATA.instructor.name} size={34} />
            <div className="userchip__txt">
              <b>{DATA.instructor.name}</b>
              <span>{DATA.instructor.city}</span>
            </div>
            <Icon name="chevright" size={16} style={{ color: 'var(--text-dim)', marginLeft: 'auto' }} />
          </button>
        </div>
      </aside>
      <main className="app__main">
        <div className="app__head">
          <div>
            <h1>{meta.t}</h1>
            <div className="crumb">{meta.c}</div>
          </div>
          <div className="grow" />
          <div className="searchbox">
            <Icon name="search" size={16} />
            <input placeholder="Buscar aluno, lead, anúncio…" />
          </div>
          <button className="iconbtn">
            <span className="dot" />
            <Icon name="bell" size={18} />
          </button>
        </div>
        <div className="app__scroll" key={nav}>
          {screen}
        </div>
      </main>
    </>
  );
}

const SHAPES: Record<string, { card: string; ctl: string }> = {
  tecnico: { card: '4px', ctl: '4px' },
  equilibrado: { card: '12px', ctl: '8px' },
  suave: { card: '20px', ctl: '13px' },
};
const TWEAK_DEFAULTS = {
  brand: '#2563EB',
  density: 'confortavel',
  shape: 'equilibrado',
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useState<Theme>('dark');
  const [device, setDevice] = useState<Device>('desktop');
  const [authed, setAuthed] = useState(false);
  const [nav, setNav] = useState('dashboard');
  const [publicOpen, setPublicOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const mobile = device === 'mobile';
  const shape = SHAPES[t.shape] || SHAPES.equilibrado;

  const appInner = (
    <div
      className={`app ${mobile ? 'is-mobile' : ''}`}
      data-theme={theme}
      data-density={t.density}
      style={{ '--brand': t.brand, '--r-card': shape.card, '--r-ctl': shape.ctl } as CSSProperties}
    >
      {authed ? (
        <Shell theme={theme} setTheme={setTheme} device={device} nav={nav} setNav={setNav} openPublic={() => setPublicOpen(true)} />
      ) : (
        <Login mobile={mobile} onLogin={() => setAuthed(true)} />
      )}
      {publicOpen && <PublicFlow onClose={() => setPublicOpen(false)} />}
    </div>
  );

  return (
    <div className="stage">
      <div className="topbar">
        <div className="topbar__brand">
          <div className="topbar__logo">
            <Icon name="car" size={19} style={{ color: '#fff' }} />
          </div>
          <div className="topbar__name">
            Instrutores Autônomos de Trânsito<small>Protótipo SaaS · Web + Mobile PWA</small>
          </div>
        </div>
        <div className="topbar__spacer" />

        <div className="seg brandseg">
          <button className={device === 'desktop' ? 'on' : ''} onClick={() => setDevice('desktop')}>
            <Icon name="monitor" size={15} /> Desktop
          </button>
          <button className={device === 'mobile' ? 'on' : ''} onClick={() => setDevice('mobile')}>
            <Icon name="smartphone" size={15} /> Mobile
          </button>
        </div>
        <div className="seg">
          <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>
            <Icon name="sun" size={15} /> Claro
          </button>
          <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>
            <Icon name="moon" size={15} /> Escuro
          </button>
        </div>
        <button className={`twk-trigger ${tweaksOpen ? 'on' : ''}`} onClick={() => setTweaksOpen((o) => !o)} title="Ajustar a personalidade do produto">
          <Icon name="sliders" size={15} /> Tweaks
        </button>
        {authed && (
          <button
            className="iconbtn"
            title="Sair"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#9AA7BD' }}
            onClick={() => {
              setAuthed(false);
              setNav('dashboard');
            }}
          >
            <Icon name="logout" size={17} />
          </button>
        )}
      </div>

      {mobile ? (
        <FitStage frameW={402} frameH={874}>
          <IPhone>{appInner}</IPhone>
        </FitStage>
      ) : (
        <FitStage frameW={1520} frameH={910}>
          <MacBook>{appInner}</MacBook>
        </FitStage>
      )}

      <TweaksPanel title="Tweaks" open={tweaksOpen} onClose={() => setTweaksOpen(false)}>
        <TweakSection label="Identidade" />
        <TweakColor label="Cor da marca" value={t.brand} options={['#2563EB', '#7C3AED', '#059669', '#E11D48']} onChange={(v) => setTweak('brand', v)} />
        <TweakSection label="Composição" />
        <TweakRadio
          label="Densidade"
          value={t.density}
          options={[
            { value: 'compacto', label: 'Compacto' },
            { value: 'confortavel', label: 'Padrão' },
            { value: 'espacoso', label: 'Amplo' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakRadio
          label="Forma das bordas"
          value={t.shape}
          options={[
            { value: 'tecnico', label: 'Técnico' },
            { value: 'equilibrado', label: 'Padrão' },
            { value: 'suave', label: 'Suave' },
          ]}
          onChange={(v) => setTweak('shape', v)}
        />
      </TweaksPanel>
    </div>
  );
}
