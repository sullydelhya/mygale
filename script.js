
// Web canvas (spiderweb effect), spider descending clones, lightbox for gallery, print PDF button
document.addEventListener('DOMContentLoaded', ()=>{
  // --- canvas web effect ---
  const canvas = document.createElement('canvas');
  canvas.id = 'webCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);
  // draw subtle web lines radiating from top center
  function drawWeb(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2;
    const top = 40;
    ctx.strokeStyle = 'rgba(120,80,180,0.06)';
    ctx.lineWidth = 1;
    for(let i=0;i<30;i++){
      const ang = (i-15)/15;
      ctx.beginPath();
      ctx.moveTo(cx, top);
      ctx.quadraticCurveTo(cx + ang*300, canvas.height*0.12 + Math.abs(ang)*80, cx + ang*600, canvas.height*0.28 + Math.abs(ang)*160);
      ctx.stroke();
    }
    // concentric arcs
    for(let r=120;r<600;r+=80){
      ctx.beginPath();
      ctx.arc(cx, top, r, Math.PI*0.12, Math.PI*0.88);
      ctx.stroke();
    }
  }
  function loop(){ drawWeb(); requestAnimationFrame(loop); }
  loop();

  // --- spider generation (clones descending) ---
  const spiderSrc = 'logo.svg'; // reuse logo as spider graphic for effect
  const spawnSpider = ()=>{
    const wrap = document.createElement('div');
    wrap.className = 'spider-wrap no-print';
    wrap.style.pointerEvents = 'none';
    const sp = document.createElement('div');
    sp.className = 'spider';
    const img = document.createElement('img');
    img.src = spiderSrc;
    img.alt = 'araignée';
    sp.appendChild(img);
    wrap.appendChild(sp);
    document.querySelector('.container').prepend(wrap);
    // remove after some cycles to avoid clutter
    setTimeout(()=>{ wrap.remove(); }, 23000);
  };
  // spawn every 10s cleanly
  setInterval(spawnSpider, 10000);
  // initial spawn
  spawnSpider();

  // --- gallery lightbox ---
  document.querySelectorAll('.masonry img').forEach(img=>{
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=>{
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.left=0;overlay.style.top=0;overlay.style.width='100%';overlay.style.height='100%';
      overlay.style.background='rgba(1,1,1,0.86)';overlay.style.zIndex=9999;overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';
      const big = document.createElement('img');
      big.src = img.src; big.style.maxWidth='90%'; big.style.maxHeight='90%'; big.style.border='6px solid rgba(140,89,255,0.08)'; big.style.borderRadius='10px';
      overlay.appendChild(big);
      overlay.addEventListener('click', ()=> overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // --- print/PDF button ---
  const pdfBtn = document.getElementById('pdfBtn');
  if(pdfBtn) pdfBtn.addEventListener('click', ()=>{ window.print(); });

});
