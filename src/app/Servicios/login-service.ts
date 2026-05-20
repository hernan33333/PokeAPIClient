import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioModel } from "../Modelos/usuario-model";
import { catchError, Observable, of } from "rxjs";
import { ResultadoModel } from "../Modelos/resultado-model";

@Injectable({

    providedIn: 'root',

})

export class LoginService{
    
    private url:string = "http://192.167.0.90:8080/auth";

    
    constructor (private http: HttpClient){};

    iniciarSecion(usuario:any):Observable<ResultadoModel<any>>{

        return this.http.post<ResultadoModel<any>>(this.url+"/login",usuario)

    }

    registrarUsuario(usuario:any):Observable<ResultadoModel<any>>{

        return this.http.post<ResultadoModel<any>>(this.url+"/register",usuario).pipe(
            catchError((error: HttpErrorResponse)=>{
                const respuestaError = error.error as ResultadoModel<any>
                return of(respuestaError);
            })
        )
        
    }

    comprobarNombre(username:string):Observable<ResultadoModel<any>>{
        
        return this.http.get<ResultadoModel<any>>(this.url+"/"+username).pipe(
            catchError((error: HttpErrorResponse)=>{
                const respuestaError = error.error as ResultadoModel<any>
                return of(respuestaError);
            })
        )
    }

    comprobarCorreo(correo:string):Observable<ResultadoModel<any>>{

        return this.http.get<ResultadoModel<any>>(this.url+"/comprobarCorreo/"+correo).pipe(
            catchError((error: HttpErrorResponse)=>{
                const respuestaError = error.error as ResultadoModel<any>
                return of(respuestaError);
            })
        )
    }
}