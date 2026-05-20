import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResultadoModel } from "../Modelos/resultado-model";
import { RegionModel } from "../Modelos/region-model";

@Injectable({
    providedIn: 'root',
})

export class RegionService{
    public url:string = "http://192.167.0.90:8080/pokemon/region";

    constructor(private http: HttpClient){};

    getAll():Observable<ResultadoModel<RegionModel>>{
        return this.http.get<ResultadoModel<RegionModel>>(this.url);
    }
}
