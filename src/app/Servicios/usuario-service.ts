import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResultadoModel } from "../Modelos/resultado-model";
import { UsuarioModel } from "../Modelos/usuario-model";

@Injectable({
    providedIn: 'root',
})

export class UsuarioService{

    private url:string = "http://192.167.0.172:8080/pokeapi";

    constructor(private http:HttpClient){}

    getAll():Observable<ResultadoModel<UsuarioModel>>{
        return this.http.get<ResultadoModel<UsuarioModel>>(this.url);
    }

    getById(IdUsuario:number):Observable<ResultadoModel<UsuarioModel>>{
        return this.http.get<ResultadoModel<UsuarioModel>>(this.url+"/"+IdUsuario);
    }

    add(Usuario:UsuarioModel):Observable<ResultadoModel<any>>{
        return this.http.post<ResultadoModel<any>>(this.url+"/adduser", Usuario);
    }

    Update(IdUsuario:number, Usuario: UsuarioModel):Observable<ResultadoModel<any>>{
        return this.http.put<ResultadoModel<any>>(this.url+"/update?IdUsuario&="+IdUsuario,Usuario)
    }

    Delete(IdUsuario:number):Observable<ResultadoModel<any>>{
        return this.http.delete<ResultadoModel<any>>(this.url+"/eliminar"+IdUsuario);
    }
    
}