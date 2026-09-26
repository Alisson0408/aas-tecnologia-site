/* =========================================
   PROJETO ODONTOLOGIA — JAVASCRIPT
   ========================================= */


/* DADOS DO SITE
   Depois substituiremos pelos dados reais da dentista.
*/

const SITE_CONFIG = {
  whatsapp: "",
  instagram: "",
  nome: "[NOME DA DENTISTA]"
};


/* =========================================
   ANO AUTOMÁTICO NO RODAPÉ
   ========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   MENU MOBILE
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

    const menuAberto = nav.classList.contains("active");

    menuToggle.setAttribute(
      "aria-expanded",
      menuAberto
    );

  });


  /* Fecha o menu depois de clicar em um link */

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================
   WHATSAPP
   ========================================= */

const whatsappButtons =
  document.querySelectorAll(".whatsapp-button");


whatsappButtons.forEach(button => {

  button.addEventListener("click", () => {

    /*
      O WhatsApp só será ativado depois que
      recebermos o número real da profissional.
    */

    if (!SITE_CONFIG.whatsapp) {

      alert(
        "O WhatsApp será ativado após a confirmação do número oficial da profissional."
      );

      return;
    }


    const numero =
      SITE_CONFIG.whatsapp.replace(/\D/g, "");


    const mensagem =
      encodeURIComponent(
        `Olá! Gostaria de informações sobre atendimento com ${SITE_CONFIG.nome}.`
      );


    const url =
      `https://wa.me/${numero}?text=${mensagem}`;


    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  });

});


/* =========================================
   ROLAGEM SUAVE
   ========================================= */

const internalLinks =
  document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(link => {

  link.addEventListener("click", event => {

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


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================
   HEADER AO ROLAR
   ========================================= */

const header =
  document.querySelector(".header");


window.addEventListener("scroll", () => {

  if (!header) {
    return;
  }


  if (window.scrollY > 30) {

    header.style.boxShadow =
      "0 8px 30px rgba(16, 44, 43, 0.06)";

  } else {

    header.style.boxShadow =
      "none";

  }

});