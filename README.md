# my nutri

**my nutri** é um workspace clínico de nutrição com dois ambientes: **Nutricionista** e **Paciente**. O produto foi desenhado com identidade própria e fluxo orientado ao atendimento, evitando reproduzir interface, textos ou código de plataformas existentes.

## O que existe nesta versão

### Workspace do nutricionista

- dashboard operacional com agenda, adesão, alertas e financeiro;
- cadastro, busca e gestão de pacientes;
- prontuário longitudinal;
- anamnese clínica editável;
- questionários e preparação para consulta na estrutura de dados;
- antropometria e evolução corporal;
- registro e classificação de exames laboratoriais;
- plano alimentar com metas de energia e macronutrientes;
- biblioteca de alimentos e cálculo por quantidade;
- modelos de planos reutilizáveis;
- receitas;
- metas terapêuticas;
- diário alimentar com reação e comentário do profissional;
- documentos e prescrições;
- agenda com consulta presencial/online e status;
- mensagens entre profissional e paciente;
- financeiro do consultório;
- relatórios de adesão e carteira;
- configurações e pontos de integração.

### Área do paciente

- painel diário;
- plano alimentar completo;
- registro do diário alimentar, incluindo foto no modo local;
- evolução de peso, medidas e hábitos;
- metas e check-ins;
- mensagens;
- documentos e prescrições compartilhadas;
- perfil e preferências da conta.

## Identidade e UX

A interface foi reconstruída como software clínico: sidebar grafite, superfícies brancas, roxo usado como cor funcional, tipografia compacta, tabelas e fluxos densos, menos elementos decorativos e mais hierarquia de informação. A antiga marca de uva foi removida e substituída por um símbolo orgânico abstrato próprio em SVG.

## Stack

- React 18
- Vite 6
- Lucide React
- Supabase JS
- PostgreSQL/Supabase para o modelo de produção
- Vercel para deploy SPA

## Modo atual

Sem variáveis Supabase configuradas, a aplicação abre em **modo demonstração** e salva os dados no `localStorage` do navegador. Isso permite validar UX e fluxos sem depender de infraestrutura externa.

A infraestrutura de banco está descrita em:

- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_clinical_platform.sql`

A segunda migração adiciona anamnese, questionários, antropometria, exames, metas, check-ins, prontuário, documentos, prescrições, mensagens, financeiro, modelos, biblioteca de alimentos e receitas, com políticas RLS.

## Conectar Supabase

Crie um arquivo `.env.local`:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

Aplique as migrations na ordem e então substitua progressivamente o repositório local de demonstração pelas operações Supabase.

> Importante: apenas adicionar as variáveis não migra automaticamente os dados locais nem transforma integrações externas em serviços ativos. Autenticação real, storage de fotos/documentos, Google Calendar, videochamada, mensageria externa e outros provedores exigem configuração/credenciais próprias.

## Executar

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Acessos de demonstração

- Nutricionista: `nutri@mynutri.app`
- Paciente: `lucas@mynutri.app`
- Senha: qualquer valor no modo demonstração

## Qualidade

O repositório possui workflow de CI para instalar dependências e executar o build em pull requests e em pushes para `main`.
