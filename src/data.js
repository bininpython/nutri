export const APP_DATA_VERSION = 2
export const STORAGE_KEY = 'my-nutri-clinical-v2'
export const SESSION_KEY = 'my-nutri-session-v2'

export const foodLibrarySeed = [
  { id:'f1', name:'Arroz integral cozido', group:'Cereais', serving:100, unit:'g', kcal:124, protein:2.6, carbs:25.8, fat:1.0, fiber:2.7, source:'Base demonstrativa' },
  { id:'f2', name:'Feijão carioca cozido', group:'Leguminosas', serving:100, unit:'g', kcal:76, protein:4.8, carbs:13.6, fat:0.5, fiber:8.5, source:'Base demonstrativa' },
  { id:'f3', name:'Peito de frango grelhado', group:'Proteínas', serving:100, unit:'g', kcal:159, protein:32, carbs:0, fat:2.5, fiber:0, source:'Base demonstrativa' },
  { id:'f4', name:'Ovo inteiro cozido', group:'Proteínas', serving:50, unit:'g', kcal:73, protein:6.3, carbs:0.6, fat:4.8, fiber:0, source:'Base demonstrativa' },
  { id:'f5', name:'Banana prata', group:'Frutas', serving:100, unit:'g', kcal:98, protein:1.3, carbs:26, fat:0.1, fiber:2, source:'Base demonstrativa' },
  { id:'f6', name:'Aveia em flocos', group:'Cereais', serving:30, unit:'g', kcal:118, protein:4.2, carbs:20, fat:2.4, fiber:3.2, source:'Base demonstrativa' },
  { id:'f7', name:'Iogurte natural', group:'Laticínios', serving:170, unit:'g', kcal:105, protein:6.1, carbs:8.8, fat:5.2, fiber:0, source:'Base demonstrativa' },
  { id:'f8', name:'Batata-doce cozida', group:'Tubérculos', serving:100, unit:'g', kcal:77, protein:0.6, carbs:18.4, fat:0.1, fiber:2.2, source:'Base demonstrativa' },
  { id:'f9', name:'Salmão grelhado', group:'Proteínas', serving:100, unit:'g', kcal:208, protein:22, carbs:0, fat:13, fiber:0, source:'Base demonstrativa' },
  { id:'f10', name:'Azeite de oliva', group:'Óleos e gorduras', serving:10, unit:'ml', kcal:88, protein:0, carbs:0, fat:10, fiber:0, source:'Base demonstrativa' },
  { id:'f11', name:'Brócolis cozido', group:'Hortaliças', serving:100, unit:'g', kcal:25, protein:2.1, carbs:4.4, fat:0.5, fiber:3.4, source:'Base demonstrativa' },
  { id:'f12', name:'Castanha-do-pará', group:'Oleaginosas', serving:20, unit:'g', kcal:131, protein:2.9, carbs:2.4, fat:13.4, fiber:1.6, source:'Base demonstrativa' },
]

