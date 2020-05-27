var countriesEl = $(".countries");
var inputField = $("input");
var selectedElIndex;
var throttle;

function getCountries() {
    var userInput = inputField.val();
    clearTimeout(throttle);
    throttle = setTimeout(function () {
        $.ajax({
            url: "https://flame-egg.glitch.me/",
            data: { q: userInput },
            success: function (data) {
                if (data.length === 0) {
                    countriesEl.empty();
                    countriesEl.append("<li>No results</li>");
                } else if (
                    inputField.val().toLowerCase() !=
                    data[0].slice(0, inputField.val().length).toLowerCase()
                ) {
                    // Do nothing
                } else {
                    countriesEl.empty();
                    for (var i = 0; i < data.length; i++) {
                        countriesEl.append(
                            `<li class="country move">${data[i]}</li>`
                        );
                    }
                }
            },
        });
    }, 250);
}

inputField.on("input", getCountries);

$(document).on("mouseover", function (e) {
    if (e.target.classList.contains("country")) {
        e.target.classList.add("highlighted");
    }
});

$(document).on("mouseout", function (e) {
    if (e.target.classList.contains("country")) {
        e.target.classList.remove("highlighted");
    }
});

$(document).on("mousedown", function (e) {
    if (e.target.classList.contains("country")) {
        inputField.val(e.target.textContent);
        countriesEl.empty();
    }
});

$(document).keydown(function (e) {
    var countryArr = $(".country");
    var highlighted = $(".highlighted");

    if (e.keyCode == 40) {
        if (highlighted.length === 0) {
            selectedElIndex = 0;
            countryArr.eq(selectedElIndex).addClass("highlighted");
        } else {
            if (selectedElIndex !== countryArr.length - 1) {
                countryArr.eq(selectedElIndex).removeClass("highlighted");
                selectedElIndex++;
                countryArr.eq(selectedElIndex).addClass("highlighted");
            }
        }
    } else if (e.keyCode == 38) {
        if (highlighted.length === 0) {
            selectedElIndex = countryArr.length - 1;
            countryArr.eq(selectedElIndex).addClass("highlighted");
        } else {
            if (selectedElIndex > 0) {
                countryArr.eq(selectedElIndex).removeClass("highlighted");
                selectedElIndex--;
                countryArr.eq(selectedElIndex).addClass("highlighted");
            }
        }
    } else if (e.keyCode == 13) {
        inputField.val(highlighted.text());
        countriesEl.empty();
    }
});

inputField.on("focus", getCountries);
inputField.on("blur", function () {
    countriesEl.empty();
});
