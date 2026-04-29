import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TipoModel } from "../Modelos/tipo-model";
import { ResultadoModel } from "../Modelos/resultado-model";

@Injectable({
    providedIn: 'root',
})
export class TipoService{
    
    private url:string = "http://localhost:8080/pokeapi/tipos";

    constructor(
        private http: HttpClient
    ){};

    getAll():Observable<TipoModel[]>{
        
        return this.http.get<ResultadoModel<TipoModel>>(this.url).pipe(map((resultTipo : ResultadoModel<TipoModel>) => resultTipo.objects as TipoModel[]));
        
    }
}