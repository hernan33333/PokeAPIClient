import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResultadoModel } from "../Modelos/resultado-model";
import { GeneracionModel } from "../Modelos/generacion-model";

@Injectable({
    providedIn: 'root',
})
export class GeneracionService{
    private url:string = "http://localhost:8080/pokeapi/generacion";

    constructor (private http: HttpClient){};

    getAll():Observable<ResultadoModel<GeneracionModel>>{
        return this.http.get<ResultadoModel<GeneracionModel>>(this.url);
    }
}
