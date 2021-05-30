import {BehaviorSubject, Observable} from "rxjs";
import UserModel from "../Model/User";
import TokenModel from "../Model/Token";
import {Environment} from "../Environment";
import axios from "axios";
import GameModel from "../Model/Game";

class Authentication {
    private userSubject: BehaviorSubject<TokenModel>;
    public  user: Observable<TokenModel>
    private readonly url: string;

    constructor() {
        this.userSubject = new BehaviorSubject<TokenModel>(this.getTokenBack());
        this.user = this.userSubject.asObservable();
        this.url = Environment.apiUrl;
    }

    getTokenBack(): TokenModel {
        const token =  localStorage.getItem('access_token');
        return new TokenModel(token);
    }

    saveToken(data : TokenModel | null, username: string): void {
        if (data) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('username', username);
        }
    }

    async login(data: UserModel) {
        return (await axios(this.url + 'auth/login', {
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            method: 'POST',
            data: data
        }).then((response) => {
            this.saveToken(response.data, data.username);
            return response.data;
        }));
    }

    async register(data: UserModel) {
        return (await axios(this.url + 'auth/register', {
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            method: 'POST',
            data: data
        }));
    }

    logout(): void {
        localStorage.clear();
    }

    isLogged(): boolean {
        return localStorage.getItem('access_token') !== null;
    }

    async createGame(color: number) {
        const code = localStorage.getItem('access_token');
        const data = {username: localStorage.getItem('username'), color: color}
        return (await axios(this.url + 'games', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'POST',
            data: data
        }));
    }

    async getGameState(uuid: string) {
        const code = localStorage.getItem('access_token');
        return (await axios(this.url + 'games/' + uuid, {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'GET',
        }));
    }

    async deleteGame(uuid: string) {
        const code = localStorage.getItem('access_token');
        return (await axios(this.url + 'games/' + uuid, {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'DELETE',
        }));
    }

    async patchGame(uuid: string) {
        const code = localStorage.getItem('access_token');
        let color;
        await this.getGameState(uuid)
            .then(message => {return message.data})
            .then((data: GameModel) => {
                if (data.remainingColor.length !== 0) {
                    color = data.remainingColor[0];
                } else {
                    throw new Error("No color available");
                }
            });
        const data = {username: localStorage.getItem('username'), color: color}
        return (await axios(this.url + 'games/players/' + uuid, {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'PATCH',
            data: data
        }));
    }

    async patchGameState(uuid:string, gameState: string) {
        const code = localStorage.getItem('access_token');
        return (await axios(this.url + 'games/state/' + uuid, {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'PATCH',
            data: gameState
        }));
    }

    async updateUser(data: any) {
        const code = localStorage.getItem('access_token');
        return (await axios(this.url + 'user', {
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + code},
            method: 'PATCH',
            data: data
        }));
    }
}

export const Auth = new Authentication();
