import './Color'
import './Game.css'
import {colors, colors_e} from "./Color";
import React from "react";
import {Auth} from "../../Services/Auth";
import GameModel from "../../Model/Game";

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

export default class Game extends React.Component<any> {
    private readonly table: JSX.Element;
    private readonly grid: Array<Array<Cell>>;

    constructor(props) {
        super(props);
        this.grid = this.createGrid();
        this.table = this.createHTMLGrid(this.grid);
        this.state = {prevDotColor: '', prevCellColor: '', prevRowPosition: -1,
            prevColPosition: -1, ownColor: '', uuid: ''}; // props.color
    }

    tryToCreateGame() {
        Auth.createGame(0)
            .then(response => {return response.data})
            .then((data: GameModel) => {
                this.setState({uuid: data.uuid});
            })
            .catch(error => {
                window.location.reload();
                console.error(error);
            });
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

    addInformationToGridAtTheBeginning(grid: Array<Array<Cell>>) {
        const fillCell = (beg, end, color) => {
            for (let i = beg; i < end; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    this.grid[i][j].isEmpty = false;
                    this.grid[i][j].color = color;
                }
            }
        }
        const fillCellAdj = (line, startPos, reverse, color) => {
            let maxPos = reverse ? 4 : 1;
            for (let i = line; i < (line + 4) && i < this.grid.length; i++) {
                for (let j = startPos; j < this.grid[i].length && j < (startPos + maxPos); j++) {
                    this.grid[i][j].isEmpty = false;
                    this.grid[i][j].color = color;
                }
                maxPos += reverse ? -1 : 1;
            }
        }
        fillCell(0, 4, 'blue');
        fillCell(13, 17, 'red');
        fillCellAdj(4, 0, true, 'green');
        fillCellAdj(4, 9, true, 'purple');
        fillCellAdj(9, 0, false, 'violet');
        fillCellAdj(9, 9, false, 'orange');
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
        if (cell && dot && dot.style.backgroundColor.length === 0) {
            cellColor = cell.style.borderColor;
            cell.style.borderColor = 'green';
        } else if (dot && cell) {
            cellColor = cell.style.borderColor;
            dotColor = dot.style.backgroundColor;
            dot.style.backgroundColor = 'red';
            cell.style.borderColor = 'green';
        } else {
            return;
        }
        this.setState({prevRowPosition: rowNumber, prevColPosition: columnNumber, prevCellColor: cellColor, prevDotColor: dotColor})
    }

    componentDidMount() {
        const location = window.location.pathname;
        if (!Auth.isLogged())
            window.location.assign("/");
        if (location.startsWith('/game/') && location.length > 6) {
            Auth.patchGame(location.substring(6))
                .then(response => {return response.data})
                .then((data: GameModel) => {
                    this.setState({uuid: data.uuid});
                    //TODO reste
                })
                .catch(() => {window.location.reload()});
        } else if (location.startsWith('/game/')) {
            window.location.reload();
        } else {
            this.tryToCreateGame();
            this.addColorBeginning();
        }
    }

    getUuid() {
        // @ts-ignore
        return this.state.uuid;
    }

    addColorBeginning() {
        const fillColor = (beg, end, color) => {
            for (let i = beg; i < end; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    const dot = document.querySelector<HTMLElement>(`.dot-${i}-${j}`)
                    if (dot) dot.style.backgroundColor = color;
                }
            }
        }
        const fillAdjColor = (line, startPos, reverse, color) => {
            let maxPos = reverse ? 4 : 1;
            for (let i = line; i < (line + 4) && i < this.grid.length; i++) {
                for (let j = startPos; j < this.grid[i].length && j < (startPos + maxPos); j++) {
                    const dot = document.querySelector<HTMLElement>(`.dot-${i}-${j}`)
                    if (dot) dot.style.backgroundColor = color;
                }
                maxPos += reverse ? -1 : 1;
            }
        }
        fillColor(0, 4, 'blue');
        fillColor(13, 17, 'red');
        fillAdjColor(4, 0, true, 'green');
        fillAdjColor(4, 9, true, 'purple');
        fillAdjColor(9, 0, false, 'violet');
        fillAdjColor(9, 9, false, 'orange');
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

