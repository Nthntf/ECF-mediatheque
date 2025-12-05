import $ from "jquery";

// ======================== VARIABLES GLOBALES ========================
let page = 1;
let lastSearch = "";
let lastType = "";
let lastYear = "";

// ======================== LISTENERS ========================
$(function () {
    /**
     * @event click
     * Lance une recherche après avoir reset la page
     */
    $("#add-movie-btn").on("click", async function () {
        page = 1;
        searchMovies();
    });

    /**
     * @event click
     * Passe à la page précédente et recharge les films
     */
    $("#prev-page").on("click", function () {
        if (page > 1) {
            page--;
            searchMovies();
        }
    });

    /**
     * @event click
     * Passe à la page suivante et recharge les films
     */
    $("#next-page").on("click", function () {
        page++;
        searchMovies();
    });
});

// ======================== FONCTIONS ========================

/**
 * Recherche des films via l'API OMDb en fonction du titre, l'année et du type sélectionnés
 * Construit l'URL de requête, gère les erreurs, et met à jour l'affichage ainsi que la pagination
 *
 * @async
 * @function searchMovies
 * @returns {Promise<void>} - Mise à jour du DOM avec les résultats ou un message d'erreur
 */
async function searchMovies() {
    const title = $("#input-name").val().trim();
    const year = $("#input-year").val().trim();
    const type = $("#filter-select").val();

    if (!title) {
        alert("Veuillez entrer un titre.");
        return;
    }

    // Sauvegarde pour pagination
    lastSearch = title;
    lastType = type;
    lastYear = year;

    let url = `https://www.omdbapi.com/?apikey=2817ef7d&s=${encodeURIComponent(title)}&page=${page}`;

    // si n'est pas "-- type --" ajoute $type= à l'url"
    if (type !== "-- type --") url += `&type=${type}`;
    // pareil si year existe -> $y=year
    if (year) url += `&y=${year}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            // si aucun film trouvé affiche petit message :
            $("#movies-container").html(`
                <p class="text-red-600 text-xl">Aucun résultat trouvé.</p>
            `);
            $("#pagination").hide();
            return;
        }

        displayMovies(data.Search);
        updatePagination(data.totalResults);
    } catch (error) {
        console.error(error);
        $("#movies-container").html(`
            <p class="text-red-600 text-xl">Erreur lors de la connexion à l'API.</p>
        `);
    }
}

/**
 * Affiche la liste des films fournis dans le conteneur dédié
 * Reset l'affichage actuel et insère pour chaque film une carte
 * contenant l’image, le titre et l’année
 *
 * @function displayMovies
 * @param {Array<Object>} movies - Liste des films retournés par l'API OMDb
 */
function displayMovies(movies) {
    // reset
    $("#movies-container").html("");

    movies.forEach((movie) => {
        // affiche à la suite
        $("#movies-container").append(`
            <div class="w-64 p-2 m-2 rounded-2xl 
                bg-linear-to-r from-emerald-200 via-emerald-300 to-emerald-400 
                dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600 
                secret:from-purple-400 secret:via-purple-500 secret:to-purple-600">

                <img
                    class="rounded-2xl"
                    onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=No+Image';"
                    src="${neutralizeXSS(movie.Poster)}"
                    alt="${neutralizeXSS(movie.Title)}"
                />

                <p class="text-3xl text-center">${neutralizeXSS(movie.Title)}</p>
                <p class="small-text text-right">- ${neutralizeXSS(movie.Year)}</p>
            </div>
        `);
    });
}

/**
 * Met à jour l'affichage de la pagination en fonction du nombre total de résultats
 * Active ou désactive les boutons précédent/suivant et affiche la page courante
 *
 * @function updatePagination
 * @param {number} totalResults - Nombre total de résultats retournés par l'API
 */

function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / 10);

    $("#pagination").show();
    $("#current-page").text(page);

    $("#prev-page").prop("disabled", page <= 1);
    $("#next-page").prop("disabled", page >= totalPages);
}

/**
 * Neutralise les caractères potentiellement dangereux afin d’éviter les injections XSS
 * Remplace les symboles HTML sensibles par leurs équivalents échappés
 *
 * @function neutralizeXSS
 * @param {string} str - Chaine à sécuriser
 * @returns {string} - Chaine sécurisée
 */
function neutralizeXSS(str) {
    // Transforme certains caractère potentiellement dangereux en sa version chaine de texte
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
