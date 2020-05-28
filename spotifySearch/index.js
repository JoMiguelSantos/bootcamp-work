(function () {
    var nextUrl;
    var apiUrl = "http://spicedify.herokuapp.com/spotify";

    $("#submit-btn").on("click", function () {
        var userInput = $("input[name=user-input]").val();
        var albumOrArtist = $("select").val();

        $.ajax({
            url: apiUrl,
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist,
            },
            success: function (data) {
                var data = data.albums || data.artists;

                $(".result-for").html("Results for: " + userInput);

                var html = "";
                var imgUrl = "music.jpg";
                if (data.items.length === 0) {
                    return $("#results-container").html(
                        "No results were found"
                    );
                }
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length > 0) {
                        imgUrl = data.items[i].images[0].url;
                    }

                    html +=
                        "<a src='" +
                        data.items[i].external_urls.spotify +
                        "'><img src='" +
                        imgUrl +
                        "'></img>" +
                        data.items[i].name +
                        "</a>";
                }
                $("#results-container").html(html);

                if (data.next != null) {
                    nextUrl =
                        data.next &&
                        data.next.replace(
                            "https://api.spotify.com/v1/search",
                            apiUrl
                        );

                    $("#more-results")
                        .addClass("visible")
                        .attr("href", nextUrl);
                }
            },
        });
    });

    $("#more-results").on("click", function () {
        $.get(this.getAttribute("href"), function (data) {
            var data = data.albums || data.artists;

            var html = "";
            var imgUrl = "music.jpg";
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].images.length > 0) {
                    imgUrl = data.items[i].images[0].url;
                }

                html +=
                    "<a src='" +
                    data.items[i].external_urls.spotify +
                    "'><img src='" +
                    imgUrl +
                    "'></img>" +
                    data.items[i].name +
                    "</a>";
            }
            $("#results-container").append(html);

            if (data.next != null) {
                nextUrl =
                    data.next &&
                    data.next.replace(
                        "https://api.spotify.com/v1/search",
                        apiUrl
                    );

                $("#more-results").addClass("visible").attr("href", nextUrl);
            } else {
                $("#more-results").removeClass("visible");
            }
        });
    });
})();
