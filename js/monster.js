class Monster {
    constructor(tile, sprite, hp) {
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
    };

    draw() {
        drawSprite(this.sprite, this.tile.x, this.tile.y);
    };

    tryMove(dx, dy) {
        let newTile = this.tile.getNeighbor(dx, dy);
        if(newTile.passable) {
            if(!newTile.monster) {
                this.move(newTile);
            };
            return true;
        }
    }

    // helper function for tryMove(). Since it's a helper function, the parameter passed will be 'newTile' from tryMove(), meaning that it'll be check the tile 'ahead'
    move(tile) {
        if (this.tile) {                // first it'll remove the monster object in 'this' if it's interacting
                                        // with a valid tile
            this.tile.monster = null;   // ^^ 
        };
        this.tile = tile;               // then, it'll get the 'ahead' tile stored in 'newTile' and make it
                                        // 'this' tile -- this also updates where 'this' is drawn.
        tile.monster = this;            // it also stores 'this' object inside the array.
    }
};                                      // Notes above AREN'T quite right since monster will also have a
                                        // key-value stored in itself for the Tile. I will need to understand this better

class Player extends Monster{
    constructor(tile) {
        super(tile, 0, 3);
        this.isPlayer = true;
    }
};

class Bird extends Monster{
    constructor(tile) {
        // tile they'll be drawn, sprite, hp
        super(tile, 4, 3);
    }
};

class Snake extends Monster{
    constructor(tile) {
        super(tile, 5, 1);
    }
};

class Tank extends Monster{
    constructor(tile) {
        super(tile, 6, 2);
    }
};

class Eater extends Monster{
    constructor(tile) {
        super(tile, 7, 1);
    }
};

class Jester extends Monster{
    constructor(tile) {
        super(tile, 8, 2);
    }
};