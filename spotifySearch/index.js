(function () {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function (script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    var nextUrl;
    var apiUrl = "http://spicedify.herokuapp.com/spotify";
    var moreResults = $("#more-results");
    // var urlParams = new URLSearchParams(window.location.search);
    // var scroll = urlParams.get("scroll");
    var scroll =
        window.location.search &&
        window.location.search.match(/(?<=scroll=)[\w]+/) &&
        window.location.search.match(/(?<=scroll=)[\w]+/)[0];

    function formatResults(data) {
        var imgUrl = "music.jpg";

        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].images.length === 0) {
                data.items[i].images[0] = { url: imgUrl };
            }
        }

        return data;
    }

    function formattedUrl(data) {
        return (
            data.next &&
            data.next.replace("https://api.spotify.com/v1/search", apiUrl)
        );
    }

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

                if (data.items.length === 0) {
                    return $("#results-container").html(
                        "No results were found"
                    );
                }

                var formattedData = formatResults(data);
                $("#results-container").html(
                    Handlebars.templates.entry(formattedData)
                );

                if (data.next != null) {
                    nextUrl = formattedUrl(data);

                    moreResults.addClass("visible").attr("href", nextUrl);
                }
            },
        });
    });

    function getMoreResults() {
        $.get(moreResults.attr("href"), function (data) {
            var data = data.albums || data.artists;
            var formattedData = formatResults(data);
            $("#results-container").append(
                Handlebars.templates.entry(formattedData)
            );

            if (data.next != null) {
                nextUrl = formattedUrl(data);

                moreResults.addClass("visible").attr("href", nextUrl);
            } else {
                moreResults.removeClass("visible");
            }
        });
    }

    moreResults.on("click", getMoreResults);

    if (scroll == "infinite") {
        var didScroll = false;
        $(window).scroll(function () {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                didScroll = false;
                if (
                    $(window).scrollTop() + $(window).height() >
                    $(document).height() - 200
                ) {
                    getMoreResults();
                }
            }
        }, 250);
    }
})();
