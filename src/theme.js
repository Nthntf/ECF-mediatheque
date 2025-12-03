import $ from "jquery";

const sunSVG = $("#THESUN");
const moonSVG = $("#THEMOON");
const html = $("html");

initTheme();

// Gère le thème clair/sombre
$("#light-dark-btn").on("click", () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        // Remplace svg lune par svg soleil et ajoute le thème clair sur <html>
        sunSVG.removeClass("hidden").addClass("flex");
        moonSVG.removeClass("flex").addClass("hidden");
        html.removeClass("dark");
        localStorage.setItem("theme", "white");
    } else if (theme === "white" || theme === "") {
        // Remplace svg soleil par svg lune et ajoute le thème sombre sur <html>
        moonSVG.removeClass("hidden").addClass("flex");
        sunSVG.removeClass("flex").addClass("hidden");
        html.addClass("dark");
        localStorage.setItem("theme", "dark");
    }
});

// Gère l'affichage du theme au lancement du site
function initTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "white" || theme === null) {
        // Affiche theme clair si white ou si rien
        sunSVG.removeClass("hidden").addClass("flex");
        moonSVG.removeClass("flex").addClass("hidden");
        html.removeClass("dark");
        localStorage.setItem("theme", "white");
    } else if (theme === "dark") {
        // Affiche theme sombre si dark est présent dans le localStorage
        moonSVG.removeClass("hidden").addClass("flex");
        sunSVG.removeClass("flex").addClass("hidden");
        html.addClass("dark");
    }
}
