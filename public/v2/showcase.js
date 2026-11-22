/* BUILDVIX PORTAL — lightweight interaction controller.
   The artwork is real layered CSS 3D and remains present without JavaScript, WebGL or a GPU. */
(() => {
  'use strict';
  const portal = document.getElementById('hero-portal');
  const world = document.getElementById('portal-world');
  const hero = document.getElementById('home');
  if (!portal || !world || !hero) return;

  const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mediaCoarse = window.matchMedia('(pointer: coarse)');
  const mediaSmall = window.matchMedia('(max-width: 780px)');
  const state = { x: 0, y: 0, sx: 0, sy: 0, scroll: 0, ss: 0, visible: true, ticking: false };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const onMove = e => {
    if (mediaReduced.matches || mediaCoarse.matches) return;
    state.x = clamp((e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2, -1, 1);
    state.y = clamp((e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2, -1, 1);
  };

  const onScroll = () => {
    state.scroll = clamp(window.scrollY / Math.max(1, hero.offsetHeight), 0, 1);
  };

  const setNeutral = () => {
    state.x = 0;
    state.y = 0;
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', setNeutral);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Disable costly frame updates while the hero is outside the viewport.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      state.visible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0 }).observe(hero);
  }

  let frame = 0;
  let last = 0;
  function tick(now) {
    frame = window.requestAnimationFrame(tick);
    if (document.hidden || mediaReduced.matches || !state.visible) return;
    // 60 fps cap; animations remain smooth on high refresh displays.
    if (now - last < 16) return;
    last = now;
    const factor = mediaCoarse.matches ? 0 : 1;
    state.sx = lerp(state.sx, state.x * factor, 0.075);
    state.sy = lerp(state.sy, state.y * factor, 0.075);
    state.ss = lerp(state.ss, state.scroll, 0.08);
    const mobile = mediaSmall.matches;
    const rotY = state.sx * (mobile ? 3 : 10) + state.ss * 9;
    const rotX = -state.sy * (mobile ? 2 : 7) - state.ss * 5;
    const lift = -state.ss * (mobile ? 65 : 155);
    const zoom = 1 + state.ss * 0.16;
    world.style.transform =
      'translate3d(0,' + lift.toFixed(2) + 'px,0) rotateY(' + rotY.toFixed(2) +
      'deg) rotateX(' + rotX.toFixed(2) + 'deg) scale(' + zoom.toFixed(3) + ')';
    portal.style.opacity = String(Math.max(0.6, 1 - state.ss * .48));
  }
  if (!mediaReduced.matches) frame = window.requestAnimationFrame(tick);
  const motionChange = () => {
    if (mediaReduced.matches) {
      window.cancelAnimationFrame(frame);
      world.style.transform = '';
      portal.style.opacity = '';
    } else {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(tick);
    }
  };
  if (mediaReduced.addEventListener) mediaReduced.addEventListener('change', motionChange);
  else if (mediaReduced.addListener) mediaReduced.addListener(motionChange);

  // Clicking the floating panels selects their corresponding real service.
  document.querySelectorAll('[data-service-link]').forEach(link => {
    link.addEventListener('click', () => {
      const idx = Number(link.getAttribute('data-service-link'));
      const target = document.querySelector('.service-choice[data-service="' + idx + '"]');
      if (target) target.click();
    });
  });

  window.addEventListener('pagehide', () => window.cancelAnimationFrame(frame), { once: true });
})();