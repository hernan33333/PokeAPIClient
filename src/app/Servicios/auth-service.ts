import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ResultadoModel } from "../Modelos/resultado-model";
import { catchError, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = "http://192.167.0.90:8080/auth";

  private http = inject(HttpClient);

  private _token = signal<string | null>(sessionStorage.getItem('auth_token'));

  public token = this._token.asReadonly();

  iniciarSecion(usuario: any) {
    return this.http.post<ResultadoModel<any>>(this.url + "/login", usuario).pipe(
      tap(data => {
        const tokenServidor = data.errorMessage;
        this.setToken(tokenServidor);
      }),
      catchError((error: HttpErrorResponse)=>{
        const respuestaError = error.error as ResultadoModel<any>
        return of(respuestaError);
      })
    );
  }

  activarUsuario(token: string) {
    return this.http.get<ResultadoModel<string>>(this.url + "/activate?token=" + token).pipe(
      tap(data => {
        const tokenServidor = data.errorMessage;
        this.setToken(tokenServidor);
      })
    )
  }

  getToken(): string | null{
    return this.token();
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