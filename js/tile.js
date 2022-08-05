// This class works like a factory function
class Tile{
    constructor(x, y, sprite, passable) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
    };

    getNeighbor(dx, dy) {
        return getTile(this.x + dx, this.y + dy)
    };

    // used to return an array (and shuffling it before being returned) representing the location of the item 'above', 'below', 'on the right' and 'on the left' of the object inside 'tile []' that's being tested
    getAdjacentNeighbors() {
        return shuffle([
            this.getNeighbor(0, -1),
            this.getNeighbor(0, 1),
            this.getNeighbor(-1, 0),
            this.getNeighbor(1, 0)
        ]);
    };

    // will return a copy from the array returned on the 'getAdjacentNeighbors()' function. But this copy will only contain tiles where the value for the key 'passable' on each of the objects being checked inside the array 'tile []' is true (right now, 'Floor')
    getAdjacentPassableNeighbors() {
        // MDN: filter() calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn returns a value that coerces to true.
        return this.getAdjacentNeighbors().filter(t => t.passable);
    };

    getConnectedTiles() {
        let connectedTiles = [this];
        let frontier = [this];
        while(frontier.length) {
            let neighbors = frontier.pop().getAdjacentPassableNeighbors().filter(t => !connectedTiles.includes(t));
            connectedTiles = connectedTiles.concat(neighbors);
            frontier = frontier.concat(neighbors);
        };
        return connectedTiles;
    }

    draw(){
        drawSprite(this.sprite, this.x, this.y)
    };
};

// Both 'Floor' and 'Wall' are childs created from 'Tile'
class Floor extends Tile { // 'extends' keyword is used to create a class child from 'Tile'
    constructor(x, y) {         // the constructor of 'Floor' only requires x & y since the other two parameters for the parent class will always be the same for this type of tyle
        super(x, y, 2, true);   // call the super class constructor and pass in the parameters from 'constructor' above and complete the parameters that will always be used in this type of child
    }
};

class Wall extends Tile {
    constructor(x, y) {
        super(x, y, 3, false);
    }
};