# my nutri

Aplicativo web responsivo de acompanhamento nutricional com dois perfis: **Nutricionista** e **Paciente**.

## Funcionalidades

- Login por perfil (modo demo pronto para uso imediato)
- Dashboard profissional
- Cadastro e busca de pacientes
- Prontuário e observações clínicas
- Peso atual, meta e IMC
- Plano alimentar por paciente
- Inclusão de refeições
- Dashboard do paciente
- Acompanhamento de água, passos, sono e adesão
- Registro e evolução de peso
- Layout responsivo para desktop e celular
- Persistência local para demo sem backend
- Schema completo para Supabase com RLS
- Configuração pronta para deploy no Vercel

## Stack

- React 18
- Vite
- Lucide React
- Supabase (schema em `supabase/migrations/001_initial_schema.sql`)
- Vercel

## Rodar localmente

```bash
npm install
npm run dev
```

## Acessos de demonstração

Na tela inicial selecione um perfil. Qualquer senha funciona no modo demo.

- Nutricionista: `nutri@mynutri.app`
- Paciente: `lucas@mynutri.app`

## Banco de dados

Execute `supabase/migrations/001_initial_schema.sql` no SQL Editor do Supabase para criar as tabelas e políticas de segurança.

O schema inclui:

- profiles
- nutritionists
- patients
- meal_plans
- meals
- meal_items
- progress_entries
- food_diary
- appointments
- RLS para separar acesso entre nutricionista e paciente

## Deploy Vercel

Importe o repositório no Vercel. O projeto usa Vite e já contém `vercel.json` para fallback SPA.

## Observação

A versão atual funciona imediatamente em modo demo com dados persistidos no navegador. O schema Supabase já está preparado para substituir a persistência local por autenticação e dados reais na próxima etapa de integração de produção.
