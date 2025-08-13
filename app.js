// ==== i18n (HU/EN) ====
const I18N = {
  hu:{'consent.title':'Beleegyezés','consent.text':'Az oldal az Ön gyógyszeres adherenciáját méri <strong>tájékoztató jelleggel</strong>. A kitöltés önkéntes, és nem helyettesíti az orvosi vizsgálatot. Panasz esetén forduljon kezelőorvosához.','consent.accept':'Elolvastam és elfogadom a feltételeket.','consent.btn':'Elfogadom','intro.title':'Gyógyszeres adherencia felmérése','intro.desc':'Kérem, adja meg TAJ-számát, majd töltse ki a kérdőívet. Az eredmények csak a befejezéskor kerülnek mentésre az eszközén, és később Excelben exportálhatók.','form.title':'Kérdőív','form.taj.label':'Kérem, adja meg a TAJ számát (9 számjegy):','form.taj.note':'Ne adjon meg más személyes adatot (név, e‑mail).','form.submit':'Eredmény kiszámítása','form.reset':'Űrlap törlése','q1.l':'1) Az elmúlt 2 hétben hányszor felejtette el bevenni a gyógyszerét?','q2.l':'2) Milyen gyakran csúszik a bevétel ≥2 órát a szokásos időponthoz képest?','q3.l':'3) Előfordul, hogy szándékosan kihagyja mellékhatás vagy kétely miatt?','q4.l':'4) Mennyire világos az adagolás, időpont és teendők kihagyás esetén?','q5.l':'5) Van segítsége emlékeztetőkkel (app, doboz, hozzátartozó)?','q6.l':'6) Meg tudja vásárolni a gyógyszereket anyagilag?','q7.l':'7) Zavaró mellékhatásai vannak jelenleg?','q8.l':'8) Mennyire tartja fontosnak a gyógyszerek rendszeres szedését?','q9.l':'Az elmúlt 2 hétben hányszor fordult elő, hogy nem vette be a gyógyszerét?','opt.never':'Soha','opt.sometimes12':'1–2 alkalom','opt.sometimes34':'3–4 alkalom','opt.often5':'≥5 alkalom','opt.rare':'Soha/ritkán','opt.monthly':'Havonta néhányszor','opt.weekly':'Hetente','opt.twiceweek':'Többször hetente','opt.no':'Nem','opt.sometimes':'Néha','opt.often':'Gyakran','opt.clear':'Teljesen világos','opt.mostly':'Többnyire világos','opt.partial':'Részben zavaros','opt.unclear':'Nem világos','opt.regular':'Igen, rendszeresen','opt.none':'Nincs','opt.yes':'Igen','opt.hardSometimes':'Néha nehéz','opt.hardOften':'Gyakran nehéz','opt.not':'Nem','opt.none2':'Nincsenek','opt.mild':'Enyhe','opt.moderate':'Közepes','opt.severe':'Súlyos','opt.very':'Nagyon fontos','opt.important':'Fontos','opt.less':'Kevésbé fontos','opt.notimp':'Nem fontos','opt.choose':'Válasszon…','opt.routine':'Változó napirend','opt.reminder':'Nincs emlékeztető','opt.other':'Egyéb','follow.q1':'Mi okozza leginkább az elfelejtést?','follow.q3':'Miért hagyja ki leggyakrabban?','result.title':'Eredmény','result.score':'Összpontszám:','result.cat':'Kategória:','result.missed':'Kihagyások (14 nap):','result.print':'Nyomtatás / PDF','result.export':'Összes eredmény export (CSV)'},
  en:{'consent.title':'Consent','consent.text':'This tool provides an <strong>informational</strong> assessment of your medication adherence. Participation is voluntary and does not replace medical care. If you have symptoms, please consult your physician.','consent.accept':'I have read and accept the terms.','consent.btn':'Accept','intro.title':'Medication Adherence Assessment','intro.desc':'Please enter your national ID, then complete the questionnaire. Results are only saved on completion and can be exported to Excel.','form.title':'Questionnaire','form.taj.label':'Please enter your national health ID (9 digits):','form.taj.note':'Do not enter any other personal data (name, email).','form.submit':'Calculate result','form.reset':'Clear form','q1.l':'1) In the past 2 weeks, how often did you forget a dose?','q2.l':'2) How often was the dose ≥2 hours late?','q3.l':'3) Do you skip doses intentionally (side effects or doubts)?','q4.l':'4) How clear is your dosing plan and what to do if you miss a dose?','q5.l':'5) Do you have reminders (app, pillbox, family)?','q6.l':'6) Can you afford your medication?','q7.l':'7) Do you have bothersome side effects now?','q8.l':'8) How important is regular intake to you?','q9.l':'In the past 2 weeks, how many doses did you miss?','opt.never':'Never','opt.sometimes12':'1–2 times','opt.sometimes34':'3–4 times','opt.often5':'≥5 times','opt.rare':'Rarely/Never','opt.monthly':'A few times/month','opt.weekly':'Weekly','opt.twiceweek':'Multiple/week','opt.no':'No','opt.sometimes':'Sometimes','opt.often':'Often','opt.clear':'Completely clear','opt.mostly':'Mostly clear','opt.partial':'Partly unclear','opt.unclear':'Not clear','opt.regular':'Yes, regularly','opt.none':'No','opt.yes':'Yes','opt.hardSometimes':'Sometimes difficult','opt.hardOften':'Often difficult','opt.not':'No','opt.none2':'None','opt.mild':'Mild','opt.moderate':'Moderate','opt.severe':'Severe','opt.very':'Very important','opt.important':'Important','opt.less':'Less important','opt.notimp':'Not important','opt.choose':'Choose…','opt.routine':'Irregular routine','opt.reminder':'No reminders','opt.other':'Other','follow.q1':'What mainly causes forgetting?','follow.q3':'Why do you skip most often?','result.title':'Result','result.score':'Total score:','result.cat':'Category:','result.missed':'Missed (14 days):','result.print':'Print / PDF','result.export':'Export all (CSV)'};
};