const lucasPlan = {
  id:'plan-p1', title:'Estratégia de recomposição · Ciclo 01', status:'active', startDate:'2026-08-18', kcalTarget:2280,
  macros:{ protein:165, carbs:245, fat:70, fiber:32 }, instructions:'Priorizar refeições completas, hidratação ao longo do dia e flexibilidade planejada no fim de semana.',
  meals:[
    { id:'meal-1', time:'07:00', name:'Café da manhã', note:'Antes do trabalho', items:[
      { foodId:'f4', name:'Ovo inteiro cozido', quantity:100, unit:'g', kcal:146, protein:12.6, carbs:1.2, fat:9.6 },
      { foodId:'f6', name:'Aveia em flocos', quantity:45, unit:'g', kcal:177, protein:6.3, carbs:30, fat:3.6 },
      { foodId:'f5', name:'Banana prata', quantity:100, unit:'g', kcal:98, protein:1.3, carbs:26, fat:0.1 },
    ]},
    { id:'meal-2', time:'12:15', name:'Almoço', note:'Montagem-base', items:[
      { foodId:'f1', name:'Arroz integral cozido', quantity:160, unit:'g', kcal:198, protein:4.2, carbs:41.3, fat:1.6 },
      { foodId:'f2', name:'Feijão carioca cozido', quantity:120, unit:'g', kcal:91, protein:5.8, carbs:16.3, fat:0.6 },
      { foodId:'f3', name:'Peito de frango grelhado', quantity:170, unit:'g', kcal:270, protein:54.4, carbs:0, fat:4.3 },
      { foodId:'f11', name:'Brócolis cozido', quantity:120, unit:'g', kcal:30, protein:2.5, carbs:5.3, fat:0.6 },
      { foodId:'f10', name:'Azeite de oliva', quantity:10, unit:'ml', kcal:88, protein:0, carbs:0, fat:10 },
    ]},
    { id:'meal-3', time:'16:30', name:'Lanche', note:'Pré-treino leve', items:[
      { foodId:'f7', name:'Iogurte natural', quantity:170, unit:'g', kcal:105, protein:6.1, carbs:8.8, fat:5.2 },
      { foodId:'f5', name:'Banana prata', quantity:100, unit:'g', kcal:98, protein:1.3, carbs:26, fat:0.1 },
      { foodId:'f12', name:'Castanha-do-pará', quantity:20, unit:'g', kcal:131, protein:2.9, carbs:2.4, fat:13.4 },
    ]},
    { id:'meal-4', time:'20:30', name:'Jantar', note:'Pós-treino', items:[
      { foodId:'f8', name:'Batata-doce cozida', quantity:220, unit:'g', kcal:169, protein:1.3, carbs:40.5, fat:0.2 },
      { foodId:'f9', name:'Salmão grelhado', quantity:150, unit:'g', kcal:312, protein:33, carbs:0, fat:19.5 },
      { foodId:'f11', name:'Brócolis cozido', quantity:150, unit:'g', kcal:38, protein:3.2, carbs:6.6, fat:0.8 },
    ]},
  ]
}

