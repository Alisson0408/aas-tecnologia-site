/* =========================================================
   SILVA & OLIVEIRA TECNOLOGIA
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  /* =======================================================
     HEADER AO ROLAR
  ======================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================================
     MENU MOBILE
  ======================================================= */

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    /* Fecha menu quando clicar em um link */

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menu"
        );

        document.body.classList.remove(
          "menu-open"
        );

      });

    });


    /* Fecha menu com ESC */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menu"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    });


    /* Fecha menu se voltar para desktop */

    window.addEventListener("resize", () => {

      if (window.innerWidth > 1050) {

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    });

  }


  /* =======================================================
     SCROLL SUAVE PARA LINKS INTERNOS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     REVEAL AO ROLAR
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reducedMotion) {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  } else if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     DESTAQUE DO LINK DO MENU CONFORME SEÇÃO
  ======================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const desktopLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );

  function updateActiveSection() {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection =
          section.getAttribute("id");
      }

    });

    desktopLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
  );

  updateActiveSection();


  /* =======================================================
     EFEITO LEVE NOS CARDS
  ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".service-card, .project-card, .advantage"
    );

  if (
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    interactiveCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          card.style.setProperty(
            "--mouse-x",
            `${x}px`
          );

          card.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );

    });

  }


  /* =======================================================
     SEGURANÇA PARA LINKS EXTERNOS
  ======================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {

    const rel =
      link.getAttribute("rel") || "";

    if (!rel.includes("noopener")) {

      link.setAttribute(
        "rel",
        `${rel} noopener noreferrer`.trim()
      );

    }

  });

});