function t(key){const lang=document.documentElement.getAttribute('data-lang')||'hu';return I18N[lang][key]||key;}
function applyI18n(){document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n');const str=t(key);if(el && str){el.innerHTML=str;}});}
document.getElementById('langToggle').addEventListener('click',()=>{const html=document.documentElement;const cur=html.getAttribute('data-lang')||'hu';const next=cur==='hu'?'en':'hu';html.setAttribute('data-lang',next);localStorage.setItem('lang',next);applyI18n();});
(function(){const saved=localStorage.getItem('lang');if(saved){document.documentElement.setAttribute('data-lang',saved);}applyI18n();})();

// Theme toggle
const themeToggle=document.getElementById('themeToggle');
(function(){const saved=localStorage.getItem('theme');if(saved==='light')document.body.classList.add('light');})();
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');});

// Consent
const consentOverlay=document.getElementById('consentOverlay');
const consentCheck=document.getElementById('consentCheck');
const consentBtn=document.getElementById('consentBtn');
if(localStorage.getItem('adherencia_consent')==='yes')consentOverlay.style.display='none';
consentCheck.addEventListener('change',()=>consentBtn.disabled=!consentCheck.checked);
consentBtn.addEventListener('click',()=>{localStorage.setItem('adherencia_consent','yes');consentOverlay.style.display='none';});

// Form refs
const form=document.getElementById('surveyForm');
const tajInput=document.getElementById('taj');
const resultSection=document.getElementById('resultSection');
const shownId=document.getElementById('shownId');
const scoreEl=document.getElementById('score');
const categoryEl=document.getElementById('category');
const missedRange=document.getElementById('missed');
const missedVal=document.getElementById('missedVal');
const missedOut=document.getElementById('missedOut');
const exportAllBtn=document.getElementById('exportAllBtn');
const printBtn=document.getElementById('printBtn');
const progressBar=document.getElementById('progressBar');
const resetBtn=document.getElementById('resetBtn');
const adviceEl=document.getElementById('advice');
const gamifyEl=document.getElementById('gamify');
document.getElementById('year').textContent=new Date().getFullYear();
missedRange.addEventListener('input',()=>missedVal.textContent=missedRange.value);

// Followups + progress
form.addEventListener('change',()=>{
  const fd=new FormData(form);
  ['q1','q3'].forEach(q=>{
    const v=Number(fd.get(q));
    const fu=document.querySelector(`[data-follow="${q}"]`);
    if(!fu)return;
    if(Number.isFinite(v)&&v<=1)fu.classList.remove('hidden');else fu.classList.add('hidden');
  });
  const total=8;
  const answered=Array.from(fd.entries()).filter(([k,v])=>/^q[1-8]$/.test(k)&&v!=='').length;
  progressBar.style.width=Math.round((answered/total)*100)+'%';
});

let radarChart=null;
form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const taj=(tajInput.value||'').trim();
  if(!/^\d{9}$/.test(taj)){alert('Kérem, pontosan 9 számjegyű TAJ számot adjon meg.');tajInput.focus();return;}
  const fd=new FormData(form);
  const answers=[];let score=0;
  for(let i=1;i<=8;i++){const v=Number(fd.get('q'+i));if(!Number.isFinite(v)){alert('Kérem, válaszoljon minden kérdésre.');return;}answers.push(v);score+=v;}
  const missed=Number(fd.get('missed')||0);

  // Display
  shownId.textContent=taj;scoreEl.textContent=String(score);missedOut.textContent=String(missed);
  const cat=categorize(score);categoryEl.innerHTML=`<span class="badge ${cat.cls}">${cat.text}</span>`;
  resultSection.classList.remove('hidden');

  renderRadar(answers);
  buildAdvice(answers,missed);

  // gamify
  const key='last_'+taj;
  const prev=JSON.parse(localStorage.getItem(key)||'null');
  if(prev){const d=score-prev.score;if(d>0)gamifyEl.innerHTML=badge('ok','Javulás: +'+d+' pont');else if(d<0)gamifyEl.innerHTML=badge('warn','Kisebb visszaesés: '+d+' pont');else gamifyEl.innerHTML=badge('warn','Eredmény változatlan');}
  else gamifyEl.innerHTML=badge('ok','Első kitöltés – kiváló kezdet!');
  localStorage.setItem(key,JSON.stringify({score,ts:Date.now()}));

  // Save local
  const row=[taj,...answers,missed];
  const allRows=JSON.parse(localStorage.getItem('adherencia_rows')||'[]');allRows.push(row);
  localStorage.setItem('adherencia_rows',JSON.stringify(allRows));

  // Save to Sheets (if configured on Netlify)
  try{
    await fetch('/.netlify/functions/appendSheet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({row})});
  }catch(err){console.warn('Sheets mentés kihagyva:',err);}
});

