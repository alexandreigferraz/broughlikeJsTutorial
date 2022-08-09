# Broughlike Js Tutorial

My code along and studies for the BroughLike JS tutorial.

The full and amazing tutorial by Jeremiah Reid (https://twitter.com/trash_impostor) can be found here: https://nluqo.github.io/broughlike-tutorial/stage0.html

The objective of this is trying to keep improving on my basic knowledge of JavaScript and coding in general. Months ago I finished this tutorial, however, I could understand almost zero of all things I typed. Now that I finished an introductory course about JavaScript and one that covered things with a bit more of detail, I decided to come back to it and see how I could understand it.

-- On the second day:
* Amazing to see how an experienced programmer will sew one function into another and build a modular ecosystem.
* Was able to better understand how a 'drawSprite' function can work together with pre-determined values that will define tileSize.
* also learned more about drawImage().
* Could see again objects being acessed and their values being used on what to me looks like a very advanced way of doing things. Yey!
* This time I was able to better understand how each function uses one another since I'm more used to stuff like 'return', accessing information inside objects and Truthy & Falsy in general.

-- on the third day:
* While checking the code for movement, was able to better understand how objects created from the Monster class (its childs actually) were stored inside the two dimensional arrays. I believe this works for pretty much everything.
* I'm happy that I was also able to better understand how the helper function move() was working alongside tryMove(). But I still need to work on that. If I 'console.log(tiles[1][1]);' and the player object is there, I noticed that tiles[1][1] will hold an instance of the Floor object but the player object (created from Player, an extension of Monster) will also have the information of Floor inside them. Not sure on how that works yet.
* Was amazing to see the player object using its method tryMove() so we could update its location.
* It's also very cool that each object created from the Monster class handles its own location based on the tile stored in them - which again, I can't fully understand yet

-- on the fourth day
* I was able to understand the pathfinding alghorithm by reading the code and making some sketches on a notebook. It felt amazing since I remember looking at this some months ago and finding it totally impenetrable. This was one of these big "wow" moments.
* I was also able to understand the JS methods being used (like filter()) and how they're helping the game to be built. Also, as a side note, I could finally have a better understanding on the functions inside these methods like filter() - maybe they're the ones called callback function. Not totally sure yet.

-- on the fifth day
* I finished monsters part 2 and could implement a function that changes the sprites of Eater based on how much 'hp' they has. Took me some time to understand where to put some parts of the code and I still need to fix the logic regarding 'how much hp points are needed for something to happen' (and I believe I know where te issue is)
* I also got help from the auther and someone else in their discord. They helped me understanding a bit better 'circular reference' and how the data is stored and points to each other (so, my previous take on how stuff is put inside on an array is totally wrong lol). Was pretty cool and now I see where I was wrong. Just need to keep working on understanding how it actually works
