import $ from "jquery";

// Gère le thème clair/sombre
$("#light-dark-btn").on("click", () => {
    const sunSVG = $("#THESUN");
    const moonSVG = $("#THEMOON");
    const html = $("html");
    if (sunSVG.hasClass("hidden")) {
        // Remplace la lune par le soleil et ajoute le thème clair sur <html>
        sunSVG.removeClass("hidden").addClass("flex");
        moonSVG.removeClass("flex").addClass("hidden");
        html.removeClass("dark");
    } else {
        // Remplace le soleil par la lune et ajoute le thème sombre sur <html>
        moonSVG.removeClass("hidden").addClass("flex");
        sunSVG.removeClass("flex").addClass("hidden");
        html.addClass("dark");
    }
});
