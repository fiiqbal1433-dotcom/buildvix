/* Buildvix V2 — genuine native WebGL sculptural hero.
   Shader / mesh renderer is self-contained: no CDN, no 3rd-party runtime, no external 3D model.
   SVG remains visible unless WebGL compiles and successfully renders its first frame. */
(() => {
  'use strict';
  const canvas = document.getElementById('sculpture-canvas');
  const stage = document.getElementById('hero-stage');
  const hero = document.getElementById('home');
  if (!canvas || !stage || !hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  // Keep the complete site usable when graphics drivers block WebGL or users
  // request reduced effects. The existing SVG sculpture remains visible.
  const params = new URLSearchParams(location.search);
  const lightMode = params.get('lite') === '1' || params.get('no3d') === '1';
  const lowMemory = Number(navigator.deviceMemory || 8) <= 2;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  if (lightMode || reduce.matches || lowMemory || saveData) {
    stage.classList.add('is-lightweight');
    return;
  }
  let gl;
  try { gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: true, preserveDrawingBuffer: false, premultipliedAlpha: false, powerPreference: 'high-performance' }) || canvas.getContext('experimental-webgl'); } catch { return; }
  if (!gl) return;

  const vert = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform mat4 uModel;
    uniform float uTime;
    uniform float uVibration;
    varying vec3 vNormal;
    varying vec3 vWorld;
    varying float vHeight;
    void main(){
      vec3 p=aPosition;
      p.x+=sin(aPosition.y*3.4+uTime*.7+aPosition.z*2.0)*.018*uVibration;
      p.z+=cos(aPosition.x*3.0+uTime*.5)*.016*uVibration;
      vec4 world=uModel*vec4(p,1.0);
      vWorld=world.xyz;
      vNormal=normalize(mat3(uModel)*aNormal);
      vHeight=aPosition.y;
      gl_Position=uProjection*uView*world;
    }`;
  const frag = `
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vWorld;
    varying float vHeight;
    uniform float uTime;
    uniform float uMaterial;
    uniform float uAlpha;
    void main(){
      vec3 n=normalize(vNormal);
      vec3 viewDir=normalize(vec3(0.3,.4,8.5)-vWorld);
      float fresnel=pow(1.-abs(dot(n,viewDir)),2.7);
      vec3 light1=normalize(vec3(-.5,.8,1.));
      vec3 light2=normalize(vec3(.75,-.3,.8));
      vec3 light3=normalize(vec3(-.8,-.35,-.8));
      float diff1=max(0.,dot(n,light1));
      float diff2=max(0.,dot(n,light2));
      float diff3=max(0.,dot(n,light3));
      float spec1=pow(max(0.,dot(reflect(-light1,n),viewDir)),62.);
      float spec2=pow(max(0.,dot(reflect(-light2,n),viewDir)),90.);
      float stripe=pow(max(0.,sin(vWorld.y*4.5+vWorld.x*2.7+vWorld.z*5.5+uTime*.12)),16.);
      vec3 chrome=vec3(.07,.115,.1)+diff1*vec3(.48,.59,.55)+diff2*vec3(.22,.5,.31)+diff3*vec3(.19,.28,.22);
      chrome+=spec1*vec3(1.15,1.4,1.2)+spec2*vec3(.94,1.2,1.0);
      chrome+=fresnel*vec3(.53,.84,.62)+stripe*vec3(.4,.88,.47);
      float greenPulse=.56+.44*sin(vWorld.y*1.7+vWorld.z*2.0+uTime*.48);
      vec3 emerald=vec3(.01,.12,.025)+diff1*vec3(.04,.93,.14)+diff2*vec3(.35,.89,.19)+spec1*vec3(.67,1.3,.7);
      emerald+=fresnel*vec3(.07,1.16,.23)*greenPulse+stripe*vec3(.2,1.2,.25);
      vec3 color=mix(chrome,emerald,step(.5,uMaterial));
      color=pow(color,vec3(.86));
      gl_FragColor=vec4(color,uAlpha);
    }`;
  const lineVert = `attribute vec3 aPosition; uniform mat4 uProjection;uniform mat4 uView;uniform mat4 uModel;void main(){gl_Position=uProjection*uView*uModel*vec4(aPosition,1.);}`;
  const lineFrag = `precision mediump float;uniform vec4 uColor;void main(){gl_FragColor=uColor;}`;

  function compile(type, src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const why=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(why);}return s;}
  function link(vs,fs){const p=gl.createProgram();const v=compile(gl.VERTEX_SHADER,vs),f=compile(gl.FRAGMENT_SHADER,fs);gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);gl.deleteShader(v);gl.deleteShader(f);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;}
  let shader, lineShader;
  try{shader=link(vert,frag);lineShader=link(lineVert,lineFrag);}catch(e){console.warn('Buildvix 3D shader fallback',e);return;}
  const loc = (p,n)=>gl.getUniformLocation(p,n);
  const attrs = {position:gl.getAttribLocation(shader,'aPosition'),normal:gl.getAttribLocation(shader,'aNormal')};
  const uni = {projection:loc(shader,'uProjection'),view:loc(shader,'uView'),model:loc(shader,'uModel'),time:loc(shader,'uTime'),material:loc(shader,'uMaterial'),alpha:loc(shader,'uAlpha'),vibration:loc(shader,'uVibration')};
  const line = {position:gl.getAttribLocation(lineShader,'aPosition'),projection:loc(lineShader,'uProjection'),view:loc(lineShader,'uView'),model:loc(lineShader,'uModel'),color:loc(lineShader,'uColor')};
  const mkbuf=(data,target)=>{const b=gl.createBuffer();gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);return b;};
  const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const normalized=a=>{const n=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/n,a[1]/n,a[2]/n];};
  const I=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  function multiply(a,b){const out=new Float32Array(16);for(let j=0;j<4;j++)for(let k=0;k<4;k++)for(let m=0;m<4;m++)out[j*4+k]+=a[m*4+k]*b[j*4+m];return out;}
  const rotX=a=>new Float32Array([1,0,0,0,0,Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1]);
  const rotY=a=>new Float32Array([Math.cos(a),0,-Math.sin(a),0,0,1,0,0,Math.sin(a),0,Math.cos(a),0,0,0,1]);
  const rotZ=a=>new Float32Array([Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1,0,0,0,0,1]);
  const translate=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);
  function projection(fov,ratio,near,far){const f=1/Math.tan(fov/2),r=1/(near-far);return new Float32Array([f/ratio,0,0,0,0,f,0,0,0,0,(far+near)*r,-1,0,0,2*far*near*r,0]);}

  function makeSurface(fn,uSteps=50,vSteps=20){
    const coords=[],norms=[],indices=[];
    for(let i=0;i<=uSteps;i++)for(let j=0;j<=vSteps;j++){
      const u=i/uSteps,v=2*j/vSteps-1;
      const p=fn(u,v),pu=fn(Math.min(1,u+.004),v),pv=fn(u,Math.min(1,v+.008));
      let n=normalized(cross(sub(pu,p),sub(pv,p)));
      coords.push(...p);norms.push(...n);
    }
    for(let i=0;i<uSteps;i++)for(let j=0;j<vSteps;j++){
      const a=i*(vSteps+1)+j,b=(i+1)*(vSteps+1)+j;
      indices.push(a,b,a+1,a+1,b,b+1);
    }
    return {position:mkbuf(new Float32Array(coords),gl.ARRAY_BUFFER),normal:mkbuf(new Float32Array(norms),gl.ARRAY_BUFFER),index:mkbuf(new Uint16Array(indices),gl.ELEMENT_ARRAY_BUFFER),count:indices.length};
  }
  // Shells grow from a shared emerald centre and spiral into reflective, tapered silver blades.
  function petalFunction(k,inner=false){
    const phi=k*Math.PI*2/7;
    return(u,v)=>{
      const t=Math.sin(Math.PI*Math.max(.002,Math.min(.998,u)));
      const wing=(inner?.48:.83)*Math.pow(t,.72)*(1+.12*Math.sin(k*2.1));
      const twist=phi+u*(inner?.38:.74)+Math.sin(u*2.1+k)*.18+v*wing;
      const radius=inner?.30+u*.6: .24+u*1.27+Math.sin(u*4+k)*.09;
      const pointy=1-Math.pow(Math.abs(v),2)*.3;
      const r=radius*pointy;
      const height=(inner?3.05:4.0)*(u-.48)+(inner?.28:.35)*v*v*Math.sin(u*4+k);
      return[Math.cos(twist)*r, height, Math.sin(twist)*r+.14*Math.sin(u*7+k+v*2)];
    };
  }
  function addVortex(){const out=[];for(let k=0;k<7;k++)out.push({mesh:makeSurface(petalFunction(k,false)),material:0,alpha:.94,offset:k});for(let k=0;k<7;k++)out.push({mesh:makeSurface(petalFunction(k,true),36,16),material:1,alpha:.98,offset:k});return out;}
  const parts=addVortex();
  function orbit(t,r,tilt,phase){const x=r*Math.cos(t),y=.28*Math.sin(t*2+phase),z=r*Math.sin(t);const c=Math.cos(tilt),s=Math.sin(tilt);return [x,y*c-z*s,y*s+z*c];}
  const orbits=[];
  function createOrbit(r,tilt,phase,col){const data=[];for(let i=0;i<=320;i++)data.push(...orbit(i/320*Math.PI*2,r,tilt,phase));orbits.push({buffer:mkbuf(new Float32Array(data),gl.ARRAY_BUFFER),count:321,col});}
  createOrbit(2.27,.52,.4,[.07,1,.2,.82]);createOrbit(2.07,-.64,2,[.68,.96,.72,.5]);createOrbit(2.56,.16,3,[.18,.79,.29,.3]);
  const dust=[];let seed=8873;function rand(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;}
  for(let i=0;i<130;i++){dust.push((rand()-.5)*9,(rand()-.5)*7,(rand()-.5)*3-1);}
  const dustBuffer=mkbuf(new Float32Array(dust),gl.ARRAY_BUFFER);
  let ratio=1,dpr=1,proj=I();
  function resize(){const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return;dpr=Math.min(window.devicePixelRatio||1,innerWidth<720?1:1.35);canvas.width=Math.max(1,Math.min(1800,Math.floor(b.width*dpr)));canvas.height=Math.max(1,Math.min(1400,Math.floor(b.height*dpr)));gl.viewport(0,0,canvas.width,canvas.height);ratio=canvas.width/canvas.height;proj=projection((innerWidth<750?57:47)*Math.PI/180,ratio,.1,60);}
  resize();window.addEventListener('resize',resize,{passive:true});
  const pointer={x:0,y:0,rx:0,ry:0};
  addEventListener('pointermove',e=>{if(coarse.matches)return;pointer.x=(e.clientX/innerWidth-.5)*2;pointer.y=(.5-e.clientY/innerHeight)*2;},{passive:true});
  const view=translate(0,0,-8.1);
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  let start=performance.now(),last=0,animation=0,hasRendered=false,visible=true,contextLost=false;
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries=>visible=entries[0]?.isIntersecting??true,{threshold:0})
    : null;
  observer?.observe(hero);
  function render(now){
    if(contextLost)return;
    if(!reduce.matches)animation=requestAnimationFrame(render);
    if(document.hidden||!visible)return;
    if(!reduce.matches&&now-last<15)return;last=now;
    const time=reduce.matches?1.3:(now-start)/1000;
    const progress=Math.max(0,Math.min(1,scrollY/Math.max(hero.offsetHeight,1)));
    pointer.rx+=(pointer.x-pointer.rx)*.07;pointer.ry+=(pointer.y-pointer.ry)*.07;
    const yaw=time*.13+pointer.rx*.33+progress*1.1;
    const pitch=.16+pointer.ry*.18+progress*.34;
    const model=multiply(translate(0,.05-progress*.4,0),multiply(rotY(yaw),multiply(rotX(pitch),rotZ(.1+Math.sin(time*.3)*.06))));
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shader);gl.uniformMatrix4fv(uni.projection,false,proj);gl.uniformMatrix4fv(uni.view,false,view);gl.uniformMatrix4fv(uni.model,false,model);gl.uniform1f(uni.time,time);gl.uniform1f(uni.vibration,reduce.matches?0:1);
    for(const part of parts){
      gl.bindBuffer(gl.ARRAY_BUFFER,part.mesh.position);gl.enableVertexAttribArray(attrs.position);gl.vertexAttribPointer(attrs.position,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,part.mesh.normal);gl.enableVertexAttribArray(attrs.normal);gl.vertexAttribPointer(attrs.normal,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,part.mesh.index);
      gl.uniform1f(uni.material,part.material);gl.uniform1f(uni.alpha,part.alpha);
      gl.drawElements(gl.TRIANGLES,part.mesh.count,gl.UNSIGNED_SHORT,0);
    }
    gl.depthMask(false);gl.useProgram(lineShader);gl.uniformMatrix4fv(line.projection,false,proj);gl.uniformMatrix4fv(line.view,false,view);
    const identity=I();gl.uniformMatrix4fv(line.model,false,multiply(rotY(time*.06),multiply(rotX(.1),identity)));
    for(const o of orbits){gl.bindBuffer(gl.ARRAY_BUFFER,o.buffer);gl.enableVertexAttribArray(line.position);gl.vertexAttribPointer(line.position,3,gl.FLOAT,false,0,0);gl.uniform4fv(line.color,new Float32Array(o.col));gl.drawArrays(gl.LINE_STRIP,0,o.count);}
    gl.uniformMatrix4fv(line.model,false,identity);gl.uniform4fv(line.color,new Float32Array([.47,.81,.54,.35]));gl.bindBuffer(gl.ARRAY_BUFFER,dustBuffer);gl.vertexAttribPointer(line.position,3,gl.FLOAT,false,0,0);gl.drawArrays(gl.POINTS,0,dust.length/3);
    gl.depthMask(true);
    if(!hasRendered){hasRendered=true;stage.classList.add('has-webgl');}
  }
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;cancelAnimationFrame(animation);stage.classList.remove('has-webgl');},{passive:false});
  canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;resize();start=performance.now();animation=requestAnimationFrame(render);});
  try {render(performance.now());} catch(e){
    console.warn('Buildvix 3D renderer fallback:',e);
    contextLost=true;cancelAnimationFrame(animation);
    stage.classList.remove('has-webgl');stage.classList.add('is-lightweight');
    return;
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!reduce.matches&&!contextLost){cancelAnimationFrame(animation);animation=requestAnimationFrame(render);}});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(animation);observer?.disconnect();},{once:true});
  reduce.addEventListener?.('change',()=>{cancelAnimationFrame(animation);animation=requestAnimationFrame(render);});
})();