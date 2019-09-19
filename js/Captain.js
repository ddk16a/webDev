import Piece from './Piece.js';
import Highlight from './Highlight.js';
import Stage from './Stage.js';

export default function Captain(row, col, color) {
	this.Piece_constructor(row, col, color, Captain.pattern);
	this.graphics = Captain.graphics[color];
}
createjs.extend(Captain, Piece);

Captain.graphics = {
	white: new createjs.Graphics().f('#bbb').drawCircle(35,35,30),
	black: new createjs.Graphics().f('#666').drawCircle(35,35,30)
}

function propogate(row, col, offsety, offsetx) {
	let array = new Array({ row: row, col: col });
	if (Stage.get(row, col) || !Stage.range.includes(row + offsety) || !Stage.range.includes(col + offsetx))
		return array;
	return array.concat(propogate(row + offsety, col + offsetx, offsety, offsetx));
}

Captain.pattern = () => {
	let piece = Highlight.target;

	return propogate(piece.row + 1, piece.col, 1, 0)
		.concat(propogate(piece.row - 1, piece.col, -1, 0))
		.concat(propogate(piece.row, piece.col + 1, 0, 1))
		.concat(propogate(piece.row, piece.col - 1, 0, -1));
};

createjs.promote(Captain, "Piece");