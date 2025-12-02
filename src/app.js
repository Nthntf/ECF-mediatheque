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

// Montre ou cache la section pour ajouter un film en fonction de sa classe déjà présente
$("#add-table-btn").on("click", () => {
    const tableSection = $("#add-table-section");
    if (tableSection.hasClass("hidden")) {
        tableSection.removeClass("hidden").addClass("flex");
    } else {
        tableSection.removeClass("flex").addClass("hidden");
    }
});
