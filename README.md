# Game

## **Hey**
## Turns
There is a file in the **js** folder called **Socket.js** that imports the **Stage**.  
To accomidate for turns there are functions
	
	Stage.startTurn()
	Stage.endTurn()

which will enable and disable piece movement respectivly.

### note
I redid the project to clean up some code.  
I did some stuff with EaselJS classes and inheritence, so now making a new type of Piece should be very easy and clear.  
I included an example below and a file called ***PieceTemplate.js*** that has comments, and that should explain how to make a piece.  

### Movement
The movement of a piece should be defined in the `MyPiece.pattern` function (shown in the example below).  
When an ally piece is clicked, tiles will highlight based on the return value of `MyPiece.pattern()`.  
The clicked tile becomes the target.  
Tiles will be highlighted only a tile exists in that location (so not off the board) and
 * that tile is empty, or
 * the tile contains an enemy piece (that is to say, any tiles containing ally pieces will not be highlighted).  
 
When a highlighted tile is clicked, the target piece will be moved to that tile. and the highlights will disapear.  
If the destination tile contained an enemy piece, that piece will be captured and removed from the board.

### Interactions with the Stage
If you need to interact with the stage (to check if a piece exists in a location) than at the head of the file you can add

	import Stage from './Stage.js';
	
and you can have access to the function

	Stage.get(row, col)

which will return the piece at the location, or null if there is no piece.
 
### PieceTemplate
	import Piece from './Piece.js';
	import Highlight from './Highlight.js';

	function MyPiece(row, col, color) {
		this.Piece_constructor(row, col, color, MyPiece.pattern);
	}
	createjs.extend(MyPiece, Piece);

	MyPiece.pattern = () => {
		let piece = Highlight.target;
		let tiles = new Array();

		//logic for determining where the piece MyPiece can go
		...

		return tiles;
	};

	createjs.promote(MyPiece, "Piece");
