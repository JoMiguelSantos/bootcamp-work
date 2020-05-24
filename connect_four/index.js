var columns = $(".column");
var banner = $(".banner");
var display = $(".display");
var activePlayer = $(".active-player");
var dragSlot = $(".draggable");
var currentPlayer = "player-1";
var gameStatus = { "player-1": [], "player-2": [] };
var winnerCombo;

function switchPlayer() {
    dragSlot.removeClass(currentPlayer).html("");
    currentPlayer = currentPlayer === "player-1" ? "player-2" : "player-1";
    var playerProper = "Player " + currentPlayer.split("-")[1];
    var playerColor = currentPlayer === "player-1" ? "blue" : "red";
    activePlayer.html(playerProper).css({ backgroundColor: playerColor });
    dragSlot.addClass(currentPlayer);
}

function playerMove(slots, column) {
    for (var i = 5; i >= 0; i--) {
        if (
            !slots[i].classList.contains("player-1") &&
            !slots[i].classList.contains("player-2")
        ) {
            animateMove(slots, i, currentPlayer);
            gameStatus[currentPlayer].push([column, i]);
            break;
        }
    }
}

function toggleClass(slots, index, currentPlayer, endPoint) {
    if (index !== endPoint) {
        slots[index].classList.remove(currentPlayer);
    }
}

function animateMove(slots, endPoint, currentPlayer) {
    for (var index = 0; index <= endPoint; index++) {
        function runWithDelay() {
            slots[index].classList.add(currentPlayer);
            var k = index;
            setTimeout(() => {
                toggleClass(slots, k, currentPlayer, endPoint);
            }, (k + 1) * 50);
        }
        runWithDelay();
    }
}

function horizontalPattern(startingPoint) {
    if (startingPoint[0] < 4) {
        var horizontalFour = [
            startingPoint,
            [startingPoint[0] + 1, startingPoint[1]],
            [startingPoint[0] + 2, startingPoint[1]],
            [startingPoint[0] + 3, startingPoint[1]],
        ];
        return horizontalFour;
    }
    return;
}

function verticalPattern(startingPoint) {
    if (startingPoint[1] < 3) {
        var verticalFour = [
            startingPoint,
            [startingPoint[0], startingPoint[1] + 1],
            [startingPoint[0], startingPoint[1] + 2],
            [startingPoint[0], startingPoint[1] + 3],
        ];
        return verticalFour;
    }
    return;
}

function diagonalPattern(startingPoint) {
    var diagonalFour;
    if (startingPoint[1] < 3) {
        diagonalFour = [
            startingPoint,
            [startingPoint[0] + 1, startingPoint[1] + 1],
            [startingPoint[0] + 2, startingPoint[1] + 2],
            [startingPoint[0] + 3, startingPoint[1] + 3],
        ];
        return diagonalFour;
    } else if (startingPoint[1] >= 3) {
        diagonalFour = [
            startingPoint,
            [startingPoint[0] + 1, startingPoint[1] - 1],
            [startingPoint[0] + 2, startingPoint[1] - 2],
            [startingPoint[0] + 3, startingPoint[1] - 3],
        ];
        return diagonalFour;
    }
    return;
}

function arrayIsSubset(arr, subset) {
    var isSubset = false;
    (function () {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] === subset[0] && arr[i][1] === subset[1]) {
                isSubset = true;
                break;
            }
        }
    })();
    return isSubset;
}

function winCheck() {
    for (var i = 0; i < gameStatus[currentPlayer].length; i++) {
        var el = gameStatus[currentPlayer][i];
        var won;

        if (diagonalPattern(el)) {
            if (
                diagonalPattern(el).every(function (val) {
                    return arrayIsSubset(gameStatus[currentPlayer], val);
                })
            ) {
                won = diagonalPattern(el);
            }
        }

        if (verticalPattern(el)) {
            if (
                verticalPattern(el).every(function (val) {
                    return arrayIsSubset(gameStatus[currentPlayer], val);
                })
            ) {
                won = verticalPattern(el);
            }
        }

        if (horizontalPattern(el)) {
            if (
                horizontalPattern(el).every(function (val) {
                    return arrayIsSubset(gameStatus[currentPlayer], val);
                })
            ) {
                won = horizontalPattern(el);
            }
        }
    }
    return won;
}

function wonOrContinue() {
    if (gameStatus[currentPlayer].length >= 4) {
        winnerCombo = winCheck();
    }

    if (winnerCombo) {
        var playerColor = currentPlayer === "player-1" ? "blue" : "red";
        for (var slot = 0; slot < winnerCombo.length; slot++) {
            comboHighlight(winnerCombo[slot], playerColor);
        }
        banner.addClass("visible");
        display.css({ display: "none" });
        banner
            .css({ backgroundColor: playerColor })
            .prepend("You WON Player " + currentPlayer.split("-")[1] + "!!!");
        removeHandlers();
        $(".draggable").draggable({ disabled: true });
    } else {
        switchPlayer();
    }
}

function addClickHandler(elem, column) {
    elem.on("click", function (e) {
        var slots = e.currentTarget.querySelectorAll(".slot");

        playerMove(slots, column);

        wonOrContinue(winnerCombo);
    });
}

function comboHighlight(slot, playerColor) {
    columns
        .eq(slot[0])
        .children()
        .eq(slot[1])
        .css({ backgroundColor: "greenyellow", borderColor: playerColor });
}

function removeHandlers() {
    for (var column = 0; column < columns.length; column++) {
        columns.eq(column).off();
    }
}

for (var column = 0; column < columns.length; column++) {
    addClickHandler(columns.eq(column), column);
}

$(document).ready(function () {
    $(".draggable").draggable({
        revert: true,
    });
    $(".column").droppable({
        accept: ".draggable",
        drop: function () {
            var column = Array.prototype.indexOf.call(columns, this);
            var slots = this.querySelectorAll(".slot");
            playerMove(slots, column);
            wonOrContinue(winnerCombo);
        },
    });
});
