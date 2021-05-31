import './Color'
import './Game.css'
import {colors, colors_e} from "./Color";
import React from "react";
import {Auth} from "../../Services/Auth";
import GameModel from "../../Model/Game";
import {sendData} from "../../Services/Socket";

class Cell
{
    public color: string;
    public cellSize: number;
    public rowPosition: number;
    public colPosition: number;
    public isEmpty: boolean;
    constructor(public parts: number = 10, public couleur = colors_e.blue, row: number, col: number) {
        this.cellSize = window.innerHeight / this.parts;
        this.color = colors[couleur];
        this.rowPosition = row;
        this.colPosition = col;
        this.isEmpty = true;
    }
}

class Coordinates {
    x: number;
    y: number;
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

class StatePawModel {
    pawnOne: Coordinates;
    pawnTwo: Coordinates;
    pawnThree: Coordinates;
    pawnFour: Coordinates;
    pawnFive: Coordinates;
    pawnSix: Coordinates;
    pawnSeven: Coordinates;
    pawnHeight: Coordinates;
    pawnNine: Coordinates;
    pawnTen: Coordinates;

    constructor() {
        this.pawnOne = new Coordinates();
        this.pawnTwo = new Coordinates();
        this.pawnThree = new Coordinates();
        this.pawnFour = new Coordinates();
        this.pawnFive = new Coordinates();
        this.pawnSix = new Coordinates();
        this.pawnSeven = new Coordinates();
        this.pawnHeight = new Coordinates();
        this.pawnNine = new Coordinates();
        this.pawnTen = new Coordinates();
    }
}

class StateModel {
    green: StatePawModel;
    yellow: StatePawModel;
    orange: StatePawModel;
    red: StatePawModel;
    rose: StatePawModel;
    blue: StatePawModel;

    constructor() {
        this.green = new StatePawModel();
        this.yellow = new StatePawModel();
        this.orange = new StatePawModel();
        this.red = new StatePawModel();
        this.rose = new StatePawModel();
        this.blue = new StatePawModel();
    }
}

export default class Game extends React.Component<any> {
    private table: JSX.Element | undefined;
    private grid: Array<Array<Cell>>;

    constructor(props) {
        super(props);
        this.state = {prevDotColor: '', prevCellColor: '', prevRowPosition: -1,
            prevColPosition: -1, ownColor: '', uuid: ''}; // props.color

        const location = window.location.pathname;
        if (!Auth.isLogged())
            window.location.assign("/");

        this.grid = this.createGrid();
        this.table = this.createHTMLGrid(this.grid);

        if (location.startsWith('/game/') && location.length > 6) {
            this.tryToLoadGame();
        } else if (location.startsWith('/game/')) {
            window.location.assign('/');
        } else {
            this.tryToCreateGame();
        }
    }

    tryToLoadGame() {
        const location = window.location.pathname;
        Auth.patchGame(location.substring(6))
            .then(response => {return response.data})
            .then((data: GameModel) => {
                this.setState({uuid: data.uuid});
                this.fillGridFromGameState(data.gameState);
                this.addColorToHtmlFromGrid();
            })
            .catch((error) => {console.log(error)});
    }
    tryToCreateGame() {
        Auth.createGame(0)
            .then(response => {return response.data})
            .then((data: GameModel) => {
                this.setState({uuid: data.uuid});
                this.fillGridFromDefault();
                this.addColorToHtmlFromGrid();
                this.sendGameState(this.grid);
            })
            .catch(error => {
                window.location.assign('/');
                console.error(error);
            });
    }

