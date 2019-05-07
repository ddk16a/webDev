// import Socket from './Socket.js';
import Stage from './Stage.js';
import Highlight from './Highlight.js';
import Socket from './Socket.js';

//constructor
export default function Piece(row, col, color, pattern) {
	this.Shape_constructor();

	this.color = color;
	this.pattern = pattern;
	
	this.moveTo(row, col);

	Piece.count[color]++;
}

var p = createjs.extend(Piece, createjs.Shape);

//moves the piece to specified destinations
//called by the highlights
p.moveTo = function(row, col) {
	if (Stage.get(row, col))
		Stage.get(row, col).capture();
	this.name = row+":"+col;
	this.x = col * 70;
	this.y = row * 70;
	this.row = row;
	this.col = col;
}

//remove the piece and updates the piece count
//called by the highlights
p.capture = function() {
	Piece.count[this.color]--;
	Stage.remove(this);
	Stage.update();
	if(Piece.count[this.color] < 16)
		Socket.emit("lose", this.color);
}

//allows the piece to be moved
p.setClick = function() { this.on('click', Piece.focus); }

//prevents the piece from moving
p.unsetClick = function() { this.removeAllEventListeners(); }

p.setAlly = function() {
	this.setClick();
	this.ally = true;
}

//static valriable keeping track of each sides piece count
Piece.count = { white: 0, black:0 };

//handler for when the piece is clicked
Piece.focus = function() {
	Highlight.revert();
	Highlight.target = this;
	Highlight.highlight(this.pattern());
}

createjs.promote(Piece, 'Shape');
