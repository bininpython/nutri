import React, { useEffect, useMemo, useState } from 'react'
import {
  Activity, Apple, BarChart3, CalendarDays, ChevronRight, ClipboardList,
  Droplets, Grape, Home, LogOut, Plus, Search, Settings, Target,
  UserRound, UsersRound, Utensils, Weight
} from 'lucide-react'

const seed = {
  professionals: [{ id: 'nutri-1', name: 'Dra. Mariana Silva', crn: 'CRN 9-12345', email: 'nutri@mynutri.app' }],
  patients: [
    { id: 'p1', professionalId: 'nutri-1', name: 'Lucas Andrade', email: 'lucas@mynutri.app', age: 29, goal: 'Emagrecimento', weight: 82.4, targetWeight: 75, height: 178, status: 'Ativo', next: '29/08/2026', notes: 'Evitar lactose em excesso. Treina 4x/semana.' },
    { id: 'p2', professionalId: 'nutri-1', name: 'Ana Paula', email: 'ana@mynutri.app', age: 35, goal: 'Reeducação alimentar', weight: 68.1, targetWeight: 64, height: 165, status: 'Ativo', next: '02/09/2026', notes: 'Rotina de trabalho em turnos.' },
  ],
  meals: {
    p1: [
      { id: 'm1', time: '07:30', title: 'Café da manhã', foods: 'Iogurte natural + aveia + banana + chia', kcal: 420 },
      { id: 'm2', time: '12:30', title: 'Almoço', foods: 'Arroz integral + feijão + frango grelhado + salada', kcal: 620 },
      { id: 'm3', time: '16:30', title: 'Lanche', foods: 'Fruta + castanhas', kcal: 240 },
      { id: 'm4', time: '20:00', title: 'Jantar', foods: 'Batata doce + peixe + legumes', kcal: 500 },
    ]
  },
  progress: {
    p1: [{ date: '01/08', weight: 84.8 }, { date: '08/08', weight: 84 }, { date: '15/08', weight: 83.1 }, { date: '22/08', weight: 82.4 }]
  },
  habits: { p1: { water: 1.8, waterGoal: 2.5, steps: 6840, sleep: 7.2, adherence: 86 } }
}

const STORAGE_KEY = 'my-nutri-data-v1'
const SESSION_KEY = 'my-nutri-session-v1'

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seed } catch { return seed }
}

function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }

function Logo({ compact = false }) {
  return <div className="logo"><span className="logoMark"><Grape size={compact ? 20 : 27} /></span>{!compact && <strong>my nutri</strong>}</div>
}

function Login({ onLogin }) {
  const [role, setRole] = useState('nutritionist')
  const [email, setEmail] = useState('nutri@mynutri.app')
  const submit = (e) => { e.preventDefault(); onLogin({ role, email: email.trim() || 'usuario@mynutri.app' }) }
  return <main className="loginPage">
    <section className="loginBrand">
      <Logo />
      <div>
        <span className="eyebrow">Nutrição conectada</span>
        <h1>Mais proximidade entre nutricionista e paciente.</h1>
        <p>Planos alimentares, acompanhamento, evolução e rotina em uma experiência simples e elegante.</p>
      </div>
      <div className="grapeArt"><Grape size={150} /></div>
    </section>
    <section className="loginCardWrap">
      <form className="loginCard" onSubmit={submit}>
        <h2>Entrar no my nutri</h2><p>Escolha como deseja acessar.</p>
        <div className="roleSwitch">
          <button type="button" className={role === 'nutritionist' ? 'active' : ''} onClick={() => { setRole('nutritionist'); setEmail('nutri@mynutri.app') }}>Nutricionista</button>
          <button type="button" className={role === 'patient' ? 'active' : ''} onClick={() => { setRole('patient'); setEmail('lucas@mynutri.app') }}>Paciente</button>
        </div>
        <label>E-mail<input value={email} onChange={e => setEmail(e.target.value)} type="email" /></label>
        <label>Senha<input defaultValue="123456" type="password" /></label>
        <button className="primaryBtn" type="submit">Entrar <ChevronRight size={18}/></button>
        <small>Demo: use qualquer senha. A autenticação real está preparada no schema Supabase.</small>
      </form>
    </section>
  </main>
}