    fillGridFromDefault(): Array<Array<Cell>> {
        const fillColor = (beg, end, color) => {
            for (let i = beg; i < end; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    this.grid[i][j].color = color;
                    this.grid[i][j].isEmpty = false;
                }
            }
        }
        const fillAdjColor = (line, startPos, reverse, color) => {
            let maxPos = reverse ? 4 : 1;
            for (let i = line; i < (line + 4) && i < this.grid.length; i++) {
                for (let j = startPos; j < this.grid[i].length && j < (startPos + maxPos); j++) {
                    this.grid[i][j].color = color;
                    this.grid[i][j].isEmpty = false;
                }
                maxPos += reverse ? -1 : 1;
            }
        }
        fillColor(0, 4, 'blue');
        fillColor(13, 17, 'red');
        fillAdjColor(4, 0, true, 'green');
        fillAdjColor(4, 9, true, 'purple');
        fillAdjColor(9, 0, false, 'yellow');
        fillAdjColor(9, 9, false, 'orange');
        return this.grid;
    }
    fillGridFromGameState(state: string): Array<Array<Cell>> {
        const stateJson: StateModel = JSON.parse(state);
        const deplete = () => {
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    this.grid[i][j].isEmpty = true;
                    this.grid[i][j].color = '';
                }
            }
        }
        const fill = (x, y, color) => {
            console.log(x + ' ' + y);
            this.grid[x][y].color = color;
            this.grid[x][y].isEmpty = false;
        }
        deplete();
        fill(stateJson.green.pawnOne.x, stateJson.green.pawnOne.y, 'green');
        fill(stateJson.green.pawnTwo.x, stateJson.green.pawnTwo.y, 'green');
        fill(stateJson.green.pawnThree.x, stateJson.green.pawnThree.y, 'green');
        fill(stateJson.green.pawnFour.x, stateJson.green.pawnFour.y, 'green');
        fill(stateJson.green.pawnFive.x, stateJson.green.pawnFive.y, 'green');
        fill(stateJson.green.pawnSix.x, stateJson.green.pawnSix.y, 'green');
        fill(stateJson.green.pawnSeven.x, stateJson.green.pawnSeven.y, 'green');
        fill(stateJson.green.pawnHeight.x, stateJson.green.pawnHeight.y, 'green');
        fill(stateJson.green.pawnNine.x, stateJson.green.pawnNine.y, 'green');
        fill(stateJson.green.pawnTen.x, stateJson.green.pawnTen.y, 'green');

        fill(stateJson.yellow.pawnOne.x, stateJson.yellow.pawnOne.y, 'yellow');
        fill(stateJson.yellow.pawnTwo.x, stateJson.yellow.pawnTwo.y, 'yellow');
        fill(stateJson.yellow.pawnThree.x, stateJson.yellow.pawnThree.y, 'yellow');
        fill(stateJson.yellow.pawnFour.x, stateJson.yellow.pawnFour.y, 'yellow');
        fill(stateJson.yellow.pawnFive.x, stateJson.yellow.pawnFive.y, 'yellow');
        fill(stateJson.yellow.pawnSix.x, stateJson.yellow.pawnSix.y, 'yellow');
        fill(stateJson.yellow.pawnSeven.x, stateJson.yellow.pawnSeven.y, 'yellow');
        fill(stateJson.yellow.pawnHeight.x, stateJson.yellow.pawnHeight.y, 'yellow');
        fill(stateJson.yellow.pawnNine.x, stateJson.yellow.pawnNine.y, 'yellow');
        fill(stateJson.yellow.pawnTen.x, stateJson.yellow.pawnTen.y, 'yellow');

        fill(stateJson.orange.pawnOne.x, stateJson.orange.pawnOne.y, 'orange');
        fill(stateJson.orange.pawnTwo.x, stateJson.orange.pawnTwo.y, 'orange');
        fill(stateJson.orange.pawnThree.x, stateJson.orange.pawnThree.y, 'orange');
        fill(stateJson.orange.pawnFour.x, stateJson.orange.pawnFour.y, 'orange');
        fill(stateJson.orange.pawnFive.x, stateJson.orange.pawnFive.y, 'orange');
        fill(stateJson.orange.pawnSix.x, stateJson.orange.pawnSix.y, 'orange');
        fill(stateJson.orange.pawnSeven.x, stateJson.orange.pawnSeven.y, 'orange');
        fill(stateJson.orange.pawnHeight.x, stateJson.orange.pawnHeight.y, 'orange');
        fill(stateJson.orange.pawnNine.x, stateJson.orange.pawnNine.y, 'orange');
        fill(stateJson.orange.pawnTen.x, stateJson.orange.pawnTen.y, 'orange');

        fill(stateJson.red.pawnOne.x, stateJson.red.pawnOne.y, 'red');
        fill(stateJson.red.pawnTwo.x, stateJson.red.pawnTwo.y, 'red');
        fill(stateJson.red.pawnThree.x, stateJson.red.pawnThree.y, 'red');
        fill(stateJson.red.pawnFour.x, stateJson.red.pawnFour.y, 'red');
        fill(stateJson.red.pawnFive.x, stateJson.red.pawnFive.y, 'red');
        fill(stateJson.red.pawnSix.x, stateJson.red.pawnSix.y, 'red');
        fill(stateJson.red.pawnSeven.x, stateJson.red.pawnSeven.y, 'red');
        fill(stateJson.red.pawnHeight.x, stateJson.red.pawnHeight.y, 'red');
        fill(stateJson.red.pawnNine.x, stateJson.red.pawnNine.y, 'red');
        fill(stateJson.red.pawnTen.x, stateJson.red.pawnTen.y, 'red');

        fill(stateJson.rose.pawnOne.x, stateJson.rose.pawnOne.y, 'purple');
        fill(stateJson.rose.pawnTwo.x, stateJson.rose.pawnTwo.y, 'purple');
        fill(stateJson.rose.pawnThree.x, stateJson.rose.pawnThree.y, 'purple');
        fill(stateJson.rose.pawnFour.x, stateJson.rose.pawnFour.y, 'purple');
        fill(stateJson.rose.pawnFive.x, stateJson.rose.pawnFive.y, 'purple');
        fill(stateJson.rose.pawnSix.x, stateJson.rose.pawnSix.y, 'purple');
        fill(stateJson.rose.pawnSeven.x, stateJson.rose.pawnSeven.y, 'purple');
        fill(stateJson.rose.pawnHeight.x, stateJson.rose.pawnHeight.y, 'purple');
        fill(stateJson.rose.pawnNine.x, stateJson.rose.pawnNine.y, 'purple');
        fill(stateJson.rose.pawnTen.x, stateJson.rose.pawnTen.y, 'purple');

        fill(stateJson.blue.pawnOne.x, stateJson.blue.pawnOne.y, 'blue');
        fill(stateJson.blue.pawnTwo.x, stateJson.blue.pawnTwo.y, 'blue');
        fill(stateJson.blue.pawnThree.x, stateJson.blue.pawnThree.y, 'blue');
        fill(stateJson.blue.pawnFour.x, stateJson.blue.pawnFour.y, 'blue');
        fill(stateJson.blue.pawnFive.x, stateJson.blue.pawnFive.y, 'blue');
        fill(stateJson.blue.pawnSix.x, stateJson.blue.pawnSix.y, 'blue');
        fill(stateJson.blue.pawnSeven.x, stateJson.blue.pawnSeven.y, 'blue');
        fill(stateJson.blue.pawnHeight.x, stateJson.blue.pawnHeight.y, 'blue');
        fill(stateJson.blue.pawnNine.x, stateJson.blue.pawnNine.y, 'blue');
        fill(stateJson.blue.pawnTen.x, stateJson.blue.pawnTen.y, 'blue');
        
        return this.grid;
    }

    createGrid(): Array<Array<Cell>> {
        let grid: Array<Array<Cell>> = [];
        const fill = (number: number, rowPosition) => {
            let subGrid: Array<Cell> = [];
            let col = 0
            while (number) {
                subGrid.push(new Cell(10, colors_e.nothing, rowPosition, col));
                number--;
                col++;
            }
            grid.push(subGrid);
        }
        fill(1, 0);
        fill(2, 1);
        fill(3, 2);
        fill(4, 3);
        fill(13, 4);
        fill(12, 5);
        fill(11, 6);
        fill(10, 7);
        fill(9, 8);
        fill(10, 9);
        fill(11, 10);
        fill(12, 11);
        fill(13, 12);
        fill(4, 13);
        fill(3, 14);
        fill(2, 15);
        fill(1, 16);

        return grid;
    }
    createHTMLGrid(grid: Array<Array<Cell>>): JSX.Element {
        const createArray = (number, columnNumber) => {
            let arr: Array<React.ReactElement> = [];
            for (let i = 0; i < number; i++) {
                let c = React.createElement('td',
                    {className: `cell-${columnNumber}-${i}`, onClick: () => {this.selectCell(columnNumber, i)}},
                    React.createElement('span', {className: `dot dot-${columnNumber}-${i}`}));
                arr.push(c);
            }
            return React.createElement('tr', null, arr);
        }
        let arr: Array<React.ReactElement> = [];
        for (let i = 0; i < grid.length; i++) {
            arr.push(createArray(grid[i].length, i));
        }
        return React.createElement('table', {className: 'chessBoard'},
        React.createElement('tbody', null, arr));
    }

    sendGameState(grid: Array<Array<Cell>>) {
        const getArrayFromColor = (color) => {
            let arr: Array<Cell> = [];
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (grid[i][j].color === color) {
                        const cell: Cell = new Cell(10, colors_e.blue, i, j);
                        cell.color = color;
                        arr = arr.concat(cell);
                    }
                }
            }
            return arr;
        }
        const createPawnModel = (arrayOfCells: Array<Cell>) => {
            let pawn: StatePawModel = new StatePawModel();

            pawn.pawnOne.x = arrayOfCells[0].rowPosition;
            pawn.pawnOne.y = arrayOfCells[8].colPosition;
            pawn.pawnTwo.x = arrayOfCells[9].rowPosition;
            pawn.pawnTwo.y = arrayOfCells[0].colPosition;
            pawn.pawnThree.x = arrayOfCells[1].rowPosition;
            pawn.pawnThree.y = arrayOfCells[1].colPosition;
            pawn.pawnFour.x = arrayOfCells[2].rowPosition;
            pawn.pawnFour.y = arrayOfCells[2].colPosition;
            pawn.pawnFive.x = arrayOfCells[3].rowPosition;
            pawn.pawnFive.y = arrayOfCells[3].colPosition;
            pawn.pawnSix.x = arrayOfCells[4].rowPosition;
            pawn.pawnSix.y = arrayOfCells[4].colPosition;
            pawn.pawnSeven.x = arrayOfCells[5].rowPosition;
            pawn.pawnSeven.y = arrayOfCells[5].colPosition;
            pawn.pawnHeight.x = arrayOfCells[6].rowPosition;
            pawn.pawnHeight.y = arrayOfCells[6].colPosition;
            pawn.pawnNine.x = arrayOfCells[7].rowPosition;
            pawn.pawnNine.y = arrayOfCells[7].colPosition;
            pawn.pawnTen.x = arrayOfCells[8].rowPosition;
            pawn.pawnTen.y = arrayOfCells[9].colPosition;
            return pawn;
        }
        let model: StateModel = new StateModel();
        model.yellow = createPawnModel(getArrayFromColor('yellow'));
        model.red = createPawnModel(getArrayFromColor('red'));
        model.green = createPawnModel(getArrayFromColor('green'));
        model.rose = createPawnModel(getArrayFromColor('purple'));
        model.blue = createPawnModel(getArrayFromColor('blue'));
        model.orange = createPawnModel(getArrayFromColor('orange'));
        sendData(this.getUuid(), JSON.stringify(model));
    }
    selectCell(columnNumber, rowNumber) {
        console.log('clicked on cell ' + columnNumber + ' ' + rowNumber);
        // @ts-ignore
        if (this.state.prevRowPosition !== -1) {
            // @ts-ignore
            const prevDot = document.querySelector<HTMLElement>(`.dot-${this.state.prevColPosition}-${this.state.prevRowPosition}`);
            // @ts-ignore
            const prevCell = document.querySelector<HTMLElement>(`.cell-${this.state.prevColPosition}-${this.state.prevRowPosition}`);
            if (prevCell && prevDot && prevDot.style.background.length !== 0) {
                // @ts-ignore
                prevCell.style.borderColor = this.state.prevCellColor;
            } else if (prevDot && prevCell) {
                // @ts-ignore
                prevDot.style.backgroundColor = this.state.prevDotColor;
                // @ts-ignore
                prevCell.style.borderColor = this.state.prevCellColor;
            }
        }
        const dot = document.querySelector<HTMLElement>(`.dot-${columnNumber}-${rowNumber}`);
        const cell = document.querySelector<HTMLElement>(`.cell-${columnNumber}-${rowNumber}`);
        let dotColor: string = '';
        let cellColor: string = '';
        if (cell && dot && (dot.style.backgroundColor === 'white' || dot.style.backgroundColor.length === 0)) { // if no dot in cell it is a move
            cellColor = cell.style.borderColor;
            cell.style.borderColor = 'green';
            // @ts-ignore
            if (this.state.prevRowPosition !== -1 && this.state.prevDotColor.length !== 0 && this.state.prevDotColor !== 'white') this.makeAMove(columnNumber, rowNumber);
        } else if (dot && cell) { // just a selection
            console.log('just a selection')
            cellColor = cell.style.borderColor;
            cell.style.borderColor = 'green';
            dotColor = dot.style.backgroundColor;
            // dot.style.backgroundColor = 'red';
        } else {
            return;
        }
        this.setState({prevRowPosition: rowNumber, prevColPosition: columnNumber, prevCellColor: cellColor, prevDotColor: dotColor})
    }
    makeAMove(columnNumber: number, rowNumber: number) {
        let newGrid = this.grid;
        // @ts-ignore
        const oldRowPosition = this.state.prevRowPosition;
        // @ts-ignore
        const oldColPosition = this.state.prevColPosition;
        const dot = document.querySelector<HTMLElement>(`.dot-${oldColPosition}-${oldRowPosition}`);
        if (!dot)
            return;
        newGrid[columnNumber][rowNumber].isEmpty = false;
        newGrid[columnNumber][rowNumber].color = dot.style.backgroundColor;
        newGrid[oldColPosition][oldRowPosition].isEmpty = true;
        newGrid[oldColPosition][oldRowPosition].color = '';
        this.sendGameState(newGrid);
        Auth.getGameState(this.getUuid())
            .then(response => response.data)
            .then((response: GameModel) => {
                this.fillGridFromGameState(response.gameState);
                this.addColorToHtmlFromGrid();
            }).catch(error => console.log(error));

    }
    unSelect() {
        // @ts-ignore
        const columnNumber = this.state.prevColPosition;
        // @ts-ignore
        const rowNumber = this.state.prevRowPosition;
        const dot = document.querySelector<HTMLElement>(`.dot-${columnNumber}-${rowNumber}`);
        const cell = document.querySelector<HTMLElement>(`.cell-${columnNumber}-${rowNumber}`);
        if (dot) {
            // @ts-ignore
            dot.style.backgroundColor = this.state.prevDotColor;
        } if (cell) {
            // @ts-ignore
            cell.style.borderColor = this.state.prevCellColor;
        }
        this.setState({prevRowPosition: -1, prevColPosition: -1});
    }

    componentDidMount() {
        this.addColorToHtmlFromGrid();
    }

    getUuid() {
        // @ts-ignore
        return this.state.uuid;
    }

    addColorToHtmlFromGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const dot = document.querySelector<HTMLElement>(`.dot-${i}-${j}`)
                if (dot) dot.style.backgroundColor = this.grid[i][j].color;
            }
        }
    }

    render() {
        return (
            // @ts-ignore
            <div>
                <p>Invite other player with this <a href={`http://localhost:4200/game/${this.getUuid()}`}>link</a>!</p>
                {this.table}
            </div>
        )
    }
}

