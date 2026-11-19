// Both faces are the same approved card. Content and button actions are preserved.
(()=>{
 const cards=[...document.querySelectorAll('.plans > .plan.act-plan-card')];
 const controllers=new Map();let active=null;
 cards.forEach(card=>{
  const shell=document.createElement('div');shell.className='same-plan-flip';shell.tabIndex=0;shell.setAttribute('role','group');shell.setAttribute('aria-expanded','false');shell.setAttribute('aria-label',card.querySelector('.plan-title').textContent.trim()+' plan. Press Enter to turn the card.');
  const rotor=document.createElement('div');rotor.className='same-plan-rotor';
  const back=card.cloneNode(true);back.removeAttribute('id');back.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  card.before(shell);card.classList.add('same-plan-face','same-plan-front');back.classList.add('same-plan-face','same-plan-back');
  card.setAttribute('aria-hidden','false');back.setAttribute('aria-hidden','true');back.inert=true;rotor.append(card,back);shell.appendChild(rotor);
  function turn(on){
   if(on&&active&&active!==shell)controllers.get(active)(false);
   const hidden=on?card:back;const shown=on?back:card;const transfer=hidden.contains(document.activeElement);
   shell.classList.toggle('is-turned',on);shell.classList.toggle('show-front',!on);shell.setAttribute('aria-expanded',String(on));
   card.inert=on;back.inert=!on;card.setAttribute('aria-hidden',String(on));back.setAttribute('aria-hidden',String(!on));
   if(on)active=shell;else if(active===shell)active=null;
   if(transfer)shown.querySelector('button,a,[tabindex]')?.focus({preventScroll:true});
  }
  controllers.set(shell,turn);
  const enter=event=>{if(event?.pointerType==='touch'||event?.sourceCapabilities?.firesTouchEvents)return;turn(true)};
  const leave=event=>{if(event?.pointerType==='touch')return;turn(false);shell.classList.remove('show-front')};
  shell.addEventListener('pointerenter',enter);shell.addEventListener('mouseenter',enter);
  shell.addEventListener('pointermove',event=>{if(event.pointerType!=='touch'&&!shell.classList.contains('is-turned')&&!shell.classList.contains('show-front'))turn(true)});
  shell.addEventListener('pointerleave',leave);shell.addEventListener('mouseleave',leave);
  shell.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target===shell){event.preventDefault();turn(!shell.classList.contains('is-turned'))}else if(event.key==='Escape'){turn(false)}});
  shell.addEventListener('click',event=>{if(window.matchMedia('(hover:none)').matches&&!event.target.closest('button,a,input,select,textarea'))turn(!shell.classList.contains('is-turned'))});
  shell.addEventListener('focusout',()=>queueMicrotask(()=>{if(!shell.contains(document.activeElement))turn(false)}));
  shell.classList.add('same-plan-ready');
 });
})();
