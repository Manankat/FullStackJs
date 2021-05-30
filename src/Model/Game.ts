
export default class GameModel
{
    readonly id: number;
    readonly uuid: string;
    readonly player: Array<string>;
    readonly remainingColor: Array<Number>;
    readonly gameState: string;

    constructor() {
        this.id = 0;
        this.uuid = '';
        this.player = [];
        this.remainingColor = [];
        this.gameState = '';
    }
}
