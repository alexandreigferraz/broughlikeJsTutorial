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
    ctx.drawImage(      // parameters for the 'drawImage' method
        spritesheet,    // image/source
        sprite*16,      // source x value   - WHERE from the SPRITESHEET
        0,              // source y value   - ^^ 
        16,             // source width     - ^^
        16,             // source height    - ^^
        x*tileSize,     // destiny x value  - WHERE to DRAW on SCREEN 
        y*tileSize,     // destiny y value  - ^^
        tileSize,       // destiny width    - ^^
        tileSize        // destiny height   - ^^
    );
};

function draw() {
    // the x*20 and y*20 is what makes the game be drawn in a grid manner. Each move will always draw someting 20 pixels from its previous position - or the next 'square' on the grid used
    // REMOVED ctx.fillRect (x*20, y*20, 20, 20);
    // REMOVED ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
    // The functionality above was later moved to 'drawSprite()';
    
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
};