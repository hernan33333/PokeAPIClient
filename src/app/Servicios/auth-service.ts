import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ResultadoModel } from "../Modelos/resultado-model";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = "http://192.167.1.26:8080/auth/login";
  private http = inject(HttpClient);

  private _token = signal<string | null>(sessionStorage.getItem('auth_token'));
  
  public token = this._token.asReadonly();

  iniciarSecion(usuario: any) {
    return this.http.post<ResultadoModel<any>>(this.url, usuario).pipe(
      tap(data => {
        const tokenServidor = data.object;
        this.setToken(tokenServidor);
      })
    );
  }

  setToken(token: string) {
    sessionStorage.setItem('auth_token', token);
    this._token.set(token);
  }

  logout() {
    sessionStorage.removeItem('auth_token');
    this._token.set(null);
  }
}