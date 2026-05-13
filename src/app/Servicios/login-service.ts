import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioModel } from "../Modelos/usuario-model";
import { Observable } from "rxjs";
import { ResultadoModel } from "../Modelos/resultado-model";

@Injectable({

    providedIn: 'root',

})

export class LoginService{
    
    private url:string = "http://192.167.0.172:8080/auth";
    
    constructor (private http: HttpClient){};

    iniciarSecion(usuario:any):Observable<ResultadoModel<any>>{

        return this.http.post<ResultadoModel<any>>(this.url+"/login",usuario)

    }

    registrarUsuario(usuario:any):Observable<ResultadoModel<any>>{

        return this.http.post<ResultadoModel<any>>(this.url+"/register",usuario)
        
    }
}