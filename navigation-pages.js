(()=>{
 const menu=document.querySelector('.site-header .menu');const links=document.querySelector('.site-header .navlinks');
 // The homepage already has its own menu controller.
 if(menu&&links&&!document.getElementById('slides')){
  const close=()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'};
  menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'×':'☰'});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  menu.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){close();menu.focus()}});
 }
 const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
 const requested=new URLSearchParams(window.location.search).get('service')||new URLSearchParams(window.location.search).get('plan');
 document.querySelectorAll('.page-enquiry-form').forEach(form=>{
  const status=form.querySelector('.page-form-status');
  if(requested){const option=[...form.elements.plan.options].find(o=>o.value===requested||o.value.startsWith(requested+' —'));if(option)form.elements.plan.value=option.value}
  form.addEventListener('submit',()=>{form.elements._next.value=new URL('thank-you.html',window.location.href).href;status.textContent='Opening the submission service. Complete the spam check if prompted.'});
  const direct=form.querySelector('.page-direct-email');
  direct.addEventListener('click',()=>{const data=new FormData(form);const body=['HAS Networks enquiry','',...['name','mobile','city','pin','plan','message'].map(key=>`${key.toUpperCase()}: ${data.get(key)||'Not provided'}`)].join('\n');direct.href='mailto:deepak09kumaar@gmail.com?'+new URLSearchParams({cc:'hasnetworks1@gmail.com',subject:'HAS Networks enquiry',body}).toString().replace(/\+/g,'%20')});
 });
})();
