# CLAUDE.md — guia do projeto para agentes e desenvolvedores

> Leia este arquivo antes de começar. Ele dá o contexto que o `README.md` não dá:
> **o que já existe, o que é só mock, e por onde seguir.**

## 🎯 O que é este projeto

SaaS **multi-tenant** para **instrutores de trânsito autônomos** gerenciarem Marketing, Vendas (CRM) e
Gestão num só lugar. Visão completa do produto e dos 3 módulos: ver `README.md`.

**Estado atual:** é um **protótipo de front-end com dados fictícios (mock)**. Foi portado fielmente de um
handoff do Claude Design para uma base real em React + TypeScript + Vite. **Não há backend, autenticação,
persistência nem integrações reais ainda.** A partir daqui o trabalho é virar produto.

## 🧱 Stack

- React 18 + TypeScript (strict)
- Vite 5 (dev server + build)
- CSS puro com design tokens (CSS custom properties) — **sem** Tailwind/styled-components
- Tipografia: Space Grotesk (títulos/números) + Plus Jakarta Sans (corpo)
- Docker (multi-stage Vite → nginx) + docker-compose

## ▶️ Comandos

```bash
npm install          # instalar dependências
npm run dev          # dev server com hot-reload → http://localhost:5173
npm run build        # type-check (tsc) + build de produção em dist/
npm run preview      # servir o build de produção
```

Docker: `docker compose up --build` (prod → :8080) ou `docker compose --profile dev up` (dev → :5173).

**Antes de commitar, rode `npm run build`** — ele faz o type-check completo. O projeto compila limpo hoje;
mantenha assim.

## 🗂️ Estrutura

```
src/
  App.tsx          # shell, barra de controle (chrome do protótipo), roteamento, tweaks
  main.tsx         # entry point
  lib/
    icons.tsx      # ícones SVG (Icon name="..."); adicione novos no objeto PATHS
    data.ts        # TODOS os dados mock, já tipados (PT-BR) — é daqui que tudo vem hoje
  components/
    ui.tsx         # Avatar, Stars, Ring, AdMock, Spark, SrcBadge
    frames.tsx     # FitStage + MacBook + IPhone (chrome do protótipo)
    ios-frame.tsx  # moldura iOS (chrome do protótipo)
    tweaks.tsx     # painel de tweaks + hook useTweaks
  screens/         # Login, Dashboard, Marketing, Vendas, Gestao, Aluno, Settings
  styles/          # base.css (tokens + chrome), app.css (telas), tweaks.css
```

## ⚠️ Mock vs. produto — leia com atenção

1. **"Chrome de protótipo"** (a barra superior, a moldura MacBook/iPhone, o `FitStage`, o painel de tweaks):
   é andaime de demonstração, **não** faz parte do produto. O app real é só o que está **dentro** de `.app`
   (`Shell` + telas). O toggle "Mobile" hoje é **cosmético** — renderiza o mesmo app dentro de uma moldura
   de iPhone no desktop; **não é um app mobile de verdade**.
2. **Dados** vêm 100% de `src/lib/data.ts`. Não há fetch, mutação ou persistência (exceto o estado dos
   tweaks, salvo em `localStorage`).
3. **Roteamento** é um `switch` em `App.tsx`/`Shell`, não um router. Trocar por um router real é um dos
   primeiros passos.

## 🧭 Convenções de código

- Componentes funcionais, um por arquivo principal; nomes em PascalCase.
- Mantenha o **strict TypeScript**: sem `any`, sem variáveis/imports não usados (o build falha).
- **Não invente um novo design system.** Reutilize as classes e os tokens existentes
  (`var(--brand)`, `.btn`, `.card`, `.panel`, etc.). Cores via tokens, não hex solto.
- Texto da UI em **pt-BR**.
- Ícones: use `<Icon name="..." />`; adicione novos paths em `src/lib/icons.tsx`.

## 🛣️ Roadmap sugerido (por onde seguir)

Ordem pragmática para transformar o mock em produto:

1. **Fundação do front** — adicionar router (ex.: React Router), camada de data-fetching
   (ex.: TanStack Query) e separar `data.ts` em uma camada de "API client" (hoje retorna mock; depois aponta
   pro backend real).
2. **Backend + multi-tenancy** — API, banco, isolamento por tenant (cada instrutor), **autenticação**
   (a tela de Login hoje é fake: `onLogin` só seta `authed=true`).
3. **Módulo Vendas/CRM** — integração WhatsApp Business API, chatbot de qualificação, persistir o Kanban.
4. **Módulo Gestão** — agenda real, link público funcional, jobs de confirmação + lembrete 24h.
5. **Módulo Marketing** — biblioteca de criativos persistida, geração/exportação, histórico.
6. **Mobile** — recomendação: manter **uma base React (web) + Capacitor** para empacotar iOS/Android com
   push nativo (essencial para o alerta de lead). Alternativa: PWA. Evitar React Native a menos que queira
   manter 2 UIs.

> Decisões ainda não tomadas (stack de backend, banco, provedor de WhatsApp). **Confirme com o time/usuário
> antes de escolher** — não assuma.

## 🌿 Fluxo de trabalho (git)

Modelo de branches (já criado no remoto):

- **`main`** — estável / release. **Ninguém commita nem dá merge direto aqui.**
- **`develop`** — linha de integração. É daqui que saem as features e é para cá que voltam (via PR).
- **`feat/<nome-ou-tarefa>`** — branch de trabalho. **Cada pessoa na sua própria branch** (ex.: já existe
  `feat/eduardo`; o colega cria `feat/<nome-dele>`). Nunca dois devs na mesma branch.

Ciclo de uma tarefa:

```bash
git checkout develop && git pull        # partir do develop atualizado
git checkout -b feat/minha-tarefa       # sua branch
# ... código ...
npm run build                           # type-check tem que passar
git commit -m "feat: ..."               # Conventional Commits (feat/fix/chore/docs/refactor)
git push -u origin feat/minha-tarefa
# abrir Pull Request: feat/minha-tarefa -> develop
```

- Commits pequenos, descritivos, no padrão **Conventional Commits**.
- Sincronize com frequência (`git pull origin develop`) para evitar conflitos grandes.
- `_handoff/` e `handoff.tar.gz` (referência de design original) **não** estão no git — peça ao time se
  precisar deles.
