/* ==========================================================================
   [NOME DA ADVOGADA] — ADVOCACIA E CONSULTORIA JURÍDICA
   main.js · JavaScript puro, sem dependências externas
   --------------------------------------------------------------------------
   O QUE ESTE ARQUIVO FAZ
     01. Configurações do site (dados que ainda precisam ser preenchidos)
     02. Ano do rodapé
     03. Estado do cabeçalho ao rolar
     04. Menu mobile (abrir, fechar, teclado, backdrop)
     05. Navegação suave por âncoras
     06. Destaque do item ativo no menu
     07. Animações discretas de entrada
     08. Botão "voltar ao topo"
     09. Botão flutuante do WhatsApp (configurável)
     10. Formulário de contato (demonstrativo)

   IMPORTANTE: este projeto é demonstrativo. O único ponto que precisa ser
   preenchido para o WhatsApp funcionar é o objeto SITE_CONFIG abaixo.
   ========================================================================== */

(function () {
  "use strict";

  /* ==========================================================================
     01. CONFIGURAÇÕES DO SITE — SUBSTITUIR COM OS DADOS REAIS
     ========================================================================== */
  var SITE_CONFIG = {
    /* Número real do WhatsApp no formato internacional, SOMENTE DÍGITOS.
       Exemplo: Brasil (55) + DDD (11) + número (91234-5678) = "5511912345678".
       Enquanto estiver vazio, NENHUM número fictício é usado: o botão
       flutuante apenas conduz o visitante à seção de contato. */
    whatsappNumber: "",

    /* Deixe como false até o número real ser informado. Quando o número
       estiver preenchido, altere para true para ativar o link wa.me. */
    whatsappEnabled: false,

    /* Mensagem que já virá escrita na conversa do WhatsApp. */
    whatsappMessage: "Olá! Gostaria de agendar um atendimento jurídico."
  };

  var doc = document;
  var root = doc.documentElement;

  /* Sinaliza que o JavaScript está ativo: habilita as animações de entrada
     definidas no CSS (sem JS, todo o conteúdo permanece visível). */
  root.classList.add("js");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsIntersectionObserver = "IntersectionObserver" in window;

  /* ==========================================================================
     02. ANO NO RODAPÉ
     ========================================================================== */
  function initYear() {
    var yearElement = doc.querySelector("[data-year]");
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  /* ==========================================================================
     03. ESTADO DO CABEÇALHO AO ROLAR
     ========================================================================== */
  function initHeaderState() {
    var header = doc.querySelector("[data-header]");
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ==========================================================================
     04. MENU MOBILE
     ========================================================================== */
  function initMobileMenu() {
    var toggle = doc.querySelector("[data-menu-toggle]");
    var menu = doc.querySelector("[data-menu]");
    var backdrop = doc.querySelector("[data-menu-backdrop]");
    if (!toggle || !menu || !backdrop) return;

    var desktopBreakpoint = 1024;
    var closeTimer = null;

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    function open() {
      window.clearTimeout(closeTimer);
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu de navegação");
      menu.classList.add("is-open");
      doc.body.classList.add("is-menu-open");
      backdrop.hidden = false;
      window.requestAnimationFrame(function () {
        backdrop.classList.add("is-visible");
      });
    }

    function close() {
      if (!isOpen()) return;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu de navegação");
      menu.classList.remove("is-open");
      doc.body.classList.remove("is-menu-open");
      backdrop.classList.remove("is-visible");
      closeTimer = window.setTimeout(function () {
        backdrop.hidden = true;
      }, 360);
    }

    toggle.addEventListener("click", function () {
      if (isOpen()) {
        close();
      } else {
        open();
      }
    });

    /* Fecha ao clicar em qualquer link do painel */
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });

    /* Fecha ao clicar na área escurecida */
    backdrop.addEventListener("click", close);

    /* Fecha com a tecla Esc e devolve o foco ao botão */
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        close();
        toggle.focus();
      }
    });

    /* Fecha se a janela passar para o layout de desktop */
    window.addEventListener("resize", function () {
      if (window.innerWidth >= desktopBreakpoint) close();
    });
  }

  /* ==========================================================================
     05. NAVEGAÇÃO SUAVE POR ÂNCORAS
     O deslocamento considera a altura do cabeçalho fixo por meio de
     "scroll-margin-top" definido no CSS. O foco é movido para a seção de
     destino, melhorando a navegação por teclado e leitores de tela.
     ========================================================================== */
  function initSmoothScroll() {
    var links = doc.querySelectorAll('a[href^="#"]');

    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener("click", function (event) {
        var hash = link.getAttribute("href");
        if (!hash || hash === "#") return;

        var target = doc.getElementById(hash.slice(1));
        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });

        /* Move o foco sem novo deslocamento (acessibilidade) */
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });

        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", hash);
        }
      });
    });
  }

  /* ==========================================================================
     06. DESTAQUE DO ITEM ATIVO NO MENU
     ========================================================================== */
  function initScrollSpy() {
    var links = doc.querySelectorAll(".nav__link");
    if (!links.length || !supportsIntersectionObserver) return;

    var sections = [];
    Array.prototype.forEach.call(links, function (link) {
      var section = doc.querySelector(link.getAttribute("href"));
      if (section) sections.push({ section: section, link: link });
    });
    if (!sections.length) return;

    function clearActive() {
      Array.prototype.forEach.call(links, function (link) {
        link.classList.remove("is-active");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          clearActive();
          for (var i = 0; i < sections.length; i += 1) {
            if (sections[i].section === entry.target) {
              sections[i].link.classList.add("is-active");
              break;
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  }

  /* ==========================================================================
     07. ANIMAÇÕES DISCRETAS DE ENTRADA
     ========================================================================== */
  function initReveal() {
    var items = doc.querySelectorAll(".reveal");
    if (!items.length) return;

    /* Sem suporte ou com preferência por menos movimento: exibe tudo */
    if (!supportsIntersectionObserver || prefersReducedMotion) {
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var element = entry.target;
          var parent = element.parentElement;
          var delay = 0;

          /* Escalonamento discreto entre itens irmãos (cards, features, etapas) */
          if (parent) {
            var siblings = Array.prototype.filter.call(parent.children, function (child) {
              return child.classList && child.classList.contains("reveal");
            });
            delay = Math.min(siblings.indexOf(element), 5) * 0.09;
          }

          element.style.animationDelay = delay.toFixed(2) + "s";
          element.classList.add("is-visible");
          obs.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    Array.prototype.forEach.call(items, function (item) {
      observer.observe(item);
    });
  }

  /* ==========================================================================
     08. BOTÃO "VOLTAR AO TOPO"
     ========================================================================== */
  function initBackToTop() {
    var button = doc.querySelector("[data-to-top]");
    if (!button) return;

    var ticking = false;

    function update() {
      button.hidden = window.scrollY < 620;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* ==========================================================================
     09. BOTÃO FLUTUANTE DO WHATSAPP
     Enquanto SITE_CONFIG.whatsappNumber estiver vazio (ou
     whatsappEnabled = false), o botão NÃO abre nenhum número: ele apenas
     conduz o visitante até a seção de contato. Não há telefone fictício.
     ========================================================================== */
  function initWhatsAppButton() {
    var button = doc.querySelector("[data-whatsapp-button]");
    if (!button) return;

    var tip = doc.querySelector("[data-whatsapp-tip]");
    var number = String(SITE_CONFIG.whatsappNumber || "").replace(/\D/g, "");
    var isConfigured = SITE_CONFIG.whatsappEnabled === true && number.length >= 12;

    if (!isConfigured) {
      button.setAttribute(
        "aria-label",
        "Ir para a seção de contato (número de WhatsApp ainda não configurado)"
      );
      return;
    }

    button.setAttribute(
      "href",
      "https://wa.me/" + number + "?text=" + encodeURIComponent(SITE_CONFIG.whatsappMessage)
    );
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noopener noreferrer");
    button.setAttribute("aria-label", "Falar pelo WhatsApp (abre em nova aba)");

    if (tip) {
      tip.textContent = "Falar pelo WhatsApp";
    }
  }

  /* ==========================================================================
     10. FORMULÁRIO DE CONTATO (DEMONSTRATIVO)
     A validação nativa do navegador continua ativa (atributos required).
     Nenhum dado é enviado: o projeto ainda não possui serviço de envio.
     Quando o canal real for definido, configure o envio aqui (por exemplo,
     um endpoint próprio ou um serviço de formulários) e remova a mensagem
     de demonstração.
     ========================================================================== */
  function initContactForm() {
    var form = doc.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");

    function showStatus(message) {
      if (!status) return;
      status.textContent = message;
      status.hidden = false;
    }

    form.addEventListener("submit", function (event) {
      /* Impede o envio enquanto não houver serviço configurado */
      event.preventDefault();

      showStatus(
        "Formulário demonstrativo: sua mensagem não foi enviada porque o canal de contato " +
          "ainda não foi configurado. Utilize os dados de contato reais assim que forem definidos."
      );
    });
  }

  /* ==========================================================================
     INICIALIZAÇÃO
     ========================================================================== */
  function init() {
    initYear();
    initHeaderState();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initReveal();
    initBackToTop();
    initWhatsAppButton();
    initContactForm();
  }

  /* O script é carregado no fim do <body>; ainda assim, garantimos a execução
     após o DOM estar pronto em qualquer cenário de carregamento. */
  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
