/* jshint browser:true */
var app = app || {};

/**
 * setup: for initializing basic page functionality
 */
app.setup = function () {
    'use strict';
    
    var i,
        j,
        newMatchups,
        curRound = 1,
        NUM_ROUNDS = 4,
        sides = ['east', 'west'],
        matchups = [[1, 8], [4, 5], [2, 7], [3, 6], [1, 8], [4, 5], [2, 7], [3, 6]],
        roundX,
        team1,
        team2,
        winSlot,
        allInputs = document.getElementsByTagName("input"),
        setTeamOnClick,
        verifyInput;
    
    // Takes an li and sets the child img onclick
    setTeamOnClick = function (curSlot, nextSlot) {
        var img = curSlot.getElementsByTagName("img")[0],
            nextImg = nextSlot.getElementsByTagName("img")[0];
        
        img.onclick = function (event) {
            nextImg.src = img.src;
        };
    };
    
    // Validates input in series scoring
    verifyInput = function (e) {
        e = e || window.event;
        var keyChar = String.fromCharCode(e.keyCode),
            input = e.target || e.srcElement;
        
        if (keyChar < '0' || keyChar > '4') {
            return false;
        } else {
            input.value = "";
        }
    };
    
    // Set up onClicks for all images
    while (curRound <= NUM_ROUNDS) {
        // Go through east and west
        for (i = 0; i < sides.length; i += 1) {
            roundX = document.getElementsByClassName(sides[i] + " round" + curRound)[0];
            
            // Go through each matchup
            for (j = 0; j < matchups.length / 2; j += 1) {
                team1 = roundX.getElementsByClassName("seed" + matchups[j][0])[0];
                team2 = roundX.getElementsByClassName("seed" + matchups[j][1])[0];

                if (curRound < 4) {
                    winSlot = document.getElementsByClassName(sides[i] + " round" + (curRound + 1))[0];
                } else {
                    winSlot = document.getElementsByClassName("champion")[0];
                }

                setTeamOnClick(team1, winSlot.getElementsByClassName("seed" + matchups[j][0] + "-" + matchups[j][1])[0]);
                setTeamOnClick(team2, winSlot.getElementsByClassName("seed" + matchups[j][0] + "-" + matchups[j][1])[0]);
            }
        }

        // Merge
        if (curRound < 4) {
            newMatchups = [];
            for (i = 0; i < matchups.length; i += 2) {
                matchups[i][0] = matchups[i][0] + "-" + matchups[i][1];
                matchups[i][1] = matchups[i + 1][0] + "-" + matchups[i + 1][1];
                newMatchups.push(matchups[i]);
            }
            matchups = newMatchups;
        }
        
        curRound += 1;
    }
    
    // Setup text listeners for all inputs
    for (i = 0; i < allInputs.length; i += 1) {
        allInputs[i].onkeypress = verifyInput;
    }
};

app.setup();