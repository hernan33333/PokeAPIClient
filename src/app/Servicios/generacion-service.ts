import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GeneracionModel } from '../Modelos/generacion-model';
import { ResultadoModel } from '../Modelos/resultado-model';

@Injectable({
  providedIn: 'root',
})
export class GeneracionService {

  private url:string = "http://localhost:8080/pokeapi/generacion";

  constructor(
    private http: HttpClient
  ){}
  
  getAll(): Observable<GeneracionModel[]>{

    return this.http.get<ResultadoModel<GeneracionModel>>(this.url).pipe(map((resultGeneracion : ResultadoModel<GeneracionModel>) => resultGeneracion.objects as GeneracionModel[]));

  }

}
