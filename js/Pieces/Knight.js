import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Knight(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Knight.graphics[color];
}
let p = createjs.extend(Knight, Piece);

p.pattern = function() {
	let spaces = [];

	if (!Stage.get(this.row+2, this.col+1) || Stage.get(this.row+2, this.col+1).color != this.color)
		spaces.push({ row: this.row + 2, col: this.col + 1 });
	if (!Stage.get(this.row+2, this.col-1) || Stage.get(this.row+2, this.col-1).color != this.color)
		spaces.push({ row: this.row+2, col: this.col-1 });
	if (!Stage.get(this.row-2, this.col+1) || Stage.get(this.row-2, this.col+1).color != this.color)
		spaces.push({ row: this.row-2, col: this.col+1 });
	if (!Stage.get(this.row-2, this.col-1) || Stage.get(this.row-2, this.col-1).color != this.color)
		spaces.push({ row: this.row-2, col: this.col-1 });
	if (!Stage.get(this.row+1, this.col+2) || Stage.get(this.row+1, this.col+2).color != this.color)
		spaces.push({ row: this.row+1, col: this.col+2 });
	if (!Stage.get(this.row+1, this.col-2) || Stage.get(this.row+1, this.col-2).color != this.color)
		spaces.push({ row: this.row+1, col: this.col-2 });
	if (!Stage.get(this.row-1, this.col+2) || Stage.get(this.row-1, this.col+2).color != this.color)
		spaces.push({ row: this.row-1, col: this.col+2 });
	if (!Stage.get(this.row-1, this.col-2) || Stage.get(this.row-1, this.col-2).color != this.color)
		spaces.push({ row: this.row-1, col: this.col-2 });
	
	return spaces;
}

Knight.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

createjs.promote(Knight, "Piece");
