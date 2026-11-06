/* MrTom — interacciones de "El problema" y "Nuestra promesa". Vanilla JS, sin dependencias. */
(function(){
  var root=document.querySelectorAll('.mt');
  if(!root.length) return;
  var fmt=function(n){return '$'+Math.round(n).toLocaleString('es-CL')};
  function countUp(el){var to=+el.dataset.to,t0=performance.now(),d=1400;
    (function f(t){var p=Math.min(1,(t-t0)/d);el.textContent=fmt(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);}
  // Animación de entrada al hacer scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');
    e.target.querySelectorAll('.count').forEach(function(c){if(!c.dataset.done){c.dataset.done=1;countUp(c)}});io.unobserve(e.target);}})},{threshold:.25});
  document.querySelectorAll('.mt .sec').forEach(function(s){io.observe(s)});
  // El problema: acordeón (hover en desktop, click/tap y foco en todos)
  document.querySelectorAll('.mt .acc').forEach(function(acc){var ps=[].slice.call(acc.querySelectorAll('.pan'));
    var open=function(p){ps.forEach(function(x){x.classList.toggle('open',x===p)})};
    ps.forEach(function(p){
      p.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches)open(p)});
      p.addEventListener('click',function(){open(p)});
      p.addEventListener('focus',function(){open(p)});
    });});
  // Nuestra promesa: pestañas con auto-rotación cada 6 s (se detiene al hacer click)
  document.querySelectorAll('.mt .tabs-wrap').forEach(function(w){var tabs=[].slice.call(w.querySelectorAll('.tab')),panes=[].slice.call(w.querySelectorAll('.pane')),list=w.querySelector('.tabs'),i=0,timer;
    function show(k){i=k;tabs.forEach(function(t,j){t.classList.toggle('on',j===k);t.setAttribute('aria-selected',j===k)});panes.forEach(function(p,j){p.classList.toggle('on',j===k)});
      var bar=tabs[k].querySelector('.pg i');bar.style.animation='none';void tabs[k].offsetWidth;bar.style.animation='';}
    tabs.forEach(function(t,k){t.addEventListener('click',function(){show(k);list.classList.add('paused');clearInterval(timer)})});
    show(0);timer=setInterval(function(){show((i+1)%tabs.length)},6000);});
})();

/* Planes: el plan bajo el mouse (o tocado / con foco) se abre y el otro se achica */
(function(){
  document.querySelectorAll('.mt .pAw').forEach(function(w){var ps=[].slice.call(w.querySelectorAll('.pA'));
    var open=function(p){ps.forEach(function(x){x.classList.toggle('open',x===p)})};
    ps.forEach(function(p){
      p.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches)open(p)});
      p.addEventListener('click',function(){open(p)});
      p.addEventListener('focus',function(){open(p)});
    });});
})();
