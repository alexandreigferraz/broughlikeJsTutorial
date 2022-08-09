class Monster {
    constructor(tile, sprite, hp) {
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
    };

    heal(damage) {
        // MDN: The Math.min() method returns the number with the lowest value.
        this.hp = Math.min(maxHP, this.hp+damage) // returns the the second parameter if it's not greater than 'maxHP'
    }
    
    update() {
        if (this.stunned) {         // if 'this' has the stunned flag,
            this.stunned = false;   // sets it to false so it can move next turn
            return;                 // and breaks out of update() so it doesn't move right now
        };

        this.doStuff();
    };

    doStuff() {
        let neighbors = this.tile.getAdjacentPassableNeighbors(); // pick tiles that aren't 'Wall'

        neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);    // filters the list of tiles got from getAdjacentPassableNeighbors() and return only the ones that don't have a Monster (enemy) or the ones containing a 'isPlayer = true' flag.

        if (neighbors.length) { // since '0' is falsy, length needs to be > 0

            // we created a list os passable tiles and stored it on 'neighbors'. dist() returns a value based on the 'distance' between the 'x' & 'y' value stored in the tile on 'this' and the 'x' & 'y' value stored in the 'player' variable. The value returned by dist() is smaller for tiles that are 'closer' to the player. Sort will put the 'closer' tile first in the list
            neighbors.sort((a, b) => a.dist(player.tile) - b.dist(player.tile));
            let newTile = neighbors[0]; // then we grab the first Tile object stored in the neighbors array and initiate 'newTile' with its value
            this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y); // this math will generate the correct values for 'dx' and 'dy' that's required by tryMove()
        }
    }

    draw() {
        drawSprite(this.sprite, this.tile.x, this.tile.y);
        this.drawHP();
    };

    drawHP() {
        for(let i = 0; i < this.hp; i++) {
            drawSprite(
                11,
                this.tile.x + (i%3)*(2/16), // drawSprite() draws based on sprites that are 16 pixels squares. by dividing it like above, we make something to be drawn 'on the same square'. 'So 3/16 means 5 pixels within a 16 pixel sprite.'
                                            // 1%3 'resets to 0 every 3 pips.' (1%3=1, 2%3=2, 3%3=0)
                                            // (i%3)*(2/16) is the math that makes the pips being drawn one after the other in the 'same square/sprite'.
                this.tile.y - Math.floor(i/3)*(2/16)
            );
        }
    };

    tryMove(dx, dy) { // the 'dx' and 'dy' values come from the input keys ('a' has (-1, 0), 'w' (0, -1) etc)
        let newTile = this.tile.getNeighbor(dx, dy);
        if(newTile.passable) {      // only runs the code if the tile being checked is not a Wall (whic has .passable set to false)
            if(!newTile.monster) {  // this is used for 'Monsters'. They can't move on tiles that have a monster
                this.move(newTile);
            } else {                // this is for monsters that try to move into a tile that has a player
                if(this.isPlayer != newTile.monster.isPlayer) { // prevents monsters from attacking each other
                    this.attackedThisTurn = true;       // used on the Snake class
                    newTile.monster.stunned = true;     // this will add the stunned flag to monsters that were attacked
                    newTile.monster.hit(1);
                }
            };

            return true;
        }
    };

    hit(damage) {
        this.hp -= damage;
        if(this.shapeShifter) {     // used on monsters that can change their sprites
            this.updateSprite();
        }
        if(this.hp <= 0) {
            this.die();
        };
    };

    die() {
        this.dead = true;
        this.tile.monster = null;
        this.sprite = 1;
    };

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
    };

    tryMove(dx, dy) { // 'Monster' tryMove() is overriden 
        if(super.tryMove(dx, dy)) { // but it basically calls the father's tryMove()
            tick();                 // the big difference is that is it returns true, it will also trigger tick() wich is responsible for moving all monsters
        }
    };
};

// VANILLA MONSTER
class Bird extends Monster{
    constructor(tile) {
        // tile they'll be drawn, sprite, hp
        super(tile, 4, 3);
    }
};

// WALKS TWICE || MOVE AND ATTACK - will NOT attack twice 
class Snake extends Monster{
    constructor(tile) {
        super(tile, 5, 1);
    };

    doStuff() {
        this.attackedThisTurn = false;
        super.doStuff();

        if(!this.attackedThisTurn) {
            super.doStuff();
        };
    };
};

// CAN ONLY WALK EACH OTHER TURN - due to the stunned flag being added to them when moving
class Tank extends Monster{
    constructor(tile) {
        super(tile, 6, 2);
    }

    update() {
        let startedStunned = this.stunned;
        
        super.update();                     // if this.stunned = true, it'll not move on update() and the 'stunned flag will be set to false
                                            // it this.stunned = false, it'll just move normally on update()
        
        if(!startedStunned) {               // if 'startedStunned' = false, will set it to true
            this.stunned = true;
        };
    }
};

// UPDATES 'Wall' AROUND THEN TO 'Floor' AND GAIN 0.5 LIFE POINTS AFTER DOING SO
class Eater extends Monster{
    constructor(tile) {         // would be super cool to change its sprite for a more buffed one after they have a certain amount of life points
        super(tile, 7, 1);
        this.shapeShifter = true;
    };

    doStuff() {
        let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x, t.y));
        if(neighbors.length) {
            neighbors[0].replace(Floor);
            this.heal(0.5);
            this.updateSprite()
        } else {
            super.doStuff();
            this.updateSprite();
        }
    }

    updateSprite() {        // function created to update 'this' sprite value depending on much 'hp' it has
        if (this.hp < 3) {
            this.sprite = 7;
        } else if (this.hp >= 3 && this.hp < 5) {
            this.sprite = 8;
        } else if (this.hp >= 5) {
            this.sprite = 9;
        };
    }
};

// MOVES RANDOMLY 
class Jester extends Monster{
    constructor(tile) {
        super(tile, 10, 2);
    };

    doStuff() {
        let neighbors = this.tile.getAdjacentPassableNeighbors();       // getAdjacentNeighbors() is a helper function of getAdjacentPassableNeighbors(). The first one shuffles the tiles when making the array containing the passable neighbors.
        if (neighbors.length) {
            this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
        };
    }
};