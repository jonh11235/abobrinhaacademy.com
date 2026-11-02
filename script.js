
// MENU MOBILE

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


// IDIOMAS

const languageButton = document.getElementById("languageButton");

let currentLanguage = "pt";

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        language === "pt" ? "pt-BR" : "en-US";

    document.querySelectorAll("[data-pt][data-en]").forEach(element => {

        element.textContent =
            element.getAttribute(`data-${language}`);

    });

    const search = document.getElementById("search");

    search.placeholder =
        search.getAttribute(`data-placeholder-${language}`);

    languageButton.textContent =
        language === "pt" ? "PT | EN" : "EN | PT";

    languageButton.setAttribute(
        "aria-label",
        language === "pt" ? "Switch to English" : "Mudar para português"
    );

    document.title =
        language === "pt"
            ? "ABOBRINHA Academy"
            : "ABOBRINHA Academy";

    filterCourses();
}

languageButton.addEventListener("click", () => {

    changeLanguage(
        currentLanguage === "pt" ? "en" : "pt"
    );

});


// PESQUISA DE CURSOS

const search = document.getElementById("search");
const cards = document.querySelectorAll(".course-card");
const noResults = document.getElementById("noResults");

function filterCourses() {

    const query = search.value.toLowerCase().trim();

    let visibleCards = 0;

    cards.forEach(card => {

        const content = card.textContent.toLowerCase();

        const matches = content.includes(query);

        card.style.display = matches ? "block" : "none";

        if (matches) {
            visibleCards++;
        }

    });

    noResults.hidden = visibleCards !== 0;

}

search.addEventListener("input", filterCourses);


// ANIMAÇÃO DE APARECIMENTO

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".course-card, .tool, .stats > div"
).forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// IDIOMA INICIAL

changeLanguage("en");
