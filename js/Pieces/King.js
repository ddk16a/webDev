import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function King(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = King.graphics[color];
	this.king = true;
	this.state = 'initial';
	this.initPos = {row: row, col: col};
}
let p = createjs.extend(King, Piece);

p.pattern = function() {
	let spaces = [];

	if (this.state == 'initial') {
		if (Stage.get(this.row, 0) && Stage.get(this.row, 0).state == 'initial') {
			let path = true;
			for (let i = 1; i < this.col; i++) {
				if (Stage.get(this.row, i))
					path = false;
			}
			console.log((path ? 'true' : 'false'));
			if (path)
				spaces.push({row: this.row, col: this.col-2});
		}
		if (Stage.get(this.row, 7) && Stage.get(this.row, 7).state == 'initial') {
			let path = true;
			for (let i = this.col+1; i < 7; i++) {
				if (Stage.get(this.row, i))
					path = false;
			}
			if (path)
				spaces.push({row: this.row, col: this.col+2});
		}
	}


	//for each of the surrounding the pieces
	for (let i = 0; i < 9; i++) {
		let r = this.row + Math.floor(i/3) - 1;
		let c = this.col + Math.floor(i%3) - 1;
		if (!Stage.get(r, c) || Stage.get(r, c).color != this.color) //if empty or is an enemy peice
			spaces.push({ row: r, col: c });
	}
	return spaces;
}

p.moved = async function() {
	if (this.state == 'initial') {
		if (this.row == this.initPos.row) {
			console.log([this.row, this.col]);
			if (this.col == this.initPos.col - 2)
				await Stage.get(this.row, 0).moveTo(this.row, this.col+1);
			else if (this.col == this.initPos.col + 2)
				await Stage.get(this.row, 7).moveTo(this.row, this.col-1);
		}
	}
	this.state = 'moved';
}

King.graphics = {
	white: new createjs.Graphics().f('#FFF').dr(10,10,15,5).dr(27.5,10,15,5).dr(45,10,15,5).dr(10,17.5,50,5).dr(17.5,25,35,20).dr(25,47.5,20,5).dr(10,55,50,5),
	black: new createjs.Graphics().f('#222').dr(10,10,15,5).dr(27.5,10,15,5).dr(45,10,15,5).dr(10,17.5,50,5).dr(17.5,25,35,20).dr(25,47.5,20,5).dr(10,55,50,5)
}

createjs.promote(King, "Piece");
