function setupCanvas() {
    // Do we define 'canvas' and 'ctx' globally when not adding 'let' or 'const'?
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    // Defines the canvas width and height based on 'numTiles' + 'uiWidth'
    canvas.width = tileSize*(numTiles+uiWidth); // initiate the variable with the values calculated
    canvas.height = tileSize*numTiles; // same as above
    canvas.style.width = canvas.width + 'px'; // uses the variable to actually set up the width and height of the canvas element
    canvas.style.height = canvas.height + 'px'; // same as above
    
    // TO PROPERLY DISPLAY PIXEL ART (no foggy images)
    ctx.imageSmoothingEnabled = false;
};

// This is used to draw the player, monsters and tiles
function drawSprite(sprite, x, y) {
    ctx.drawImage(              // parameters for the 'drawImage' method
        spritesheet,            // image/source
        sprite*16,              // source x value   - WHERE from the SPRITESHEET
        0,                      // source y value   - ^^ 
        16,                     // source width     - ^^
        16,                     // source height    - ^^
        x*tileSize + shakeX,    // destiny x value  - WHERE to DRAW on SCREEN 
        y*tileSize + shakeY,    // destiny y value  - ^^
        tileSize,               // destiny width    - ^^
        tileSize                // destiny height   - ^^
    );
};

function draw() {
    if (gameState == 'running' || gameState == 'dead') { // only draws the game on the correct 'gameState'
        // the x*20 and y*20 is what makes the game be drawn in a grid manner. Each move will always draw someting 20 pixels from its previous position - or the next 'square' on the grid used
        // REMOVED ctx.fillRect (x*20, y*20, 20, 20);
        // REMOVED ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
        // The functionality above was later moved to 'drawSprite()';
        
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        screenshake();  // screenshake effect on hit

        // draw the map
        for (let i = 0; i < numTiles; i++) {
            for(let j=0; j < numTiles; j++) {
                getTile(i, j).draw();   // '.draw()' is a method of Tiles. It calls 'drawSprite()' and uses the x & y key-values stored on each instance of the object to locate where it'll be drawn
                                        // the 'i' and 'j' here works as the coordinates for each tile inside the map arrays. It works to drawn the tile because drawSprite() utilizes the coordinates of each tile inside the array and multiplies that value for 'tileSize' 
            }
        };

        for(let m = 0; m < monsters.length; m++) {
            monsters[m].draw();
        };

        // draw player sprite
        // REMOVED drawSprite(0, x, y)
        player.draw(); // since now player is an objected created using the class constructor, we use its own method

        drawText("Level: " + level, 30, false, 40, 'violet');
        drawText("Score: " + score, 30, false, 70, 'violet');

        // drawing the spells
        for (let i=0; i < player.spells.length; i++) {
            let spellText = (i+1) + ") " + (player.spells[i] || "");
            drawText(spellText, 20, false, 110+i*40, 'aqua');
        }
    }
};

// this used to call doStuff() for each monster stored in 'monsters []' 
function tick() {
    for(let k = monsters.length -1; k >= 0; k--) { // the list is checked in reverse so the items can be safely deleted during the process 
        if(!monsters[k].dead) {     // if they don't have a 'dead' key
            monsters[k].update();   // does this - which will call doStuff()
        } else {
            monsters.splice(k, 1);  // if the monster being checked has the 'dead' key, removes it from the list
        }
    };

    player.update();

    if(player.dead) {               // updates the 'gameState' if the player has the dead flag after monsters' turn
        addScore(score, false);
        gameState = 'dead';
    };

    spawnCounter--;
    if(spawnCounter <= 0) {
        spawnMonster();
        spawnCounter = spawnRate;
        spawnRate--;
    };
};

function showTitle() {
    ctx.fillStyle = 'rgba(0, 0, 0, .74)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameState = 'title';

    drawText('SUPER', 40, true, canvas.height/2 - 110, 'violet');
    drawText('NEON', 70, true, canvas.height/2 - 50, 'violet');

    drawScores();
};

function startGame(){
    level = 1;
    score = 0;
    numSpells = 1;
    startLevel(startingHp);
    
    gameState = 'running';
};

function startLevel(playerHp, playerSpells){
    spawnRate = 15;
    spawnCounter = spawnRate;

    generateLevel();

    player = new Player(randomPassableTile());
    player.hp = playerHp;

    if(playerSpells) {
        player.spells = playerSpells;
    }

    randomPassableTile().replace(Exit);
};

function drawText(text, size, centered, textY, color) {
    ctx.fillStyle = color;
    ctx.font = size + 'px monospace';
    let textX;
    if (centered) {
        textX = (canvas.width - ctx.measureText(text).width)/2;
    } else {
        textX = canvas.width - uiWidth * tileSize + 25;
    };

    ctx.fillText(text, textX, textY)
};

function getScores() {                                  // grabs the scores stored using JSON. fancy
    if(localStorage["scores"]) {
        return JSON.parse(localStorage["scores"]);
    } else {
        return [];
    }
};

function addScore(score, won) {     // 'won' will be 'true' or 'false'
    let scores = getScores();       // if 'scores' does not exists yet, getScore will return an empty array, else, it'll return the actual scores after parsing them to JS from JSON
    let scoreObject = {score: score, run: 1, totalScore: score, active: won};
    let lastScore = scores.pop();   // removes and gets the last object on 'scores'

    if (lastScore) {
        if(lastScore.active) {
            scoreObject.run = lastScore.run + 1;
            scoreObject.totalScore += lastScore.totalScore;
        } else {
            scores.push(lastScore);
        }
    }

    scores.push(scoreObject);

    localStorage["scores"] = JSON.stringify(scores);    // will put the updated scores on "scores" on a string format (JSON needed)
};

function drawScores() {
    let scores = getScores();
    if(scores.length) {
        drawText(
            rightPad(["RUN", "SCORE", "TOTAL"]),
            18,
            true,
            canvas.height/2,
            'violet'
        );

        let newestScore = scores.pop();
        scores.sort(function (a, b) {
            return b.totalScore - a.totalScore;
        });
        // MDN: unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
        scores.unshift(newestScore);

        for(let i = 0; i < Math.min(10, scores.length); i++) {
            let scoreText = rightPad([scores[i].run, scores[i].score, scores[i].totalScore]);
            drawText(
                scoreText,
                18,
                true,
                canvas.height/2 + 24 + i*24,
                i == 0 ? "aqua" : "violet"
            );
        }
    }
};

function screenshake() {
    if (shakeAmount) {  // keeps doing the screenshake effect while 'shakeAmount' is not 0
        shakeAmount--;
    };

    let shakeAngle = Math.random()*Math.PI*20;
    shakeX = Math.round(Math.cos(shakeAngle)*shakeAmount);
    shakeY = Math.round(Math.sin(shakeAngle)*shakeAmount);
};

function initSounds() {
    sounds = {
        hit1: new Audio('sounds/hit1.wav'),
        hit2: new Audio('sounds/hit2.wav'),
        treasure: new Audio('sounds/treasure.wav'),
        newLevel: new Audio('sounds/newLevel.wav'),
        spell: new Audio('sounds/spell.wav'),
        playerDead: new Audio('sounds/playerDead.wav')
    }
};

function playSound(soundName) {
    sounds[soundName].currentTime = 0;
    sounds[soundName].play();
};