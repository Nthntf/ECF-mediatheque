import $ from "jquery";

// Attend que le dom soit chargé
$(function () {
    $("#add-movie-btn").on("click", async function () {
        const title = $("#input-name").val().trim();
        const year = $("#input-year").val().trim();
        const type = $("#filter-select").val();

        if (!title) {
            alert("Veuillez entrer un titre.");
            return;
        }

        let url = `https://www.omdbapi.com/?apikey=2817ef7d&s=${encodeURIComponent(title)}`;

        // si n'est pas "-- type --" ajoute $type= à l'url"
        if (type !== "-- type --") url += `&type=${type}`;
        // pareil si year existe &y=year
        if (year) url += `&y=${year}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "False") {
                // si aucun film trouvé affiche petit message :
                $("#movies-container").html(`
                    <p class="text-red-600 text-xl">Aucun résultat trouvé.</p>
                `);
                return;
            }

            displayMovies(data.Search);
        } catch (error) {
            console.error(error);
            $("#movies-container").html(`
                <p class="text-red-600 text-xl">Erreur lors de la connexion à l'API.</p>
            `);
        }
    });
});

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
                    src="${movie.Poster}"
                    alt="${movie.Title}"
                />

                <p class="text-3xl text-center">${movie.Title}</p>
                <p class="small-text text-right">- ${movie.Year}</p>
            </div>
        `);
    });
}
