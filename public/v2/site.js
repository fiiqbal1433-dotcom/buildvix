
/* BUILDVIX V2 — motion & interaction engine. No runtime framework or animation dependency. */
(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const prefersMotion = () => !reduceMotion.matches;
  const state = { pointer: { x: 0, y: 0 }, smoothPointer: { x: 0, y: 0 }, scroll: 0, scrollTarget: 0, width: innerWidth, height: innerHeight, active: true, motion: prefersMotion() };
  document.documentElement.classList.add('js-motion');

  const intro = $('#intro');
  const revealIntro = () => { intro?.classList.add('is-gone'); $('.hero')?.classList.add('is-ready'); };
  if (!prefersMotion()) revealIntro();
  else {
    const id = setTimeout(revealIntro, 1550);
    window.addEventListener('pagehide', () => clearTimeout(id), { once: true });
  }
  $('#year').textContent = String(new Date().getFullYear());
  const toggle = $('#menu-toggle');
  const mobile = $('#mobile-nav');
  let menuOpen = false;
  function setMenu(open) {
    menuOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobile.classList.toggle('is-open', open);
    mobile.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle?.addEventListener('click', () => setMenu(!menuOpen));
  $$('#mobile-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) setMenu(false);
  });
  window.addEventListener('resize', () => { if (innerWidth > 780 && menuOpen) setMenu(false); }, { passive: true });

  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.10, rootMargin: '0px 0px 35px 0px' });
    reveals.forEach(node => observer.observe(node));
  } else reveals.forEach(node => node.classList.add('is-visible'));

  const services = [
    { title: 'Web Experiences', text: 'Immersive websites, beautiful storefronts, and high-performance digital platforms that people remember.', image: '/assets/work/buildvix_web.webp', alt: 'Buildvix web experience preview' },
    { title: 'Custom Software', text: 'Tailor-made SaaS, business dashboards, smart automation and scalable products built for the real world.', image: '/assets/work/buildvix_platform.webp', alt: 'Buildvix software platform preview' },
    { title: 'Brand & UI/UX', text: 'Distinctive identities, user-first digital interfaces and creative systems with serious personality.', image: '/assets/work/buildvix_mobile.webp', alt: 'Buildvix mobile user experience preview' },
    { title: 'Digital Growth', text: 'Creative campaigns, content systems and social-first experiences designed to reach the right people.', image: '/assets/work/buildvix_social.webp', alt: 'Buildvix digital growth preview' }
  ];
  let serviceIndex = 0;
  const serviceImg = $('#service-image');
  const serviceTitle = $('#service-title');
  const serviceDescription = $('#service-description');
  const serviceCounter = $('#service-counter');
  $$('.service-choice').forEach(btn => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.service);
    if (!Number.isInteger(i) || i < 0 || i >= services.length || i === serviceIndex) return;
    serviceIndex = i;
    $$('.service-choice').forEach(b => {
      const selected = Number(b.dataset.service) === i;
      b.classList.toggle('is-active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    const next = services[i];
    serviceImg.style.opacity = '0.25';
    const preload = new Image();
    preload.onload = () => { if (serviceIndex === i) { serviceImg.src = next.image; serviceImg.alt = next.alt; serviceImg.style.opacity = '1'; } };
    preload.onerror = () => { if (serviceIndex === i) serviceImg.style.opacity = '1'; };
    preload.src = next.image;
    serviceTitle.textContent = next.title;
    serviceDescription.textContent = next.text;
    serviceCounter.textContent = String(i + 1).padStart(2, '0');
  }));

  function arrangeProjects() {
    const visible = $$('.work-card:not([hidden])');
    visible.forEach(card => card.style.marginTop = '0');
  }
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.filter;
    $$('.filter').forEach(b => {
      const selected = b === btn;
      b.classList.toggle('is-active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    $$('.work-card').forEach(card => { card.hidden = target !== 'all' && card.dataset.category !== target; });
    if (target !== 'all') arrangeProjects();
    else $$('.work-card').forEach(card => card.style.marginTop = '');
  }));
  const projectData = [
    { title: 'Digital, reimagined.', category: '01 / INTERACTIVE WEB', desc: 'From thoughtful front-end design to expressive interactive experiences, we build digital spaces that leave an impression. This is a representative visual from the existing Buildvix library.', image: '/assets/work/buildvix_web.webp' },
    { title: 'Built beyond the browser.', category: '02 / SOFTWARE SYSTEMS', desc: 'Custom dashboards, business systems and scalable product foundations engineered around the way teams actually work. Illustrated with the existing Buildvix platform visual.', image: '/assets/work/buildvix_platform.webp' },
    { title: 'Designed for humans.', category: '03 / PRODUCT EXPERIENCE', desc: 'Responsive interfaces and product journeys designed to feel effortless and memorable on every screen. This is a visual capability preview.', image: '/assets/work/buildvix_mobile.webp' },
    { title: 'Made to scale.', category: '04 / CLOUD INFRASTRUCTURE', desc: 'Cloud-minded architecture, API integrations and technical foundations that can grow alongside ambitious products. This is a visual capability preview.', image: '/assets/work/buildvix_cloud.webp' }
  ];
  const dialog = $('#project-dialog');
  $$('#work [data-open-project]').forEach(btn => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.openProject);
    const p = projectData[i];
    if (!p || !dialog?.showModal) return;
    $('#dialog-image').src = p.image;
    $('#dialog-image').alt = p.title;
    $('#dialog-category').textContent = p.category;
    $('#dialog-title').textContent = p.title;
    $('#dialog-description').textContent = p.desc;
    dialog.showModal();
  }));
  $('#dialog-close')?.addEventListener('click', () => dialog.close());
  $('#dialog-contact')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  const form = $('#inquiry-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#inquiry-name');
    const email = $('#inquiry-email');
    const message = $('#inquiry-project');
    const status = $('#inquiry-status');
    const submit = $('.inquiry-form__submit');
    if (!name.value.trim()) { status.textContent = 'Please enter your name.'; name.focus(); return; }
    if (!email.validity.valid || !email.value.trim()) { status.textContent = 'Please enter a valid email address.'; email.focus(); return; }
    if (!message.value.trim()) { status.textContent = 'Please tell us a little about your idea.'; message.focus(); return; }
    const data = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
      _subject: 'Buildvix V2 — New project inquiry',
      _captcha: 'false'
    };
    submit.disabled = true;
    status.textContent = 'Sending your idea...';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      let response;
      try {
        response = await fetch('https://formsubmit.co/ajax/buildvixion@gmail.com', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data), signal: controller.signal
        });
      } finally { clearTimeout(timeout); }
      if (!response.ok) throw Error('Submission failed');
      const result = await response.json();
      if (result.success === false || result.success === 'false') throw Error('Submission failed');
      status.textContent = 'Your inquiry was sent. Thank you — we look forward to connecting.';
      form.reset();
    } catch {
      status.innerHTML = 'The form could not confirm delivery. Please email <a href="mailto:contact@buildvix.in">contact@buildvix.in</a> directly.';
    } finally { submit.disabled = false; }
  });

  const cursor = $('#cursor');
  let pointerSeen = false, cursorX = -100, cursorY = -100, hovering = false;
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    pointerSeen = true;
    state.pointer.x = (e.clientX / Math.max(1, innerWidth) - .5) * 2;
    state.pointer.y = (.5 - e.clientY / Math.max(1, innerHeight)) * 2;
    state.rawX = e.clientX; state.rawY = e.clientY;
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
  document.addEventListener('pointerover', e => {
    hovering = Boolean(e.target.closest('a,button,input,textarea,[role="button"]'));
    cursor.classList.toggle('is-hover', hovering);
  });
  document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));
  document.addEventListener('visibilitychange', () => { state.active = !document.hidden; });

  const scrollProgress = $('#scroll-progress');
  function onScroll() {
    const full = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    state.scrollTarget = clamp(scrollY / full, 0, 1);
    state.scroll = scrollY;
    scrollProgress.style.transform = 'scaleX(' + state.scrollTarget + ')';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Native WebGL: procedural metallic knot / elliptical orbit, no network calls.
     The hero always has a graceful CSS/typographic fallback if WebGL is unavailable. */
  function setupSculpture() {
    const canvas = $('#universe');
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, depth: true, premultipliedAlpha: false, powerPreference: 'high-performance' });
    if (!gl) return null;
    const vertSrc = [
      'attribute vec3 aPos;',
      'attribute vec3 aNorm;',
      'uniform mat4 uProj;',
      'uniform mat4 uModel;',
      'uniform mat4 uView;',
      'varying vec3 vNormal;',
      'varying vec3 vPos;',
      'void main(){',
      ' vec4 w = uModel * vec4(aPos,1.);',
      ' vPos=w.xyz; vNormal=normalize(mat3(uModel)*aNorm);',
      ' gl_Position=uProj*uView*w;',
      '}'
    ].join('\n');
    const fragSrc = [
      'precision mediump float;',
      'varying vec3 vNormal;',
      'varying vec3 vPos;',
      'uniform vec3 uColor;',
      'uniform vec3 uLight;',
      'uniform float uTime;',
      'uniform float uOpacity;',
      'void main(){',
      ' vec3 n=normalize(vNormal);',
      ' vec3 l=normalize(uLight-vPos);',
      ' float diffuse=max(0., dot(n,l));',
      ' vec3 eye=normalize(vec3(0.,0.,11.)-vPos);',
      ' float fresnel=pow(1.-abs(dot(eye,n)),2.5);',
      ' vec3 halfWay=normalize(l+eye);',
      ' float spec=pow(max(dot(n,halfWay),0.),52.);',
      ' float streak=pow(max(0., sin(vPos.y*3.8 + vPos.x*2.3 + uTime*.7)),12.)*.2;',
      ' vec3 base=uColor*(.14+diffuse*.62)+vec3(1.,.91,.96)*spec*1.4+vec3(.77,.58,1.)*fresnel*.75+uColor*streak;',
      ' gl_FragColor=vec4(base,uOpacity);',
      '}'
    ].join('\n');
    const lineVert = [
      'attribute vec3 aPos;',
      'uniform mat4 uProj; uniform mat4 uView; uniform mat4 uModel;',
      'void main(){ gl_Position=uProj*uView*uModel*vec4(aPos,1.); }'
    ].join('\n');
    const lineFrag = [
      'precision mediump float;',
      'uniform vec4 uTint;',
      'void main(){gl_FragColor=uTint;}'
    ].join('\n');

    function shader(type, source) {
      const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw Error('Shader failed: '+gl.getShaderInfoLog(s));
      return s;
    }
    function program(v,f) {
      const p=gl.createProgram(), vs=shader(gl.VERTEX_SHADER,v), fs=shader(gl.FRAGMENT_SHADER,f);
      gl.attachShader(p,vs); gl.attachShader(p,fs); gl.linkProgram(p);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(p,gl.LINK_STATUS)) throw Error('Link failed: '+gl.getProgramInfoLog(p));
      return p;
    }
    let mainProgram, wireProgram;
    try { mainProgram=program(vertSrc,fragSrc); wireProgram=program(lineVert,lineFrag); }
    catch(e) { console.warn('Buildvix 3D fallback:',e); return null; }
    const mainLoc = { pos: gl.getAttribLocation(mainProgram,'aPos'), norm:gl.getAttribLocation(mainProgram,'aNorm'), proj:gl.getUniformLocation(mainProgram,'uProj'), view:gl.getUniformLocation(mainProgram,'uView'), model:gl.getUniformLocation(mainProgram,'uModel'), color:gl.getUniformLocation(mainProgram,'uColor'), light:gl.getUniformLocation(mainProgram,'uLight'), time:gl.getUniformLocation(mainProgram,'uTime'), opacity:gl.getUniformLocation(mainProgram,'uOpacity') };
    const wireLoc = { pos:gl.getAttribLocation(wireProgram,'aPos'), proj:gl.getUniformLocation(wireProgram,'uProj'), view:gl.getUniformLocation(wireProgram,'uView'), model:gl.getUniformLocation(wireProgram,'uModel'), tint:gl.getUniformLocation(wireProgram,'uTint') };
    function makeMesh(path, length, radial, tube, twist=0) {
      const pos=[],norm=[],ind=[];
      for(let i=0;i<=length;i++) {
        const t=i/length*Math.PI*2;
        const p=path(t), p2=path(t+.004);
        const dir=normalize(sub(p2,p));
        let ref=Math.abs(dir[1])>.92?[1,0,0]:[0,1,0];
        let right=normalize(cross(dir,ref)),up=normalize(cross(dir,right));
        for(let j=0;j<=radial;j++){
          let a=j/radial*Math.PI*2+t*twist;
          let normal=add(scale(right,Math.cos(a)),scale(up,Math.sin(a)));
          let r=typeof tube==='function'?tube(t):tube;
          pos.push(...add(p,scale(normal,r)));norm.push(...normal);
        }
      }
      for(let i=0;i<length;i++) for(let j=0;j<radial;j++) {
        const a=i*(radial+1)+j,b=(i+1)*(radial+1)+j;
        ind.push(a,b,a+1,b,b+1,a+1);
      }
      const position=gl.createBuffer(), normals=gl.createBuffer(), indices=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,position);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pos),gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER,normals);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(norm),gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indices);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(ind),gl.STATIC_DRAW);
      return { position, normals, indices, count:ind.length };
    }
    function makeLines(path,points) {
      const vertices=[];for(let i=0;i<=points;i++)vertices.push(...path(i/points*Math.PI*2));
      const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
      return {position:buf,count:points+1};
    }
    function add(a,b){return [a[0]+b[0],a[1]+b[1],a[2]+b[2]];}
    function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}
    function scale(a,s){return [a[0]*s,a[1]*s,a[2]*s];}
    function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
    function normalize(a){let n=Math.hypot(...a)||1;return scale(a,1/n);}
    const path = t => {
      let q=2*t, p=3*t, r=1.12+.36*Math.cos(q);
      return [r*Math.cos(p),r*Math.sin(p),.57*Math.sin(q)+.34*Math.sin(t*5)];
    };
    const path2 = t => [1.75*Math.cos(t),.95*Math.sin(t),.48*Math.sin(t*2)];
    const path3 = t => [1.42*Math.cos(t),1.5*Math.sin(t),.22*Math.cos(t*3)];
    const knot=makeMesh(path,290,12,t=>.27+.065*Math.sin(5*t),.22);
    const orbit1=makeMesh(path2,180,7,.038),orbit2=makeMesh(path3,180,6,.025);
    const thinLines=[
      makeLines(t=>[2.0*Math.cos(t),.8*Math.sin(t),-.7+.15*Math.cos(t*2)],280),
      makeLines(t=>[1.35*Math.cos(t),1.8*Math.sin(t),.2*Math.sin(t*3)],280)
    ];
    // Deterministic starfield behind the sculpture, no random frames.
    let seed=1773;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    const stars=[];
    for(let i=0;i<170;i++){let x=(random()-.5)*13,y=(random()-.5)*8,z=-2.5-random()*4;stars.push(x,y,z);}
    const starBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,starBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(stars),gl.STATIC_DRAW);
    const ident=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    function mult(a,b) {
      let o=new Float32Array(16);
      for(let col=0;col<4;col++) for(let row=0;row<4;row++) for(let k=0;k<4;k++)o[col*4+row]+=a[k*4+row]*b[col*4+k];
      return o;
    }
    const rotX=a=>new Float32Array([1,0,0,0,0,Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1]);
    const rotY=a=>new Float32Array([Math.cos(a),0,-Math.sin(a),0,0,1,0,0,Math.sin(a),0,Math.cos(a),0,0,0,0,1]);
    const rotZ=a=>new Float32Array([Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1]);
    const translate=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);
    const perspective=(fov,ratio,near,far)=>{
      let f=1/Math.tan(fov/2),n=1/(near-far);
      return new Float32Array([f/ratio,0,0,0,0,f,0,0,0,0,(far+near)*n,-1,0,0,2*far*near*n,0]);
    };
    let width=0,height=0,pixelRatio=1,proj=ident(),running=true;
    function resize(){
      const bounds=canvas.getBoundingClientRect();
      const mobile=bounds.width<650;
      const maxRatio=mobile?1.25:1.65;
      pixelRatio=Math.min(devicePixelRatio||1,maxRatio);
      width=Math.max(1,Math.floor(bounds.width*pixelRatio));
      height=Math.max(1,Math.floor(bounds.height*pixelRatio));
      canvas.width=width;canvas.height=height;
      gl.viewport(0,0,width,height);
      proj=perspective(mobile?1.00:.83,width/height,.1,100);
    }
    resize();addEventListener('resize',resize,{passive:true});
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    const bindMatrix=(loc,model,view)=>{gl.uniformMatrix4fv(loc.proj,false,proj);gl.uniformMatrix4fv(loc.view,false,view);gl.uniformMatrix4fv(loc.model,false,model);};
    const drawMesh=(mesh,model,view,color,time,opacity=1)=>{
      gl.useProgram(mainProgram);bindMatrix(mainLoc,model,view);
      gl.uniform3fv(mainLoc.color,new Float32Array(color));
      gl.uniform3fv(mainLoc.light,new Float32Array([2.5,4.0,5.5]));
      gl.uniform1f(mainLoc.time,time);
      gl.uniform1f(mainLoc.opacity,opacity);
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(mainLoc.pos);gl.vertexAttribPointer(mainLoc.pos,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normals);gl.enableVertexAttribArray(mainLoc.norm);gl.vertexAttribPointer(mainLoc.norm,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.indices);gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_SHORT,0);
    };
    const drawWire=(mesh,model,view,tint,mode=gl.LINE_STRIP)=>{
      gl.useProgram(wireProgram);bindMatrix(wireLoc,model,view);
      gl.uniform4fv(wireLoc.tint,new Float32Array(tint));
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(wireLoc.pos);gl.vertexAttribPointer(wireLoc.pos,3,gl.FLOAT,false,0,0);
      gl.drawArrays(mode,0,mesh.count);
    };
    let raf,previous=0,time=0,frameInterval=1000/60;
    function render(now){
      if (!running) return;
      raf=requestAnimationFrame(render);
      if (!state.active || !state.motion) return;
      if (now-previous<frameInterval) return;
      const dt=Math.min(.05,(now-previous)/1000||.016);previous=now;time+=dt;
      gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      state.smoothPointer.x=lerp(state.smoothPointer.x,coarse.matches?0:state.pointer.x,.045);
      state.smoothPointer.y=lerp(state.smoothPointer.y,coarse.matches?0:state.pointer.y,.045);
      const mobile=state.width<780;
      const heroHeight=Math.max(1,$('.hero').offsetHeight);
      const heroProgress=clamp(state.scroll/heroHeight,0,1);
      const originX=mobile?0.0:1.85,originY=mobile?1.1:.25;
      const scaleScene=mobile?.83:1.12;
      const offset=translate(originX+state.smoothPointer.x*.12,originY+state.smoothPointer.y*.10,0);
      let model=mult(offset,mult(rotY(time*.16+state.smoothPointer.x*.35+heroProgress*1.1),mult(rotX(.34+state.smoothPointer.y*.23+heroProgress*.65),rotZ(-.24+Math.sin(time*.18)*.15))));
      const scaleMatrix=new Float32Array([scaleScene,0,0,0,0,scaleScene,0,0,0,0,scaleScene,0,0,0,0,1]);
      model=mult(model,scaleMatrix);
      const view=translate(0,0,mobile?-8.3:-8.2+heroProgress*-.8);
      // Fade sculpture near end of hero while keeping native page scrolling.
      const fade=1-clamp((heroProgress-.75)/.25,0,1);
      if(fade<=.001){canvas.style.opacity='0';return;}else canvas.style.opacity=String(fade);
      drawMesh(knot,model,view,[.64,.38,1],time);
      drawMesh(orbit1,mult(model,rotX(.24)),view,[.85,.91,1],time,.95);
      drawMesh(orbit2,mult(model,rotZ(-.42)),view,[.75,1,.31],time,.9);
      gl.depthMask(false);
      thinLines.forEach((line,i)=>drawWire(line,mult(model,rotY(i?-.32:.4)),view,i?[.78,.9,1,.45]:[.85,1,.25,.65]));
      if(!mobile){
        const starModel=translate(0,0,0);
        drawWire({position:starBuffer,count:stars.length/3},starModel,view,[.70,.70,.82,.55],gl.POINTS);
      }
      gl.depthMask(true);
    }
    if(!state.motion){canvas.style.opacity='.7'; // Static 3D composition for reduced motion
      gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const model=mult(translate(state.width<780?0:1.8,state.width<780?1:.3,0),mult(rotX(.4),rotY(.55)));
      drawMesh(knot,model,translate(0,0,-8),[.64,.38,1],0);
      drawMesh(orbit1,model,translate(0,0,-8),[.85,.91,1],0);
    }else raf=requestAnimationFrame(render);
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();running=false;cancelAnimationFrame(raf);canvas.style.opacity='0';});
    return {stop:()=>{running=false;cancelAnimationFrame(raf);}};
  }
  let sculpture=null;
  try { sculpture=setupSculpture(); } catch(e) { console.warn('Buildvix: 3D is unavailable; standard design remains accessible.',e); }

  let raf;
  function frame(){
    raf=requestAnimationFrame(frame);
    state.width=innerWidth;state.height=innerHeight;
    if(pointerSeen && !coarse.matches){
      cursorX=lerp(cursorX,state.rawX,.2);
      cursorY=lerp(cursorY,state.rawY,.2);
      cursor.style.transform='translate3d('+(cursorX-(hovering?22:7.5))+'px,'+(cursorY-(hovering?22:7.5))+'px,0)';
    }
  }
  if(prefersMotion()) raf=requestAnimationFrame(frame);
  addEventListener('pagehide',()=>{cancelAnimationFrame(raf);sculpture?.stop();});
})();
