import $ from "jquery";

const html = $("html");
const sunSVG = $("#THESUN");
const moonSVG = $("#THEMOON");
const starSVG = $("#THESTAR");

const secretTheme = "secret";
const clicksCountNeeded = 5;
const maxInterval = 350;
let clickCount = 0;
let lastClickTime = 0;

initTheme();

$("#light-dark-btn").on("click", () => {
    // return true si clique rapide
    if (handleSecretClick()) {
        return;
    }

    // Si theme secret déjà activé retour au toggle normal
    if (localStorage.getItem("theme") === secretTheme) {
        toggleNormalTheme();
        return;
    }

    // Toggle normal white <-> dark
    toggleNormalTheme();
});

// Récupère le theme dans localstorage et l'applique (white si rien)
function initTheme() {
    const theme = localStorage.getItem("theme") || "white";
    applyTheme(theme);
}

function handleSecretClick() {
    const now = Date.now();

    // Si interval entre 2 clique respecté -> count++
    if (now - lastClickTime < maxInterval) {
        clickCount++;
    } else {
        clickCount = 1;
    }

    lastClickTime = now;

    // Si count atteint applique theme secret sinon retour à count 0
    if (clickCount >= clicksCountNeeded) {
        clickCount = 0;
        applyTheme(secretTheme);
        return true;
    }

    return false;
}

// Toggle white <-> dark
function toggleNormalTheme() {
    const current = localStorage.getItem("theme") || "white";

    if (current === "dark") applyTheme("white");
    else applyTheme("dark");
}

function applyTheme(theme) {
    // vide les classes de html
    html.removeClass("dark secret white");

    if (theme === "dark") html.addClass("dark");
    if (theme === secretTheme) html.addClass("secret");

    // cache tout les svg
    sunSVG.addClass("hidden").removeClass("flex");
    moonSVG.addClass("hidden").removeClass("flex");
    starSVG.addClass("hidden").removeClass("flex");

    // raffiche le svg correspondant au theme
    if (theme === "white") sunSVG.removeClass("hidden").addClass("flex");
    if (theme === "dark") moonSVG.removeClass("hidden").addClass("flex");
    if (theme === secretTheme) starSVG.removeClass("hidden").addClass("flex");

    localStorage.setItem("theme", theme);
}
