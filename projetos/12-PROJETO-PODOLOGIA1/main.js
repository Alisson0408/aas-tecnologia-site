/* =========================================================
   PODOLOGIA PREMIUM
   MAIN.JS
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES DO SITE
   ========================================================= */

const SITE_CONFIG = {

    // WHATSAPP
    // Futuramente coloque somente números.
    // Exemplo: "5534999999999"
    whatsapp: "",

    whatsappMessage:
        "Olá! Conheci seu trabalho pelo site e gostaria de informações sobre atendimento e agendamento.",


    // INSTAGRAM
    // Futuramente coloque o link completo.
    // Exemplo: "https://www.instagram.com/nomedoperfil/"
    instagram: "",


    // LOCALIZAÇÃO / GOOGLE MAPS
    // Futuramente coloque o link do Google Maps.
    location: ""

};


/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("active");

        const menuAberto = nav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto ? "true" : "false"
        );

        menuToggle.textContent = menuAberto ? "✕" : "☰";

    });


    nav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================================
   WHATSAPP
   ========================================================= */

const whatsappButtons =
    document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();


        /*
           Como este é um projeto demonstrativo,
           o botão continua visível mesmo sem número.
        */

        if (!SITE_CONFIG.whatsapp) {

            alert(
                "Projeto demonstrativo.\n\n" +
                "O botão de WhatsApp está preparado para receber o número da profissional."
            );

            return;

        }


        const mensagem =
            encodeURIComponent(
                SITE_CONFIG.whatsappMessage
            );


        const whatsappURL =
            "https://wa.me/" +
            SITE_CONFIG.whatsapp +
            "?text=" +
            mensagem;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


/* =========================================================
   INSTAGRAM
   ========================================================= */

const instagramLinks =
    document.querySelectorAll(".instagram-link");

instagramLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        /*
           Mantém o botão visível mesmo
           sem um Instagram cadastrado.
        */

        if (!SITE_CONFIG.instagram) {

            alert(
                "Projeto demonstrativo.\n\n" +
                "O botão do Instagram está preparado para receber o perfil da profissional."
            );

            return;

        }


        window.open(
            SITE_CONFIG.instagram,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


/* =========================================================
   LOCALIZAÇÃO / GOOGLE MAPS
   ========================================================= */

const locationLinks =
    document.querySelectorAll(".location-link");

locationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        /*
           Mantém o botão visível mesmo
           sem endereço cadastrado.
        */

        if (!SITE_CONFIG.location) {

            alert(
                "Projeto demonstrativo.\n\n" +
                "O botão de localização está preparado para receber o endereço da profissional."
            );

            return;

        }


        window.open(
            SITE_CONFIG.location,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


/* =========================================================
   ROLAGEM SUAVE
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = this.getAttribute("href");


            if (!destino || destino === "#") {
                return;
            }


            const elemento =
                document.querySelector(destino);


            if (!elemento) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".header");


            const alturaHeader =
                header
                    ? header.offsetHeight
                    : 0;


            const posicao =
                elemento.getBoundingClientRect().top +
                window.scrollY -
                alturaHeader;


            window.scrollTo({

                top: posicao,

                behavior: "smooth"

            });

        });

    });


/* =========================================================
   EFEITO DO HEADER AO ROLAR
   ========================================================= */

const header =
    document.querySelector(".header");


function atualizarHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(24, 53, 44, 0.10)";

    } else {

        header.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    atualizarHeader
);


atualizarHeader();


/* =========================================================
   ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ANIMAÇÕES DE ENTRADA
   ========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".service-card, " +
        ".experience-grid article, " +
        ".testimonial-placeholder, " +
        ".gallery-placeholder"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elementosAnimados.forEach(function (elemento) {

        elemento.classList.add("reveal");

        observer.observe(elemento);

    });

} else {

    elementosAnimados.forEach(function (elemento) {

        elemento.classList.add("visible");

    });

}


/* =========================================================
   SEGURANÇA PARA LINKS EXTERNOS
   ========================================================= */

document
    .querySelectorAll('a[target="_blank"]')
    .forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


/* =========================================================
   SITE CARREGADO
   ========================================================= */

console.log(
    "Podologia Premium carregado com sucesso."
);