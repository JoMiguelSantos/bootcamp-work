var countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Angola",
    "Anguilla",
    "Antigua",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bonaire (Netherlands Antilles)",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Curacao (Netherlands Antilles)",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland (Republic of)",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kosrae Island",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia (FYROM)",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Ponape",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Rota",
    "Russia",
    "Rwanda",
    "Saba (Netherlands Antilles)",
    "Saipan",
    "Samoa",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St. Barthelemy",
    "St. Croix",
    "St. Eustatius (Netherlands Antilles)",
    "St. John",
    "St. Kitts and Nevis",
    "St. Lucia",
    "St. Maarten (Netherlands Antilles)",
    "St. Thomas",
    "St. Vincent and the Grenadines",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Tinian",
    "Togo",
    "Tonga",
    "Tortola",
    "Trinidad and Tobago",
    "Truk",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos",
    "Tuvalu",
    "US Virgin Islands",
    "Uganda",
    "Ukraine",
    "Union Island",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Virgin Gorda",
    "Wallis and Futuna",
    "Yap",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];

var countriesEl = $(".countries");
var inputField = $("input");
var selectedElIndex;

function searchTerm() {
    var userInput = inputField.val();

    var search = $.grep(countries, function (el) {
        var regexStr = new RegExp(`^${userInput}.*`, "i");
        return regexStr.test(el);
    });
    countriesEl.empty();
    if (search.length === 0) {
        for (var index = 0; index < 4; index++) {
            countriesEl.empty();
        }
        countriesEl.append("<li>No results</li>");
    } else {
        for (var i = 0; i < Math.min(4, search.length); i++) {
            countriesEl.append(`<li class="country move">${search[i]}</li>`);
        }
    }
}

inputField.on("input", searchTerm);

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

inputField.on("focus", searchTerm);
inputField.on("blur", function () {
    countriesEl.empty();
});
