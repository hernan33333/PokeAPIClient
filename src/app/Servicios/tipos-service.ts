import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TipoModel } from "../Modelos/tipo-model";
import { ResultadoModel } from "../Modelos/resultado-model";

@Injectable({
    providedIn: 'root',
})
export class TipoService{
    
    private url:string = "http://192.167.0.204:8080/pokemon/tipos";

    constructor(
        private http: HttpClient
    ){};

    getAll():Observable<ResultadoModel<TipoModel>>{
        return this.http.get<ResultadoModel<TipoModel>>(this.url);
    }
}