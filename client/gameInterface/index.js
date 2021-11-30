import {
	CANVAS_STYLE,
	OBJECT_STYLES,
	CELL_STYLE,
	BOARD_STYLE,
	TITLE_SECTION_STYLE,
	SCORE_STYLE,
	TIME_STYLE
} from './canvasStyles.js'


export class GameInterface {

	canvas = null

	constructor() {
		this.cellSize = 15;
		this.padding = 1;
	}

	getContext = () => {
		return this.canvas.getContext('2d')
	}

	initCanvas = () => {
		console.log(this.canvas)
		if (this.canvas === null) {
			console.log('create and inject canvas')
			const canvas = document.createElement("canvas");
			canvas.width = CANVAS_STYLE.width
			canvas.height = CANVAS_STYLE.height
			canvas.style.background = CANVAS_STYLE.backgroundColor
			document.getElementById('game-canvas-container').appendChild(canvas)
			this.canvas = canvas
		}
	}

	drawTopSection = () => {
		const context = this.getContext()
		context.fillStyle = TITLE_SECTION_STYLE.fill
		context.fillRect(
			0,
			0,
			TITLE_SECTION_STYLE.width,
			TITLE_SECTION_STYLE.height)
	}

	drawTitle = () => {
		const context = this.getContext()
		context.fillStyle = TITLE_SECTION_STYLE.textColor
		context.font = TITLE_SECTION_STYLE.font
		context.fillText(
			'Minigrid Game',
			40,
			40)
	}


	drawCell = (x, y, key) => {
		const w = 15
		const h = 15
		const context = this.getContext()
		const style = OBJECT_STYLES[key]
		context.fillStyle = style.fill ? style.fill : CELL_STYLE.fill
		context.fillStrokeStyle = style.stroke ? style.stroke : CELL_STYLE.stroke
		context.fillRect(x, y, w, h)
		context.fillStyle = SCORE_STYLE.textColor
		context.font = SCORE_STYLE.font
		console.log('drawInfo', 'X')
		if(key==6){
		context.fillText('x', x+6, y+13)
		}
		if(key==3){
		context.fillText('15', x, y+13)
		}
		if(key==4){
		context.fillText('╛', x+5, y+13)
		}
		if(key==5){
		context.fillText('-15', x, y+13)
		}
	}


	drawScore = (score) => {
		console.log('drawScore', score)
		const context = this.getContext()
		context.fillStyle = SCORE_STYLE.textColor
		context.font = SCORE_STYLE.font
		context.fillText(
			`Score: ${score}`,
			SCORE_STYLE.left,
			SCORE_STYLE.top)
	}

    /*drawTime = (time) => {
		console.log('drawTime', time)
		const context = this.getContext()
		context.fillStyle = TIME_STYLE.textColor
		context.font = TIME_STYLE.font
		context.fillText(
			`Time: ${time}`,
			TIME_STYLE.left,
			TIME_STYLE.top)
	}*/

	drawBoard = () => {
		const context = this.getContext()
		context.fillStyle = BOARD_STYLE.fill
		context.fillRect(
			0,
			TITLE_SECTION_STYLE.height,
			BOARD_STYLE.width,
			BOARD_STYLE.height)
	}

	fillBoard = (matrix) => {
		for (let row = 0; row < matrix.length; row ++) {
			for (let col = 0; col < matrix[row].length; col ++) {
				const cellVal = matrix[row][col];
				this.drawCell(
					col * (this.cellSize + this.padding),
					TITLE_SECTION_STYLE.height + row * (this.cellSize + this.padding),
					cellVal
				)
			}

		}
	}

	render = (matrix) => {
		this.initCanvas()
		this.drawTopSection()
		this.drawTitle()
		//this.drawTime(matrix.time)
		this.drawScore(matrix.score)
		this.drawBoard()
		this.fillBoard(matrix.board)
	}

	clearCanvas = () => {
	    this.canvas.remove()
	    this.canvas = null

	}
}
