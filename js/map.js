function generateLevel() {
    tryTo('generate map', function() {
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });

    generateMonsters();
};

function generateTiles() {
    let passableTiles = 0;
    tiles = [];
    for(let i = 0; i < numTiles; i++) {
        tiles[i] = [];
        for(let j = 0; j < numTiles; j++) {
            if(Math.random() < 0.3 || !inBounds(i, j)) {
                tiles[i][j] = new Wall(i, j);
            } else {
                tiles[i][j] = new Floor(i, j);
                passableTiles++;
            }
        }
    }
    return passableTiles;
};

// this will return true if both x & y are between 0 and 'numTiles' -1. 
function inBounds(x, y) {
    return x > 0 && y > 0 && x < (numTiles -1) && y < (numTiles -1);
};

// if the values passed as parameters of 'getTile()' are true considering 'inBounds()', it returns the coordinates for the tile inside the arrays
function getTile(x, y) {
    if (inBounds(x, y)) {
        return tiles[x][y];
    } else { // if x & y return false on 'inBounds()', it creates a new Wall
        return new Wall(x, y);
    }
};

function randomPassableTile() {
    let tile;
    tryTo('get random passable tile', function() {
        let x = randomRange(0, numTiles-1); // initiates 'x' with a random value that is between the coordinates possible for a valid tile
        let y = randomRange(0, numTiles-1); // ^^ but for 'y'
        tile = getTile(x, y);               // uses values stored in 'x' & 'y' on 'getTile()' which returns 'tiles[x][y]' if the parameters are true. That way, tile will be a valid reference to the arrays and nested arrays inside 'tiles []' 
        return tile.passable && !tile.monster; // if both are true, breaks out of the function and then returns 'tile' in the line below. If the 'waiting time' set on 'tryTo()' is over, that function will stop and throw the error message
        // it's EXTREMELY important to remember that on 'generateTiles()', we created objects ('Wall's and 'Floor's) and stored them inside 'tiles []'.
        // We can, as an example: console.log(tiles[2][1].passable); which will return 'true' or 'false' depending on what object is stored at these coordinates inside the array
    });
    return tile;
};

function generateMonsters() {
    monsters = [];
    let numMonsters = level + 1;
    for(let m = 0; m < numMonsters; m++) {
        spawnMonster();
    }
};

function spawnMonster() {
    let monsterType = shuffle([Bird, Snake, Tank, Eater, Jester])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
};