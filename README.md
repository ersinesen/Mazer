# Mazer

Random maze generator and Mazerunner game.

Source available at [Github](https://github.com/ersinesen/Mazer) and [Replit](https://replit.com/@ersinesen/Mazer).

Running replit:

```
cd web
node index.js
```

# Maze Generation

Random maze is generated using a brilliant probablistic programming language [MarkovJunior](https://github.com/mxgmn/MarkovJunior) by [Maxim Gumin](https://github.com/mxgmn). Used another branch to get rid of System.Drawing incompatibility in net6:

```
git clone --branch replace-System.Drawing-with-SixLabors.ImageSharp https://github.com/ahouts/MarkovJunior.git
```

To generate a random maze visit the [URL](https://mazer.ersinesen.repl.co/maze) or 

```
curl https://mazer.ersinesen.repl.co/maze --output maze.png
```

You can also specify the dimensions (max=100, default=20): [50x50](https://mazer.ersinesen.repl.co/maze?width=50&height=50)

```
curl https://mazer.ersinesen.repl.co/maze?width=50&height=50 --output maze50.png
```

![A random maze](https://mazer.ersinesen.repl.co/static/maze.png)

[A sample to find the shortest path between two points in the maz](https://mazer.ersinesen.repl.co/mazepath)

# Mazerunner Game

[![](https://mazer.ersinesen.repl.co/static/mazerunner.png)](https://mazer.ersinesen.repl.co/mazerunner)

A Three.js based first person runner game to test your memory.

Aim: Find the red sphere hidden in the maze and return to starting point as soon as possible. 

You can make use of the signs on the walls to remember the path you traversed.




 