# 🚗 Plataforma SaaS — Instrutores Autônomos de Trânsito

Plataforma **centralizada e multi-tenant** desenvolvida para que instrutores de trânsito autônomos
gerenciem **Marketing, Vendas e Gestão** em um único ambiente integrado — permitindo captar alunos,
automatizar atendimentos, organizar a agenda e aumentar significativamente sua produtividade diária.

---

## 📌 Visão geral

Com a flexibilização da obrigatoriedade das autoescolas tradicionais, mais de **170 mil instrutores
credenciados no DETRAN** passaram a operar como microempresários autônomos. O maior gargalo desse
profissional é o **"tempo de volante"**: enquanto ministra aulas práticas, ele não consegue responder novos
leads no WhatsApp — e poucos minutos de demora significam perder o aluno para a concorrência.

Esta plataforma resolve as **três grandes dores** desse profissional em um só lugar, deixando a tecnologia
trabalhar nos bastidores enquanto ele foca no que faz de melhor:

| Pilar | Dor que resolve | O que entrega |
| --- | --- | --- |
| 📣 **Marketing** | Atração de alunos | Biblioteca de criativos prontos, filtráveis por mês/campanha, com gaveta de personalização (logo, cor da marca, copy editável e preview ao vivo). |
| 🎯 **Vendas** | Conversão de leads | Funil Kanban de 4 etapas, alerta flutuante de oportunidades no WhatsApp e histórico de conversas. |
| 📅 **Gestão** | Organização da rotina | Agenda de disponibilidade (livre / agendada / bloqueada), link público de agendamento e fluxo completo do aluno (escolher horário → reservar → confirmação automática por WhatsApp + e-mail). |

> **Multi-tenant:** cada instrutor é um *tenant* independente, com sua própria marca, agenda, funil de
> vendas e link público de agendamento (`agenda.me/seu-nome`). A persona usada neste protótipo é
> **Ricardo Mendes**, instrutor credenciado em Campinas-SP.

---

## 🧩 Módulos do sistema

O sistema é dividido em três pilares operacionais fundamentais.

### 1. 📣 Módulo de Marketing
**Objetivo:** disponibilizar campanhas validadas para os instrutores impulsionarem suas captações locais.

- Biblioteca completa de criativos prontos para anúncios.
- Filtros inteligentes por mês e por tipo de campanha.
- Painel de customização de marca (personalização de logo, cores e campos de texto editáveis).
- Mecanismo para solicitação de ajustes e histórico de campanhas utilizadas.

### 2. 🎯 Módulo de Vendas (CRM)
**Objetivo:** automatizar o funil de atendimento e organizar novas oportunidades de negócios.

- Integração direta com o WhatsApp para centralização de leads.
- Fluxo de atendimento automatizado (chatbot de qualificação).
- Pipeline de vendas em formato Kanban (CRM) com alertas de novas oportunidades.
- Histórico completo de conversas para auditoria e acompanhamento.

### 3. 📅 Módulo de Gestão Operacional
**Objetivo:** organizar a agenda de aulas práticas e o progresso dos alunos cadastrados.

- Agenda integrada do instrutor com controle rigoroso de disponibilidade.
- Gerador de link público de agendamento para o próprio aluno escolher seu horário.
- Disparos automáticos de confirmação de aulas e lembretes com 24 horas de antecedência.
- Controle de presença digital e painel facilitado para reagendamentos manuais.

---

## ✨ Funcionalidades da interface

- **5 telas + Login + fluxo público do aluno**, todas navegáveis: Painel central, Marketing, Vendas,
  Gestão e Configurações.
- **Barra de controle** com alternância em tempo real:
  - **Desktop (MacBook) ↔ Mobile (iPhone PWA)**
  - **Tema Claro ↔ Escuro** (padrão: Escuro / Desktop)
- **Painel de Tweaks** (botão na barra superior) com três controles que mudam a *personalidade* do produto,
  não apenas pixels — e as escolhas ficam salvas no `localStorage`:
  - **Identidade** — cor da marca, cascateada a partir de uma única variável `--brand`.
  - **Densidade** — Compacto → Padrão → Amplo.
  - **Forma das bordas** — Técnico (4px) → Padrão → Suave (20px).
