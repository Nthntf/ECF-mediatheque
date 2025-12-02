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

// boucle sur tout le tableau filtré
function renderTable(data) {
    $("#movie-table").html("");
    data.forEach((movie) => {
        $("#movie-table").append(`
                    <tr class="h-16">
                        <td class="table-cell">${movie.title}</td>
                        <td class="table-cell">${movie.years}</td>
                        <td class="table-cell">${movie.authors}</td>
                        <td class="table-cell text-center">
                            <button id="delet-movie-btn" class="text-red-500 hover:cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
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

// filtre une première fois par nom au lancement du site
renderTable([...films].sort((a, b) => a.title.localeCompare(b.title)));

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
