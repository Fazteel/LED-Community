(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#navbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */


  window.addEventListener('load', () => {
    let teamContainer = select('.team-container');
    if (teamContainer) {
      let teamIsotope = new Isotope(teamContainer, {
        itemSelector: '.team-item'
      });

      let teamFilters = select('#team-flters li', true);

      on('click', '#team-flters li', function(e) {
        e.preventDefault();
        teamFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        teamIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        teamIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  new PureCounter();

})()

let navbar = document.querySelector('.navbar');
let navbarBrand = document.getElementById('navbarBrand');
let navbarToggler = document.querySelector('.navbar-toggler');
let navbarLink = document.querySelector('.nav-link');
let originalLogo = 'assets/img/logo-putih.svg';
let scrolledLogo = 'assets/img/logo-hitam.svg';

document.addEventListener('scroll', () => {
  if (window.scrollY > 19) {
    navbar.classList.add('header-scrolled');
    navbar.classList.remove('navbar-dark');
    navbar.classList.add('shadow');
    navbarBrand.innerHTML = `<img src="${scrolledLogo}" class="img-fluid image me-1">LED Community`;
    navbarBrand.style.color = '#000';
    navbarToggler.style.color = '#000';
    navbarLink.style.color = '#000';
  } else {
    navbar.classList.remove('header-scrolled');
    navbar.classList.add('navbar-dark');
    navbar.classList.remove('shadow');
    navbarBrand.innerHTML = `<img src="${originalLogo}" class="img-fluid image me-1">LED Community`;
    navbarBrand.style.color = '#fff';
    navbarToggler.style.color = '#fff';
    navbarLink.style.color = '#fff';
    navbar.style.transition = '.4s ease';
  }
});

