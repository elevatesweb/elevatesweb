
(() => {
  const menu=document.querySelector('.menu'), nav=document.getElementById('links');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const setMenu=open=>{nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');};
  document.getElementById('year').textContent=new Date().getFullYear();
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.nav'))setMenu(false);});
  const desktop=matchMedia('(min-width: 1024px)');desktop.addEventListener('change',()=>setMenu(false));
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.06});
    document.documentElement.classList.add('motion-ready');
    items.forEach(el=>observer.observe(el));
    reduced.addEventListener('change',e=>{if(e.matches){document.documentElement.classList.remove('motion-ready');observer.disconnect();}});
  }
  const header=document.querySelector('.nav'),top=document.querySelector('.back-top');
  let queued=false;
  const updateScroll=()=>{header.classList.toggle('scrolled',scrollY>24);top.classList.toggle('shown',scrollY>650);queued=false;};
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
  if('IntersectionObserver' in window){
    const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px',threshold:0});
    document.querySelectorAll('section[id]').forEach(el=>sectionObserver.observe(el));
  }
  document.querySelectorAll('.expertise-item > a').forEach((a,i)=>a.addEventListener('click',()=>{document.getElementById('service').selectedIndex=i;}));
  document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('service').value=a.dataset.service;}));
  document.getElementById('inquiry').addEventListener('input',()=>{document.querySelector('.form-status').textContent='';});
  document.getElementById('inquiry').addEventListener('submit',e=>{
    e.preventDefault();const form=e.currentTarget,data=new FormData(form);
    const name=String(data.get('name')).trim(),email=String(data.get('email')).trim(),message=String(data.get('message')).trim();
    const status=form.querySelector('.form-status');
    if(!name||!email||!message){status.textContent='Please enter your name, email and project details.';return;}
    const service=String(data.get('service')),phone=String(data.get('phone')).trim();
    const body='Name: '+name+'\nEmail: '+email+'\nPhone: '+(phone||'Not provided')+'\nService: '+service+'\n\nProject details:\n'+message;
    if(e.submitter?.value==='whatsapp'){
      window.open('https://wa.me/916355775579?text='+encodeURIComponent('Project Inquiry — '+service+'\n\n'+body),'_blank','noopener,noreferrer');
      status.textContent='Continue in WhatsApp to review and send your inquiry.';
    }else{
      location.href='mailto:elevatessolution@gmail.com?subject='+encodeURIComponent('Project Inquiry — '+service)+'&body='+encodeURIComponent(body);
      status.textContent='Your email app will open with a draft. Review it and press Send; if it does not open, use WhatsApp or the email link.';
    }
  });
})();
