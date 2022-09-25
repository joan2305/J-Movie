function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "cd7cfa38",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        console.log(movies);

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
            <div class="col-md-4">
                <div class="card mb-3">
                <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">` +
              data.Title +
              `</h5>
                        <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                        <a href="#" class="card-link text-decoration-none see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
                    </div>
                </div> 
            </div>
            `
          );
        });

        $("#search-input").val("");
      } else {
        // Cara pertama manual
        // $("#movie-list").html("<h1 class='text-center'>Movie Not Found!</h1>");
        // Cara kedua ambil dr json pas error
        // Kalo gamau pake petik 1 gara2 dia hrs string, bisa pake back tick biar bs dienter
        $("#movie-list").html(
          `
        <div class="col">
            <h1 class="text-center">` +
            result.Error +
            `</h1>
        </div>
        `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list ").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "cd7cfa38",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
            <div class='container-fluid'>
                <div class="row">
                    <div class = "col-md-4">
                        <img src="` +
            movie.Poster +
            `" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
                            <li class="list-group-item">Released : ` +
            movie.Released +
            `</li>
                            <li class="list-group-item">Genre : ` +
            movie.Genre +
            `</li>
                            <li class="list-group-item">Director : ` +
            movie.Director +
            `</li>
                            <li class="list-group-item">Actors : ` +
            movie.Actors +
            `</li>
                        </ul>
                    </div>

                </div>
            </div>
        
        `
        );
      }
    },
  });
});
