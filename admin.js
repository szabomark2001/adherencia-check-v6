const adminTokenInput=document.getElementById('adminToken');
const loginBtn=document.getElementById('loginBtn');
const dash=document.getElementById('dash');
const tableSec=document.getElementById('tableSec');

loginBtn.addEventListener('click', loadData);

async function loadData(){
  const t = adminTokenInput.value.trim();
  if(!t){ alert('Adj meg egy tokent.'); return; }

  const res = await fetch('/.netlify/functions/listSheet', { headers: { 'x-admin-token': t } });
  if(!res.ok){ alert('Hozzáférés megtagadva vagy hiba.'); return; }
  const { rows } = await res.json();

  dash.classList.remove('hidden'); tableSec.classList.remove('hidden');

  // Stats
  document.getElementById('statCount').textContent = rows.length;
  const scores = rows.map(r => r.slice(1,9).reduce((a,b)=>a+Number(b||0),0));
  const missed = rows.map(r => Number(r[9]||0));
  const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  const avgM = missed.length ? (missed.reduce((a,b)=>a+b,0)/missed.length) : 0;
  document.getElementById('statAvg').textContent = avg.toFixed(1);
  document.getElementById('statMiss').textContent = avgM.toFixed(1);

  // Table
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = rows.map(r => `<tr>${r.map(c=>`<td>${c??''}</td>`).join('')}</tr>`).join('');

  // Charts
  const perQ = [0,0,0,0,0,0,0,0];
  rows.forEach(r => r.slice(1,9).forEach((v,i)=> perQ[i]+=Number(v||0)));
  const n = Math.max(rows.length,1);
  const avgPerQ = perQ.map(x=> x/n);
  renderRadar(avgPerQ);
  renderMiss(missed);

  // Export (cloud rows)
  document.getElementById('exportSheetBtn').onclick = async () => {
    const headers = ['taj','q1','q2','q3','q4','q5','q6','q7','q8','missed14','timestamp'];
    const csv = '\ufeff' + [headers.join(',')].concat(rows.map(r => r.join(','))).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href=url; a.download='adherencia_felho.csv'; a.click(); URL.revokeObjectURL(url);
  };
}

function renderRadar(values){
  const ctx = document.getElementById('popRadar').getContext('2d');
  new Chart(ctx, { type:'radar',
    data:{ labels:['Elfelejtés','Késés ≥2h','Szándékos','Terv','Emlékeztetők','Anyagi','Mellékhatás','Fontosság'],
      datasets:[{ data:values, fill:true, backgroundColor:'rgba(34,211,238,0.25)', borderColor:'#22d3ee', borderWidth:2 }]},
    options:{ scales:{ r:{ min:0,max:3, ticks:{display:false}}}, plugins:{legend:{display:false}} }
  });
}
function renderMiss(values){
  const ctx = document.getElementById('missBar').getContext('2d');
  new Chart(ctx, { type:'bar',
    data:{ labels: values.map((_,i)=> String(i+1)), datasets:[{ data: values, label:'Kihagyások', backgroundColor:'#8b5cf6' }]},
    options:{ plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true } }}
  });
}
