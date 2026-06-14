// data.ts — mock PT-BR domain data
import type { IconName } from './icons';

export interface Instructor {
  name: string;
  first: string;
  handle: string;
  city: string;
  role: string;
  cred: string;
  avatarColor: string;
}

export interface Metric {
  id: string;
  icon: IconName;
  tone: 'brand' | 'amber' | 'emerald';
  label: string;
  value: string | number;
  delta?: string;
  up?: boolean | null;
  sub: string;
  spark?: number[];
  ring?: boolean;
}

export interface TodayClass {
  time: string;
  dur: string;
  name: string;
  kind: string;
  tone: string;
}

export interface RecentLead {
  name: string;
  src: string;
  when: string;
  tone: string;
}

export interface Creative {
  id: number;
  name: string;
  campaign: string;
  perf: 'Alta' | 'Média' | 'Baixa';
  rating: number;
  hue: number;
  sub: string;
  tagline: string;
}

export interface KanbanCard {
  name: string;
  src: string;
  note: string;
  tag: string;
  age: string;
  hot?: boolean;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

export interface Chat {
  name: string;
  last: string;
  when: string;
  unread: boolean;
}

export interface Day {
  d: string;
  n: number;
  today: boolean;
}

export type SlotStatus = 'free' | 'booked' | 'blocked';
export interface Cell {
  s: SlotStatus;
  n?: string;
  k?: string;
}

export interface Appointment {
  time: string;
  name: string;
  kind: string;
  status: 'confirmada' | 'pendente';
}

export interface PubDay {
  d: string;
  n: number;
  m: string;
}

export interface PubTime {
  t: string;
  off: boolean;
}

const instructor: Instructor = {
  name: 'Ricardo Mendes',
  first: 'Ricardo',
  handle: 'ricardo-mendes',
  city: 'Campinas · SP',
  role: 'Instrutor credenciado DETRAN-SP',
  cred: 'Cat. AB · 12.482-7',
  avatarColor: 'linear-gradient(150deg,#2563EB,#1D4ED8)',
};

const metrics: Metric[] = [
  { id: 'leads', icon: 'megaphone', tone: 'brand', label: 'Leads do mês', value: '64', delta: '+18%', up: true, sub: 'vs. 54 em maio', spark: [4, 6, 5, 8, 7, 9, 6, 11, 9, 13, 12, 15] },
  { id: 'alunos', icon: 'users', tone: 'emerald', label: 'Alunos ativos', value: '31', delta: '92% retenção', up: true, sub: '4 concluem esta semana', spark: [20, 22, 21, 24, 25, 24, 26, 28, 27, 29, 30, 31] },
  { id: 'aulas', icon: 'car', tone: 'brand', label: 'Aulas hoje', value: '7', delta: '1 vaga livre', up: null, sub: '08:00 — 18:00 · 6 confirmadas' },
  { id: 'ocupacao', icon: 'target', tone: 'amber', label: 'Taxa de ocupação', value: 86, ring: true, sub: 'Meta da semana: 80%' },
];

const todayClasses: TodayClass[] = [
  { time: '08:00', dur: '1h', name: 'Beatriz Almeida', kind: 'Baliza · 2ª aula', tone: 'var(--brand)' },
  { time: '09:30', dur: '1h', name: 'João Vitor Reis', kind: 'Percurso urbano', tone: 'var(--brand)' },
  { time: '11:00', dur: '1h', name: 'Aula experimental — Lucas P.', kind: 'Primeiro contato', tone: 'var(--amber)' },
  { time: '14:00', dur: '1h', name: 'Marina Costa', kind: 'Rampa e garagem', tone: 'var(--brand)' },
  { time: '16:30', dur: '1h', name: 'Pedro Henrique', kind: 'Simulado de prova', tone: 'var(--emerald)' },
];

const recentLeads: RecentLead[] = [
  { name: 'Camila Souza', src: 'WhatsApp', when: 'há 4 min', tone: 'emerald' },
  { name: 'Anderson Lima', src: 'Instagram', when: 'há 22 min', tone: 'brand' },
  { name: 'Fernanda Dias', src: 'Indicação', when: 'há 1h', tone: 'amber' },
  { name: 'Rafael Moreira', src: 'WhatsApp', when: 'há 2h', tone: 'emerald' },
];

const creatives: Creative[] = [
  { id: 1, name: 'Primeira Habilitação', campaign: 'Captação · Junho', perf: 'Alta', rating: 5, hue: 214, sub: 'CTR 4,8% · 23 leads', tagline: 'Tire sua CNH sem filas' },
  { id: 2, name: 'Aulas de Baliza', campaign: 'Reforço · Junho', perf: 'Alta', rating: 5, hue: 38, sub: 'CTR 4,1% · 17 leads', tagline: 'Estacione sem medo' },
  { id: 3, name: 'Reciclagem CNH', campaign: 'Reativação · Maio', perf: 'Média', rating: 4, hue: 160, sub: 'CTR 2,9% · 9 leads', tagline: 'Volte a dirigir com segurança' },
  { id: 4, name: 'Aula Experimental Grátis', campaign: 'Captação · Junho', perf: 'Alta', rating: 5, hue: 266, sub: 'CTR 5,3% · 28 leads', tagline: 'Sua 1ª aula é por nossa conta' },
  { id: 5, name: 'Pacote 10 Aulas', campaign: 'Conversão · Maio', perf: 'Média', rating: 4, hue: 0, sub: 'CTR 3,2% · 12 leads', tagline: 'Mais aulas, mais confiança' },
  { id: 6, name: 'Habilitação para Moto', campaign: 'Captação · Junho', perf: 'Baixa', rating: 3, hue: 190, sub: 'CTR 1,9% · 5 leads', tagline: 'Cat. A com instrutor dedicado' },
];

const kanban: KanbanColumn[] = [
  { id: 'novos', title: 'Novos Leads', color: '#2563EB', cards: [
    { name: 'Camila Souza', src: 'WhatsApp', note: 'Quer tirar a primeira habilitação. Pediu valor do pacote completo.', tag: '1ª Habilitação', age: 'há 4 min', hot: true },
    { name: 'Anderson Lima', src: 'Instagram', note: 'Viu o anúncio de baliza. Tem CNH mas está inseguro.', tag: 'Aulas avulsas', age: 'há 22 min' },
    { name: 'Tiago Ferreira', src: 'WhatsApp', note: 'Indicação da Marina. Disponível à noite.', tag: '1ª Habilitação', age: 'há 1h' },
  ] },
  { id: 'contato', title: 'Contato Feito', color: '#F59E0B', cards: [
    { name: 'Fernanda Dias', src: 'WhatsApp', note: 'Respondida. Aguardando ela escolher horário pelo link.', tag: 'Reciclagem', age: 'há 3h' },
    { name: 'Rafael Moreira', src: 'WhatsApp', note: 'Enviei tabela de pacotes. Vai decidir até sexta.', tag: 'Pacote 10', age: 'ontem' },
  ] },
  { id: 'exp', title: 'Aula Experimental', color: '#8B5CF6', cards: [
    { name: 'Lucas Pereira', src: 'Indicação', note: 'Experimental marcada para hoje, 11:00.', tag: 'Hoje 11:00', age: 'há 2 dias', hot: true },
    { name: 'Júlia Nogueira', src: 'Instagram', note: 'Fez a 1ª aula, gostou. Vai fechar pacote.', tag: 'Quase lá', age: 'há 3 dias' },
  ] },
  { id: 'fechados', title: 'Fechados', color: '#10B981', cards: [
    { name: 'Marina Costa', src: 'Indicação', note: 'Pacote de 10 aulas. R$ 1.200 · pago via Pix.', tag: 'R$ 1.200', age: 'esta semana' },
    { name: 'Pedro Henrique', src: 'WhatsApp', note: 'Pacote prova + 5 aulas. Simulado hoje 16:30.', tag: 'R$ 780', age: 'esta semana' },
    { name: 'Beatriz Almeida', src: 'WhatsApp', note: 'Renovou +5 aulas de baliza.', tag: 'R$ 450', age: 'há 5 dias' },
  ] },
];

const chats: Chat[] = [
  { name: 'Camila Souza', last: 'Oi! Vi o anúncio, quanto fica o pacote completo pra primeira habilitação?', when: '4 min', unread: true },
  { name: 'Lucas Pereira', last: 'Perfeito, confirmo a experimental hoje às 11h então 👍', when: '1h', unread: true },
  { name: 'Rafael Moreira', last: 'Obrigado pela tabela! Te respondo até sexta', when: '3h', unread: false },
  { name: 'Marina Costa', last: 'Pix enviado ✅ Até quinta!', when: 'ontem', unread: false },
  { name: 'Fernanda Dias', last: 'Vou escolher um horário pelo link que você mandou', when: 'ontem', unread: false },
];

// agenda: hours x days. status: free | booked | blocked
const hours = ['08:00', '09:00', '10:00', '11:00', '14:00', '16:00'];
const days: Day[] = [
  { d: 'Seg', n: 9, today: false }, { d: 'Ter', n: 10, today: true }, { d: 'Qua', n: 11, today: false },
  { d: 'Qui', n: 12, today: false }, { d: 'Sex', n: 13, today: false }, { d: 'Sáb', n: 14, today: false },
];
// grid[hourIdx][dayIdx]
const grid: Cell[][] = [
  [{ s: 'booked', n: 'B. Almeida', k: 'Baliza' }, { s: 'booked', n: 'B. Almeida', k: 'Baliza' }, { s: 'free' }, { s: 'booked', n: 'M. Costa', k: 'Rampa' }, { s: 'free' }, { s: 'blocked' }],
  [{ s: 'booked', n: 'J. Vitor', k: 'Urbano' }, { s: 'free' }, { s: 'booked', n: 'A. Souza', k: 'Percurso' }, { s: 'free' }, { s: 'booked', n: 'C. Lima', k: 'Baliza' }, { s: 'blocked' }],
  [{ s: 'free' }, { s: 'free' }, { s: 'free' }, { s: 'free' }, { s: 'free' }, { s: 'blocked' }],
  [{ s: 'free' }, { s: 'booked', n: 'Lucas P.', k: 'Experim.' }, { s: 'free' }, { s: 'booked', n: 'R. Dias', k: 'Urbano' }, { s: 'free' }, { s: 'blocked' }],
  [{ s: 'booked', n: 'M. Costa', k: 'Garagem' }, { s: 'free' }, { s: 'booked', n: 'T. Reis', k: 'Prova' }, { s: 'free' }, { s: 'free' }, { s: 'blocked' }],
  [{ s: 'booked', n: 'P. Henrique', k: 'Simulado' }, { s: 'free' }, { s: 'free' }, { s: 'booked', n: 'J. Nog.', k: 'Baliza' }, { s: 'blocked' }, { s: 'blocked' }],
];

const appointments: Appointment[] = [
  { time: '08:00', name: 'Beatriz Almeida', kind: 'Baliza · 2ª aula', status: 'confirmada' },
  { time: '09:30', name: 'João Vitor Reis', kind: 'Percurso urbano', status: 'confirmada' },
  { time: '11:00', name: 'Lucas Pereira', kind: 'Aula experimental', status: 'pendente' },
  { time: '14:00', name: 'Marina Costa', kind: 'Rampa e garagem', status: 'confirmada' },
];

// public student booking
const pubDays: PubDay[] = [
  { d: 'Qua', n: 11, m: 'jun' }, { d: 'Qui', n: 12, m: 'jun' }, { d: 'Sex', n: 13, m: 'jun' },
  { d: 'Sáb', n: 14, m: 'jun' }, { d: 'Seg', n: 16, m: 'jun' }, { d: 'Ter', n: 17, m: 'jun' },
];
const pubTimes: PubTime[] = [
  { t: '08:00', off: false }, { t: '09:00', off: true }, { t: '10:00', off: false },
  { t: '11:00', off: false }, { t: '14:00', off: false }, { t: '15:00', off: true },
  { t: '16:00', off: false }, { t: '17:00', off: false }, { t: '18:00', off: false },
];

export const DATA = {
  instructor, metrics, todayClasses, recentLeads, creatives, kanban, chats,
  hours, days, grid, appointments, pubDays, pubTimes,
};
