/**
* Template Name: Resi
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/resi-free-bootstrap-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
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
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
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
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
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
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }

    <script>
function calcular() {
    let deuda=parseFloat(document.querySelector("input[name=importe]").value);
    let anos=parseInt(document.querySelector("input[name=anos]").value);
    let interes=parseFloat(document.querySelector("input[name=interes]").value);
    const resultado=document.getElementById("resultado");
 
    // hacemos los calculos...
    interes=(interes/100)/12;
    const m=(deuda*interes*(Math.pow((1+interes),(anos*12))))/((Math.pow((1+interes),(anos*12)))-1);
 
    resultado.innerHTML="<div>Capital Inicial: "+deuda.toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2})+" € \
        <br>Cuota a pagar mensualmente: "+m.toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2})+" €</div>";
 
    // cramos un objeto table donde poner el resultado
    const table=document.createElement("table");
    table.setAttribute("border",1);
    table.setAttribute("cellpadding",5);
    table.setAttribute("cellspacing",0);
 
    // titulo de la tabla
    let tr=document.createElement("tr");
    for (let text of ["Mes", "Intereses", "Amortización", "Capital Pendiente"]) {
        let th=document.createElement("th");
        let txt=document.createTextNode(text);
        th.appendChild(txt);
        tr.appendChild(th);
    }
    table.appendChild(tr);
 
    // contenido de la tabla
    let totalInt=0;
    for (let i=1; i<=anos*12; i++) {
        totalInt=totalInt+(deuda*interes);
 
        tr=document.createElement("tr");
        let td=document.createElement("td");
        let txt=document.createTextNode(i);
        td.appendChild(txt);
        tr.appendChild(td);
        td=document.createElement("td");
        txt=document.createTextNode((deuda*interes).toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2}));
        td.appendChild(txt);
        tr.appendChild(td);
        td=document.createElement("td");
        txt=document.createTextNode((m-(deuda*interes)).toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2}));
        td.appendChild(txt);
        tr.appendChild(td);
        deuda=deuda-(m-(deuda*interes));
        td=document.createElement("td");
        if (deuda<0) {
            txt=document.createTextNode("0");
        }else{
            txt=document.createTextNode(deuda.toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2}));
        }
        td.appendChild(txt);
        tr.appendChild(td);
        table.appendChild(tr);
    }
 
    resultado.appendChild(table);
    let div=document.createElement("div");
    let txt=document.createTextNode("Pago total de intereses : "+totalInt.toLocaleString("es-ES", {minimumFractionDigits: 2, maximumFractionDigits:2})+" €");
    div.appendChild(txt);
    resultado.appendChild(div);
  }

  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()