import $ from "jquery";

// ================================= VARIABLES GLOBALES =================================
let films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller",
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi",
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven",
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti",
    },
];

let indexToDelete = null;

// ================================= INITIALISATION =================================
renderTable([...films].sort((a, b) => a.title.localeCompare(b.title)));

// ================================= LISTENERS =================================

// Montre/cache la section pour ajouter un film
$("#add-table-btn").on("click", () => {
    const tableSection = $("#add-table-section");
    if (tableSection.hasClass("hidden")) {
        tableSection.removeClass("hidden").addClass("flex");
    } else {
        tableSection.removeClass("flex").addClass("hidden");
    }
});

// Ajoute un film au tableau de film
$("#add-movie-btn").on("click", () => {
    const titleInput = $("#input-name").val().trim();
    const yearInput = $("#input-year").val().trim();
    const authorInput = $("#input-author").val().trim();

    const todayYear = new Date().getFullYear();
    let errors = [];

    // les verifications + push errors
    if (titleInput.length < 2) {
        errors.push("Le titre doit contenir au moins 2 caractères");
    }

    const yearNumber = parseInt(yearInput);
    if (!/^\d{4}$/.test(yearInput) || yearNumber < 1900 || yearNumber > todayYear) {
        errors.push(`L'année doit être un nombre de 4 chiffres entre 1900 et ${todayYear}`);
    }

    if (authorInput.length < 5) {
        errors.push("Le nom du réalisateur doit contenir au moins 5 caractères");
    }

    // Affiche une erreur + renvoi à la ligne etc..
    if (errors.length > 0) {
        showAlert("Erreur dans le formulaire : <br>" + errors.join("<br>"), "error", 5000);
        return;
    }

    // Formater les nom de film / realisateur
    const formattedTitle = titleInput.charAt(0).toUpperCase() + titleInput.slice(1);
    const formattedAuthor = authorInput.charAt(0).toUpperCase() + authorInput.slice(1);

    films.push({
        title: formattedTitle,
        years: yearNumber,
        authors: formattedAuthor,
    });

    // reload le tableau trié
    renderTable([...films].sort((a, b) => a.title.localeCompare(b.title)));

    // Vide le formulaire
    $("#input-name").val("");
    $("#input-year").val("");
    $("#input-author").val("");

    showAlert("Film ajouté avec succès", "success", 3000);
});

// Récupère l'index du data-set et ouvre la modale
$(document).on("click", ".delete-movie-btn", function () {
    indexToDelete = $(this).data("index");
    $("#delet-modal").removeClass("hidden").addClass("flex");
});

// Ferme la modale sans supprimer
$("#dont-delet-btn").on("click", function () {
    $("#delet-modal").removeClass("flex").addClass("hidden");
    indexToDelete = null;
});

// Supprime le film via l'index du data-set
$("#delet-btn").on("click", function () {
    if (indexToDelete !== null) {
        films.splice(indexToDelete, 1);
        renderTable([...films].sort((a, b) => a.title.localeCompare(b.title)));
    }

    $("#delet-modal").removeClass("flex").addClass("hidden");
    indexToDelete = null;
});

// Filtre via <select>
$("#filter-select").on("change", () => {
    const filterValue = $("#filter-select").val();
    let sortedMovies = [...films];

    if (filterValue === "movie-name") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterValue === "year") {
        sortedMovies.sort((a, b) => b.years - a.years);
    } else if (filterValue === "author-name") {
        sortedMovies.sort((a, b) => a.authors.localeCompare(b.authors));
    }

    renderTable(sortedMovies);
});

// ================================= FONCTIONS =================================

// boucle sur tout le tableau filtré
function renderTable(data) {
    $("#movie-table").html("");
    data.forEach((movie) => {
        $("#movie-table").append(`
                    <tr class="h-16">
                        <td class="table-cell">${neutralizeXSS(movie.title)}</td>
                        <td class="table-cell">${neutralizeXSS(movie.years)}</td>
                        <td class="table-cell">${neutralizeXSS(movie.authors)}</td>
                        <td class="table-cell text-center">
                            <button class="delete-movie-btn text-red-500 hover:cursor-pointer" data-index="${films.indexOf(movie)}">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="#FF3B3E"
                                    class="size-6 hover:stroke-red-400 cool-transition hover:-translate-y-1 hover:scale-110"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
        `);
    });
}

// Montre un msg d'alerte avec comme paramètre par défaut celui de la réussite
function showAlert(message, type = "success", duration = 3000) {
    let alertBox = $("#alert-box");

    // Verifie si alertBox est déjà dans le html ou non
    if (alertBox.length === 0) {
        $("body").append(`
            <div id="alert-box" class="fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white z-50"></div>
        `);
        alertBox = $("#alert-box");
    }

    // Style selon le type donné
    if (type === "success") {
        alertBox.removeClass().addClass("fixed top-5 right-5 px-4 py-3 rounded shadow-lg bg-green-600 text-white");
    } else {
        alertBox.removeClass().addClass("fixed top-5 right-5 px-4 py-3 rounded shadow-lg bg-red-600 text-white");
    }

    // Affiche le message
    alertBox.html(message).fadeIn();

    // Disparait après X ms
    setTimeout(() => {
        alertBox.fadeOut();
    }, duration);
}

// Sécurité
function neutralizeXSS(str) {
    // Transforme certains caractère potentiellement dangereux en sa version chaine de texte
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