function Sidebar({ role, page, setPage, logout }) {
  const pro = [
    ['dashboard', Home, 'Visão geral'], ['patients', UsersRound, 'Pacientes'], ['agenda', CalendarDays, 'Agenda'],
    ['plans', Utensils, 'Planos'], ['analytics', BarChart3, 'Resultados'], ['settings', Settings, 'Configurações']
  ]
  const patient = [
    ['home', Home, 'Hoje'], ['plan', Utensils, 'Meu plano'], ['progress', Activity, 'Evolução'],
    ['diary', ClipboardList, 'Diário'], ['profile', UserRound, 'Perfil']
  ]
  return <aside className="sidebar">
    <Logo />
    <nav>{(role === 'nutritionist' ? pro : patient).map(([id, Icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><Icon size={19}/><span>{label}</span></button>)}</nav>
    <button className="logout" onClick={logout}><LogOut size={18}/> Sair</button>
  </aside>
}

const Metric = ({ icon: Icon, title, value, caption }) => <div className="metric card"><span className="metricIcon"><Icon size={20}/></span><div><small>{title}</small><strong>{value}</strong><span>{caption}</span></div></div>

function NutritionistDashboard({ data, setPage, selectPatient }) {
  const patients = data.patients
  return <>
    <header className="pageHeader"><div><span className="eyebrow">Painel profissional</span><h1>Bom dia, Mariana 👋</h1><p>Acompanhe sua carteira e veja quem precisa de atenção.</p></div><button className="primaryBtn" onClick={() => setPage('patients')}><Plus size={18}/> Novo paciente</button></header>
    <div className="metricsGrid">
      <Metric icon={UsersRound} title="Pacientes ativos" value={patients.filter(p=>p.status==='Ativo').length} caption="na sua carteira"/>
      <Metric icon={CalendarDays} title="Consultas próximas" value="4" caption="nos próximos 7 dias"/>
      <Metric icon={Target} title="Adesão média" value="84%" caption="últimos 30 dias"/>
      <Metric icon={Activity} title="Em evolução" value="92%" caption="com registros recentes"/>
    </div>
    <div className="dashboardGrid">
      <section className="card panel"><div className="panelHead"><div><h3>Pacientes recentes</h3><p>Resumo rápido da evolução.</p></div><button className="ghostBtn" onClick={()=>setPage('patients')}>Ver todos</button></div>
        <div className="patientRows">{patients.map(p => <button className="patientRow" key={p.id} onClick={()=>{selectPatient(p.id);setPage('patients')}}><span className="avatar">{p.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><span className="grow"><strong>{p.name}</strong><small>{p.goal}</small></span><span><strong>{p.weight} kg</strong><small>meta {p.targetWeight} kg</small></span><ChevronRight size={18}/></button>)}</div>
      </section>
      <section className="card panel"><div className="panelHead"><div><h3>Agenda</h3><p>Próximos atendimentos</p></div></div>
        <div className="agendaItem"><span>09:00</span><div><strong>Lucas Andrade</strong><small>Retorno · online</small></div></div>
        <div className="agendaItem"><span>11:30</span><div><strong>Beatriz Rocha</strong><small>Primeira consulta</small></div></div>
        <div className="agendaItem"><span>15:00</span><div><strong>Ana Paula</strong><small>Ajuste de plano</small></div></div>
      </section>
    </div>
  </>
}

function Patients({ data, setData, selectedId, setSelectedId }) {
  const [query, setQuery] = useState('')
  const [adding, setAdding] = useState(false)
  const selected = data.patients.find(p => p.id === selectedId) || data.patients[0]
  const filtered = data.patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  const addPatient = e => {
    e.preventDefault(); const f = new FormData(e.currentTarget)
    const p = { id: crypto.randomUUID(), professionalId:'nutri-1', name:f.get('name'), email:f.get('email'), age:Number(f.get('age')||0), goal:f.get('goal'), weight:Number(f.get('weight')||0), targetWeight:Number(f.get('targetWeight')||0), height:Number(f.get('height')||0), status:'Ativo', next:'A definir', notes:'' }
    const next = {...data, patients:[p,...data.patients]}; setData(next); setSelectedId(p.id); setAdding(false)
  }
  return <>
    <header className="pageHeader"><div><span className="eyebrow">Gestão clínica</span><h1>Pacientes</h1><p>Cadastre, acompanhe e personalize a jornada nutricional.</p></div><button className="primaryBtn" onClick={()=>setAdding(true)}><Plus size={18}/> Cadastrar paciente</button></header>
    {adding && <div className="modalBackdrop"><form className="modal card" onSubmit={addPatient}><h2>Novo paciente</h2><div className="formGrid"><label>Nome<input name="name" required/></label><label>E-mail<input name="email" type="email" required/></label><label>Idade<input name="age" type="number"/></label><label>Altura (cm)<input name="height" type="number"/></label><label>Peso atual<input name="weight" type="number" step="0.1"/></label><label>Meta de peso<input name="targetWeight" type="number" step="0.1"/></label><label className="wide">Objetivo<select name="goal"><option>Emagrecimento</option><option>Hipertrofia</option><option>Reeducação alimentar</option><option>Performance</option></select></label></div><div className="modalActions"><button type="button" className="ghostBtn" onClick={()=>setAdding(false)}>Cancelar</button><button className="primaryBtn">Salvar paciente</button></div></form></div>}
    <div className="patientsLayout">
      <section className="card patientList"><div className="search"><Search size={18}/><input placeholder="Buscar paciente" value={query} onChange={e=>setQuery(e.target.value)}/></div>{filtered.map(p=><button className={`patientListItem ${selected?.id===p.id?'active':''}`} key={p.id} onClick={()=>setSelectedId(p.id)}><span className="avatar">{p.name.slice(0,2).toUpperCase()}</span><span><strong>{p.name}</strong><small>{p.goal}</small></span></button>)}</section>
      {selected && <PatientRecord patient={selected} data={data} setData={setData}/>}    
    </div>
  </>
}

function PatientRecord({ patient, data, setData }) {
  const meals = data.meals[patient.id] || []
  const [tab,setTab]=useState('summary')
  const addMeal = () => {
    const meal={id:crypto.randomUUID(),time:'18:00',title:'Nova refeição',foods:'Clique e ajuste posteriormente',kcal:300}
    setData({...data, meals:{...data.meals,[patient.id]:[...meals,meal]}})
  }
  return <section className="record card">
    <div className="recordHero"><div className="avatar big">{patient.name.slice(0,2).toUpperCase()}</div><div><h2>{patient.name}</h2><p>{patient.age} anos · {patient.height} cm · {patient.goal}</p></div><span className="status">{patient.status}</span></div>
    <div className="recordTabs">{[['summary','Resumo'],['plan','Plano alimentar'],['notes','Prontuário']].map(([id,label])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}>{label}</button>)}</div>
    {tab==='summary' && <div><div className="miniMetrics"><div><small>Peso atual</small><strong>{patient.weight} kg</strong></div><div><small>Meta</small><strong>{patient.targetWeight} kg</strong></div><div><small>IMC</small><strong>{(patient.weight/((patient.height/100)**2)).toFixed(1)}</strong></div><div><small>Próxima consulta</small><strong>{patient.next}</strong></div></div><div className="noteBox"><strong>Observações clínicas</strong><p>{patient.notes || 'Sem observações registradas.'}</p></div></div>}
    {tab==='plan' && <div><div className="panelHead"><div><h3>Plano alimentar</h3><p>Estrutura diária enviada ao paciente.</p></div><button className="secondaryBtn" onClick={addMeal}><Plus size={17}/> Adicionar refeição</button></div><div className="mealList">{meals.length?meals.map(m=><div className="mealRow" key={m.id}><span className="mealTime">{m.time}</span><div className="grow"><strong>{m.title}</strong><small>{m.foods}</small></div><b>{m.kcal} kcal</b></div>):<div className="empty">Nenhuma refeição cadastrada.</div>}</div></div>}
    {tab==='notes' && <div><label className="notesLabel">Prontuário e anotações<textarea value={patient.notes} onChange={e=>setData({...data,patients:data.patients.map(p=>p.id===patient.id?{...p,notes:e.target.value}:p)})}/></label><small className="saveHint">As alterações são salvas automaticamente neste dispositivo.</small></div>}
  </section>
}

function PatientHome({ patient, data }) {
  const h = data.habits[patient.id] || { water:0,waterGoal:2.5,steps:0,sleep:0,adherence:0 }
  const meals = data.meals[patient.id] || []
  const total = meals.reduce((a,m)=>a+m.kcal,0)
  return <>
    <header className="pageHeader"><div><span className="eyebrow">Sua jornada</span><h1>Olá, {patient.name.split(' ')[0]} 👋</h1><p>Pequenas escolhas, progresso consistente.</p></div><span className="status">Plano ativo</span></header>
    <div className="patientHero card"><div><small>Meta diária estimada</small><strong>{total || 1780} kcal</strong><p>Seu plano está organizado em {meals.length || 4} refeições.</p></div><div className="ring" style={{'--p':`${h.adherence}%`}}><span>{h.adherence}%</span><small>adesão</small></div></div>
    <div className="metricsGrid patientMetrics"><Metric icon={Droplets} title="Água" value={`${h.water} L`} caption={`meta ${h.waterGoal} L`}/><Metric icon={Activity} title="Passos" value={h.steps.toLocaleString('pt-BR')} caption="hoje"/><Metric icon={CalendarDays} title="Sono" value={`${h.sleep} h`} caption="última noite"/></div>
    <section className="card panel"><div className="panelHead"><div><h3>Refeições de hoje</h3><p>Siga seu plano com flexibilidade e consciência.</p></div></div><div className="mealList">{meals.map(m=><div className="mealRow" key={m.id}><span className="mealTime">{m.time}</span><div className="grow"><strong>{m.title}</strong><small>{m.foods}</small></div><b>{m.kcal} kcal</b></div>)}</div></section>
  </>
}

function PatientProgress({ patient, data, setData }) {
  const points=data.progress[patient.id]||[]
  const [weight,setWeight]=useState('')
  const add=()=>{if(!weight)return; const d=new Date(); const date=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`; setData({...data,progress:{...data.progress,[patient.id]:[...points,{date,weight:Number(weight)}]}});setWeight('')}
  const min=Math.min(...points.map(x=>x.weight),patient.targetWeight)-1, max=Math.max(...points.map(x=>x.weight),patient.weight)+1
  return <><header className="pageHeader"><div><span className="eyebrow">Acompanhamento</span><h1>Minha evolução</h1><p>Registre seus dados e acompanhe a tendência.</p></div></header><div className="progressGrid"><section className="card panel"><h3>Evolução do peso</h3><div className="simpleChart">{points.map((p,i)=><div key={i} className="chartCol"><span className="chartPoint" style={{bottom:`${((p.weight-min)/(max-min))*75+10}%`}} title={`${p.weight} kg`}></span><small>{p.date}</small></div>)}</div></section><section className="card panel"><h3>Novo registro</h3><label>Peso atual (kg)<input value={weight} onChange={e=>setWeight(e.target.value)} type="number" step="0.1" placeholder="Ex.: 81.7"/></label><button className="primaryBtn full" onClick={add}><Weight size={18}/> Registrar peso</button><div className="goalCard"><small>Meta definida</small><strong>{patient.targetWeight} kg</strong></div></section></div></>
}

function Placeholder({ title, text, icon: Icon=Apple }) { return <section className="card emptyState"><span><Icon size={30}/></span><h2>{title}</h2><p>{text}</p><button className="secondaryBtn">Em breve</button></section> }

export default function App(){
  const [data,setDataState]=useState(loadData)
  const [session,setSession]=useState(()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY))}catch{return null}})
  const [page,setPage]=useState('dashboard')
  const [selectedId,setSelectedId]=useState('p1')
  const setData=d=>{setDataState(d);saveData(d)}
  useEffect(()=>{ if(session) setPage(session.role==='nutritionist'?'dashboard':'home') },[session?.role])
  const login=s=>{setSession(s);localStorage.setItem(SESSION_KEY,JSON.stringify(s))}
  const logout=()=>{setSession(null);localStorage.removeItem(SESSION_KEY)}
  if(!session)return <Login onLogin={login}/>
  const patient=data.patients.find(p=>p.email===session.email)||data.patients[0]
  let content
  if(session.role==='nutritionist'){
    if(page==='dashboard') content=<NutritionistDashboard data={data} setPage={setPage} selectPatient={setSelectedId}/>
    else if(page==='patients') content=<Patients data={data} setData={setData} selectedId={selectedId} setSelectedId={setSelectedId}/>
    else if(page==='agenda') content=<Placeholder title="Agenda inteligente" text="Área preparada para consultas, retornos e integração com calendário." icon={CalendarDays}/>
    else if(page==='plans') content=<Placeholder title="Biblioteca de planos" text="Crie modelos reutilizáveis e personalize por paciente." icon={Utensils}/>
    else if(page==='analytics') content=<Placeholder title="Resultados clínicos" text="Indicadores agregados de adesão, peso, metas e acompanhamento." icon={BarChart3}/>
    else content=<Placeholder title="Configurações" text="Perfil profissional, preferências e integrações do consultório." icon={Settings}/>
  } else {
    if(page==='home') content=<PatientHome patient={patient} data={data}/>
    else if(page==='plan') content=<PatientHome patient={patient} data={data}/>
    else if(page==='progress') content=<PatientProgress patient={patient} data={data} setData={setData}/>
    else if(page==='diary') content=<Placeholder title="Diário alimentar" text="Registre refeições, fome, saciedade, humor e observações para compartilhar com seu nutricionista." icon={ClipboardList}/>
    else content=<Placeholder title="Meu perfil" text="Dados pessoais, preferências alimentares, notificações e privacidade." icon={UserRound}/>
  }
  return <div className="appShell"><Sidebar role={session.role} page={page} setPage={setPage} logout={logout}/><main className="content">{content}</main></div>
}
