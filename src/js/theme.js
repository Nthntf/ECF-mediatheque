import $ from "jquery";

// ======================== CONSTANTES & VARIABLES ========================
const html = $("html");
const sunSVG = $("#THESUN");
const moonSVG = $("#THEMOON");
const starSVG = $("#THESTAR");

const secretTheme = "secret";
const clicksCountNeeded = 5;
const maxInterval = 350;
let clickCount = 0;
let lastClickTime = 0;

// ======================== INITIALISATION ========================
initTheme();

// ======================== LISTENERS ========================
/**
 * Toggle du thème lors du clic
 * Gère d'abod le click secret, puis alterne entre les thèmes
 *
 * @event click
 * @returns {void}
 */
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

// ======================== FONCTIONS ========================

/**
 * Init le thème de l'application à partir du local storage
 * Si aucun thème n'est trouvé -> applique le thème par défaut ("white")
 *
 * @function initTheme
 */
function initTheme() {
    const theme = localStorage.getItem("theme") || "white";
    applyTheme(theme);
}

/**
 * Bascule entre le thème clair ("white") et le thème sombre ("dark")
 * Lit le thème actuel dans le stockage local et applique l'autre thème
 *
 * @function toggleNormalTheme
 */
function toggleNormalTheme() {
    const current = localStorage.getItem("theme") || "white";

    if (current === "dark") applyTheme("white");
    else applyTheme("dark");
}

/**
 * Gère le clic secret pour activer le thème caché
 * Incrémente un compteur si les clics successifs sont dans l'intervalle autorisé
 * Applique le thème secret lorsque le nombre de clics requis est atteint
 *
 * @function handleSecretClick
 * @returns {boolean} Retourne true si le thème secret est activé, sinon false
 */
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
/**
 * Applique le thème spécifié à l'application
 * Met à jour les classes HTML, affiche/ache les icônes correspondants et sauvegarde le thèmpe
 *
 * @function applyTheme
 * @param {string} theme - Thème à appliquer
 */
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
