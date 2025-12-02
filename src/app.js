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
// TODO

// Ajoute chaque element de 'films' dans #movie-table
films.forEach((movie) => {
    $("#movie-table").append(`<tr class="h-16">
                        <td class="table-cell">${movie.title}</td>
                        <td class="table-cell">${movie.years}</td>
                        <td class="table-cell">${movie.authors}</td>
                    </tr>`);
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
