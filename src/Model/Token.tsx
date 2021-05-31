export default class TokenModel {
    access_token: string;

    constructor(token?: string | null) {
        if (token)
            this.access_token = token;
        else
            this.access_token = '';
    }
}
