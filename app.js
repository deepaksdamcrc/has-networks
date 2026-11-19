const plans=[{name:'Basic',speed:50,price:499,tag:'Your everyday essential',image:'family',heading:'Internet for home.<br><em>Made for your day.</em>',desc:'Schoolwork, video calls and a film after dinner. Tell us how your household uses the internet, and we’ll help you choose a plan.'},{name:'Standard',speed:100,price:899,tag:'A little more of everything',image:'gaming',heading:'A busy home?<br><em>Give it more room.</em>',desc:'When more people are online at once, the right plan matters. Explore 100 Mbps broadband for your household’s everyday use.'},{name:'Business',speed:200,price:1299,tag:'For ideas that keep growing',image:'work',heading:'Internet for work.<br><em>Keep moving.</em>',desc:'Calls, emails, billing and cloud applications. Ask us about a 200 Mbps plan and the connection your workspace needs.'},{name:'Entertainment',speed:300,price:1699,tag:'Your home entertainment upgrade',image:'tv',heading:'Finish the day<br><em>with something good.</em>',desc:'Explore 300 Mbps broadband for a connected home. We’ll explain the available Smart TV and OTT options before you choose.'}];
const fmt=n=>n.toLocaleString('en-IN');
const planAppCatalog=[{name:'Netflix',key:'netflix',word:'N'},{name:'Prime Video',key:'prime',word:'prime<br>video'},{name:'JioHotstar',key:'hotstar',word:'✦<br>JioHotstar'},{name:'ZEE5',key:'zee5',word:'ZEE5'},{name:'Sun NXT',key:'sun',word:'SUN<br>NXT'},{name:'YuppTV',key:'yupp',word:'Yupp<span>TV</span>'}];
function appsForPlan(plan){return planAppCatalog.filter(app=>plan.price!==499||app.key!=='netflix')}
function renderPlanApps(plan){return `<div class="plan-ott"><p class="plan-ott-label">Also included <span title="OTT apps included as confirmed by HAS Networks. Provider activation and usage terms apply.">ⓘ</span></p><div class="plan-ott-row">${appsForPlan(plan).map(app=>`<span class="ott-badge ott-${app.key}" role="img" aria-label="${app.name}" title="${app.name}"><span aria-hidden="true">${app.word}</span></span>`).join('')}</div><p class="plan-ott-note">${plan.price===499?'5 OTT apps included':'6 OTT apps · Netflix included'}</p></div>`}

