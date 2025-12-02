import $ from "jquery";

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

// boucle sur tout le tableau filtré (pas filtré au lancement du site)
function renderTable(data) {
    $("#movie-table").html("");
    data.forEach((movie) => {
        $("#movie-table").append(`
            <tr class="h-16">
                <td class="table-cell">${movie.title}</td>
                <td class="table-cell">${movie.years}</td>
                <td class="table-cell">${movie.authors}</td>
            </tr>
        `);
    });
}

renderTable(films);

// créer un nouveau tableau avec conditions de filtre en fonction de <select>.value
$("#filter-select").on("change", () => {
    const filterValue = $("#filter-select").val();
    let sortedMovies = [...films];

    if (filterValue === "movie-name") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterValue === "year") {
        sortedMovies.sort((a, b) => a.years - b.years);
    } else if (filterValue === "author-name") {
        sortedMovies.sort((a, b) => a.authors.localeCompare(b.authors));
    }

    renderTable(sortedMovies);
});

// Montre/cache la section pour ajouter un film en fonction de sa classe présente
$("#add-table-btn").on("click", () => {
    const tableSection = $("#add-table-section");
    if (tableSection.hasClass("hidden")) {
        tableSection.removeClass("hidden").addClass("flex");
    } else {
        tableSection.removeClass("flex").addClass("hidden");
    }
});
