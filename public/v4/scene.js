/* Buildvix Digital Portal: self-contained, GPU-adaptive native WebGL sculpture.
   An SVG fallback is deliberately retained for devices without safe WebGL. */
(() => {
  'use strict';
  const stage=document.getElementById('hero-portal');
  const canvas=document.getElementById('portal-canvas');
  const hero=document.getElementById('home');
  if(!stage||!canvas||!hero)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const coarse=matchMedia('(pointer: coarse)');
  const query=new URLSearchParams(location.search);
  if(reduce.matches||query.get('lite')==='1'||query.get('no3d')==='1'||(navigator.connection&&navigator.connection.saveData)||Number(navigator.deviceMemory||8)<=2)return;
  let gl;
  try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,preserveDrawingBuffer:false,powerPreference:'low-power',premultipliedAlpha:false});}catch{}
  if(!gl)return;
  const vert=`
    attribute vec3 aPosition; attribute vec3 aNormal;
    uniform mat4 uModel,uView,uProjection;
    varying vec3 vNormal,vWorld;
    void main(){
      vec4 world=uModel*vec4(aPosition,1.0);
      vWorld=world.xyz;
      vNormal=normalize(mat3(uModel)*aNormal);
      gl_Position=uProjection*uView*world;
    }`;
  const frag=`
    precision mediump float;
    varying vec3 vNormal,vWorld;
    uniform float uMaterial,uTime,uAlpha;
    uniform vec3 uEye;
    void main(){
      vec3 n=normalize(vNormal);
      vec3 eye=normalize(uEye-vWorld);
      vec3 top=normalize(vec3(-.3,.9,1.2));
      vec3 side=normalize(vec3(.9,-.15,.6));
      float a=max(0.,dot(n,top)),b=max(0.,dot(n,side));
      float rim=pow(1.-abs(dot(eye,n)),2.4);
      float gleam=pow(max(dot(reflect(-top,n),eye),0.),58.);
      float sharp=pow(max(dot(reflect(-side,n),eye),0.),130.);
      float stripe=pow(max(sin(vWorld.x*2.8+vWorld.y*4.6+vWorld.z*3.5+uTime*.08),0.),22.);
      vec3 pearl=vec3(.26,.34,.64)+a*vec3(.35,.39,.37)+b*vec3(.3,.1,.28);
      pearl+=rim*vec3(.64,.67,1.0)+gleam*vec3(1.3,1.3,1.45)+sharp*vec3(1.0,1.2,1.35);
      pearl+=stripe*vec3(.15,.18,.35);
      vec3 crystal=vec3(.11,.34,.59)+a*vec3(.2,.3,.31)+b*vec3(.26,.18,.47);
      crystal+=rim*vec3(.62,.88,1.0)+gleam*vec3(1.1,1.4,1.5)+sharp*vec3(1.2,1.0,1.5);
      vec3 chrome=vec3(.13,.15,.27)+a*vec3(.57,.6,.68)+b*vec3(.24,.3,.46);
      chrome+=rim*vec3(.77,.8,1.0)+gleam*vec3(1.8,1.8,1.8)+sharp*vec3(.9,1.1,1.2);
      vec3 color=mix(pearl,crystal,step(.5,uMaterial));
      color=mix(color,chrome,step(1.5,uMaterial));
      color=pow(max(color,vec3(0.)),vec3(.84));
      gl_FragColor=vec4(color,uAlpha);
    }`;
  const lineVert='attribute vec3 aPosition;uniform mat4 uView,uProjection,uModel;void main(){gl_Position=uProjection*uView*uModel*vec4(aPosition,1.);gl_PointSize=2.;}';
  const lineFrag='precision mediump float;uniform vec4 uTint;void main(){gl_FragColor=uTint;}';
  function shader(type,code){const o=gl.createShader(type);gl.shaderSource(o,code);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(o));return o;}
  function program(v,f){const p=gl.createProgram(),vs=shader(gl.VERTEX_SHADER,v),fs=shader(gl.FRAGMENT_SHADER,f);gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;}
  let shaded,wire;
  try{shaded=program(vert,frag);wire=program(lineVert,lineFrag);}catch(e){console.warn('Buildvix: 3D fallback enabled',e);return;}
  const uniform=(p,n)=>gl.getUniformLocation(p,n);
  const posLoc=gl.getAttribLocation(shaded,'aPosition'),normLoc=gl.getAttribLocation(shaded,'aNormal');
  const U={model:uniform(shaded,'uModel'),view:uniform(shaded,'uView'),projection:uniform(shaded,'uProjection'),material:uniform(shaded,'uMaterial'),alpha:uniform(shaded,'uAlpha'),time:uniform(shaded,'uTime'),eye:uniform(shaded,'uEye')};
  const WL={pos:gl.getAttribLocation(wire,'aPosition'),model:uniform(wire,'uModel'),view:uniform(wire,'uView'),projection:uniform(wire,'uProjection'),color:uniform(wire,'uTint')};
  const buffer=(arr,target)=>{const b=gl.createBuffer();gl.bindBuffer(target,b);gl.bufferData(target,arr,gl.STATIC_DRAW);return b;};
  function mesh(points,normals,indices){return{position:buffer(new Float32Array(points),gl.ARRAY_BUFFER),normal:buffer(new Float32Array(normals),gl.ARRAY_BUFFER),indices:buffer(new Uint16Array(indices),gl.ELEMENT_ARRAY_BUFFER),count:indices.length};}
  function torus(R,r,segments=104,tube=26,ripple=0){
    const p=[],n=[],ind=[];
    for(let i=0;i<=segments;i++)for(let j=0;j<=tube;j++){
      const u=i/segments*Math.PI*2,v=j/tube*Math.PI*2,co=Math.cos(u),si=Math.sin(u),cv=Math.cos(v),sv=Math.sin(v);
      const warp=r*(1+ripple*Math.sin(6*u+3*v));
      p.push((R+warp*cv)*co,(R+warp*cv)*si,warp*sv);
      n.push(co*cv,si*cv,sv);
    }
    for(let i=0;i<segments;i++)for(let j=0;j<tube;j++){
      const a=i*(tube+1)+j,b=(i+1)*(tube+1)+j;ind.push(a,b,a+1,b,b+1,a+1);
    }
    return mesh(p,n,ind);
  }
  function sphere(R,segments=40,rings=22){const p=[],n=[],ind=[];
    for(let i=0;i<=segments;i++)for(let j=0;j<=rings;j++){
      let u=i/segments*Math.PI*2,v=j/rings*Math.PI;
      let x=Math.cos(u)*Math.sin(v),y=Math.cos(v),z=Math.sin(u)*Math.sin(v);
      const wobble=1+.045*Math.sin(6*u+2*v)*Math.sin(v);
      p.push(x*R*wobble,y*R*wobble,z*R*wobble);n.push(x,y,z);
    }
    for(let i=0;i<segments;i++)for(let j=0;j<rings;j++){
      const a=i*(rings+1)+j,b=(i+1)*(rings+1)+j;ind.push(a,a+1,b,a+1,b+1,b);
    }
    return mesh(p,n,ind);
  }
  function wireLoop(r,tilt,phase){const p=[];for(let i=0;i<=310;i++){const a=i/310*Math.PI*2;const y=.18*Math.cos(a*3+phase);const z=r*Math.sin(a),x=r*Math.cos(a);p.push(x,y*Math.cos(tilt)-z*Math.sin(tilt),y*Math.sin(tilt)+z*Math.cos(tilt));}return{position:buffer(new Float32Array(p),gl.ARRAY_BUFFER),count:311};}
  const major=torus(1.23,.36,118,32,.025),inner=torus(.95,.17,96,24,.01),orbitMesh=torus(1.81,.071,122,16),orbitMesh2=torus(2.15,.034,130,10),core=sphere(.72,48,26),satellite=sphere(.20,20,12);
  const orbits=[wireLoop(2.28,.64,.3),wireLoop(2.05,-.53,.7)];
  const multiply=(a,b)=>{const out=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)out[c*4+r]+=a[k*4+r]*b[c*4+k];return out;};
  const rotX=a=>new Float32Array([1,0,0,0,0,Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1]);
  const rotY=a=>new Float32Array([Math.cos(a),0,-Math.sin(a),0,0,1,0,0,Math.sin(a),0,Math.cos(a),0,0,0,0,1]);
  const rotZ=a=>new Float32Array([Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1,0,0,0,0,1]);
  const translate=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);
  const perspective=(fov,ratio,n,f)=>{const cot=1/Math.tan(fov/2),nf=1/(n-f);return new Float32Array([cot/ratio,0,0,0,0,cot,0,0,0,0,(f+n)*nf,-1,0,0,2*f*n*nf,0]);};
  const identity=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  const eye=new Float32Array([0,0,9.1]);const view=translate(0,0,-8.8);
  let proj=identity(),width=0,height=0;
  function resize(){const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
    const dpr=Math.min(devicePixelRatio||1,innerWidth<700?1:1.3);
    width=canvas.width=Math.max(1,Math.min(1450,Math.round(rect.width*dpr)));
    height=canvas.height=Math.max(1,Math.min(1300,Math.round(rect.height*dpr)));
    gl.viewport(0,0,width,height);proj=perspective((innerWidth<700?49:45)*Math.PI/180,width/height,.1,50);
  }
  resize();addEventListener('resize',resize,{passive:true});
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  const pointer={x:0,y:0,sx:0,sy:0};
  document.addEventListener('pointermove',e=>{if(coarse.matches)return;pointer.x=(e.clientX/Math.max(1,innerWidth)-.5)*2;pointer.y=(.5-e.clientY/Math.max(1,innerHeight))*2;},{passive:true});
  function draw(mesh,model,material,time,alpha=1){
    gl.useProgram(shaded);gl.uniformMatrix4fv(U.model,false,model);gl.uniformMatrix4fv(U.view,false,view);gl.uniformMatrix4fv(U.projection,false,proj);gl.uniform1f(U.material,material);gl.uniform1f(U.alpha,alpha);gl.uniform1f(U.time,time);gl.uniform3fv(U.eye,eye);
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(posLoc);gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal);gl.enableVertexAttribArray(normLoc);gl.vertexAttribPointer(normLoc,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.indices);gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_SHORT,0);
  }
  function drawLines(line,model,col){gl.useProgram(wire);gl.uniformMatrix4fv(WL.model,false,model);gl.uniformMatrix4fv(WL.view,false,view);gl.uniformMatrix4fv(WL.projection,false,proj);gl.uniform4fv(WL.color,new Float32Array(col));gl.bindBuffer(gl.ARRAY_BUFFER,line.position);gl.enableVertexAttribArray(WL.pos);gl.vertexAttribPointer(WL.pos,3,gl.FLOAT,false,0,0);gl.drawArrays(gl.LINE_STRIP,0,line.count);}
  let active=true,contextLost=false,raf=0,last=0,started=performance.now(),hasFrame=false;
  let observer=null;
  if('IntersectionObserver'in window){observer=new IntersectionObserver(e=>{active=e[0]?.isIntersecting??true;});observer.observe(hero);}
  function render(now){if(contextLost)return;raf=requestAnimationFrame(render);if(document.hidden||!active||now-last<16)return;last=now;
    const time=(now-started)/1000;const scroll=Math.max(0,Math.min(1,scrollY/Math.max(1,hero.offsetHeight)));
    pointer.sx+=(pointer.x-pointer.sx)*.045;pointer.sy+=(pointer.y-pointer.sy)*.045;
    const model=multiply(translate(0,-.03-scroll*.33,0),multiply(rotY(time*.15+pointer.sx*.30+scroll*.65),multiply(rotX(.42+pointer.sy*.18+scroll*.2),rotZ(-.16+Math.sin(time*.21)*.07))));
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    draw(core,model,1,time,.94);
    draw(inner,multiply(model,rotX(.25)),1,time,.97);
    draw(major,model,0,time,.98);
    draw(orbitMesh,multiply(model,multiply(rotX(.65),rotZ(time*.09))),2,time,.96);
    draw(orbitMesh2,multiply(model,multiply(rotY(.62),rotZ(-time*.11))),0,time,.82);
    draw(satellite,multiply(model,translate(2.15,.9,.5)),1,time,.92);
    draw(satellite,multiply(model,translate(-2.0,-.65,-.5)),0,time,.90);
    gl.depthMask(false);
    drawLines(orbits[0],multiply(model,rotY(-time*.055)),[.95,1.,1.,.55]);
    drawLines(orbits[1],multiply(model,rotZ(time*.05)),[.85,.84,1.,.48]);
    gl.depthMask(true);
    if(!hasFrame){hasFrame=true;stage.classList.add('has-webgl');}
  }
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;cancelAnimationFrame(raf);stage.classList.remove('has-webgl');},{passive:false});
  canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;resize();started=performance.now();raf=requestAnimationFrame(render);});
  try{render(performance.now());}catch(e){console.warn('Buildvix WebGL fallback:',e);cancelAnimationFrame(raf);stage.classList.remove('has-webgl');}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!contextLost){cancelAnimationFrame(raf);raf=requestAnimationFrame(render);}});
  addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer?.disconnect();},{once:true});
})();