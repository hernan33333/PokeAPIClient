import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoModel } from "../Modelos/tipo-model";

@Injectable({
    providedIn: 'root',
})
export class TipoService{
    private url:string = "";

    constructor(private http: HttpClient){};

    getAll():Observable<TipoModel[]>{
        return this.http.get<TipoModel[]>(this.url);
    }
}