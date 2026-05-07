import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { ResultadoModel } from "../Modelos/resultado-model";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private url:string = "http://192.167.1.26:8080/auth/login";

    constructor( private http: HttpClient){}

    private _token = signal<String | null>(sessionStorage.getItem('auth_token'));

    getToken() {
        return this._token;
    }

    iniciarSecion(usuario:any){
        return this.http.post<ResultadoModel<any>>(this.url,usuario).pipe(
            tap(data => {
                const tokenServidor = data.object;
                sessionStorage.setItem('access_token', tokenServidor);
                this._token.set(tokenServidor);
            })
        )
    }

    setToken(token: string) {
        sessionStorage.setItem('auth_token', token);
        this._token.set(token);
    }

    logout() {
        sessionStorage.removeItem('auth_token');
        this._token.set(null);
    }

    isAuthenticated(): boolean {
        return !!this._token();
    }
}