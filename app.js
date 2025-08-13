// v6.1 consent fix + v5/v6 funkciók
document.addEventListener('DOMContentLoaded', ()=>{
  // téma
  const themeToggle=document.getElementById('themeToggle');
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light');
  themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');});

  // consent (fix)
  const overlay=document.getElementById('consentOverlay');
  const cb=document.getElementById('consentCheck');
  const btn=document.getElementById('consentBtn');
  if(localStorage.getItem('adherencia_consent')==='yes'){ overlay.style.display='none'; }
  const sync=()=>{ btn.disabled=!cb.checked; btn.setAttribute('aria-disabled', String(!cb.checked)); };
  cb.addEventListener('change', sync); sync();
  btn.addEventListener('click', ()=>{ if(!cb.checked) return; localStorage.setItem('adherencia_consent','yes'); overlay.style.display='none'; });

  // form refs
  const form=document.getElementById('surveyForm'); const taj=document.getElementById('taj');
  const result=document.getElementById('resultSection'); const shown=document.getElementById('shownId');
  const scoreEl=document.getElementById('score'); const catEl=document.getElementById('category');
  const missed=document.getElementById('missed'); const missedVal=document.getElementById('missedVal'); const missedOut=document.getElementById('missedOut');
  const exportAllBtn=document.getElementById('exportAllBtn'); const printBtn=document.getElementById('printBtn');
  const progress=document.getElementById('progressBar'); const resetBtn=document.getElementById('resetBtn'); const advice=document.getElementById('advice'); const gamify=document.getElementById('gamify');
  document.getElementById('year').textContent=new Date().getFullYear();
  missed.addEventListener('input', ()=> missedVal.textContent=missed.value);

  // követőkérdések + progress
  form.addEventListener('change', ()=>{
    const fd=new FormData(form);
    ['q1','q3'].forEach(q=>{ const v=Number(fd.get(q)); const fu=document.querySelector(`[data-follow="${q}"]`); if(!fu) return; if(Number.isFinite(v)&&v<=1) fu.classList.remove('hidden'); else fu.classList.add('hidden'); });
    const total=8; const answered=Array.from(new FormData(form).entries()).filter(([k,v])=>/^q[1-8]$/.test(k)&&v!=='').length;
    progress.style.width=Math.round((answered/total)*100)+'%';
  });

  let radarChart=null;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const id=(taj.value||'').trim();
    if(!/^\d{9}$/.test(id)){ alert('Kérem, pontosan 9 számjegyű TAJ számot adjon meg.'); taj.focus(); return; }
    const fd=new FormData(form); const vals=[]; let score=0;
    for(let i=1;i<=8;i++){ const v=Number(fd.get('q'+i)); if(!Number.isFinite(v)){ alert('Kérem, válaszoljon minden kérdésre.'); return; } vals.push(v); score+=v; }
    const miss=Number(fd.get('missed')||0);
    shown.textContent=id; scoreEl.textContent=String(score); missedOut.textContent=String(miss);
    const cat = score>=20?{t:'Jó adherencia',c:'ok'}:score>=14?{t:'Javítható',c:'warn'}:{t:'Nem kielégítő',c:'bad'};
    catEl.innerHTML=`<span class="badge ${cat.c}">${cat.t}</span>`; result.classList.remove('hidden');

    // radar
    const labels=['Elfelejtés','Késés ≥2h','Szándékos kihagyás','Terv világos','Emlékeztetők','Anyagi hozzáférés','Zavaró mellékhatás','Fontosság'];
    const ctx=document.getElementById('radarChart').getContext('2d');
    if(radarChart) radarChart.destroy();
    radarChart=new Chart(ctx,{type:'radar',data:{labels,datasets:[{data:vals,fill:true,
      backgroundColor:(c)=>{const ca=c.chart.chartArea;if(!ca) return 'rgba(37,99,235,0.30)'; const g=c.chart.ctx.createLinearGradient(ca.left,ca.top,ca.right,ca.bottom); g.addColorStop(0,'rgba(37,99,235,0.40)'); g.addColorStop(0.35,'rgba(16,185,129,0.35)'); g.addColorStop(0.6,'rgba(245,158,11,0.30)'); g.addColorStop(0.85,'rgba(249,115,22,0.28)'); g.addColorStop(1,'rgba(239,68,68,0.25)'); return g; },
      borderColor:(c)=>{const ca=c.chart.chartArea;if(!ca) return '#2563eb'; const g=c.chart.ctx.createLinearGradient(ca.left,ca.top,ca.right,ca.bottom); g.addColorStop(0,'#2563eb'); g.addColorStop(0.35,'#10b981'); g.addColorStop(0.6,'#f59e0b'); g.addColorStop(0.85,'#f97316'); g.addColorStop(1,'#ef4444'); return g; },
      borderWidth:2, pointRadius:3, pointBackgroundColor:'#fff', pointBorderColor:'#2563eb'}]},
      options:{responsive:true,maintainAspectRatio:false,animation:{duration:700,easing:'easeOutQuart'},plugins:{legend:{display:false}},
        scales:{r:{min:0,max:3,ticks:{display:false,stepSize:1},grid:{color:'rgba(255,255,255,0.08)'},angleLines:{color:'rgba(255,255,255,0.12)'},pointLabels:{color:'rgba(255,255,255,0.85)',font:{size:12,weight:'600'}}}},elements:{line:{tension:0.25}}});

    // advice
    const tips=[]; const s=vals.reduce((a,b)=>a+b,0);
    const block=(title,t,arr)=>`<div class="card-mini"><h3 class="badge ${t}">${title}</h3><ul>${arr.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
    if(s>=20) tips.push(block('Összességében jó adherencia','ok',['Tartsa meg a bevált emlékeztetőit.','Mellékhatás esetén jelezzen.']));
    if(vals[0]<=1) tips.push(block('Gyakori felejtés','bad',['Kösse rutinhoz (pl. reggeli után).','Emlékeztető app + gyógyszeres doboz.']));
    if(vals[1]<=1) tips.push(block('Időzítés bizonytalan','warn',['Fix időpont + „mi a teendő, ha csúszik?” tisztázása.']));
    if(vals[2]<=1) tips.push(block('Szándékos kihagyás','warn',['Okok összegyűjtése, megbeszélés orvossal.']));
    if(vals[3]<=1) tips.push(block('Terv nem elég világos','warn',['Írásos adagolási tervet kérjen.']));
    if(vals[4]<=1) tips.push(block('Nincs stabil emlékeztető','warn',['Ismétlődő riasztás beállítása.']));
    if(vals[5]<=1) tips.push(block('Anyagi akadály','warn',['Támogatás/generikum lehetőségeinek áttekintése.']));
    if(vals[6]<=1) tips.push(block('Mellékhatások kezelése','warn',['Ne hagyja abba hirtelen; egyeztessen.']));
    if(vals[7]<=1) tips.push(block('Motiváció erősítése','warn',['Kösse a szedést személyes célhoz.']));
    if(miss>=4) tips.push(block('Gyakori kihagyások','bad',['Fő + tartalék emlékeztető beállítása.']));
    advice.innerHTML = tips.join('') || block('Nincs kiemelt kockázat','ok',['Az eredmények alapján nem látható jelentős akadály.']);

    // gamify
    const key='last_'+id; const prev=JSON.parse(localStorage.getItem(key)||'null');
    if(prev){ const d=score-prev.score; if(d>0) gamify.innerHTML=`<span class="badge ok">Javulás: +${d} pont</span>`; else if(d<0) gamify.innerHTML=`<span class="badge warn">Kisebb visszaesés: ${d} pont</span>`; else gamify.innerHTML=`<span class="badge warn">Eredmény változatlan</span>`; }
    else gamify.innerHTML=`<span class="badge ok">Első kitöltés – kiváló kezdet!</span>`;
    localStorage.setItem(key, JSON.stringify({score, ts: Date.now()}));

    // local save + optional Sheets
    const row=[id,...vals,miss];
    const all=JSON.parse(localStorage.getItem('adherencia_rows')||'[]'); all.push(row);
    localStorage.setItem('adherencia_rows', JSON.stringify(all));
    try{ await fetch('/.netlify/functions/appendSheet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({row})}); }catch(e){ console.warn('Sheets mentés kihagyva:', e); }
  });

  exportAllBtn.addEventListener('click', ()=>{
    const rows=JSON.parse(localStorage.getItem('adherencia_rows')||'[]'); if(!rows.length){ alert('Még nincs mentett befejezett teszt.'); return; }
    const hdr=['taj','q1','q2','q3','q4','q5','q6','q7','q8','missed14days'];
    const csv='\\ufeff'+[hdr.join(',')].concat(rows.map(r=>r.map(x=>String(x).replaceAll('"','""')).join(','))).join('\\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='adherencia_osszes.csv'; a.click(); URL.revokeObjectURL(url);
  });
  printBtn.addEventListener('click', ()=> window.print());
  resetBtn.addEventListener('click', ()=>{ form.reset(); missedVal.textContent='0'; progress.style.width='0%'; result.classList.add('hidden'); });
});