function categorize(s){if(s>=20)return{text:'Jó adherencia',cls:'ok'};if(s>=14)return{text:'Javítható',cls:'warn'};return{text:'Nem kielégítő',cls:'bad'};}
function badge(t,txt){const c=t==='ok'?'ok':t==='warn'?'warn':'bad';return `<span class="badge ${c}">${txt}</span>`;}

function renderRadar(values){
  const labels=['Elfelejtés','Késés ≥2h','Szándékos kihagyás','Terv világos','Emlékeztetők','Anyagi hozzáférés','Zavaró mellékhatás','Fontosság'];
  const ctx=document.getElementById('radarChart').getContext('2d');
  if(radarChart)radarChart.destroy();
  radarChart=new Chart(ctx,{type:'radar',data:{labels,datasets:[{data:values,fill:true,
    backgroundColor:(context)=>{const ca=context.chart.chartArea;if(!ca)return'rgba(37,99,235,0.30)';const g=context.chart.ctx.createLinearGradient(ca.left,ca.top,ca.right,ca.bottom);g.addColorStop(0,'rgba(37,99,235,0.40)');g.addColorStop(0.35,'rgba(16,185,129,0.35)');g.addColorStop(0.6,'rgba(245,158,11,0.30)');g.addColorStop(0.85,'rgba(249,115,22,0.28)');g.addColorStop(1,'rgba(239,68,68,0.25)');return g;},
    borderColor:(context)=>{const ca=context.chart.chartArea;if(!ca)return'#2563eb';const g=context.chart.ctx.createLinearGradient(ca.left,ca.top,ca.right,ca.bottom);g.addColorStop(0,'#2563eb');g.addColorStop(0.35,'#10b981');g.addColorStop(0.6,'#f59e0b');g.addColorStop(0.85,'#f97316');g.addColorStop(1,'#ef4444');return g;},
    borderWidth:2,pointRadius:3,pointBackgroundColor:'#fff',pointBorderColor:'#2563eb'}]},
    options:{responsive:true,maintainAspectRatio:false,animation:{duration:700,easing:'easeOutQuart'},plugins:{legend:{display:false}},
      scales:{r:{min:0,max:3,ticks:{display:false,stepSize:1},grid:{color:'rgba(255,255,255,0.08)'},angleLines:{color:'rgba(255,255,255,0.12)'},pointLabels:{color:'rgba(255,255,255,0.85)',font:{size:12,weight:"600"}}}},
      elements:{line:{tension:0.25}}});
}

function buildAdvice(v,missed){
  const tips=[];const sum=v.reduce((a,b)=>a+b,0);
  if(sum>=20)tips.push(card('Összességében jó adherencia','ok',['Tartsa meg a bevált emlékeztetőit.','Mellékhatás esetén jelezzen.']));
  if(v[0]<=1)tips.push(card('Gyakori felejtés','bad',['Kösse rutinhoz (pl. reggeli után).','Emlékeztető app + gyógyszeres doboz.']));
  if(v[1]<=1)tips.push(card('Időzítés bizonytalan','warn',['Fix időpont + „mi a teendő, ha csúszik?” tisztázása.']));
  if(v[2]<=1)tips.push(card('Szándékos kihagyás','warn',['Okok összegyűjtése, megbeszélés orvossal.']));
  if(v[3]<=1)tips.push(card('Terv nem elég világos','warn',['Írásos adagolási tervet kérjen.']));
  if(v[4]<=1)tips.push(card('Nincs stabil emlékeztető','warn',['Ismétlődő riasztás beállítása.']));
  if(v[5]<=1)tips.push(card('Anyagi akadály','warn',['Támogatás/generikum lehetőségeinek áttekintése.']));
  if(v[6]<=1)tips.push(card('Mellékhatások kezelése','warn',['Ne hagyja abba hirtelen; egyeztessen.']));
  if(v[7]<=1)tips.push(card('Motiváció erősítése','warn',['Kösse a szedést személyes célhoz.']));
  if(missed>=4)tips.push(card('Gyakori kihagyások','bad',['Fő + tartalék emlékeztető beállítása.']));
  adviceEl.innerHTML=tips.join('')||card('Nincs kiemelt kockázat','ok',['Az eredmények alapján nem látható jelentős akadály.']);
}
function card(title,tone,items){const cls=tone==='ok'?'ok':tone==='warn'?'warn':'bad';return `<div class="card-mini"><h3 class="badge ${cls}">${title}</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;}

exportAllBtn.addEventListener('click',()=>{
  const rows=JSON.parse(localStorage.getItem('adherencia_rows')||'[]');if(!rows.length){alert('Még nincs mentett befejezett teszt.');return;}
  const headers=['taj','q1','q2','q3','q4','q5','q6','q7','q8','missed14days'];
  const lines=[headers.join(',')].concat(rows.map(r=>r.map(x=>String(x).replaceAll('"','""')).join(',')));
  const csv='\ufeff'+lines.join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='adherencia_osszes.csv';a.click();URL.revokeObjectURL(url);
});

printBtn.addEventListener('click',()=>window.print());
resetBtn.addEventListener('click',()=>{form.reset();missedVal.textContent='0';progressBar.style.width='0%';resultSection.classList.add('hidden');});
