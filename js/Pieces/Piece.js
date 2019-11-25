// import Socket from './Socket.js';
import Stage from './Stage.js';
import Highlight from './Highlight.js';
import Socket from './Socket.js';

//constructor
export default function Piece(row, col, color, id) {
	this.Shape_constructor();

	this.color = color;
	this.id = id;
	
	this.moveTo(row, col);
}

var p = createjs.extend(Piece, createjs.Shape);

//moves the piece to specified destinations
//called by the highlights
p.moveTo = function(row, col) {
	this.x = col * 70;
	this.y = row * 70;
	this.col = col;
	this.row = row;
	this.name = row+":"+col;
}

//allows the piece to be moved
p.setClick = function() { this.on('click', Piece.focus); }

//prevents the piece from moving
p.unsetClick = function() { this.removeAllEventListeners(); }

p.setAlly = function() {
	this.setClick();
	this.ally = true;
}

//handler for when the piece is clicked
Piece.focus = function() {
	Highlight.revert();
	Highlight.target = this;
	Highlight.highlight(this.pattern());
}

createjs.promote(Piece, 'Shape');