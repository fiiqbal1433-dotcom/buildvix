/* BUILDVIX V2 — website interaction / navigation / working contact and project flows. */
(() => {
  'use strict';
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q,root=document) => Array.from(root.querySelectorAll(q));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  const lerp = (a,b,t) => a+(b-a)*t;
  document.documentElement.classList.add('js-motion');
  $('#year').textContent = String(new Date().getFullYear());
  const header = $('#header');
  const progress = $('#progress');
  const hero = $('#home');
  const stage = $('#hero-stage');
  const menuButton = $('#menu-button');
  const menu = $('#mobile-menu');
  let open = false;
  function setMenu(value) {
    open = value;
    menuButton.setAttribute('aria-expanded',String(value));
    menuButton.setAttribute('aria-label',value?'Close navigation':'Open navigation');
    menu.classList.toggle('is-open',value);
    menu.inert = !value;
    document.body.style.overflow = value ? 'hidden' : '';
  }
  menuButton.addEventListener('click',()=>setMenu(!open));
  $$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open)setMenu(false)});
  window.addEventListener('resize',()=>{if(open&&innerWidth>790)setMenu(false)},{passive:true});

  const links = $$('.nav__link');
  const sections = ['home','services','work','process','studio','contact'].map(id=>document.getElementById(id)).filter(Boolean);
  function onScroll() {
    const total = Math.max(1,document.documentElement.scrollHeight-innerHeight);
    progress.style.transform = `scaleX(${clamp(scrollY/total,0,1)})`;
    header.classList.toggle('scrolled',scrollY>60);
    const point=scrollY+innerHeight*.35;
    let active='home';
    for(const sec of sections)if(sec.offsetTop<=point)active=sec.id;
    for(const a of links)a.classList.toggle('is-active',a.getAttribute('href')==='#'+active);
  }
  onScroll();addEventListener('scroll',onScroll,{passive:true});
  const reveals = $$('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      for(const e of entries)if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}
    },{threshold:.07,rootMargin:'0px 0px 50px 0px'});
    reveals.forEach(el=>observer.observe(el));
  } else reveals.forEach(el=>el.classList.add('is-visible'));
  if(reduced.matches)reveals.forEach(el=>el.classList.add('is-visible'));

  const services = [
    {name:'Web Experiences',image:'/assets/work/buildvix_web.webp',alt:'Illustrative Buildvix website design preview',copy:'Performance-first websites, interactive front ends, immersive WebGL and e-commerce experiences that stand apart.'},
    {name:'Custom Software',image:'/assets/work/buildvix_platform.webp',alt:'Illustrative Buildvix custom software platform preview',copy:'Tailor-made SaaS, business systems, dashboards, integrations and automation that solves real problems.'},
    {name:'UI/UX & Identity',image:'/assets/work/buildvix_mobile.webp',alt:'Illustrative Buildvix mobile interface preview',copy:'Interfaces that feel effortless, confident visual identities and product experiences built around people.'},
    {name:'Digital Growth',image:'/assets/work/buildvix_social.webp',alt:'Illustrative Buildvix digital social branding preview',copy:'Creative content, brand storytelling, digital campaigns and social-first experiences designed to reach the right audience.'}
  ];
  let selectedService=0;
  const serviceImage = $('#service-image');
  function selectService(i) {
    if(!Number.isInteger(i)||i<0||i>=services.length||i===selectedService)return;
    selectedService=i;
    $$('.service').forEach(button=>{const active=Number(button.dataset.service)===i;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
    const s=services[i];
    $('#service-name').textContent=s.name;
    $('#service-copy').textContent=s.copy;
    $('#service-index').textContent=String(i+1).padStart(2,'0')+' / 04';
    serviceImage.style.opacity='.25';
    const img=new Image();
    img.onload=()=>{if(i!==selectedService)return;serviceImage.src=s.image;serviceImage.alt=s.alt;serviceImage.style.opacity='1';};
    img.onerror=()=>{if(i===selectedService)serviceImage.style.opacity='1';};
    img.src=s.image;
  }
  $$('.service').forEach(button=>button.addEventListener('click',()=>selectService(Number(button.dataset.service))));

  const projectInfo = [
    {name:'Digital Reimagined',type:'01 / IMMERSIVE WEB EXPERIENCES',image:'/assets/work/buildvix_web.webp',copy:'A visual preview of the kinds of immersive websites and responsive front-end experiences we can design and engineer for ambitious brands.'},
    {name:'Systems Built to Scale',type:'02 / CUSTOM SOFTWARE',image:'/assets/work/buildvix_platform.webp',copy:'A visual exploration of scalable platforms, product dashboards and software interfaces. Buildvix approaches software with both engineering discipline and creative intent.'},
    {name:'Made for People',type:'03 / UI & PRODUCT EXPERIENCE',image:'/assets/work/buildvix_mobile.webp',copy:'Digital product design shaped around ease of use, personality and everyday interaction, shown using artwork from our visual library.'},
    {name:'Intelligence in Motion',type:'04 / DASHBOARDS & AUTOMATION',image:'/assets/work/buildvix_dashboard.webp',copy:'A look at the potential of clear data interfaces, operational systems and connected software. Reach out to discuss a real project in depth.'}
  ];
  const dialog = $('#project-dialog');
  $$('.project__trigger').forEach(b=>b.addEventListener('click',()=>{
    const p=projectInfo[Number(b.dataset.project)];
    if(!p||typeof dialog.showModal!=='function')return;
    $('#dialog-image').src=p.image;$('#dialog-image').alt=p.name;
    $('#dialog-title').textContent=p.name;
    $('#dialog-category').textContent=p.type;
    $('#dialog-description').textContent=p.copy;
    dialog.showModal();
  }));
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  $('#dialog-contact').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  $$('.filter').forEach(filter=>filter.addEventListener('click',()=>{
    const category=filter.dataset.filter;
    $$('.filter').forEach(f=>{const active=f===filter;f.classList.toggle('is-active',active);f.setAttribute('aria-pressed',String(active));});
    $$('.project').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;});
  }));

  const form=$('#contact-form');const status=$('#form-status');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=$('#name'),email=$('#email'),message=$('#message'),category=$('#category');
    if(!name.value.trim()){status.textContent='Please enter your name.';name.focus();return;}
    if(!email.validity.valid||!email.value.trim()){status.textContent='Please enter a valid email address.';email.focus();return;}
    if(!message.value.trim()){status.textContent='Please describe your idea.';message.focus();return;}
    const submit=$('.contact-form__submit');submit.disabled=true;submit.textContent='SENDING…';status.textContent='Sending your project inquiry…';
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
    try{
      const res=await fetch('https://formsubmit.co/ajax/buildvixion@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:controller.signal,body:JSON.stringify({name:name.value.trim(),email:email.value.trim(),message:message.value.trim(),category:category.value,_subject:'Buildvix V2 — New project inquiry',_captcha:'false'})});
      if(!res.ok)throw Error('Could not confirm submission');
      const data=await res.json();
      if(data.success===false||data.success==='false')throw Error('Provider did not accept submission');
      status.textContent='Your inquiry was submitted. We look forward to connecting.';form.reset();
    }catch(err){
      status.innerHTML='We could not confirm delivery. Please email <a href="mailto:contact@buildvix.in">contact@buildvix.in</a> directly.';
    }finally{clearTimeout(timer);submit.disabled=false;submit.innerHTML='SEND YOUR IDEA <span aria-hidden="true">↗</span>';}
  });

  // Cursor and scroll motion. Transform is limited to the hero while the 3D renderer also rotates on scroll.
  const cursor=$('#cursor'),ring=$('#cursor-ring');
  const pointer={x:-200,y:-200,tx:-200,ty:-200,hover:false};
  let stageOffset=0,stageTarget=0;
  document.addEventListener('pointermove',e=>{if(coarse.matches)return;pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});
  document.addEventListener('pointerover',e=>{pointer.hover=!!e.target.closest('a,button,input,textarea,select');ring.classList.toggle('is-hover',pointer.hover);});
  document.addEventListener('pointerleave',()=>{pointer.x=-200;pointer.y=-200;});
  const tiltProjects=$$('.project__art');
  tiltProjects.forEach(art=>{
    art.addEventListener('pointermove',e=>{
      if(coarse.matches||reduced.matches)return;
      const r=art.getBoundingClientRect(),px=(e.clientX-r.left)/Math.max(1,r.width)-.5,py=(e.clientY-r.top)/Math.max(1,r.height)-.5;
      art.style.setProperty('--tilt-x',(-py*4).toFixed(2)+'deg');art.style.setProperty('--tilt-y',(px*5).toFixed(2)+'deg');
    });
    art.addEventListener('pointerleave',()=>{art.style.setProperty('--tilt-x','0deg');art.style.setProperty('--tilt-y','0deg');});
  });
  let raf;
  function draw(){raf=requestAnimationFrame(draw);
    if(document.hidden||reduced.matches)return;
    if(!coarse.matches){
      pointer.tx=lerp(pointer.tx,pointer.x,.24);pointer.ty=lerp(pointer.ty,pointer.y,.24);
      cursor.style.transform=`translate3d(${pointer.x-4.5}px,${pointer.y-4.5}px,0)`;
      ring.style.transform=`translate3d(${pointer.tx-(pointer.hover?32:19)}px,${pointer.ty-(pointer.hover?32:19)}px,0)`;
    }
    const progress=clamp(scrollY/Math.max(1,hero.offsetHeight),0,1);
    stageTarget=progress*100;
    stageOffset=lerp(stageOffset,stageTarget,.065);
    stage.style.transform=`translate3d(0,${(-stageOffset).toFixed(1)}px,0) scale(${(1+progress*.08).toFixed(3)})`;
    stage.style.opacity=String(clamp(1-progress*.52,.42,1));
  }
  if(!reduced.matches)raf=requestAnimationFrame(draw);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
})();