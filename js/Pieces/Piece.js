import Stage from '../Utils/Stage.js';
import Highlight from '../Utils/Highlight.js';
import Socket from '../Utils/Socket.js';

//constructor
export default function Piece(row, col, color) {
	this.Shape_constructor();

	this.color = color;
	
	this.moveTo(row, col);
}

var p = createjs.extend(Piece, createjs.Shape);

//moves the piece to specified destinations
//called by the highlights
p.moveTo = async function(row, col) {
	let q = Stage.get(row, col);
	if (q && q.king)
		Socket.emit('lost', this.color);
	Stage.remove(q);
	this.x = col * 70;
	this.y = row * 70;
	this.col = col;
	this.row = row;
	this.name = row+":"+col;
	await this.moved();
}

//allows the piece to be moved
p.setClick = function() { this.on('click', Piece.focus); }

//prevents the piece from moving
p.unsetClick = function() { this.removeAllEventListeners(); }

p.setAlly = function() {
	this.setClick();
	this.ally = true;
}

p.moved = async function() {}

//handler for when the piece is clicked
Piece.focus = function() {
	Highlight.revert();
	Highlight.target = this;
	Highlight.highlight(this.pattern());
}

createjs.promote(Piece, 'Shape');
