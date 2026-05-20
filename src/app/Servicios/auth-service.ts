import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ResultadoModel } from "../Modelos/resultado-model";
import { catchError, of, tap } from "rxjs";
import { UsuarioModel } from "../Modelos/usuario-model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = "http://192.167.0.69:8080/auth";
  private http = inject(HttpClient);

  private _token = signal<string | null>(sessionStorage.getItem('auth_token'));

  public token = this._token.asReadonly();
  public Usuario:UsuarioModel | undefined;

  iniciarSecion(usuario: any) {
    return this.http.post<ResultadoModel<UsuarioModel>>(this.url + "/login", usuario).pipe(
      tap(data => {
        const tokenServidor = data.errorMessage;
        this.setToken(tokenServidor);
        this.Usuario = data.object;
      }),
      catchError((error: HttpErrorResponse)=>{
        const respuestaError = error.error as ResultadoModel<any>
        return of(respuestaError);
      })
    );
  }

  activarUsuario(token: string) {
    return this.http.get<ResultadoModel<UsuarioModel>>(this.url + "/activate?token=" + token).pipe(
      tap(data => {
        const tokenServidor = data.errorMessage;
        this.setToken(tokenServidor);
        this.Usuario = data.object;
      }),
      catchError((error:HttpErrorResponse)=>{
        const respuestaError = error.error as ResultadoModel<any>
        return of(respuestaError);

      })
      );
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