document.getElementById('slides').innerHTML=plans.map((p,i)=>`<article class="slide ${i===0?'active':''}" data-index="${i}" aria-hidden="${i!==0}"><div class="hero-content wrap"><div class="hero-copy"><p class="eyebrow"><span class="status-pulse"></span> THE HAS FIBER EXPERIENCE</p><h1>${p.heading}</h1><p class="hero-desc">${p.desc}</p><div class="hero-actions"><button class="btn" data-plan="${p.name}" ${i?'tabindex="-1"':''}>Get connected <span>↗</span></button><a href="#plans" class="hero-secondary" ${i?'tabindex="-1"':''}>Explore plans <span>↓</span></a></div><div class="hero-offer"><div class="hero-plan-summary"><small>${p.name.toUpperCase()} PLAN</small><b>₹${fmt(p.price)}<span> /month <span class="hero-gst">+ GST</span></span></b><strong>${p.speed}<span> Mbps · Unlimited internet</span></strong></div><div class="offer-assurance"><span>∞</span><small>Unlimited<br>possibilities.</small></div></div></div></div></article>`).join('');
document.querySelector('.slider-dots').innerHTML=plans.map((p,i)=>`<button class="${i===0?'active':''}" aria-label="Show ${p.name} offer" aria-pressed="${i===0}" data-slide="${i}"></button>`).join('');
document.getElementById('plan-grid').innerHTML=plans.map((p,i)=>`<article class="plan act-plan-card ${i===1?'featured':''}">${i===1?'<span class="popular">THE BALANCED CHOICE</span>':''}<div class="plan-top"><span class="plan-number">0${i+1}</span><span class="plan-glyph" aria-hidden="true">${['↗','⌁','▤','▷'][i]}</span></div><h3 class="plan-title">${p.name}</h3><p class="plan-tag">${p.tag}</p><div class="price"><span class="amount">₹${fmt(p.price)}</span> <small>/ month</small></div><p class="gst-label">+ GST</p><div class="speed">${p.speed}<span>Mbps</span></div><div class="speed-track"><span style="width:${[17,33,67,100][i]}%"></span></div><div class="plan-connection-strip"><img src="assets/router-3d.png" alt="Illustrative Wi-Fi router" loading="lazy"><div><b>Fiber broadband</b><small>Wi-Fi for your connected home</small></div></div>${renderPlanApps(p)}<ul><li>Unlimited internet</li><li>Fiber broadband connection</li><li>24 × 7 customer support</li></ul><p class="plan-use-case">${["For everyday browsing & calls","For a busy connected home","For your working day","For streaming & entertainment"][i]}</p><button class="btn" data-plan="${p.name}">Get connected <span>↗</span></button><p class="plan-availability">Check availability in your area</p><span class="plan-hover-shine" aria-hidden="true"></span><span class="plan-hover-art" aria-hidden="true"><img src="assets/${i===3?"plan-cinema-3d.png":"plan-home-3d.png"}" alt="" loading="lazy"></span></article>`).join('');
let current=0,paused=false,timer;
function show(i){current=(i+plans.length)%plans.length;document.querySelectorAll('.slide').forEach((s,j)=>{s.classList.toggle('active',j===current);s.setAttribute('aria-hidden',j!==current);s.querySelectorAll('button,a').forEach(el=>el.tabIndex=j===current?0:-1)});document.querySelectorAll('[data-slide]').forEach((b,j)=>{b.classList.toggle('active',j===current);b.setAttribute('aria-pressed',j===current)});document.getElementById('slide-num').textContent=String(current+1).padStart(2,'0');document.getElementById('scene-speed').textContent=plans[current].speed;document.querySelectorAll('[data-visual]').forEach((v,j)=>{v.classList.toggle('is-active',j===current);v.setAttribute('aria-hidden',String(j!==current))});document.querySelector('.hero').dataset.active=current}
function start(){clearInterval(timer);if(!paused&&!document.hidden&&!document.getElementById('enquiry').open)timer=setInterval(()=>show(current+1),5000)}
document.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{show(Number(b.dataset.slide));start()});document.getElementById('prev').onclick=()=>{show(current-1);start()};document.getElementById('next').onclick=()=>{show(current+1);start()};
const pause=document.getElementById('pause');function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow')};pause.onclick=()=>{paused=!paused;updatePause();start()};updatePause();start();document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(timer);else start()});
const dialog=document.getElementById('enquiry'),form=document.getElementById('enquiry-form');document.addEventListener('click',e=>{const b=e.target.closest('[data-plan],[data-service]');if(!b)return;const val=b.dataset.plan||b.dataset.service||'';form.elements.plan.value=[...form.elements.plan.options].find(o=>val&&o.value.startsWith(val))?.value||'';document.getElementById('form-status').textContent='';dialog.showModal();clearInterval(timer)});document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('close',start);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
form.addEventListener('submit',()=>{form.elements._next.value=new URL('thank-you.html',window.location.href).href;document.getElementById('form-status').textContent='Opening the submission service. Complete the spam verification if prompted.';});
const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'×':'☰'};nav.querySelectorAll('a,button').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.getElementById('year').textContent=new Date().getFullYear();
// Depth effects are progressive enhancements; touch and reduced-motion users get static layouts.
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
const scene=document.querySelector('.hero-scene');
let sceneFrame;
scene.addEventListener('pointermove',e=>{if(motionQuery.matches||!finePointer.matches)return;cancelAnimationFrame(sceneFrame);sceneFrame=requestAnimationFrame(()=>{const r=scene.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;scene.style.setProperty('--tilt-x',`${-y*9}deg`);scene.style.setProperty('--tilt-y',`${x*12}deg`)})});
scene.addEventListener('pointerleave',()=>{cancelAnimationFrame(sceneFrame);scene.style.setProperty('--tilt-x','0deg');scene.style.setProperty('--tilt-y','0deg')});
// Progressive flip interaction. Original cards remain available without JavaScript.
let activeFlipCard=null;
const flipControllers=new Map();
document.querySelectorAll('.service-tile').forEach((card,index)=>{
 const isPlan=card.classList.contains('plan');
 const name=card.querySelector(isPlan?'.plan-title':'h3').textContent.trim();
 const details=card.querySelector(isPlan?'.plan-tag':'.service-tile-body>p').textContent.trim();
 const inner=document.createElement('div');inner.className='flip-inner';
 const front=document.createElement('div');front.className='flip-face flip-front';
 while(card.firstChild)front.appendChild(card.firstChild);
 const reveal=document.createElement('button');reveal.type='button';reveal.className='flip-toggle';reveal.dataset.flipToggle='';reveal.textContent=isPlan?'Explore this plan ↻':'See how it helps ↻';reveal.setAttribute('aria-expanded','false');reveal.setAttribute('aria-controls',`flip-back-${index}`);
 (isPlan?front:front.querySelector('.service-tile-body')).appendChild(reveal);
 const back=document.createElement('div');back.className='flip-face flip-back';back.id=`flip-back-${index}`;back.inert=true;back.setAttribute('aria-hidden','true');
 const eyebrow=document.createElement('p');eyebrow.className='flip-eyebrow';eyebrow.textContent=isPlan?'YOUR PLAN, AT A GLANCE':'A CLOSER LOOK';back.appendChild(eyebrow);
 const title=document.createElement('h3');title.textContent=name;back.appendChild(title);
 const copy=document.createElement('p');copy.className='flip-description';copy.textContent=details;back.appendChild(copy);
 if(isPlan){
  const plan=plans.find(p=>p.name===name);
  const offer=document.createElement('div');offer.className='flip-offer';offer.innerHTML=`<b>₹${fmt(plan.price)} <small>+ GST / month</small></b><span>${plan.speed} Mbps · Unlimited internet</span>`;back.appendChild(offer);
  const note=document.createElement('p');note.className='flip-note';note.textContent='Tell us your location. We’ll confirm availability, equipment and installation before you decide.';back.appendChild(note);
  const choose=document.createElement('button');choose.type='button';choose.className='btn';choose.dataset.plan=name;choose.textContent=`Choose ${name.toLowerCase()} ↗`;back.appendChild(choose);
 }else{
  const note=document.createElement('p');note.className='flip-note';note.textContent='See how the service works, where it can help and what to discuss with our team.';back.appendChild(note);
  const link=document.createElement('a');link.className='btn';link.href=front.querySelector('h3 a').getAttribute('href');link.textContent='View service details ↗';back.appendChild(link);
 }
 const returnButton=document.createElement('button');returnButton.type='button';returnButton.className='flip-toggle flip-return';returnButton.dataset.flipToggle='';returnButton.textContent='↶ Back to overview';back.appendChild(returnButton);
 inner.append(front,back);card.appendChild(inner);card.classList.remove('depth-card');card.classList.add('flip-ready');
 let pinned=false;
 function setFlipped(value,moveFocus=false){
  if(value&&activeFlipCard&&activeFlipCard!==card)flipControllers.get(activeFlipCard).close();
  card.classList.toggle('is-flipped',value);front.inert=value;back.inert=!value;
  front.setAttribute('aria-hidden',String(value));back.setAttribute('aria-hidden',String(!value));reveal.setAttribute('aria-expanded',String(value));
  if(value)activeFlipCard=card;else if(activeFlipCard===card)activeFlipCard=null;
  if(moveFocus)(value?back.querySelector('.btn'):reveal).focus({preventScroll:true});
 }
 flipControllers.set(card,{close(){pinned=false;setFlipped(false)}});
 card.addEventListener('pointerenter',()=>{if(finePointer.matches){pinned=false;setFlipped(true)}});
 card.addEventListener('pointerleave',()=>{if(!pinned&&!card.contains(document.activeElement))setFlipped(false)});
 card.addEventListener('click',e=>{const toggle=e.target.closest('[data-flip-toggle]');if(!toggle)return;e.preventDefault();const next=!card.classList.contains('is-flipped');pinned=next;setFlipped(next,true)});
 card.addEventListener('keydown',e=>{if(e.key==='Escape'&&card.classList.contains('is-flipped')){e.preventDefault();e.stopPropagation();pinned=false;setFlipped(false,true)}});
 card.addEventListener('focusout',()=>queueMicrotask(()=>{if(!card.contains(document.activeElement)){pinned=false;setFlipped(false)}}));
});

