import {BehaviorSubject, Observable} from "rxjs";
import UserModel from "../Model/User";
import TokenModel from "../Model/Token";
import {Environment} from "../Environment";
import axios from "axios";

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

    saveToken(data : TokenModel | null): void {
        if (data) {
            localStorage.setItem('access_token', data.access_token);
        }
    }

    async login(data: UserModel) {
        return (await axios(this.url + '/auth/login', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            data: data
        }).then((response) => {
            this.saveToken(response.data);
            return response.data;
        }));
    }

    async register(data: UserModel) {
        return (await axios(this.url + '/auth/register', {
            headers: {'Content-Type': 'application/json'},
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
}

export const Auth = new Authentication();
