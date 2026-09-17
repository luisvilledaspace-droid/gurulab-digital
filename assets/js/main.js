/* =========================================================
   GURU DIGITAL — Interacciones del sitio
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Año en el footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 2. Header con estado al hacer scroll ---------- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 3. Menú móvil ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) closeNav();
    });
  }

  /* ---------- 3b. Desplegable de Servicios ---------- */
  var megaBtn = document.getElementById('serviciosBtn');
  var megaPanel = document.getElementById('serviciosMenu');

  function abrirMega(abrir) {
    if (!megaBtn || !megaPanel) return;
    megaBtn.setAttribute('aria-expanded', String(abrir));
    megaPanel.hidden = !abrir;
  }

  if (megaBtn && megaPanel) {
    var esEscritorio = function () { return window.innerWidth > 1024; };

    megaBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      abrirMega(megaBtn.getAttribute('aria-expanded') !== 'true');
    });

    // En escritorio también se abre al pasar el cursor
    var item = megaBtn.closest('.nav__item');
    var cierreDiferido;
    item.addEventListener('mouseenter', function () {
      if (!esEscritorio()) return;
      clearTimeout(cierreDiferido);
      abrirMega(true);
    });
    item.addEventListener('mouseleave', function () {
      if (!esEscritorio()) return;
      cierreDiferido = setTimeout(function () { abrirMega(false); }, 180);
    });

    // Al elegir un enlace, se cierra todo
    megaPanel.addEventListener('click', function (e) {
      if (e.target.closest('a')) { abrirMega(false); closeNav(); }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav__item--menu')) abrirMega(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (megaBtn.getAttribute('aria-expanded') === 'true') {
        abrirMega(false);
        megaBtn.focus();
      }
    });

    // Al salir con el tabulador del último enlace, se cierra
    megaPanel.addEventListener('focusout', function (e) {
      if (!esEscritorio()) return;
      if (!megaPanel.contains(e.relatedTarget) && e.relatedTarget !== megaBtn) abrirMega(false);
    });

    window.addEventListener('resize', function () { abrirMega(false); });
  }

  /* ---------- 4. Animaciones de entrada ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
    startCounters(document);
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        startCounters(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealItems.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      revealObserver.observe(el);
    });

    // Las estadísticas del hero no están dentro de .reveal
    var heroStats = document.querySelector('.hero__stats');
    if (heroStats) startCounters(heroStats);
  }

  /* ---------- 5. Contadores numéricos ---------- */
  function startCounters(scope) {
    var nums = scope.querySelectorAll ? scope.querySelectorAll('[data-count]') : [];
    Array.prototype.forEach.call(nums, function (el) {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';

      var target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      var suffixEl = el.querySelector('span');
      var suffix = suffixEl ? suffixEl.outerHTML : '';

      if (reduceMotion) { el.innerHTML = target + suffix; return; }

      var start = performance.now();
      var duration = 1400;

      (function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.innerHTML = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  /* ---------- 6. Acordeón de preguntas frecuentes ---------- */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    var item = btn.parentElement;
    var panel = btn.nextElementSibling;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq__item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq__a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  window.addEventListener('resize', function () {
    var open = document.querySelector('.faq__item.is-open .faq__a');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  /* ---------- 7. Pantalla LED del hero (solo en la portada) ---------- */
  var screen = document.getElementById('ledScreen');
  if (screen) {
    var cols = window.innerWidth <= 640 ? 16 : 22;
    var rows = Math.round(cols * 0.68);
    var dots = [];

    var frag = document.createDocumentFragment();
    for (var i = 0; i < cols * rows; i++) {
      var dot = document.createElement('span');
      dot.className = 'led-dot';
      dot.style.animationDelay = (Math.random() * 3.6).toFixed(2) + 's';
      frag.appendChild(dot);
      dots.push(dot);
    }
    screen.appendChild(frag);

    if (reduceMotion) {
      paint(0);
    } else {
      var phase = 0;
      var last = 0;
      var inView = true;

      // Pausa la animación cuando el panel sale de pantalla
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
        }, { threshold: 0.05 }).observe(screen);
      }

      requestAnimationFrame(function loop(now) {
        if (inView && !document.hidden && now - last > 90) {
          last = now;
          phase += 0.34;
          paint(phase);
        }
        requestAnimationFrame(loop);
      });
    }

    function paint(p) {
      for (var idx = 0; idx < dots.length; idx++) {
        var x = idx % cols;
        var y = (idx / cols) | 0;
        var v = Math.sin(x * 0.42 + y * 0.3 - p) * 0.65 +
                Math.sin(y * 0.55 + p * 0.5) * 0.35;

        var cls = 'led-dot';
        if (v > 0.82) cls += ' cool';
        else if (v > 0.5) cls += ' warm';
        else if (v > 0.08) cls += ' on';

        if (dots[idx].className !== cls) dots[idx].className = cls;
      }
    }
  }

  /* ---------- 8. Logos de partners ----------
     Si el archivo del logo todavía no está en assets/img/partners/,
     el recuadro muestra su marcador de posición en vez de una imagen rota. */
  document.querySelectorAll('.partner img').forEach(function (img) {
    var fallback = function () {
      var box = img.closest('.partner');
      if (!box) return;
      var slot = box.querySelector('.partner__slot');
      var enlace = img.closest('a');
      if (enlace && enlace.parentElement === box) enlace.remove();
      else img.remove();
      box.classList.remove('partner--light');
      box.classList.add('partner--empty');
      if (slot) slot.hidden = false;
    };
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener('error', fallback);
  });

  /* ---------- 9. Formulario de contacto ---------- */
  /* Sin backend: valida y muestra confirmación.
     Para producción, conecta aquí tu endpoint (fetch a tu API,
     Formspree, Netlify Forms, etc.) o define ENDPOINT abajo. */
  var ENDPOINT = ''; // p. ej. 'https://formspree.io/f/xxxxxxx'
  var form = document.getElementById('contactForm');
  var ok = document.getElementById('formOk');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      var done = function (success) {
        btn.disabled = false;
        btn.innerHTML = original;
        if (success) {
          if (ok) ok.classList.add('is-visible');
          form.reset();
          setTimeout(function () { if (ok) ok.classList.remove('is-visible'); }, 8000);
        } else {
          alert('No pudimos enviar el mensaje. Escríbenos a contacto@gurudigital.com');
        }
      };

      if (!ENDPOINT) {
        setTimeout(function () { done(true); }, 700);
        return;
      }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { done(r.ok); })
        .catch(function () { done(false); });
    });
  }
})();