- Animações de entrada e micro-interações (reveals escalonados, slide da gaveta, toast do WhatsApp,
  pop de sucesso) que respeitam `prefers-reduced-motion`.

---

## 🛠️ Tecnologias

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vite.dev/)
- CSS puro com **design tokens** (CSS custom properties) e tipografia **Space Grotesk** + **Plus Jakarta Sans**
- Empacotamento de produção com **Docker** (multi-stage) servido por **nginx**

---

## 🚀 Como executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 20+ **e/ou** [Docker](https://www.docker.com/) com Docker Compose

### Opção 1 — Localmente (Node.js)

```bash
# 1. Instalar dependências
npm install

# 2. Subir o servidor de desenvolvimento (com hot-reload)
npm run dev
```

Acesse **http://localhost:5173**.

Outros comandos úteis:

```bash
npm run build    # type-check (tsc) + build de produção em dist/
npm run preview  # serve o build de produção localmente
```

### Opção 2 — Com Docker

Build de produção (multi-stage: Vite → nginx):

```bash
docker compose up --build
```

Acesse **http://localhost:8080**.

Servidor de desenvolvimento com hot-reload **dentro do container**:

```bash
docker compose --profile dev up
```

Acesse **http://localhost:5173**.

Ou usando apenas o Docker, sem Compose:

```bash
docker build -t instrutores-autonomos-transito .
docker run --rm -p 8080:80 instrutores-autonomos-transito
```

---

## 🧭 Como navegar no protótipo

1. Na tela de **Login**, clique em **Entrar** (ou *Criar acesso gratuito*) para acessar a plataforma.
2. Use a **barra superior** para alternar entre Desktop/Mobile e Claro/Escuro.
3. Explore os módulos:
   - **Marketing** → clique em **Personalizar** num criativo para abrir a gaveta com preview ao vivo.
   - **Vendas** → aguarde ~1s pelo **toast de oportunidade do WhatsApp**.
   - **Gestão** → clique em **"Ver como o aluno vê"** para percorrer o fluxo público de agendamento até a confirmação.
4. Abra o painel **Tweaks** e mude cor da marca, densidade e forma das bordas para ver tudo recompor.

---

## 📁 Estrutura do projeto

```
src/
  App.tsx              # shell, barra de controle, roteamento e painel de tweaks
  main.tsx             # ponto de entrada React
  lib/
    icons.tsx          # ícones SVG (estilo Lucide)
    data.ts            # dados mock tipados (PT-BR)
  components/
    ui.tsx             # Avatar, Stars, Ring, AdMock, Spark, SrcBadge
    frames.tsx         # FitStage (escala p/ viewport) + MacBook + IPhone
    ios-frame.tsx      # moldura iOS (status bar, dynamic island, home indicator)
    tweaks.tsx         # painel flutuante de tweaks + controles
  screens/
    Login.tsx  Dashboard.tsx  Marketing.tsx
    Vendas.tsx  Gestao.tsx  Aluno.tsx  Settings.tsx
  styles/
    base.css  app.css  tweaks.css

Dockerfile             # build multi-stage (Vite → nginx)
docker-compose.yml     # serviço de produção (web) + serviço de dev (--profile dev)
nginx.conf             # configuração nginx com fallback de SPA
```

> O bundle original do handoff de design fica em `_handoff/` apenas como referência (não é compilado nem incluído na imagem Docker).

---

## ℹ️ Nota técnica

Este protótipo foi recriado a partir de um handoff do [Claude Design](https://claude.ai/design), exportado de
um ambiente de preview que **congela animações CSS**. Como aqui o app roda em um navegador comum, as
animações de entrada e os efeitos de hover foram reativados normalmente.

> ⚠️ Os dados são **mock** (fictícios) para fins de demonstração. Não há backend nem persistência real —
> apenas o estado dos *tweaks* é salvo localmente no navegador.
