import Socket from './Socket.js';
import Stage from "./Stage.js";

//constructor
export default function Highlight(row, col) {
	this.Shape_constructor();

	this.graphics.f('#2af').drawRect(0,0,70,70);
	this.name = row+":"+col+"HL";
	this.row = row;
	this.col = col;
	this.x = col*70;
	this.y = row*70;
	this.alpha = 0.4;

	//click the highlighted space to move the piece
	this.on("click",function (event) {
		let piece = Highlight.target;
		Socket.emit('move', { row: piece.row, col: piece.col }, { row: this.row, col: this.col });
		Stage.endTurn();
		piece.moveTo(this.row, this.col);
		Highlight.revert();
		Stage.update();
	});

	Highlight.all.push(this);
}
createjs.extend(Highlight, createjs.Shape);

Highlight.all = new Array(); //keeps all the current highlights
Highlight.target = null; //keeps the piece that is currently trying to move

//this clears all the current Highlights
Highlight.revert = function() {
	Highlight.all.forEach((highlight) => Stage.remove(highlight));
	Highlight.all.splice(0, Highlight.all.length);
}

//this will highlight every tile in the tile list
Highlight.highlight = function(tileList) {
	tileList.forEach((props) => {
		//checks if the location is on the board
		if (Stage.range.includes(props.row) && Stage.range.includes(props.col)) {
			let piece = Stage.get(props.row, props.col);
			//highlight the space is empty
			if (!piece)
				Stage.add(new Highlight(props.row, props.col));

			//highlighs only if the piece os an opposing piece
			else if (piece.color != Highlight.target.color)
				Stage.add(new Highlight(props.row, props.col));
		}
	});
	Stage.update();
}

createjs.promote(Highlight, 'Shape');