document.querySelectorAll('.depth-card').forEach(card=>{let frame;card.addEventListener('pointermove',e=>{if(motionQuery.matches||!finePointer.matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--card-x',`${(0.5-y)*5}deg`);card.style.setProperty('--card-y',`${(x-0.5)*7}deg`);card.style.setProperty('--shine-x',`${x*100}%`);card.style.setProperty('--shine-y',`${y*100}%`)})});card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);card.style.setProperty('--card-x','0deg');card.style.setProperty('--card-y','0deg')})});
const revealTargets=document.querySelectorAll('.section-head,.service-card,.service-list,.why-grid,.faq-section,.network-copy');
if('IntersectionObserver' in window&&!motionQuery.matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:0.08});revealTargets.forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
motionQuery.addEventListener('change',e=>{if(e.matches){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))}});

window.addEventListener('pageshow',start);

// Service-page links carry the enquiry context back to the main form.
const requestedService=new URLSearchParams(window.location.search).get('service');
if(requestedService&&[...form.elements.plan.options].some(o=>o.value===requestedService)){form.elements.plan.value=requestedService;dialog.showModal();clearInterval(timer)}

// Fallback opens the visitor's mail app; the visitor reviews and sends the message.
const directEmail=document.getElementById('direct-enquiry-email');
directEmail.addEventListener('click',()=>{const data=new FormData(form);const body=['HAS Networks enquiry','',...['name','mobile','city','pin','plan','message'].map(key=>`${key.toUpperCase()}: ${data.get(key)||'Not provided'}`)].join('\n');directEmail.href='mailto:deepak09kumaar@gmail.com?'+new URLSearchParams({cc:'hasnetworks1@gmail.com',subject:'HAS Networks enquiry',body}).toString().replace(/\+/g,'%20')});

