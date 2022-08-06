# Broughlike Js Tutorial

My code along and studies for the BroughLike JS tutorial.

The full and amazing tutorial by Jeremiah Reid (https://twitter.com/trash_impostor) can be found here: https://nluqo.github.io/broughlike-tutorial/stage0.html

The objective of this is trying to keep improving on my basic knowledge of JavaScript and coding in general. Months ago I finished this tutorial, however, I could understand almost zero of all things I typed. Now that I finished an introductory course about JavaScript and one that covered things with a bit more of detail, I decided to come back to it and see how I could understand it.

-- On the second day:
* Amazing to see how an experienced programmer will sew one function into another and build a modular ecosystem.
* Was able to better understand how a 'drawSprite' function can work together with pre-determined values that will define tileSize.
- also learned more about drawImage().
* Could see again objects being acessed and their values being used on what to me looks like a very advanced way of doing things. Yey!
* This time I was able to better understand how each function uses one another since I'm more used to stuff like 'return', accessing information inside objects and Truthy & Falsy in general.

-- on the third day:
* While checking the code for movement, was able to better understand how objects created from the Monster class (its childs actually) were stored inside the two dimensional arrays. I believe this works for pretty much everything.
* I'm happy that I was also able to better understand how the helper function move() was working alongside tryMove().
- but I still need to work on that. If I 'console.log(tiles[1][1]);' and the player object is there, I noticed that tiles[1][1] will hold an instance of the Floor object but the player object (created from Player, an extension of Monster) will also have the information of Floor inside them. Not sure on how that works yet.
* Was amazing to see the player object using its method tryMove() so we could update its location.
* It's also very cool that each object created from the Monster class handles its own location based on the tile stored in them - which again, I can't fully understand yet
