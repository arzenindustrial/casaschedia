// VERSION: v02
document.addEventListener('DOMContentLoaded', function () {
  // Scroll popup — once per session, at 25% scroll
  var popup = document.getElementById('scroll-popup');
  var closeBtn = document.getElementById('popup-close');
  var shown = sessionStorage.getItem('schedia_popup_shown');

  function onScroll() {
    if (shown) return;
    var scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrolled > 25) {
      popup.classList.add('visible');
      sessionStorage.setItem('schedia_popup_shown', '1');
      shown = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (closeBtn) closeBtn.addEventListener('click', function () {
    popup.classList.remove('visible');
  });

  // GA4 event stubs — replace with real gtag calls once GA4 is installed
  document.querySelectorAll('a.btn, button.btn').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', { cta_label: el.textContent.trim() });
      }
    });
  });

  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { form_id: 'quote-form' });
      }
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Roadmap — animate in once when scrolled into view
  var roadmap = document.getElementById('roadmap');
  if (roadmap && 'IntersectionObserver' in window) {
    var roadmapObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          roadmap.classList.add('in-view');
          roadmapObserver.unobserve(roadmap);
        }
      });
    }, { threshold: 0.35 });
    roadmapObserver.observe(roadmap);
  } else if (roadmap) {
    roadmap.classList.add('in-view');
  }
});