export const seed = {
  version: APP_DATA_VERSION,
  professional:{ id:'nutri-1', name:'Mariana Silva', crn:'CRN-9 12345', email:'nutri@mynutri.app', phone:'(31) 99999-0000', specialty:'Nutrição clínica e esportiva', clinic:'Studio Mariana Silva', city:'Belo Horizonte · MG' },
  patients:[
    { id:'p1', professionalId:'nutri-1', name:'Lucas Andrade', email:'lucas@mynutri.app', phone:'(31) 98888-2020', birthDate:'1997-03-14', age:29, sex:'male', goal:'Recomposição corporal', weight:82.4, targetWeight:78, height:178, status:'active', tags:['Esportivo','Online'], nextAppointment:'2026-08-29T09:00', lastAppointment:'2026-08-08', adherence:86, risk:'attention' },
    { id:'p2', professionalId:'nutri-1', name:'Ana Paula Souza', email:'ana@mynutri.app', phone:'(31) 97777-1030', birthDate:'1991-10-02', age:34, sex:'female', goal:'Reeducação alimentar', weight:68.1, targetWeight:64, height:165, status:'active', tags:['Clínico'], nextAppointment:'2026-09-02T15:00', lastAppointment:'2026-08-12', adherence:93, risk:'stable' },
    { id:'p3', professionalId:'nutri-1', name:'Beatriz Rocha', email:'bia@mynutri.app', phone:'(31) 96666-7744', birthDate:'2000-05-21', age:26, sex:'female', goal:'Saúde intestinal', weight:59.7, targetWeight:59, height:162, status:'active', tags:['Primeira consulta'], nextAppointment:'2026-08-27T11:30', lastAppointment:null, adherence:0, risk:'new' },
  ],
  appointments:[
    { id:'a1', patientId:'p3', startsAt:'2026-08-27T11:30', duration:60, mode:'Presencial', type:'Primeira consulta', status:'scheduled', notes:'Levar exames recentes.' },
    { id:'a2', patientId:'p1', startsAt:'2026-08-29T09:00', duration:45, mode:'Online', type:'Retorno', status:'scheduled', notes:'Revisar aderência ao jantar.' },
    { id:'a3', patientId:'p2', startsAt:'2026-09-02T15:00', duration:45, mode:'Presencial', type:'Retorno', status:'scheduled', notes:'Nova antropometria.' },
  ],
  anamneses:{
    p1:{ chiefComplaint:'Reduzir gordura corporal sem perda de performance.', history:'Sem doenças crônicas diagnosticadas. Histórico familiar de hipertensão.', allergies:'Nenhuma alergia conhecida.', intolerances:'Lactose em excesso causa desconforto.', medications:'Nenhum uso contínuo.', supplements:'Creatina 5 g/dia.', routine:'Trabalho administrativo 08h–17h. Treino de força 4x/semana às 18h.', sleep:'7 h/noite; qualidade moderada.', bowel:'1–2x/dia, Bristol 3–4.', hydration:'2,0 L/dia em média.', alcohol:'Social, 1–2x/mês.', smoking:'Não.', notes:'Relata maior fome no período noturno.' },
    p2:{ chiefComplaint:'Melhorar organização alimentar e reduzir beliscos.', history:'Sem comorbidades.', allergies:'Nenhuma.', intolerances:'Nenhuma.', medications:'Anticoncepcional oral.', supplements:'Nenhum.', routine:'Trabalha em turnos alternados.', sleep:'6–7 h, irregular.', bowel:'1x/dia.', hydration:'1,5 L/dia.', alcohol:'Raro.', smoking:'Não.', notes:'Planejar alternativas por turno.' },
  },
  questionnaires:{
    p1:[{id:'q1',name:'Pré-consulta',date:'2026-08-06',score:null,status:'answered'},{id:'q2',name:'Qualidade do sono',date:'2026-08-06',score:72,status:'answered'}],
    p2:[{id:'q3',name:'Comportamento alimentar',date:'2026-08-10',score:64,status:'answered'}]
  },
  anthropometry:{
    p1:[
      { id:'ant1', date:'2026-08-08', weight:82.4, waist:86, hip:99, arm:34.5, thigh:57, bodyFat:18.6, muscleMass:63.4, method:'Bioimpedância' },
      { id:'ant0', date:'2026-07-10', weight:84.8, waist:89, hip:100.5, arm:34.2, thigh:57.4, bodyFat:20.2, muscleMass:63.1, method:'Bioimpedância' },
    ],
    p2:[{ id:'ant2', date:'2026-08-12', weight:68.1, waist:78, hip:101, arm:29.5, thigh:56, bodyFat:29.8, muscleMass:45.2, method:'Dobras cutâneas' }],
  },
  labs:{
    p1:[
      { id:'lab1', date:'2026-08-02', marker:'Glicemia em jejum', value:'91', unit:'mg/dL', reference:'70–99', status:'normal' },
      { id:'lab2', date:'2026-08-02', marker:'Vitamina D', value:'27', unit:'ng/mL', reference:'30–60', status:'attention' },
      { id:'lab3', date:'2026-08-02', marker:'Ferritina', value:'118', unit:'ng/mL', reference:'30–400', status:'normal' },
      { id:'lab4', date:'2026-08-02', marker:'LDL-c', value:'112', unit:'mg/dL', reference:'< 100', status:'attention' },
    ],
    p2:[{ id:'lab5', date:'2026-08-09', marker:'Glicemia em jejum', value:'86', unit:'mg/dL', reference:'70–99', status:'normal' }]
  },
  mealPlans:{ p1:lucasPlan, p2:{...lucasPlan,id:'plan-p2',title:'Rotina por turnos',kcalTarget:1760,macros:{protein:110,carbs:190,fat:62,fiber:28},meals:lucasPlan.meals.slice(0,3)}, p3:null },
  goals:{
    p1:[
      {id:'g1',title:'Água',target:'2,5 L/dia',progress:72,frequency:'Diária',active:true},
      {id:'g2',title:'Vegetais no almoço e jantar',target:'2 refeições/dia',progress:84,frequency:'Diária',active:true},
      {id:'g3',title:'Treinos planejados',target:'4x/semana',progress:100,frequency:'Semanal',active:true},
    ],
    p2:[{id:'g4',title:'Planejar lanche do turno',target:'5x/semana',progress:80,frequency:'Semanal',active:true}]
  },
  diary:{
    p1:[
      {id:'d1',date:'2026-08-26T12:22',meal:'Almoço',description:'Arroz, feijão, frango e salada. Segui o plano.',hunger:7,satiety:8,mood:'Bem',photo:null,reaction:'Ótimo',professionalComment:'Boa composição. Mantenha o vegetal ocupando uma boa parte do prato.'},
      {id:'d2',date:'2026-08-25T21:10',meal:'Jantar',description:'Cheguei tarde e troquei por sanduíche de frango.',hunger:9,satiety:7,mood:'Cansado',photo:null,reaction:'Ajustar',professionalComment:'Vamos deixar uma alternativa rápida prevista no plano.'},
    ],
    p2:[]
  },
  progress:{
    p1:[
      {id:'pr1',date:'2026-07-10',weight:84.8,waist:89,bodyFat:20.2,water:1.8,steps:6200,sleep:6.8},
      {id:'pr2',date:'2026-07-24',weight:83.9,waist:88,bodyFat:19.6,water:2.1,steps:7100,sleep:7.0},
      {id:'pr3',date:'2026-08-08',weight:82.4,waist:86,bodyFat:18.6,water:2.2,steps:7600,sleep:7.2},
      {id:'pr4',date:'2026-08-26',weight:81.9,waist:85.5,bodyFat:18.2,water:2.3,steps:8240,sleep:7.1},
    ],
    p2:[{id:'pr5',date:'2026-08-12',weight:68.1,waist:78,bodyFat:29.8,water:1.6,steps:5400,sleep:6.4}]
  },
  notes:{
    p1:[
      {id:'n1',date:'2026-08-08T10:42',author:'Mariana Silva',type:'Evolução',text:'Boa adesão nas refeições principais. Ajustado lanche pré-treino e meta de hidratação.'},
      {id:'n2',date:'2026-07-10T09:18',author:'Mariana Silva',type:'Consulta inicial',text:'Definida estratégia moderada de déficit energético com foco em manutenção de força.'},
    ], p2:[]
  },
  documents:{
    p1:[
      {id:'doc1',title:'Orientações para refeições fora de casa',type:'Orientação',date:'2026-08-08',url:'#'},
      {id:'doc2',title:'Solicitação de exames · acompanhamento',type:'Solicitação',date:'2026-08-08',url:'#'},
    ], p2:[]
  },
  prescriptions:{
    p1:[{id:'rx1',title:'Creatina monohidratada',formula:'Creatina monohidratada 5 g',instructions:'Diluir em água e usar 1x ao dia.',date:'2026-08-08'}], p2:[]
  },
  messages:{
    p1:[
      {id:'msg1',from:'professional',date:'2026-08-26T08:12',text:'Bom dia, Lucas. Como ficou sua fome no fim do dia com o novo lanche?'},
      {id:'msg2',from:'patient',date:'2026-08-26T08:40',text:'Melhorou bastante. Ontem consegui treinar sem chegar no jantar com tanta fome.'},
    ], p2:[], p3:[]
  },
  finance:[
    {id:'fin1',patientId:'p1',description:'Consulta de retorno',dueDate:'2026-08-29',amount:180,status:'pending'},
    {id:'fin2',patientId:'p2',description:'Consulta + avaliação',dueDate:'2026-08-12',amount:220,status:'paid'},
  ],
  planTemplates:[
    {id:'tpl1',name:'Base · Emagrecimento flexível',kcal:1800,meals:5,method:'Quantitativo',updated:'2026-08-20'},
    {id:'tpl2',name:'Base · Performance',kcal:2600,meals:6,method:'Equivalentes',updated:'2026-08-18'},
    {id:'tpl3',name:'Base · Organização por turnos',kcal:2000,meals:5,method:'Qualitativo',updated:'2026-08-11'},
  ],
  foodLibrary: foodLibrarySeed,
  recipes:[
    {id:'r1',name:'Overnight oats de banana',category:'Café da manhã',kcal:365,protein:18,prep:'8 min',ingredients:'Iogurte, aveia, banana, chia e canela.'},
    {id:'r2',name:'Bowl de frango e legumes',category:'Almoço',kcal:510,protein:42,prep:'25 min',ingredients:'Frango, arroz integral, brócolis, cenoura e azeite.'},
  ],
  settings:{ brandColor:'#7151B7', reminders:true, diaryAlerts:true, defaultAppointmentDuration:45, clinicName:'Studio Mariana Silva' }
}

export function cloneSeed(){ return JSON.parse(JSON.stringify(seed)) }

export function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if(!parsed || parsed.version !== APP_DATA_VERSION) return cloneSeed()
    return parsed
  }catch{ return cloneSeed() }
}

export function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify({...data,version:APP_DATA_VERSION})) }
export function uid(prefix='id'){ return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}` }
export function patientName(data,id){ return data.patients.find(p=>p.id===id)?.name || 'Paciente' }
