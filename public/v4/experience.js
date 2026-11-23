/* Buildvix — Peach-inspired atmospheric digital experience. No third-party runtime. */
(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  const clamp = (v,a,b) => Math.min(b, Math.max(a,v));
  const lerp = (a,b,t) => a + (b-a)*t;
  const year = $('#year');if(year) year.textContent = new Date().getFullYear();
  const progress = $('#scroll-progress');
  const header = $('#header');
  const mobile = $('#mobile-nav');
  const toggle = $('#menu-toggle');
  function setMenu(open){
    toggle?.setAttribute('aria-expanded',String(open));
    toggle?.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    mobile?.classList.toggle('is-open',open);
    if(mobile) mobile.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true')setMenu(false);});
  addEventListener('resize',()=>{if(innerWidth>990)setMenu(false);},{passive:true});
  let scrollQueued=false;
  function updateScroll(){
    scrollQueued=false;
    const total=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    if(progress)progress.style.transform='scaleX('+clamp(scrollY/total,0,1)+')';
    header?.classList.toggle('is-scrolled',scrollY>40);
  }
  addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
  updateScroll();
  const reveals=$$('.reveal');
  if('IntersectionObserver' in window && !reduced.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px 40px 0px'});
    reveals.forEach(el=>observer.observe(el));
    document.documentElement.classList.add('js-motion');
    setTimeout(()=>{reveals.forEach(el=>el.classList.add('is-visible'));},2800);
  }else reveals.forEach(el=>el.classList.add('is-visible'));

  const services=[
    {name:'Web experiences',description:'Expressive, responsive websites and immersive digital storefronts made to stand out and perform beautifully.',image:'/assets/work/buildvix_web.webp',alt:'Buildvix web experience visual'},
    {name:'Custom software',description:'Tailor-made applications, business platforms, dashboards and smart automation designed to solve real problems.',image:'/assets/work/buildvix_platform.webp',alt:'Buildvix software product visual'},
    {name:'Brand & UI/UX',description:'Distinctive visual identities, elegant interfaces and product experiences shaped around how real people think.',image:'/assets/work/buildvix_mobile.webp',alt:'Buildvix user interface visual'},
    {name:'Digital growth',description:'Creative campaigns, social-first storytelling and digital systems to connect your brand with its audience.',image:'/assets/work/buildvix_social.webp',alt:'Buildvix digital growth visual'}
  ];
  const serviceImage=$('#service-image');let activeService=0;
  $$('.service-tab').forEach(btn=>btn.addEventListener('click',()=>{
    const i=Number(btn.dataset.service);
    if(!Number.isInteger(i)||i<0||i>=services.length||i===activeService)return;
    activeService=i;
    $$('.service-tab').forEach(b=>{const isSelected=Number(b.dataset.service)===i;b.classList.toggle('is-active',isSelected);b.setAttribute('aria-pressed',String(isSelected));});
    const s=services[i];$('#service-name').textContent=s.name;$('#service-description').textContent=s.description;$('#service-count').textContent='EXPERIENCE '+String(i+1).padStart(2,'0')+' / 04';
    serviceImage.style.opacity='.23';const image=new Image();
    image.onload=()=>{if(activeService===i){serviceImage.src=s.image;serviceImage.alt=s.alt;serviceImage.style.opacity='1';}};
    image.onerror=()=>{if(activeService===i){serviceImage.alt=s.alt;serviceImage.style.opacity='1';}};
    image.src=s.image;
  }));

  const projects=[
    {name:'Web, reimagined.',category:'01 / IMMERSIVE WEB',image:'/assets/work/buildvix_web.webp',description:'A Buildvix visual exploration of expressive websites, interactive storytelling and modern responsive digital experiences.'},
    {name:'Systems that scale.',category:'02 / BESPOKE SOFTWARE',image:'/assets/work/buildvix_platform.webp',description:'Our approach to custom software products, from dashboards and connected business tools to scalable platforms. This is a visual capability preview.'},
    {name:'Made for people.',category:'03 / PRODUCT & UI/UX',image:'/assets/work/buildvix_mobile.webp',description:'Product interfaces built for clarity, confidence and genuine ease of use, represented by a visual from our design library.'},
    {name:'Beyond the screen.',category:'04 / CLOUD & INTEGRATION',image:'/assets/work/buildvix_cloud.webp',description:'A creative-technology visual exploring connected systems and platforms that grow with the business.'}
  ];
  const dialog=$('#project-dialog');
  $$('.work-card__trigger').forEach(btn=>btn.addEventListener('click',()=>{
    const p=projects[Number(btn.dataset.project)];
    if(!p||!dialog||typeof dialog.showModal!=='function')return;
    $('#dialog-image').src=p.image;$('#dialog-image').alt=p.name;$('#dialog-title').textContent=p.name;$('#dialog-type').textContent=p.category;$('#dialog-description').textContent=p.description;
    dialog.showModal();
  }));
  $('#dialog-close')?.addEventListener('click',()=>dialog.close());
  $('#dialog-contact')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    const cat=btn.dataset.filter;
    $$('.filter').forEach(f=>{const selected=f===btn;f.classList.toggle('is-active',selected);f.setAttribute('aria-pressed',String(selected));});
    $$('.work-card').forEach(card=>{
      card.hidden=cat!=='all'&&card.dataset.category!==cat;
      card.style.marginTop=cat==='all'?'':'0px';
    });
  }));

  const form=$('#contact-form');const status=$('#form-status');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=$('#name'),email=$('#email'),message=$('#message'),service=$('#service');
    if(!name.value.trim()){status.textContent='Please enter your name.';name.focus();return;}
    if(!email.value.trim()||!email.validity.valid){status.textContent='Please enter a valid email address.';email.focus();return;}
    if(!message.value.trim()){status.textContent='Tell us a little about your idea.';message.focus();return;}
    const button=$('#contact-submit');button.disabled=true;button.textContent='Sending your idea…';status.textContent='Connecting with Buildvix…';
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
    try{
      const response=await fetch('https://formsubmit.co/ajax/buildvixion@gmail.com',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},signal:controller.signal,
        body:JSON.stringify({name:name.value.trim(),email:email.value.trim(),message:message.value.trim(),service:service.value,_subject:'Buildvix — New project inquiry',_captcha:'false'})
      });
      if(!response.ok)throw Error('Provider did not confirm delivery');
      const result=await response.json();
      if(result.success===false||result.success==='false')throw Error('Provider rejected the inquiry');
      status.textContent='Your inquiry was submitted. We look forward to connecting!';form.reset();
    }catch(err){
      status.innerHTML='We could not confirm delivery. Please email <a href="mailto:contact@buildvix.in">contact@buildvix.in</a> or use WhatsApp.';
    }finally{clearTimeout(timeout);button.disabled=false;button.innerHTML='Send your idea <span aria-hidden="true">↗</span>';}
  });

  // Calm atmospheric parallax, separate from the actual WebGL camera.
  const portal=$('#hero-portal');const hero=$('#home');
  const pointer={x:0,y:0,px:0,py:0};let frame=0,active=true;
  document.addEventListener('pointermove',e=>{
    if(coarse.matches||reduced.matches)return;
    pointer.x=(e.clientX/Math.max(1,innerWidth)-.5)*2;
    pointer.y=(e.clientY/Math.max(1,innerHeight)-.5)*2;
  },{passive:true});
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??true;}).observe(hero);}
  function motion(){frame=requestAnimationFrame(motion);if(!active||document.hidden||reduced.matches||!portal)return;
    pointer.px=lerp(pointer.px,pointer.x,.04);pointer.py=lerp(pointer.py,pointer.y,.04);
    const slide=clamp(scrollY/Math.max(1,hero.offsetHeight),0,1);
    portal.style.transform='translate3d('+(pointer.px*9).toFixed(1)+'px,'+(-slide*72+pointer.py*6).toFixed(1)+'px,0) scale('+(1+slide*.06).toFixed(3)+')';
    portal.style.opacity=String(1-slide*.44);
  }
  if(!reduced.matches)frame=requestAnimationFrame(motion);
  addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
})();