'use client';
import {useState} from 'react';

const docs=[
 {name:'Aadhaar Card',type:'Identity',meta:'Verified • Government'},
 {name:'Driving Licence',type:'Vehicle',meta:'Verified • Transport'},
 {name:'Degree Certificate',type:'Education',meta:'Verified • University'},
];

export default function Home(){
 const [tab,setTab]=useState('Home');
 const [query,setQuery]=useState('');
 const [selected,setSelected]=useState(null);
 const filtered=docs.filter(d=>(d.name+' '+d.type+' '+d.meta).toLowerCase().includes(query.toLowerCase()));
 return <main>
  <header><div className="brand">DigiLife</div><nav>{['Home','Documents','Share','Help'].map(x=><button key={x} onClick={()=>setTab(x)} className={tab===x?'active':''}>{x}</button>)}</nav><div className="avatar">MS</div></header>
  <section className="hero"><p className="eyebrow">MINIMAL OLED • SECURE DOCUMENTS</p><h1>Your documents,<br/><span>simplified.</span></h1><p className="sub">Secure access to your verified documents with intelligent search and controlled sharing.</p>
   <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search documents or ask AI"/></div>
  </section>
  <section className="content">
   {tab==='Home' && <><div className="sectionHead"><h2>Quick access</h2><span>{docs.length} verified</span></div><div className="grid">{['Identity','Education','Vehicle','Health'].map((x,i)=><article className="card category" key={x}><small>0{i+1}</small><h3>{x}</h3><p>{x==='Identity'?'Aadhaar • PAN':x==='Education'?'Marksheets • Certificates':x==='Vehicle'?'DL • RC':'ABHA • Records'}</p></article>)}</div><div className="sectionHead"><h2>Recent documents</h2><button className="textBtn" onClick={()=>setTab('Documents')}>View all →</button></div><div className="list">{filtered.map(d=><button className="doc" key={d.name} onClick={()=>setSelected(d)}><div><b>{d.name}</b><small>{d.meta}</small></div><span>›</span></button>)}</div></>}
   {tab==='Documents' && <><div className="sectionHead"><h2>All documents</h2><span>Verified</span></div><div className="list">{filtered.map(d=><button className="doc" key={d.name} onClick={()=>setSelected(d)}><div><b>{d.name}</b><small>{d.type} • {d.meta}</small></div><span>›</span></button>)}</div></>}
   {tab==='Share' && <Share/>}
   {tab==='Help' && <Help/>}
  </section>
  {selected && <div className="modal" onClick={()=>setSelected(null)}><div className="modalBox" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><p className="eyebrow">VERIFIED DOCUMENT</p><h2>{selected.name}</h2><p>{selected.meta}</p><div className="verify">✓ Verified by issuing authority</div><button className="primary" onClick={()=>alert('Demo share flow — connect backend storage/auth for real sharing.')}>Share securely</button></div></div>}
  <footer>DigiLife prototype • Government verification shown here is a demo experience.</footer>
 </main>
}
function Share(){return <div className="panel"><p className="eyebrow">SECURE SHARE</p><h2>Choose exactly what to send.</h2>{['Full document','Expiry date','Masked ID'].map((x,i)=><div className="toggle" key={x}><div><b>{x}</b><small>{i===0?'Includes all visible details':i===1?'Only validity information':'Hides sensitive number'}</small></div><span>{i===1?'○':'●'}</span></div>)}<button className="primary">Continue</button><p className="note">Access can be revoked and demo links can expire automatically.</p></div>}
function Help(){return <div className="helpGrid">{[['AI Help','Get guided answers instantly'],['One-on-one support','Connect with a support professional'],['In-person assistance','Find a nearby help facility']].map(x=><article className="card help" key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p><button className="textBtn">Open →</button></article>)}</div>}
